<?php

use Inertia\Inertia;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CustomerPortalController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Admin\CustomerController as AdminCustomerController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

// Public routes
Route::inertia('/', 'landing', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

// Login and register  
Route::get('/login', function () {
    return Inertia::render('auth/login'); 
})->name('login');

Route::get('/register', function () {
    return Inertia::render('auth/register'); 
})->name('register');

// Customer Product routes (public)
Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');

/**
 * 1. TRAFFIC CONTROLLER
 * This intercepts the default 'dashboard' name used by Fortify/Breeze 
 * and redirects based on user role.
 */
Route::get('/dashboard', function () {
    // Check for the admin role
    if (auth()->user()->isAdmin()) { 
        return redirect()->intended('/admin');
    }
    
    // Non-admins go to the client portal
    return redirect()->route('customer.portal');
})->middleware(['auth', 'verified'])->name('dashboard');

// Ensure your customer route is named differently to avoid confusion
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/client-portal', [CustomerPortalController::class, 'show'])->name('customer.portal');
});


// Customer authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    
    // 2. RENAMED CUSTOMER PORTAL ROUTE
    // We rename this to avoid the 'dashboard' conflict
    Route::get('/client-portal', [CustomerPortalController::class, 'show'])->name('customer.portal');

    // Customer Cart routes
    Route::prefix('cart')->name('cart.')->group(function () {
        Route::get('/', [CartController::class, 'index'])->name('index');
        Route::post('add', [CartController::class, 'add'])->name('add');
        Route::patch('{cartItem}', [CartController::class, 'update'])->name('update');
        Route::delete('{cartItem}', [CartController::class, 'destroy'])->name('destroy');
        Route::post('clear', [CartController::class, 'clear'])->name('clear');
        Route::get('count', [CartController::class, 'count'])->name('count');
    });

    // Customer Order routes
    Route::prefix('orders')->name('orders.')->group(function () {
        Route::get('/', [OrderController::class, 'index'])->name('index');
        Route::get('{order}', [OrderController::class, 'show'])->name('show');
        Route::post('checkout', [OrderController::class, 'checkout'])->name('checkout');
    });
});

// Admin authenticated routes
Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    // Admin Dashboard
    // Access via: your-site.com/admin
    Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');
    Route::inertia('dashboard-alt', 'admin/dashboard-alt')->name('dashboard-alt');
    Route::inertia('dashboard-enhanced', 'admin/enhanced-dashboard')->name('dashboard-enhanced');

    // Admin Product Management
    Route::prefix('products')->name('products.')->group(function () {
        Route::get('/', [AdminProductController::class, 'index'])->name('index');
        Route::get('create', [AdminProductController::class, 'create'])->name('create');
        Route::post('/', [AdminProductController::class, 'store'])->name('store');
        Route::get('{product}/edit', [AdminProductController::class, 'edit'])->name('edit');
        Route::patch('{product}', [AdminProductController::class, 'update'])->name('update');
        Route::delete('{product}', [AdminProductController::class, 'destroy'])->name('destroy');
    });

    // Admin Order Management
    Route::prefix('orders')->name('orders.')->group(function () {
        Route::get('/', [AdminOrderController::class, 'index'])->name('index');
        Route::get('{order}', [AdminOrderController::class, 'show'])->name('show');
        Route::patch('{order}/status', [AdminOrderController::class, 'updateStatus'])->name('update-status');
    });
    //Clients
        Route::prefix('customers')->name('customers.')->group(function () {
        Route::get('/', [AdminCustomerController::class, 'index'])->name('index');
        Route::get('{customer}', [AdminCustomerController::class, 'show'])->name('show');
        Route::patch('{customer}/status', [AdminCustomerController::class, 'updateStatus'])->name('update-status');
    });
});

require __DIR__.'/settings.php';