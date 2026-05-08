import { Head, Link } from '@inertiajs/react';
import { 
    Trash2, 
    Plus, 
    Minus, 
    ArrowLeft, 
    ShoppingBag, 
    Tag, 
    Truck, 
    ShieldCheck 
} from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';

interface Product {
    id: number;
    name: string;
    slug: string;
    type?: string;
    color?: string;
    fabric?: string;
    price: number;
    image?: string;
}

interface CartItem {
    id: number;
    product_id: number;
    user_id: number;
    quantity: number;
    product: Product;
}

// Hardcoded Sample Data to match the "Bespoke" theme
const INITIAL_CART: CartItem[] = [
    {
        id: 1,
        product_id: 101,
        user_id: 1,
        quantity: 1,
        product: {
            id: 101,
            name: "Bespoke Midnight Navy Wool Suit",
            slug: "bespoke-navy-suit",
            type: "Full Commission",
            color: "Midnight Navy",
            fabric: "Super 150s Merino Wool",
            price: 1850.00,
            image: "/images/cart1.png"
        }
    },
    {
        id: 2,
        product_id: 102,
        user_id: 1,
        quantity: 2,
        product: {
            id: 102,
            name: "White Poplin Tailored Shirt",
            slug: "white-poplin-shirt",
            type: "Essentials",
            color: "Pure White",
            fabric: "Egyptian Cotton",
            price: 225.00,
            image: "/images/cart2.png"
        }
    }
];

export default function CartIndex() {
    const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART);
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const subtotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    const handleUpdateQuantity = (id: number, delta: number) => {
        setCartItems(prev => prev.map(item => 
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        ));
    };

    const handleRemoveItem = (id: number) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    return (
        <>
            <Head title="Shopping Bag | Common Thread" />
            
            <div className="max-w-6xl mx-auto space-y-8 p-4 md:p-8 text-[#FFFDEB]">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#3B4B51] pb-6">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tighter uppercase">Your Shopping Bag</h1>
                        <p className="text-[#CFBE85] mt-1 flex items-center gap-2">
                            <ShoppingBag className="w-4 h-4" /> 
                            {cartItems.length} curated pieces selected
                        </p>
                    </div>
                    <Link href="/products">
                        <Button variant="outline" className="border-[#3B4B51] text-[#FFFDEB] hover:bg-[#1B2D3C] uppercase tracking-widest text-xs">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Continue Browsing
                        </Button>
                    </Link>
                </div>

                {cartItems.length === 0 ? (
                    <div className="py-20 text-center space-y-4">
                        <p className="text-[#6B8994] uppercase tracking-[0.2em]">Your bag is currently empty</p>
                        <Link href="/products">
                            <Button className="bg-[#BE8C56] text-[#101E29] hover:bg-[#CFBC85] font-bold uppercase">
                                Explore Collection
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items List */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <Card key={item.id} className="bg-[#1B2D3C] border-[#3B4B51] overflow-hidden group">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col sm:flex-row gap-6">
                        {/* Product Image Section */}
                        <div className="w-full sm:w-32 h-40 bg-[#101E29] border border-[#3B4B51] rounded flex items-center justify-center relative overflow-hidden group">
                            {item.product.image ? (
                                <img 
                                    src={item.product.image} 
                                    alt={item.product.name} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            ) : (
                                <Tag className="text-[#3B4B51] w-8 h-8" />
                            )}
                            
                            {/* Subtle overlay to maintain brand aesthetic */}
                            <div className="absolute inset-0 bg-[#BE8C56]/5 group-hover:bg-transparent transition-colors" />
                        </div>

                                            {/* Details */}
                                            <div className="flex-1 space-y-2">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#BE8C56] font-bold">
                                                            {item.product.type}
                                                        </span>
                                                        <h3 className="text-xl font-bold uppercase tracking-tight">{item.product.name}</h3>
                                                    </div>
                                                    <button 
                                                        onClick={() => handleRemoveItem(item.id)}
                                                        className="text-[#6B8994] hover:text-[#BF806C] transition-colors"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 pt-2">
                                                    <p className="text-xs text-[#6B8994] uppercase tracking-widest">
                                                        Fabric: <span className="text-[#FFFDEB]">{item.product.fabric}</span>
                                                    </p>
                                                    <p className="text-xs text-[#6B8994] uppercase tracking-widest">
                                                        Color: <span className="text-[#FFFDEB]">{item.product.color}</span>
                                                    </p>
                                                </div>

                                                <div className="flex justify-between items-end pt-4">
                                                    {/* Custom Quantity Stepper */}
                                                    <div className="flex items-center bg-[#101E29] border border-[#3B4B51] rounded shadow-inner">
                                                        <button 
                                                            onClick={() => handleUpdateQuantity(item.id, -1)}
                                                            className="p-2 text-[#6B8994] hover:text-[#CFBE85]"
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </button>
                                                        <span className="px-4 py-1 text-sm font-bold border-x border-[#3B4B51] min-w-[3rem] text-center">
                                                            {item.quantity}
                                                        </span>
                                                        <button 
                                                            onClick={() => handleUpdateQuantity(item.id, 1)}
                                                            className="p-2 text-[#6B8994] hover:text-[#CFBE85]"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    <p className="text-2xl font-black text-[#CFBE85]">
                                                        ${(item.product.price * item.quantity).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="space-y-6">
                            <Card className="bg-[#101E29] border-[#BE8C56]/30 border-t-4 sticky top-24">
                                <CardHeader>
                                    <CardTitle className="text-xl font-extrabold uppercase tracking-tighter">Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm uppercase tracking-widest text-[#6B8994]">
                                            <span>Subtotal</span>
                                            <span className="text-[#FFFDEB]">${subtotal.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-sm uppercase tracking-widest text-[#6B8994]">
                                            <span>Bespoke Surcharge (Tax)</span>
                                            <span className="text-[#FFFDEB]">${tax.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-sm uppercase tracking-widest text-[#6B8994]">
                                            <span>Shipping</span>
                                            <span className="text-[#A4BF8E] font-bold">Complimentary</span>
                                        </div>
                                        <Separator className="bg-[#3B4B51]" />
                                        <div className="flex justify-between items-baseline pt-2">
                                            <span className="text-xs uppercase font-bold text-[#BE8C56]">Total Amount</span>
                                            <span className="text-3xl font-black text-[#FFFDEB]">
                                                ${total.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Button 
                                            onClick={() => setIsCheckingOut(true)}
                                            className="w-full bg-[#BE8C56] text-[#101E29] hover:bg-[#CFBC85] font-black uppercase tracking-tighter h-14 text-lg"
                                        >
                                            {isCheckingOut ? "Securing Transaction..." : "Proceed to Checkout"}
                                        </Button>
                                        
                                        {/* Trust Badges */}
                                        <div className="grid grid-cols-2 gap-2 pt-2">
                                            <div className="flex items-center gap-2 text-[10px] text-[#6B8994] uppercase tracking-tighter">
                                                <Truck className="w-3 h-3 text-[#BE8C56]" /> Insured Delivery
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] text-[#6B8994] uppercase tracking-tighter">
                                                <ShieldCheck className="w-3 h-3 text-[#BE8C56]" /> Secure Payment
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Prompt for Fitting */}
                            <div className="p-6 bg-[#1B2D3C] border border-[#3B4B51] rounded-md text-center space-y-3">
                                <p className="text-xs text-[#6B8994] uppercase tracking-[0.2em]">New to our tailors?</p>
                                <p className="text-sm">Bespoke items require a physical fitting session.</p>
                                <Button variant="link" className="text-[#BE8C56] uppercase text-xs font-bold p-0">
                                    Learn about our process
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

CartIndex.layout = (page: any) => <AppLayout children={page} />;