<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'type',
        'price',
        'color',
        'available_colors',
        'quantity',
        'image',
        'featured',
        'active',
    ];

    protected $casts = [
        'available_colors' => 'array',
        'price' => 'decimal:2',
        'featured' => 'boolean',
        'active' => 'boolean',
    ];

    public function cartItems(): HasMany
    {
        return $this->hasMany(Cart::class);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
