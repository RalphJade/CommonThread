# Admin vs Customer Separation - Setup Guide

## Overview
The application has been restructured to properly separate admin and customer functionalities with dedicated routes, controllers, and pages for each side.

## Key Changes

### 1. Database Migration
A new migration has been created to add a `role` column to the `users` table.

**To apply the migration:**
```bash
php artisan migrate
```

This adds a `role` enum field with values:
- `customer` (default)
- `admin`

### 2. Middleware
- **New Middleware:** `App\Http\Middleware\IsAdmin`
- **Purpose:** Protects admin routes and ensures only users with `role === 'admin'` can access them
- **Registration:** Automatically registered as `admin` middleware in `bootstrap/app.php`

### 3. Routes Structure

#### Public Routes
- `/` - Home page
- `/products` - Product listing (customer-facing)
- `/products/{product}` - Product details

#### Customer Routes (Requires: `auth`, `verified`)
- `/dashboard` - Customer dashboard
- `/cart/*` - Shopping cart
- `/orders/*` - Customer orders
- `/checkout` - Checkout page

#### Admin Routes (Requires: `auth`, `verified`, `admin`)
- `/admin/` - Admin dashboard with analytics
- `/admin/products/*` - Product management (CRUD)
- `/admin/orders/*` - Order management and tracking

### 4. Controllers

#### New Admin Controllers
- `App\Http\Controllers\Admin\DashboardController` - Analytics and metrics
- `App\Http\Controllers\Admin\ProductController` - Product CRUD operations
- `App\Http\Controllers\Admin\OrderController` - Order viewing and status updates

#### Existing Customer Controllers (Unchanged)
- `ProductController` - Product listing/viewing
- `CartController` - Cart management
- `OrderController` - Customer order viewing

### 5. User Model
- Added `isAdmin()` method - Check if user is admin
- Added `isCustomer()` method - Check if user is customer
- Added `role` to fillable attributes

### 6. React Pages

#### Admin Pages
```
resources/js/pages/admin/
├── dashboard.tsx              # Admin analytics dashboard
├── products/
│   ├── index.tsx             # Product management list
│   ├── create.tsx            # Create product form
│   └── edit.tsx              # Edit product form
└── orders/
    ├── index.tsx             # Order management list
    └── show.tsx              # Order details & status update
```

#### Customer Pages (Existing)
```
resources/js/pages/
├── products/
│   ├── index.tsx             # Product catalog
│   └── show.tsx              # Product details
├── dashboard.tsx             # Customer dashboard
├── cart/                      # Shopping cart
└── orders/                    # Customer orders
```

## How to Use

### Making a User an Admin
```php
$user->update(['role' => 'admin']);
```

### Accessing Admin Panel
1. User must be authenticated and verified
2. User role must be `'admin'`
3. Navigate to `/admin/` in the browser

### Middleware Usage
To protect a route or route group:
```php
Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    // Admin routes here
});
```

## Authorization in Blade/JS

### Check if User is Admin
```php
// In Laravel
if (auth()->user()->isAdmin()) {
    // Show admin content
}

// In JavaScript/React
if (user.role === 'admin') {
    // Show admin content
}
```

## Testing

### Create Test Admin User
```php
User::factory()->create([
    'email' => 'admin@example.com',
    'password' => Hash::make('password'),
    'role' => 'admin',
]);
```

### Create Test Customer User
```php
User::factory()->create([
    'email' => 'customer@example.com',
    'password' => Hash::make('password'),
    'role' => 'customer',
]);
```

## Security Notes

1. **Admin Middleware:** The `IsAdmin` middleware will throw a 403 error for non-admin users
2. **Authorization:** Use Laravel Policies for fine-grained authorization if needed
3. **Audit Logging:** Consider adding audit logs for admin actions
4. **Rate Limiting:** Consider implementing rate limits on admin routes

## Future Enhancements

- [ ] User management page for admins
- [ ] Role-based dashboard customization
- [ ] Audit logging for admin actions
- [ ] Advanced analytics and reporting
- [ ] Product analytics from admin dashboard
- [ ] Customer segmentation and insights
- [ ] Admin notification system
