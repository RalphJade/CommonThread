<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $cartItems = Cart::where('user_id', $user->id)
            ->with('product')
            ->get();

        $subtotal = $cartItems->sum(fn ($item) => $item->product->price * $item->quantity);
        $tax = $subtotal * 0.1; // 10% tax
        $shipping = $subtotal > 100 ? 0 : 10; // Free shipping over $100
        $total = $subtotal + $tax + $shipping;

        return Inertia::render('cart/index', [
            'cartItems' => $cartItems,
            'subtotal' => $subtotal,
            'tax' => $tax,
            'shipping' => $shipping,
            'total' => $total,
        ]);
    }

    public function add(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'color' => 'nullable|string',
        ]);

        $user = Auth::user();
        $product = Product::findOrFail($validated['product_id']);

        // Check if item already in cart
        $cartItem = Cart::where('user_id', $user->id)
            ->where('product_id', $product->id)
            ->where('selected_color', $validated['color'] ?? null)
            ->first();

        if ($cartItem) {
            $cartItem->quantity += $validated['quantity'];
            $cartItem->save();
        } else {
            Cart::create([
                'user_id' => $user->id,
                'product_id' => $product->id,
                'quantity' => $validated['quantity'],
                'selected_color' => $validated['color'],
            ]);
        }

        return redirect()->back()->with('success', 'Product added to cart!');
    }

    public function update(Request $request, Cart $cartItem)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $this->authorize('update', $cartItem);

        $cartItem->update($validated);

        return redirect()->back()->with('success', 'Cart updated!');
    }

    public function destroy(Cart $cartItem)
    {
        $this->authorize('delete', $cartItem);
        $cartItem->delete();

        return redirect()->back()->with('success', 'Item removed from cart!');
    }

    public function clear()
    {
        $user = Auth::user();
        Cart::where('user_id', $user->id)->delete();

        return redirect()->back()->with('success', 'Cart cleared!');
    }

    public function count()
    {
        $user = Auth::user();
        $count = Cart::where('user_id', $user->id)->sum('quantity');

        return response()->json(['count' => $count]);
    }
}

