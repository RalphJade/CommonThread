# Admin vs Customer - Quick Reference

## Access Control

| Feature | Customer | Admin |
|---------|----------|-------|
| View Products | ✅ Yes (Browse only) | ✅ Yes (Full CRUD) |
| Add to Cart | ✅ Yes | ❌ No |
| Checkout | ✅ Yes | ❌ No |
| View Own Orders | ✅ Yes | ❌ No (Views all) |
| Manage Products | ❌ No | ✅ Yes |
| Create Products | ❌ No | ✅ Yes |
| Edit Products | ❌ No | ✅ Yes |
| Delete Products | ❌ No | ✅ Yes |
| View All Orders | ❌ No | ✅ Yes |
| Update Order Status | ❌ No | ✅ Yes |
| View Analytics | ❌ No | ✅ Yes |

## URL Prefixes

```
Customer Routes:
  / (public, no prefix)
  /products (public, no prefix)
  /dashboard (auth only, no prefix)
  /cart (auth only, no prefix)
  /orders (auth only, no prefix)
  /checkout (auth only, no prefix)

Admin Routes:
  /admin/dashboard
  /admin/products
  /admin/products/create
  /admin/products/{id}/edit
  /admin/orders
  /admin/orders/{id}
```

## Middleware Requirements

```php
// Public (no middleware)
Route::get('/products', ...);

// Customer (auth + verified)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/cart', ...);
    Route::get('/orders', ...);
});

// Admin (auth + verified + admin)
Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::get('/admin/', ...);
    Route::get('/admin/products', ...);
});
```

## Database Schema

```
users table:
  - id
  - name
  - email
  - email_verified_at
  - password
  - role ← NEW! (enum: 'customer', 'admin')
  - two_factor_secret
  - two_factor_recovery_codes
  - remember_token
  - created_at
  - updated_at
```

## Key Differences

### Product Management
```
CUSTOMER:
  - Browse active products
  - View product details
  - See related products
  - Add to cart

ADMIN:
  - Browse ALL products
  - Add new products
  - Edit product details
  - Toggle active/inactive
  - Mark as featured
  - Delete products
```

### Order Management
```
CUSTOMER:
  - View only their orders
  - See order details
  - Print order
  - Track status

ADMIN:
  - View all orders
  - Search/filter orders
  - Update order status
  - See customer details
  - View full order items breakdown
```

### Dashboard
```
CUSTOMER:
  - Personal dashboard
  - Quick access to account
  - Recent orders
  - Wishlist (future)

ADMIN:
  - Analytics dashboard
  - Revenue metrics
  - Sales charts
  - Top products
  - Recent orders
  - Customer insights
```

## Helper Methods

```php
// In User model
$user->isAdmin()      // Returns bool
$user->isCustomer()   // Returns bool

// In controller/service
auth()->user()->isAdmin()
auth()->user()->isCustomer()
```

## Role Assignment

```php
// Make user admin
$user->update(['role' => 'admin']);

// Make user customer
$user->update(['role' => 'customer']);

// Check role
$user->role === 'admin'
$user->role === 'customer'
```

## Authorization

### Using Middleware
```php
Route::middleware('admin')->group(function () {
    // Only admins can access
});
```

### Using Helper Methods
```php
// In controller
if (auth()->user()->isAdmin()) {
    // Admin-only logic
}

// In view/component
@if(auth()->user()?->isAdmin())
    <!-- Admin content -->
@endif
```

### Using Policies (Future Enhancement)
```php
// Check authorization
$this->authorize('update', $product);
```

## Security Features

1. **Admin Middleware** - Enforces role check
2. **Route Protection** - All admin routes require admin middleware
3. **Policy Authorization** - Can be added for fine-grained control
4. **User Verification** - All authenticated routes require verified email
5. **CSRF Protection** - Built-in Laravel protection
6. **Data Isolation** - Customers can't access admin endpoints

## Testing

```php
// Create test users
$admin = User::factory()->create(['role' => 'admin']);
$customer = User::factory()->create(['role' => 'customer']);

// Test as admin
$this->actingAs($admin)->get('/admin/')->assertOk();

// Test as customer (should be denied)
$this->actingAs($customer)->get('/admin/')->assertForbidden();

// Test guest access (should be denied)
$this->get('/admin/')->assertRedirect('/login');
```
