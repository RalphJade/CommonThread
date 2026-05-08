<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * Show orders index page
     */
    public function index()
    {
        $orders = Auth::user()->orders()
            ->with('items')
            ->latest()
            ->paginate(10);

        return Inertia::render('Orders/Index', [
            'orders' => [
                'data' => $orders->items(),
                'links' => [
                    'first' => $orders->url(1),
                    'last' => $orders->url($orders->lastPage()),
                    'prev' => $orders->previousPageUrl(),
                    'next' => $orders->nextPageUrl(),
                ],
                'meta' => [
                    'current_page' => $orders->currentPage(),
                    'from' => $orders->firstItem(),
                    'last_page' => $orders->lastPage(),
                    'path' => $orders->path(),
                    'per_page' => $orders->perPage(),
                    'to' => $orders->lastItem(),
                    'total' => $orders->total(),
                ],
            ],
        ]);
    }

    /**
     * Show single order details
     */
    public function show(Order $order)
    {
        // Authorize user can only view their own orders
        $this->authorize('view', $order);

        return Inertia::render('Orders/Show', [
            'order' => $order->load('items'),
        ]);
    }

    /**
     * Handle checkout
     */
    public function checkout(Request $request)
    {
        $validated = $request->validate([
            'cart_items' => 'required|array',
            'shipping_address' => 'required|string',
        ]);

        // Your checkout logic here
        // Create order, clear cart, etc.

        return redirect()->route('orders.index');
    }
}