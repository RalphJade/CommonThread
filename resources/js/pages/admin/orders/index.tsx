import { Head, Link, router } from '@inertiajs/react';
import { Eye, Search, Filter, ArrowUpDown } from 'lucide-react';
import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import AdminLayout from "@/layouts/AdminLayout";


// Common Thread Theme Mapping
const statusThemeMap: Record<string, { bg: string, text: string }> = {
    completed: { bg: "#A4BF8E", text: "#101E29" }, // Heritage Sage Green
    processing: { bg: "#CFBC85", text: "#101E29" }, // Amber/Bronze Gold
    pending: { bg: "#6B8994", text: "#FFFDEB" },    // Muted Slate/Steel
    cancelled: { bg: "#BF806C", text: "#101E29" },  // Terracotta/Brick Red
};

interface Order {
    id: number;
    total: number;
    status: string;
    created_at: string;
    user: {
        name: string;
        email: string;
    };
}

interface Props {
    orders: {
        data: Order[];
        links: any;
        meta: any;
    };
    filters: {
        status: string;
        search: string;
        sort: string;
    };
}

// Hardcoded sample orders for admin preview/demo.
// Used only when backend data is empty/missing.
const sampleOrders: Order[] = [
    {
        id: 1001,
        total: 12500,
        status: "Pending",
        created_at: "2026-04-28T09:15:00Z",
        user: { name: "Alyssa Romero", email: "alyssa.romero@example.com" },
    },
    {
        id: 1002,
        total: 38900,
        status: "Processing",
        created_at: "2026-04-30T13:42:00Z",
        user: { name: "Mark Sebastian", email: "mark.sebastian@example.com" },
    },
    {
        id: 1003,
        total: 7400,
        status: "Completed",
        created_at: "2026-05-01T06:05:00Z",
        user: { name: "Jade Santos", email: "jade.santos@example.com" },
    },
    {
        id: 1004,
        total: 16250,
        status: "Cancelled",
        created_at: "2026-05-03T17:22:00Z",
        user: { name: "Noah Reyes", email: "noah.reyes@example.com" },
    },
    {
        id: 1005,
        total: 20999,
        status: "Processing",
        created_at: "2026-05-06T11:30:00Z",
        user: { name: "Sofia Bautista", email: "sofia.bautista@example.com" },
    },
];

function AdminOrders({ orders, filters }: Props) {
    const [statusFilter, setStatusFilter] = useState(filters.status || 'all');
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [sortFilter, setSortFilter] = useState(filters.sort || 'recent');

    const displayedOrders =
        orders?.data && Array.isArray(orders.data) && orders.data.length > 0
            ? orders.data
            : sampleOrders;

    const handleFilterChange = () => {
        router.get('/admin/orders', {
            status: statusFilter,
            search: searchQuery,
            sort: sortFilter,
        }, { preserveState: true });
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const formatCurrency = (amount: number) => `₱${amount.toLocaleString()}`;

    return (
        <>
            <Head title="Order Management | Common Thread" />

            <div className="min-h-screen bg-[#101E29] text-[#FFFDEB] p-8 space-y-10">
                
                {/* --- HEADER --- */}
                <div className="flex items-center justify-between gap-6 pb-6 border-b border-[#1B2D3C]">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tighter uppercase">Order Ledger</h1>
                        <p className="text-[#CFBE85] mt-1">Manage client commissions, fittings, and fulfillment status.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B8994]" />
                            <Input 
                                type="search" 
                                placeholder="Search client or order ID..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onBlur={handleFilterChange}
                                className="w-80 bg-[#1B2D3C] border-[#1B2D3C] pl-10 text-[#FFFDEB] placeholder:text-[#6B8994]/70"
                            />
                        </div>
                    </div>
                </div>

                {/* --- FILTERS --- */}
                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="bg-[#1B2D3C] border-[#1B2D3C]">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-medium uppercase tracking-wider text-[#6B8994] flex items-center gap-2">
                                <Filter className="h-3 w-3" /> Status Filter
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <select
                                value={statusFilter}
                                onChange={(e) => {
                                    setStatusFilter(e.target.value);
                                    handleFilterChange();
                                }}
                                className="w-full bg-[#101E29] border-[#1B2D3C] text-[#FFFDEB] rounded-md py-2 px-3 focus:ring-1 focus:ring-[#BE8C56]"
                            >
                                <option value="all">All Statuses</option>
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#1B2D3C] border-[#1B2D3C]">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-medium uppercase tracking-wider text-[#6B8994] flex items-center gap-2">
                                <ArrowUpDown className="h-3 w-3" /> Sort Sequence
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <select
                                value={sortFilter}
                                onChange={(e) => {
                                    setSortFilter(e.target.value);
                                    handleFilterChange();
                                }}
                                className="w-full bg-[#101E29] border-[#1B2D3C] text-[#FFFDEB] rounded-md py-2 px-3 focus:ring-1 focus:ring-[#BE8C56]"
                            >
                                <option value="recent">Most Recent</option>
                                <option value="oldest">Oldest</option>
                                <option value="highest_value">Highest Value</option>
                                <option value="lowest_value">Lowest Value</option>
                            </select>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#1B2D3C] border-[#BE8C56]/20">
                        <CardContent className="pt-6 flex flex-col justify-center h-full">
                            <p className="text-xs text-[#6B8994] uppercase tracking-widest">Total Results</p>
                            <p className="text-3xl font-bold text-[#FFFDEB]">
                                {orders?.meta?.total || displayedOrders.length}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* --- ORDERS TABLE --- */}
                <Card className="bg-[#1B2D3C] border-[#1B2D3C] overflow-hidden">
                    <CardHeader className="border-b border-[#101E29]">
                        <CardTitle className="text-xl font-bold tracking-tighter uppercase text-[#FFFDEB]">Transaction History</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        {displayedOrders.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-[#6B8994]">No transactions found matching your criteria.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="border-b border-[#101E29]">
                                        <tr className="text-left text-[#6B8994] uppercase tracking-wider text-xs">
                                            <th className="p-4 px-6">ID</th>
                                            <th className="p-4">Customer Details</th>
                                            <th className="p-4">Placement Date</th>
                                            <th className="p-4">Valuation</th>
                                            <th className="p-4 text-center">Status</th>
                                            <th className="p-4 px-6 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#101E29]">
                                        {displayedOrders.map((order) => (
                                            <tr key={order.id} className="hover:bg-[#101E29]/50 transition-colors group">
                                                <td className="p-4 px-6 font-mono text-[#FFFDEB]/70">#{order.id}</td>
                                                <td className="p-4">
                                                    <div className="font-medium text-[#FFFDEB]">{order.user.name}</div>
                                                    <div className="text-xs text-[#6B8994]">{order.user.email}</div>
                                                </td>
                                                <td className="p-4 text-[#CFBE85]">{formatDate(order.created_at)}</td>
                                                <td className="p-4 text-[#BE8C56] font-bold">{formatCurrency(order.total)}</td>
                                                <td className="p-4 text-center">
                                                    <Badge 
                                                        style={{ 
                                                            backgroundColor: statusThemeMap[order.status.toLowerCase()]?.bg || '#6B8994', 
                                                            color: statusThemeMap[order.status.toLowerCase()]?.text || '#101E29' 
                                                        }} 
                                                        className="font-semibold uppercase text-[10px] px-2 py-0.5"
                                                    >
                                                        {order.status}
                                                    </Badge>
                                                </td>
                                                <td className="p-4 px-6 text-right">
                                                    <Link href={`/admin/orders/${order.id}`}>
                                                        <Button size="sm" variant="ghost" className="text-[#CFBE85] hover:bg-[#BE8C56]/10 hover:text-[#FFFDEB]">
                                                            <Eye className="w-4 h-4 mr-2" /> Details
                                                        </Button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* --- PAGINATION --- */}
                {orders.links && orders.links.length > 3 && (
                    <div className="flex justify-center gap-2 pt-4">
                        {orders.links.map((link: any, index: number) => (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-widest transition-all ${
                                    link.active
                                        ? 'bg-[#BE8C56] text-[#101E29]'
                                        : 'bg-[#1B2D3C] text-[#6B8994] hover:text-[#FFFDEB] hover:bg-[#1B2D3C]/80'
                                } ${!link.url ? 'opacity-30 cursor-not-allowed' : ''}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

// Ensure layout is preserved correctly
AdminOrders.layout = (page: any) => <AdminLayout children={page} />;

export default AdminOrders;