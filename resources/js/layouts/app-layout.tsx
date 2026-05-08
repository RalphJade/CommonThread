import { Link, usePage } from '@inertiajs/react';
import React from 'react';
import { LayoutDashboard, ShoppingBag, Shirt, Bell, CheckCircle, Package, User, LogOut, Menu } from 'lucide-react';

// 1. IMPORT SHADCN DIALOG COMPONENTS
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"; // Adjust this import path based on your setup

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const currentUrlRaw = usePage().url || '';
    const currentUrl = currentUrlRaw.split('?')[0].replace(/\/+$/, '') || '/';

    const navLinks = [
        { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="w-4 h-4 mr-2" /> },
        { name: 'Cart', href: '/cart', icon: <ShoppingBag className="w-4 h-4 mr-2" /> },
        { name: 'Collection', href: '/products', icon: <Shirt className="w-4 h-4 mr-2" /> },
    ];

    const { auth } = usePage().props as any;

    return (
        <div className="min-h-screen bg-[#101E29] text-[#FFFDEB]">
            {/* Custom Navigation Bar */}
            <nav className="border-b border-[#3B4B51] bg-[#101E29]/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                    <div className="flex justify-between h-20 items-center">
                                        <div className="flex items-center gap-8">
                                            <Link href="/" className="flex items-center gap-2">
                                                <span className="text-xl font-black uppercase tracking-tighter text-[#BE8C56]">
                                                    Common<span className="text-[#FFFDEB]">Thread</span>
                                                </span>
                                            </Link>

                                            {/* Desktop Nav */}
                                                <div className="hidden md:flex items-center gap-1">
                                                    {navLinks.map((link) => {
                                                        // 3. ROBUST ACTIVE LOGIC
                                                        const normalizedHref = link.href.replace(/\/+$/, '') || '/';
                                                        
                                                        // Highlights if URL is exactly '/' for Home, 
                                                        // or if the current path starts with the link's path
                                                        const isActive = normalizedHref === '/' 
                                                            ? currentUrl === '/' 
                                                            : currentUrl.startsWith(normalizedHref);

                                                        return (
                                                            <Link 
                                                                key={link.name} 
                                                                href={link.href}
                                                                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all flex items-center ${
                                                                    isActive 
                                                                        ? 'text-[#BE8C56] bg-[#BE8C56]/10 rounded-md' 
                                                                        : 'text-[#6B8994] hover:text-[#FFFDEB]'
                                                                }`}
                                                            >
                                                                {link.icon}
                                                                {link.name}
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                        </div>

                        {/* User Actions */}
                        <div className="flex items-center gap-4">
                            
                            {/* 2. THE NEW SHADCN NOTIFICATION MODAL */}
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button className="relative p-2 text-[#6B8994] hover:text-[#CFBE85] transition-colors">
                                        <Bell className="w-5 h-5" />
                                        {/* Unread Indicator Badge */}
                                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#BF806C] rounded-full animate-pulse"></span>
                                    </button>
                                </DialogTrigger>
                                
                                <DialogContent className="bg-[#1B2D3C] border-[#3B4B51] text-[#FFFDEB] sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle className="text-[#CFBE85] uppercase tracking-widest text-sm">
                                            Notifications
                                        </DialogTitle>
                                        <DialogDescription className="text-[#6B8994] text-xs">
                                            You have 2 new updates regarding your account.
                                        </DialogDescription>
                                    </DialogHeader>
                                    
                                    {/* Hardcoded Sample Notifications */}
                                    <div className="flex flex-col gap-3 py-4">
                                        {/* Sample Item 1 */}
                                        <div className="flex items-start gap-4 p-3 rounded-md bg-[#101E29] border border-[#3B4B51] hover:border-[#CFBE85]/50 transition-colors">
                                            <div className="bg-[#CFBE85]/10 p-2 rounded-full mt-0.5">
                                                <Package className="w-4 h-4 text-[#CFBE85]" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-[#FFFDEB]">Order Shipped</p>
                                                <p className="text-xs text-[#6B8994] mt-1 leading-relaxed">
                                                    Your recent order <span className="text-[#CFBE85]">#CT-8921</span> has left our facility and is on its way.
                                                </p>
                                                <p className="text-[10px] text-[#6B8994]/70 mt-2 uppercase tracking-wider">2 hours ago</p>
                                            </div>
                                        </div>

                                        {/* Sample Item 2 */}
                                        <div className="flex items-start gap-4 p-3 rounded-md bg-[#101E29] border border-[#3B4B51] hover:border-[#CFBE85]/50 transition-colors">
                                            <div className="bg-[#6B8994]/10 p-2 rounded-full mt-0.5">
                                                <CheckCircle className="w-4 h-4 text-[#6B8994]" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-[#FFFDEB]">Profile Updated</p>
                                                <p className="text-xs text-[#6B8994] mt-1 leading-relaxed">
                                                    Your new shipping address has been successfully saved to your profile.
                                                </p>
                                                <p className="text-[10px] text-[#6B8994]/70 mt-2 uppercase tracking-wider">Yesterday</p>
                                            </div>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                            {/* END NOTIFICATION MODAL */}

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

                            {/* LOGOUT BUTTON */}
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