<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::with('user', 'items');

        // Filter by status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Search by customer email or order ID
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('id', 'like', "%{$search}%")
                  ->orWhereHas('user', function ($userQuery) use ($search) {
                      $userQuery->where('email', 'like', "%{$search}%");
                  });
            });
        }

        // Sort
        $sort = $request->get('sort', 'recent');
        match($sort) {
            'oldest' => $query->oldest(),
            'highest_value' => $query->orderByDesc('total'),
            'lowest_value' => $query->orderBy('total'),
            default => $query->latest(),
        };

        $orders = $query->paginate(20)->appends($request->query());

        return Inertia::render('admin/orders/index', [
            'orders' => $orders,
            'filters' => [
                'status' => $request->get('status', 'all'),
                'search' => $request->get('search', ''),
                'sort' => $sort,
            ],
        ]);
    }

    public function show(Order $order)
    {
        $order->load('user', 'items');

        return Inertia::render('admin/orders/show', [
            'order' => $order,
        ]);
    }

    public function updateStatus(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,processing,completed,cancelled',
        ]);

        $order->update($validated);

        return redirect()->back()->with('success', 'Order status updated successfully');
    }
}
