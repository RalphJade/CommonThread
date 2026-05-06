<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::where('active', true);

        // Filter by type
        if ($request->has('type') && $request->type !== 'all') {
            $query->where('type', $request->type);
        }

        // Filter by price range
        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        // Search
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Sort
        $sort = $request->get('sort', 'featured');
        match($sort) {
            'price_low' => $query->orderBy('price', 'asc'),
            'price_high' => $query->orderBy('price', 'desc'),
            'newest' => $query->orderByDesc('created_at'),
            default => $query->where('featured', true)->orderByDesc('created_at'),
        };

        $products = $query->paginate(12)->appends($request->query());

        return Inertia::render('products/index', [
            'products' => $products,
            'filters' => [
                'type' => $request->get('type', 'all'),
                'min_price' => $request->get('min_price', 0),
                'max_price' => $request->get('max_price', 100),
                'search' => $request->get('search', ''),
                'sort' => $sort,
            ],
        ]);
    }

    public function show(Product $product)
    {
        // Get related products of same type
        $related = Product::where('type', $product->type)
            ->where('id', '!=', $product->id)
            ->where('active', true)
            ->limit(4)
            ->get();

        return Inertia::render('products/show', [
            'product' => $product,
            'related' => $related,
        ]);
    }
}

