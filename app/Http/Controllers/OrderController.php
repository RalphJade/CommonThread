<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $orders = Order::where('user_id', $user->id)
            ->with('items')
            ->orderByDesc('created_at')
            ->paginate(10);

        return Inertia::render('orders/index', [
            'orders' => $orders,
        ]);
    }

    public function show(Order $order)
    {
        $this->authorize('view', $order);

        $order->load('items');

        return Inertia::render('orders/show', [
            'order' => $order,
        ]);
    }

    public function checkout(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email',
            'customer_phone' => 'nullable|string|max:20',
            'shipping_address' => 'required|string|max:255',
            'shipping_city' => 'required|string|max:100',
            'shipping_state' => 'required|string|max:100',
            'shipping_zip' => 'required|string|max:20',
            'shipping_country' => 'required|string|max:100',
            'notes' => 'nullable|string',
        ]);

        $user = Auth::user();

        // Get cart items
        $cartItems = Cart::where('user_id', $user->id)
            ->with('product')
            ->get();

        if ($cartItems->isEmpty()) {
            return redirect()->route('cart.index')->with('error', 'Cart is empty!');
        }

        try {
            DB::beginTransaction();

            // Calculate totals
            $subtotal = $cartItems->sum(fn ($item) => $item->product->price * $item->quantity);
            $tax = round($subtotal * 0.1, 2); // 10% tax
            $shipping = $subtotal > 100 ? 0 : 10; // Free shipping over $100
            $total = $subtotal + $tax + $shipping;

            // Create order
            $order = Order::create([
                'user_id' => $user->id,
                'order_number' => 'ORD-' . strtoupper(uniqid()),
                'status' => 'pending',
                'subtotal' => $subtotal,
                'tax' => $tax,
                'shipping' => $shipping,
                'total' => $total,
                'customer_name' => $validated['customer_name'],
                'customer_email' => $validated['customer_email'],
                'customer_phone' => $validated['customer_phone'],
                'shipping_address' => $validated['shipping_address'],
                'shipping_city' => $validated['shipping_city'],
                'shipping_state' => $validated['shipping_state'],
                'shipping_zip' => $validated['shipping_zip'],
                'shipping_country' => $validated['shipping_country'],
                'notes' => $validated['notes'],
            ]);

            // Create order items
            foreach ($cartItems as $cartItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $cartItem->product->id,
                    'quantity' => $cartItem->quantity,
                    'product_name' => $cartItem->product->name,
                    'price' => $cartItem->product->price,
                    'selected_color' => $cartItem->selected_color,
                ]);
            }

            // Clear cart
            Cart::where('user_id', $user->id)->delete();

            DB::commit();

            return redirect()->route('orders.show', $order)->with('success', 'Order placed successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Failed to create order: ' . $e->getMessage());
        }
    }

    public function printOrder(Order $order)
    {
        $this->authorize('view', $order);
        $order->load('items');

        return Inertia::render('orders/print', [
            'order' => $order,
        ]);
    }
}

