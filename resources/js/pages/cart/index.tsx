import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface Product {
    id: number;
    name: string;
    slug: string;
    type?: string;
    color?: string;
    fabric?: string;
    price: number;
}

interface CartItem {
    id: number;
    product_id: number;
    user_id: number;
    quantity: number;
    product: Product;
}

interface Props {
    cartItems: CartItem[];
    cartCount: number;
}

export default function CartIndex({ cartItems }: Props) {
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const subtotal = cartItems.reduce((total, item) => {
        return total + item.product.price * item.quantity;
    }, 0);

    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    const handleUpdateQuantity = (cartItemId: number, quantity: number) => {
        if (quantity <= 0) {
            handleRemoveItem(cartItemId);
            return;
        }

        router.patch(`/cart/${cartItemId}`, { quantity }, {
            preserveScroll: true,
        });
    };

    const handleRemoveItem = (cartItemId: number) => {
        router.delete(`/cart/${cartItemId}`, {
            preserveScroll: true,
        });
    };

    const handleClearCart = () => {
        if (confirm('Are you sure you want to clear your cart?')) {
            router.post('/cart/clear', {}, {
                preserveScroll: true,
            });
        }
    };

    const handleCheckout = () => {
        setIsCheckingOut(true);
        router.post('/checkout', {}, {
            onFinish: () => setIsCheckingOut(false),
        });
    };

    return (
        <>
            <Head title="Shopping Cart" />
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in cart
                        </p>
                    </div>
                    <Link href="/products">
                        <Button variant="outline" gap-2>
                            <ArrowLeft className="w-4 h-4" />
                            Continue Shopping
                        </Button>
                    </Link>
                </div>

                {cartItems.length === 0 ? (
                    <Card>
                        <CardContent className="py-12">
                            <div className="text-center">
                                <p className="text-gray-600 dark:text-gray-400 mb-4">Your cart is empty</p>
                                <Link href="/products">
                                    <Button>Browse Products</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Cart Items */}
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-3">
                                    <CardTitle>Items</CardTitle>
                                    <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        onClick={handleClearCart}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        Clear Cart
                                    </Button>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {cartItems.map((item, index) => (
                                        <div key={item.id}>
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-lg">{item.product.name}</h3>
                                                    {item.product.type && (
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            Type: {item.product.type}
                                                        </p>
                                                    )}
                                                    {item.product.color && (
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            Color: {item.product.color}
                                                        </p>
                                                    )}
                                                    {item.product.fabric && (
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            Fabric: {item.product.fabric}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-2xl font-bold">
                                                        ${(item.product.price * item.quantity).toFixed(2)}
                                                    </p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        ${item.product.price.toFixed(2)} each
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-3 mt-3">
                                                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded">
                                                    <button
                                                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <div className="px-4 py-2 border-l border-r border-gray-300 dark:border-gray-600 text-center min-w-16">
                                                        {item.quantity}
                                                    </div>
                                                    <button
                                                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveItem(item.id)}
                                                    className="ml-auto p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>

                                            {index < cartItems.length - 1 && <Separator className="mt-4" />}
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Order Summary */}
                        <div>
                            <Card className="sticky top-4">
                                <CardHeader>
                                    <CardTitle>Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                                            <span>${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Tax (10%)</span>
                                            <span>${tax.toFixed(2)}</span>
                                        </div>
                                        <Separator />
                                        <div className="flex justify-between text-lg font-bold">
                                            <span>Total</span>
                                            <span>${total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <Button 
                                        onClick={handleCheckout} 
                                        disabled={isCheckingOut}
                                        className="w-full"
                                    >
                                        {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
                                    </Button>

                                    <Link href="/products" className="block">
                                        <Button variant="outline" className="w-full">
                                            Continue Shopping
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

CartIndex.layout = {
    breadcrumbs: [
        {
            title: 'Cart',
            href: '/cart',
        },
    ],
};
