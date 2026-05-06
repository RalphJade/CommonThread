<?php

use Inertia\Inertia;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

// Public routes
Route::inertia('/', 'landing', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

//login and register  
Route::get('/login', function () {
    // This looks inside resources/js/pages/ for auth/login.tsx
    return Inertia::render('auth/login'); 
})->name('login');

Route::get('/register', function () {
    // This looks inside resources/js/pages/ for auth/register.tsx
    return Inertia::render('auth/register'); 
})->name('register');


// Customer Product routes (public)
Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');

// Customer authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Customer Dashboard
Route::get('/dashboard', function () {
    // If an admin lands here, reroute them to the admin dashboard
    if (auth()->user()->role === 'admin') {
        return redirect()->route('admin.dashboard'); 
    }

    // Otherwise, load the normal customer dashboard
    return Inertia::render('customers/index', [
    'customers' => auth()->user(), // or whatever data the page needs
]); 
})->middleware(['auth', 'verified'])->name('Welcome');

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
        Route::get('{order}/print', [OrderController::class, 'printOrder'])->name('print');
    });

    // Checkout
    Route::post('/checkout', [OrderController::class, 'checkout'])->name('orders.checkout');
});

// Admin authenticated routes
Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    // Admin Dashboard
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
});

require __DIR__.'/settings.php';

