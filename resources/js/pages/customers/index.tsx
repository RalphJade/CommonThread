import { Head, usePage, Link } from '@inertiajs/react';
import { 
    Calendar, 
    ShoppingBag, 
    Bell, 
    Clock, 
    ChevronRight, 
    Package, 
    Scissors,
    CheckCircle2,
    History,
    Ruler // Added Ruler icon
} from 'lucide-react';
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"; 
import AppLayout from '@/layouts/app-layout';

export default function CustomerPortal() {
    const { auth } = usePage().props as any;
    const [selectedDate, setSelectedDate] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // --- HARDCODED SAMPLE DATA ---
    const sampleCommission = {
        id: "ORD-7721",
        item: "Bespoke Midnight Navy Wool Suit",
        status: "Fitting",
        date: "May 28, 2026",
        progress: 75
    };

    // --- HARDCODED PURCHASE HISTORY ---
    const purchaseHistory = [
        {
            id: "ORD-6612",
            date: "April 10, 2026",
            item: "Charcoal Herringbone Overcoat",
            amount: "₱28,500",
            status: "Delivered"
        },
        {
            id: "ORD-5590",
            date: "March 15, 2026",
            item: "Silk Patterned Tie - Bronze",
            amount: "₱4,200",
            status: "Delivered"
        },
        {
            id: "ORD-6389",
            date: "April 12, 2026",
            item: "Grey Plaid Suit",
            amount: "₱28,500",
            status: "Cancelled"
        }
    ];
    const notificationsList = [
        {
            id: 1,
            title: "Cutting Started",
            message: "Your White Poplin Shirt has moved to the workshop.",
            icon: <Scissors className="h-4 w-4 text-[#CFBE85] shrink-0" />,
            time: "2 hours ago"
        },
        {
            id: 2,
            title: "Measurements Updated",
            message: "Profile updated based on your last fitting on May 5th.",
            icon: <Ruler className="h-4 w-4 text-[#A4BF8E] shrink-0" />,
            time: "1 day ago"
        },
        {
            id: 3,
            title: "Ready for Fitting",
            message: "The shell for your Navy Suit is ready for the second fitting.",
            icon: <CheckCircle2 className="h-4 w-4 text-[#BE8C56] shrink-0" />,
            time: "3 days ago"
        }
    ];

    return (
        <>
            <Head title="Client Portal | Common Thread" />
            
            <div className="max-w-6xl mx-auto space-y-8 p-4 md:p-8 text-[#FFFDEB]">
                {/* Header & Quick Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tighter uppercase">Welcome, {auth.user.name}</h1>
                        <p className="text-[#CFBE85] mt-1">Manage your bespoke journey.</p>
                    </div>
                    
                    <div className="flex gap-3">
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-[#BE8C56] text-[#101E29] hover:bg-[#CFBC85] font-bold uppercase tracking-tight">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Book a Fitting
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-[#1B2D3C] border-[#3B4B51] text-[#FFFDEB] sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-bold uppercase tracking-tight">Schedule Fitting</DialogTitle>
                                    <DialogDescription className="text-[#6B8994]">
                                        Select a preferred date for your next session.
                                    </DialogDescription>
                                </DialogHeader>
                                
                                <div className="py-6">
                                    <label className="block text-xs uppercase tracking-widest text-[#6B8994] mb-2">Select Date</label>
                                    <input 
                                        type="date" 
                                        className="w-full bg-[#101E29] border border-[#3B4B51] p-3 rounded-md text-[#FFFDEB] focus:outline-none focus:border-[#BE8C56] color-scheme-dark"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                    <style>{`
                                        input[type="date"]::-webkit-calendar-picker-indicator {
                                            filter: invert(0.8) sepia(1) saturate(5) hue-rotate(10deg);
                                            cursor: pointer;
                                        }
                                    `}</style>
                                </div>

                                <DialogFooter>
                                    <Button 
                                        onClick={() => setIsDialogOpen(false)}
                                        className="w-full bg-[#BE8C56] text-[#101E29] hover:bg-[#CFBC85] font-bold uppercase"
                                        disabled={!selectedDate}
                                    >
                                        Request Appointment
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <Link href="/products">
                            <Button variant="outline" className="border-[#3B4B51] text-[#FFFDEB] hover:bg-[#1B2D3C]">
                                <ShoppingBag className="w-4 h-4 mr-2" />
                                New Order
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Active Commissions */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="flex items-center text-xl font-bold uppercase tracking-tight text-[#BE8C56]">
                            <Package className="mr-2 h-5 w-5" /> Active Commissions
                        </h2>
                        
                        <Card className="bg-[#1B2D3C] border-[#3B4B51] overflow-hidden">
                            <CardContent className="p-0">
                                <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-mono text-[#6B8994]">{sampleCommission.id}</span>
                                            <Badge className="bg-[#BE8C56] text-[#101E29] border-none">
                                                {sampleCommission.status}
                                            </Badge>
                                        </div>
                                        <h3 className="text-xl font-bold">{sampleCommission.item}</h3>
                                        <p className="text-sm text-[#6B8994]">Est. Completion: {sampleCommission.date}</p>
                                    </div>
                                    
                                    <div className="flex flex-col md:items-end gap-2">
                                        <Button variant="ghost" className="text-[#CFBE85] hover:text-[#FFFDEB] hover:bg-transparent p-0 h-auto">
                                            View Progress Details <ChevronRight className="ml-1 h-4 w-4" />
                                        </Button>

                                        {/* Cancel Commission Dialog */}
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <button className="text-[10px] uppercase tracking-widest text-[#6B8994] hover:text-[#BF806C] transition-colors text-left">
                                                    Cancel Commission
                                                </button>
                                            </DialogTrigger>
                                            <DialogContent className="bg-[#101E29] border-[#3B4B51] text-[#FFFDEB]">
                                                <DialogHeader>
                                                    <DialogTitle className="text-2xl font-extrabold uppercase tracking-tighter text-[#BF806C]">
                                                        Terminate Commission?
                                                    </DialogTitle>
                                                    <DialogDescription className="text-[#6B8994] uppercase tracking-widest text-[10px]">
                                                        This action cannot be undone.
                                                    </DialogDescription>
                                                </DialogHeader>

                                                <div className="py-4 space-y-4">
                                                    <p className="text-sm text-[#6B8994] leading-relaxed">
                                                        You are requesting to cancel the <span className="text-[#FFFDEB] font-bold">{sampleCommission.item}</span>. 
                                                        Please note that according to our bespoke terms, deposits for commissions already in the <span className="text-[#BE8C56] font-bold">"{sampleCommission.status}"</span> phase may be non-refundable.
                                                    </p>
                                                </div>

                                                <DialogFooter className="flex flex-col sm:flex-row gap-3">
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" className="border-[#3B4B51] text-[#6B8994] hover:text-[#FFFDEB] uppercase text-[10px]">
                                                            Keep Commission
                                                        </Button>
                                                    </DialogTrigger>
                                                    <Button 
                                                        className="bg-[#BF806C] text-[#FFFDEB] hover:bg-[#a66d5b] font-black uppercase tracking-tighter flex-1"
                                                        onClick={() => console.log("Commission Cancelled:", sampleCommission.id)}
                                                    >
                                                        Confirm Cancellation
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>
                                <div className="h-2 bg-[#101E29] flex">
                                    <div className="h-full bg-[#BE8C56]" style={{ width: `${sampleCommission.progress}%` }} />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-[#1B2D3C] border-[#3B4B51]">
                            <CardHeader>
                                <CardTitle className="flex items-center text-lg text-[#FFFDEB]">
                                    <History className="mr-2 h-5 w-5 text-[#BE8C56]" />
                                    Purchase History
                                </CardTitle>
                                <CardDescription className="text-[#6B8994]">
                                    View your recently completed bespoke items
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Purchase List */}
                                <div className="space-y-3">
                                    {purchaseHistory.map((purchase) => (
                                        <div key={purchase.id} className="flex justify-between items-center p-3 rounded-lg bg-[#101E29]/50 border border-[#3B4B51]/30 group hover:border-[#BE8C56]/50 transition-colors">
                                            <div className="space-y-1">
                                                <p className="text-sm font-bold text-[#FFFDEB] uppercase tracking-tight">{purchase.item}</p>
                                                <div className="flex gap-3 text-[10px] uppercase tracking-widest text-[#6B8994]">
                                                    <span>{purchase.date}</span>
                                                    <span>•</span>
                                                    <span>{purchase.id}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-bold text-[#CFBE85]">{purchase.amount}</p>
                                                    <span className={`text-[10px] uppercase font-bold tracking-tighter ${
                                                        purchase.status === 'Cancelled' 
                                                        ? 'text-[#BF806C]' // Muted Red/Terracotta for Cancelled
                                                        : 'text-[#A4BF8E]' // Green for Delivered
                                                    }`}>
                                                        {purchase.status}
                                                    </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar: Fittings & Notifications */}
                    <div className="space-y-6">
                        <Card className="bg-[#101E29] border-[#BE8C56]/30 border-l-4">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-bold uppercase text-[#BE8C56] flex items-center">
                                    <Clock className="mr-2 h-4 w-4" /> Next Fitting
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <p className="text-lg font-bold">Initial Fitting</p>
                                    <p className="text-[#CFBE85]">May 12, 2026 at 2:00 PM</p>
                                    <Button variant="link" className="text-[#6B8994] p-0 h-auto text-xs uppercase tracking-widest">
                                        Reschedule
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-[#1B2D3C] border-[#3B4B51]">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-bold uppercase text-[#6B8994] flex items-center">
                                    <Bell className="mr-2 h-4 w-4" /> Notifications
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {notificationsList.map((note) => (
                                    <div key={note.id} className="flex gap-3 text-sm border-b border-[#101E29] last:border-0 pb-3 last:pb-0">
                                        {note.icon}
                                        <div className="space-y-1">
                                            <p className="leading-tight">
                                                <span className="text-[#FFFDEB] font-semibold block">{note.title}</span>
                                                {note.message}
                                            </p>
                                            <span className="text-[10px] uppercase text-[#6B8994] tracking-wider">{note.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>   
    );
}

CustomerPortal.layout = (page: any) => <AppLayout children={page} />;