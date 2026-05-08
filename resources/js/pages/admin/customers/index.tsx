import { Head, Link, router } from '@inertiajs/react';
import { Eye, Search, UserPlus, Mail, Phone, Calendar } from 'lucide-react';
import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import AdminLayout from "@/layouts/AdminLayout";

// Common Thread Client Status Mapping
const clientStatusMap: Record<string, { bg: string, text: string }> = {
    active: { bg: "#A4BF8E", text: "#101E29" },   // Heritage Sage
    lead: { bg: "#CFBC85", text: "#101E29" },     // Amber Gold
    inactive: { bg: "#6B8994", text: "#FFFDEB" }, // Muted Slate
};

interface Client {
    id: number;
    name: string;
    email: string;
    phone: string;
    last_order_date: string;
    status: 'active' | 'lead' | 'inactive';
    total_spend: number;
}

// Hardcoded Sample Data for Clients
const sampleClients: Client[] = [
    { id: 1, name: "James Bond", email: "james@example.com", phone: "+63 917 123 4567", last_order_date: "2026-05-01", status: "active", total_spend: 45000 },
    { id: 2, name: "Maria Santos", email: "m.santos@tailor.ph", phone: "+63 918 987 6543", last_order_date: "2026-04-15", status: "active", total_spend: 12800 },
    { id: 3, name: "Anton Ramos", email: "anton.r@business.com", phone: "+63 905 555 1212", last_order_date: "2026-05-04", status: "lead", total_spend: 0 },
    { id: 4, name: "Corazon Aquino", email: "cory@heritage.org", phone: "+63 922 111 2222", last_order_date: "2026-03-20", status: "inactive", total_spend: 85200 },
];

interface Props {
    clients?: {
        data: Client[];
    };
}

function ClientList({ clients }: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    
    // Fallback to sample data if no props are passed from Laravel
    const displayClients = clients?.data && clients.data.length > 0 ? clients.data : sampleClients;

    const formatCurrency = (amount: number) => `₱${amount.toLocaleString()}`;

    return (
        <>
            <Head title="Client Directory | Common Thread" />

            <div className="min-h-screen bg-[#101E29] text-[#FFFDEB] p-8 space-y-10">
                
                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#1B2D3C]">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tighter uppercase">Client Directory</h1>
                        <p className="text-[#CFBE85] mt-1">Manage your relationship database and bespoke profiles.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B8994]" />
                            <Input 
                                type="search" 
                                placeholder="Search by name or email..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-80 bg-[#1B2D3C] border-[#1B2D3C] pl-10 text-[#FFFDEB] placeholder:text-[#6B8994]/70"
                            />
                        </div>
                        <Button className="bg-[#BE8C56] text-[#101E29] hover:bg-[#CFBC85] font-bold uppercase tracking-wider text-xs">
                            <UserPlus className="w-4 h-4 mr-2" /> Add Client
                        </Button>
                    </div>
                </div>

                {/* --- CLIENTS TABLE --- */}
                <Card className="bg-[#1B2D3C] border-[#1B2D3C] overflow-hidden">
                    <CardHeader className="border-b border-[#101E29] bg-[#1B2D3C]/50">
                        <CardTitle className="text-xl font-bold tracking-tighter uppercase text-[#FFFDEB]">Registered Clients</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="border-b border-[#101E29]">
                                    <tr className="text-left text-[#6B8994] uppercase tracking-wider text-xs">
                                        <th className="p-4 px-6">Client Identity</th>
                                        <th className="p-4">Contact Information</th>
                                        <th className="p-4">Last Activity</th>
                                        <th className="p-4">Total Value</th>
                                        <th className="p-4 text-center">Status</th>
                                        <th className="p-4 px-6 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#101E29]">
                                    {displayClients.map((client) => (
                                        <tr key={client.id} className="hover:bg-[#101E29]/50 transition-colors group">
                                            <td className="p-4 px-6">
                                                <div className="font-bold text-[#FFFDEB] text-base">{client.name}</div>
                                                <div className="text-xs font-mono text-[#6B8994]">CID-{client.id.toString().padStart(4, '0')}</div>
                                            </td>
                                            <td className="p-4 space-y-1">
                                                <div className="flex items-center text-xs text-[#CFBE85]">
                                                    <Mail className="w-3 h-3 mr-2 opacity-70" /> {client.email}
                                                </div>
                                                <div className="flex items-center text-xs text-[#6B8994]">
                                                    <Phone className="w-3 h-3 mr-2 opacity-70" /> {client.phone}
                                                </div>
                                            </td>
                                            <td className="p-4 text-[#FFFDEB]/80">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-3 h-3 text-[#BE8C56]" />
                                                    {client.last_order_date || 'No orders yet'}
                                                </div>
                                            </td>
                                            <td className="p-4 text-[#BE8C56] font-bold text-lg">
                                                {formatCurrency(client.total_spend)}
                                            </td>
                                            <td className="p-4 text-center">
                                                <Badge 
                                                    style={{ 
                                                        backgroundColor: clientStatusMap[client.status]?.bg, 
                                                        color: clientStatusMap[client.status]?.text 
                                                    }} 
                                                    className="font-bold uppercase text-[10px] px-2.5 py-0.5"
                                                >
                                                    {client.status}
                                                </Badge>
                                            </td>
                                            <td className="p-4 px-6 text-right">
                                                <Button size="sm" variant="ghost" className="text-[#CFBE85] hover:bg-[#BE8C56]/10 hover:text-[#FFFDEB]">
                                                    <Eye className="w-4 h-4 mr-2" /> Profile
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

// Consistent Layout Assignment
ClientList.layout = (page: any) => <AdminLayout children={page} />;

export default ClientList;