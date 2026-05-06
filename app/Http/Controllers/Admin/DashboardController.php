<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalRevenue = Order::where('status', 'completed')->sum('total');
        $totalOrders = Order::count();
        $totalCustomers = User::where('role', 'customer')->count();
        $totalProducts = Product::count();

        // Sales data for the last 30 days
        $salesData = Order::where('status', 'completed')
            ->whereDate('created_at', '>=', now()->subDays(30))
            ->selectRaw('DATE(created_at) as date, COUNT(*) as orders, SUM(total) as sales')
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Top products
        $topProducts = Product::withCount(['orderItems'])
            ->orderByDesc('order_items_count')
            ->limit(5)
            ->get();

        // Recent orders
        $recentOrders = Order::with('user')
            ->latest()
            ->limit(10)
            ->get();

        $metrics = [
            'total_revenue' => $totalRevenue,
            'total_orders' => $totalOrders,
            'total_customers' => $totalCustomers,
            'total_products' => $totalProducts,
            'average_order_value' => $totalOrders > 0 ? $totalRevenue / $totalOrders : 0,
        ];

        return Inertia::render('admin/dashboard', [
            'metrics' => $metrics,
            'salesData' => $salesData,
            'topProducts' => $topProducts,
            'recentOrders' => $recentOrders,
        ]);
    }
}
