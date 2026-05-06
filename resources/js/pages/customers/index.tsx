import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
    Calendar, 
    ShoppingBag, 
    Bell, 
    Clock, 
    ChevronRight, 
    Package, 
    Scissors,
    CheckCircle2
} from 'lucide-react';

interface Order {
    id: string;
    item: string;
    status: 'In Queue' | 'Cutting' | 'Fitting' | 'Ready for Pickup';
    date: string;
}

interface Appointment {
    id: number;
    type: string;
    date: string;
    time: string;
}

export default function CustomerPortal() {
    const { auth } = usePage().props as any;

    // Sample data for the client interface
    const activeOrders: Order[] = [
        { id: "ORD-102", item: "Bespoke Navy Blazer", status: "Fitting", date: "May 12, 2024" },
        { id: "ORD-105", item: "Tailored White Poplin Shirt", status: "In Queue", date: "May 15, 2024" }
    ];

    const upcomingFittings: Appointment[] = [
        { id: 1, type: "Final Fitting - Three Piece Suit", date: "May 20, 2024", time: "2:30 PM" }
    ];

    const statusColors: Record<string, string> = {
        'In Queue': 'bg-[#1B2D3C] text-[#6B8994] border-[#3B4B51]',
        'Cutting': 'bg-[#CFBC85]/20 text-[#CFBC85] border-[#CFBC85]/30',
        'Fitting': 'bg-[#BE8C56]/20 text-[#BE8C56] border-[#BE8C56]/30',
        'Ready for Pickup': 'bg-[#A4BF8E]/20 text-[#A4BF8E] border-[#A4BF8E]/30',
    };

    return (
        <>
            <Head title="Client Portal | Common Thread" />
            
            <div className="max-w-6xl mx-auto space-y-8 p-4 md:p-8 text-[#FFFDEB]">
                {/* 1. SEAMLESS INTERFACE: Header & Quick Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tighter uppercase">Welcome, {auth.user.name}</h1>
                        <p className="text-[#CFBE85] mt-1">Manage your bespoke journey and upcoming appointments.</p>
                    </div>
                    <div className="flex gap-3">
                        <Button className="bg-[#BE8C56] text-[#101E29] hover:bg-[#CFBC85] font-bold uppercase tracking-tight">
                            <Calendar className="w-4 h-4 mr-2" />
                            Book a Fitting
                        </Button>
                        <Button variant="outline" className="border-[#3B4B51] text-[#FFFDEB] hover:bg-[#1B2D3C]">
                            <ShoppingBag className="w-4 h-4 mr-2" />
                            New Order
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* 2. NOTIFICATION SYSTEM: Order Status Tracking */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="flex items-center text-xl font-bold uppercase tracking-tight text-[#BE8C56]">
                            <Package className="mr-2 h-5 w-5" /> Active Commissions
                        </h2>
                        
                        {activeOrders.map((order) => (
                            <Card key={order.id} className="bg-[#1B2D3C] border-[#3B4B51] overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-mono text-[#6B8994]">{order.id}</span>
                                                <Badge className={`${statusColors[order.status]} border`}>
                                                    {order.status}
                                                </Badge>
                                            </div>
                                            <h3 className="text-xl font-bold">{order.item}</h3>
                                            <p className="text-sm text-[#6B8994]">Est. Completion: {order.date}</p>
                                        </div>
                                        <Button variant="ghost" className="text-[#CFBE85] hover:text-[#FFFDEB] hover:bg-transparent p-0">
                                            View Progress Details <ChevronRight className="ml-1 h-4 w-4" />
                                        </Button>
                                    </div>
                                    {/* Progress Visualizer */}
                                    <div className="h-2 bg-[#101E29] flex">
                                        <div className="h-full bg-[#BE8C56]" style={{ width: order.status === 'Fitting' ? '75%' : '25%' }} />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* SIDEBAR: Booking & Updates */}
                    <div className="space-y-6">
                        {/* UPCOMING FITTINGS */}
                        <Card className="bg-[#101E29] border-[#BE8C56]/30 border-l-4">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-bold uppercase text-[#BE8C56] flex items-center">
                                    <Clock className="mr-2 h-4 w-4" /> Next Fitting
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {upcomingFittings.map(apt => (
                                    <div key={apt.id} className="space-y-2">
                                        <p className="text-lg font-bold">{apt.type}</p>
                                        <p className="text-[#CFBE85]">{apt.date} at {apt.time}</p>
                                        <Button variant="link" className="text-[#6B8994] p-0 h-auto text-xs uppercase tracking-widest">
                                            Reschedule
                                        </Button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* RECENT NOTIFICATIONS */}
                        <Card className="bg-[#1B2D3C] border-[#3B4B51]">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-bold uppercase text-[#6B8994] flex items-center">
                                    <Bell className="mr-2 h-4 w-4" /> Notifications
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex gap-3 text-sm border-b border-[#101E29] pb-3">
                                    <Scissors className="h-4 w-4 text-[#CFBE85] shrink-0" />
                                    <p><span className="text-[#FFFDEB] font-semibold">Cutting Started:</span> Your White Poplin Shirt has moved to the workshop.</p>
                                </div>
                                <div className="flex gap-3 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-[#A4BF8E] shrink-0" />
                                    <p>Your measurements were updated from your last fitting on May 5th.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

// Ensure it uses the standard AppLayout (not the Admin dashboard one)
CustomerPortal.layout = (page: any) => <AppLayout children={page} />;