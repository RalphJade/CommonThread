<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query();

        // Search
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Filter by type
        if ($request->has('type') && $request->type !== 'all') {
            $query->where('type', $request->type);
        }

        // Filter by status
        if ($request->has('status')) {
            $query->where('active', $request->status === 'active');
        }

        $products = $query->paginate(15)->appends($request->query());

        return Inertia::render('admin/products/index', [
            'products' => $products,
            'filters' => [
                'search' => $request->get('search', ''),
                'type' => $request->get('type', 'all'),
                'status' => $request->get('status', 'active'),
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/products/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'type' => 'required|string',
            'image_url' => 'nullable|string',
            'active' => 'boolean',
            'featured' => 'boolean',
        ]);

        Product::create($validated);

        return redirect()->route('admin.products.index')->with('success', 'Product created successfully');
    }

    public function edit(Product $product)
    {
        return Inertia::render('admin/products/edit', [
            'product' => $product,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'type' => 'required|string',
            'image_url' => 'nullable|string',
            'active' => 'boolean',
            'featured' => 'boolean',
        ]);

        $product->update($validated);

        return redirect()->route('admin.products.index')->with('success', 'Product updated successfully');
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('admin.products.index')->with('success', 'Product deleted successfully');
    }
}
