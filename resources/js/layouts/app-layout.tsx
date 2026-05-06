import { Link, usePage } from '@inertiajs/react';
// 1. ADD LogOut TO YOUR IMPORTS
import { ShoppingBag, User, Bell, Menu, LogOut } from 'lucide-react'; 
import React from 'react';

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { auth } = usePage().props as any;

    return (
        <div className="min-h-screen bg-[#101E29] text-[#FFFDEB]">
            {/* Custom Navigation Bar */}
            <nav className="border-b border-[#3B4B51] bg-[#101E29]/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        {/* Logo and Brand */}
                        <div className="flex items-center gap-4">
                            <Link href="/" className="flex items-center gap-3">
                                <div className="p-1 rounded-sm border border-[#CFBE85]/20 bg-[#1B2D3C]">
                                    <img 
                                        src="/images/ct-logo.svg" 
                                        alt="Common Thread" 
                                        className="h-10 w-auto" 
                                    />
                                </div>
                                <span className="text-xl font-extrabold tracking-tighter uppercase hidden sm:block">
                                    Common Thread
                                </span>
                            </Link>
                        </div>

                        {/* Navigation Links */}
                        <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-[#6B8994]">
                            <Link href="/dashboard" className="hover:text-[#BE8C56] transition-colors">Dashboard</Link>
                            <Link href="/cart" className="hover:text-[#BE8C56] transition-colors">Cart</Link>
                            <Link href="/products" className="hover:text-[#BE8C56] transition-colors">Collection</Link>
                        </div>

                        {/* User Actions */}
                        <div className="flex items-center gap-4">
                            <button className="p-2 text-[#6B8994] hover:text-[#CFBE85] transition-colors">
                                <Bell className="w-5 h-5" />
                            </button>
                            <Link 
                                href="/cart" 
                                className="p-2 text-[#6B8994] hover:text-[#CFBE85] transition-colors relative"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-[#BE8C56] rounded-full"></span>
                            </Link>
                            
                            <div className="h-8 w-[1px] bg-[#3B4B51] mx-2"></div>
                            
                            {/* User Profile */}
                            <Link href="/profile" className="flex items-center gap-3 group">
                                <div className="text-right hidden sm:block">
                                    <p className="text-xs font-bold uppercase tracking-tight text-[#FFFDEB]">
                                        {auth?.user?.name || "Client"}
                                    </p>
                                    <p className="text-[10px] text-[#6B8994] uppercase">Client Portal</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-[#1B2D3C] border border-[#BE8C56]/30 flex items-center justify-center group-hover:border-[#BE8C56] transition-all">
                                    <User className="w-5 h-5 text-[#BE8C56]" />
                                </div>
                            </Link>

                            {/* 2. THE NEW LOGOUT BUTTON */}
                            <Link 
                                href="/logout" 
                                method="post" 
                                as="button" 
                                className="p-2 ml-2 text-[#BF806C] hover:text-[#FFFDEB] hover:bg-[#BF806C]/20 rounded-md transition-all group"
                                title="Log Out"
                            >
                                <LogOut className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                            </Link>

                            {/* Mobile Menu */}
                            <button className="md:hidden p-2 text-[#FFFDEB]">
                                <Menu className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="animate-in fade-in duration-500">
                {children}
            </main>

            {/* Footer */}
            <footer className="mt-auto py-12 border-t border-[#3B4B51] bg-[#101E29]">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-xs text-[#6B8994] uppercase tracking-[0.2em]">
                        &copy; {new Date().getFullYear()} Common Thread Fashion. All Rights Reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}