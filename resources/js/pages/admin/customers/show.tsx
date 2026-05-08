import AdminLayout from "@/layouts/AdminLayout";
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import { 
    ChevronLeft, 
    Mail, 
    Phone, 
    ShoppingBag, 
    TrendingUp, 
    Clock,
    MapPin
} from 'lucide-react';

interface Order {
    id: number;
    total: number;
    status: string;
    created_at: string;
}

interface Client {
    id: number;
    name: string;
    email: string;
    phone: string;
    status: string;
    orders: Order[];
}

interface Props {
    client: Client;
    metrics: {
        total_orders: number;
        total_spend: number;
    };
}

const statusThemeMap: Record<string, { bg: string, text: string }> = {
    completed: { bg: "#A4BF8E", text: "#101E29" },
    processing: { bg: "#CFBC85", text: "#101E29" },
    pending: { bg: "#6B8994", text: "#FFFDEB" },
};

function ClientShow({ client, metrics }: Props) {
    const formatCurrency = (amount: number) => `₱${amount.toLocaleString()}`;

    return (
        <>
            <Head title={`${client.name} | Client Profile`} />

            <div className="min-h-screen bg-[#101E29] text-[#FFFDEB] p-8 space-y-8">
                
                {/* --- NAVIGATION & ACTIONS --- */}
                <div className="flex items-center justify-between">
                    <Link href={route('admin.customers.index')} className="group flex items-center text-[#6B8994] hover:text-[#CFBE85] transition-colors">
                        <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
                        Back to Directory
                    </Link>
                    <div className="flex gap-3">
                        <Button variant="outline" className="border-[#1B2D3C] bg-transparent text-[#6B8994] hover:bg-[#1B2D3C]">
                            Edit Profile
                        </Button>
                        <Button className="bg-[#BE8C56] text-[#101E29] hover:bg-[#CFBC85] font-bold">
                            Create New Order
                        </Button>
                    </div>
                </div>

                {/* --- CLIENT HEADER --- */}
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="h-24 w-24 rounded-full bg-[#1B2D3C] border-2 border-[#BE8C56] flex items-center justify-center text-3xl font-bold text-[#BE8C56]">
                        {client.name.charAt(0)}
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-4">
                            <h1 className="text-5xl font-extrabold tracking-tighter uppercase">{client.name}</h1>
                            <Badge className="bg-[#A4BF8E] text-[#101E29] font-bold uppercase text-xs px-3">
                                {client.status}
                            </Badge>
                        </div>
                        <div className="flex flex-wrap gap-6 text-[#6B8994]">
                            <span className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#BE8C56]" /> {client.email}</span>
                            <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#BE8C56]" /> {client.phone}</span>
                            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#BE8C56]" /> Zamboanga City, PH</span>
                        </div>
                    </div>
                </div>

                {/* --- KEY METRICS --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-[#1B2D3C] border-[#1B2D3C]">
                        <CardContent className="pt-6">
                            <p className="text-xs font-bold text-[#6B8994] uppercase tracking-widest mb-1">Lifetime Value</p>
                            <h3 className="text-3xl font-bold text-[#BE8C56] flex items-center gap-2">
                                <TrendingUp className="w-6 h-6 text-[#A4BF8E]" />
                                {formatCurrency(metrics.total_spend)}
                            </h3>
                        </CardContent>
                    </Card>
                    <Card className="bg-[#1B2D3C] border-[#1B2D3C]">
                        <CardContent className="pt-6">
                            <p className="text-xs font-bold text-[#6B8994] uppercase tracking-widest mb-1">Total Orders</p>
                            <h3 className="text-3xl font-bold text-[#FFFDEB] flex items-center gap-2">
                                <ShoppingBag className="w-6 h-6 text-[#CFBC85]" />
                                {metrics.total_orders}
                            </h3>
                        </CardContent>
                    </Card>
                    <Card className="bg-[#1B2D3C] border-[#1B2D3C]">
                        <CardContent className="pt-6">
                            <p className="text-xs font-bold text-[#6B8994] uppercase tracking-widest mb-1">Last Purchase</p>
                            <h3 className="text-3xl font-bold text-[#FFFDEB] flex items-center gap-2">
                                <Clock className="w-6 h-6 text-[#6B8994]" />
                                {client.orders[0]?.created_at ? new Date(client.orders[0].created_at).toLocaleDateString() : 'N/A'}
                            </h3>
                        </CardContent>
                    </Card>
                </div>

                {/* --- RECENT ACTIVITY TABLE --- */}
                <Card className="bg-[#1B2D3C] border-[#1B2D3C]">
                    <CardHeader className="border-b border-[#101E29]">
                        <CardTitle className="text-xl font-bold uppercase tracking-tighter">Recent Commissions</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <table className="w-full text-sm">
                            <thead className="text-[#6B8994] uppercase text-xs border-b border-[#101E29]">
                                <tr>
                                    <th className="p-4 text-left px-6">Order ID</th>
                                    <th className="p-4 text-left">Date</th>
                                    <th className="p-4 text-left">Amount</th>
                                    <th className="p-4 text-center">Status</th>
                                    <th className="p-4 text-right px-6">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#101E29]">
                                {client.orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-[#101E29]/50 transition-colors">
                                        <td className="p-4 px-6 font-mono text-[#FFFDEB]/70">#{order.id}</td>
                                        <td className="p-4">{new Date(order.created_at).toLocaleDateString()}</td>
                                        <td className="p-4 text-[#BE8C56] font-bold">{formatCurrency(order.total)}</td>
                                        <td className="p-4 text-center">
                                            <Badge 
                                                style={{ 
                                                    backgroundColor: statusThemeMap[order.status.toLowerCase()]?.bg || '#6B8994', 
                                                    color: statusThemeMap[order.status.toLowerCase()]?.text || '#101E29' 
                                                }}
                                                className="uppercase text-[10px]"
                                            >
                                                {order.status}
                                            </Badge>
                                        </td>
                                        <td className="p-4 text-right px-6">
                                            <Link href={route('admin.orders.show', order.id)} className="text-[#CFBE85] hover:underline text-xs uppercase font-bold">
                                                View Order
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

ClientShow.layout = (page: any) => <AdminLayout children={page} />;

export default ClientShow;