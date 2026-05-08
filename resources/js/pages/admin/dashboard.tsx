import AdminLayout from "@/layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { LayoutDashboard, ShoppingCart, Package, Users, TrendingUp, AlertCircle, FileText, Search, Printer, Edit } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { JSX } from "react";
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend 
} from 'recharts';


// Theme Colors for Charts
const CHART_COLORS = {
    copper: "#BE8C56",
    amber: "#CFBC85",
    sage: "#A4BF8E",
    slate: "#6B8994",
    terracotta: "#BF806C",
    navy_light: "#1B2D3C"
};

// Mock Data for Charts
const revenueData = [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 48000 },
    { month: 'Apr', revenue: 61000 },
    { month: 'May', revenue: 55000 },
    { month: 'Jun', revenue: 67000 },
];

const categoryData = [
    { name: 'Bespoke Suits', value: 45 },
    { name: 'Essentials', value: 25 },
    { name: 'Fabrics', value: 20 },
    { name: 'Accessories', value: 10 },
];

// Common Thread UI Assets
const commonThreadLogoUrl = "/images/ct-logout.svg"; // Replace with your actual asset path

// Define a richer status mapping for the theme
const statusThemeMap: Record<string, { bg: string, text: string }> = {
    Completed: { bg: "#A4BF8E", text: "#101E29" }, // Heritage Sage Green
    Processing: { bg: "#CFBC85", text: "#101E29" }, // Amber/Bronze Gold
    Cancelled: { bg: "#BF806C", text: "#101E29" }, // Terracotta/Brick Red
};

// ... Rest of interface definitions remain unchanged ...
interface Metric {
    id: number;
    title: string;
    value: string;
    change: string;
    icon: JSX.Element;
    color: string; // Used for subtlety, not overpowering color
}

interface Order {
    id: string;
    customer: string;
    product: string;
    date: string;
    amount: string;
    status: "Completed" | "Processing" | "Cancelled";
}

interface Product {
    id: string;
    name: string;
    sku: string;
    stock: number;
    threshold: number;
}

const metrics: Metric[] = [
    {
        id: 1,
        title: "Total Revenue",
        value: "₱145,280.00",
        change: "+12.5%",
        icon: <TrendingUp className="h-4 w-4" />,
        color: "#BE8C56", // Copper Accent
    },
    {
        id: 2,
        title: "Active Orders",
        value: "28",
        change: "+4.3%",
        icon: <ShoppingCart className="h-4 w-4" />,
        color: "#CFBC85", // Amber Accent
    },
    {
        id: 3,
        title: "New Clients",
        value: "9",
        change: "+2 new this week",
        icon: <Users className="h-4 w-4" />,
        color: "#FFFDEB", // Cream/White
    },
    {
        id: 4,
        title: "Low Stock Items",
        value: "6",
        change: "-2 fixed",
        icon: <AlertCircle className="h-4 w-4" />,
        color: "#BF806C", // Terracotta Alert
    },
];

// ... Other static data remains unchanged ...
const recentOrders: Order[] = [
    { id: "ORD-9981", customer: "Juan Dela Cruz", product: "Bespoke Suit", date: "May 5", amount: "₱12,500", status: "Processing" },
    { id: "ORD-9980", customer: "Maria Santos", product: "Silk Dress", date: "May 4", amount: "₱8,900", status: "Completed" },
    { id: "ORD-9979", customer: "Anton Ramos", product: "Tailored Shirt", date: "May 4", amount: "₱3,200", status: "Processing" },
    { id: "ORD-9978", customer: "Corazon Aquino", product: "Evening Gown Fitting", date: "May 3", amount: "₱15,000", status: "Completed" },
    { id: "ORD-9977", customer: "Ferdinand Marcos Jr.", product: "Executive Blazer", date: "May 3", amount: "₱10,800", status: "Cancelled" },
];

const lowStockProducts: Product[] = [
    { id: "PROD-001", name: "Premium Wool (Navy)", sku: "FAB-001-N", stock: 12, threshold: 20 },
    { id: "PROD-002", name: "Silk Lining (Gold)", sku: "LIN-002-G", stock: 5, threshold: 15 },
    { id: "PROD-003", name: "Classic Buttons (Set)", sku: "BTN-003-C", stock: 100, threshold: 250 },
    { id: "PROD-004", name: "Tailored Shirt (White)", sku: "SHIRT-004-W", stock: 8, threshold: 10 },
];

 function AdminDashboardEnhanced() {
    const [timeRange, setTimeRange] = useState("this_week");

    return (
        <>
            <Head title="Admin Command Center | Common Thread" />

            {/* MAIN BACKGROUND: Rich Deep Navy/Teal derived from the logo */}
            <div className="min-h-screen bg-[#101E29] text-[#FFFDEB]">
                
                {/* --- Main Dashboard Content --- */}
                <main className="p-8 space-y-10">

                    {/* HEADER: Integration of logo and title */}
                    <div className="flex items-center justify-between gap-6 pb-6 border-b border-[#1B2D3C]">
                        <div className="flex items-center gap-6">
                            {/* Visual Logo Integration */}
                            <div className="p-1 rounded-sm border border-[#CFBE85]/20 bg-[#1B2D3C]">
                                <img 
                                    src="/images/ct-logo.svg"
                                    alt="Common Thread Logo Spool" 
                                    className="h-14 w-auto object-contain"
                                />
                            </div>
                            <div>
                                <h1 className="text-4xl font-extrabold tracking-tighter text-[#FFFDEB] uppercase">Admin Dashboard</h1>
                                {/* Description text: Muted Gold */}
                                <p className="text-[#CFBE85] mt-1">Real-time visualization of Commonwealth Apparel sales, inventory, and production.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Input 
                                type="search" 
                                placeholder="Search clients, orders, products..." 
                                className="w-80 bg-[#1B2D3C] border-[#1B2D3C] text-[#FFFDEB] placeholder:text-[#6B8994]/70"
                            />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="gap-2 border-[#CFBE85]/30 text-[#CFBE85] hover:bg-[#CFBE85]/10 hover:text-[#FFFDEB]">
                                        <FileText className="h-4 w-4" />
                                        Generate Report
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-[#101E29] border-[#1B2D3C] text-[#FFFDEB]">
                                    <DropdownMenuItem className="focus:bg-[#1B2D3C]">Sales Performance</DropdownMenuItem>
                                    <DropdownMenuItem className="focus:bg-[#1B2D3C]">Inventory Status</DropdownMenuItem>
                                    <DropdownMenuItem className="focus:bg-[#1B2D3C]">Customer Appointments</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    {/* KPI CARDS: Custom theming */}
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        {metrics.map((metric) => (
                            <Card key={metric.id} className="relative overflow-hidden bg-[#1B2D3C] border-[#1B2D3C] transition-all hover:border-[#BE8C56]/30">
                                {/* Subtle Top-Left Corner Accent - using the icon's defined copper tone */}
                                <div className="absolute top-0 left-0 w-12 h-12 -translate-x-6 -translate-y-6 rotate-45" style={{ backgroundColor: `${metric.color}20` }} />
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium uppercase tracking-wider text-[#6B8994]">
                                        {metric.title}
                                    </CardTitle>
                                    {/* ICON: Now uses the Burned Copper/Bronze accent */}
                                    <div className="p-1.5 rounded-full bg-[#101E29]" style={{ color: "#BE8C56" }}>
                                        {metric.icon}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {/* VALUE: Soft Cream/Ivory */}
                                    <div className="text-3xl font-bold tracking-tighter text-[#FFFDEB]">{metric.value}</div>
                                    <p className="text-xs text-[#CFBE85] mt-1">{metric.change}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* MAIN CONTENT AREA */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        
                        {/* --- ANALYTICS SECTION (NEW) --- */}

                            
                            {/* Area Chart: Revenue Trend */}
                            <Card className="lg:col-span-2 bg-[#1B2D3C] border-[#1B2D3C]">
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold tracking-tighter uppercase">Revenue Performance</CardTitle>
                                    <CardDescription className="text-[#6B8994]">Monthly valuation of fulfilled commissions.</CardDescription>
                                </CardHeader>
                                <CardContent className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={revenueData}>
                                            <defs>
                                                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor={CHART_COLORS.copper} stopOpacity={0.3}/>
                                                    <stop offset="95%" stopColor={CHART_COLORS.copper} stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#101E29" vertical={false} />
                                            <XAxis 
                                                dataKey="month" 
                                                stroke="#6B8994" 
                                                fontSize={12} 
                                                tickLine={false} 
                                                axisLine={false} 
                                            />
                                            <YAxis 
                                                stroke="#6B8994" 
                                                fontSize={12} 
                                                tickLine={false} 
                                                axisLine={false}
                                                tickFormatter={(value) => `₱${value/1000}k`}
                                            />
                                            <Tooltip 
                                                contentStyle={{ backgroundColor: '#101E29', border: '1px solid #1B2D3C', borderRadius: '4px' }}
                                                itemStyle={{ color: '#FFFDEB' }}
                                            />
                                            <Area 
                                                type="monotone" 
                                                dataKey="revenue" 
                                                stroke={CHART_COLORS.copper} 
                                                strokeWidth={3}
                                                fillOpacity={1} 
                                                fill="url(#colorRev)" 
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            {/* Pie Chart: Category Distribution */}
                            <Card className="bg-[#1B2D3C] border-[#1B2D3C]">
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold tracking-tighter uppercase">Service Mix</CardTitle>
                                    <CardDescription className="text-[#6B8994]">Orders by product category.</CardDescription>
                                </CardHeader>
                                <CardContent className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={categoryData}
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                <Cell fill={CHART_COLORS.copper} />
                                                <Cell fill={CHART_COLORS.amber} />
                                                <Cell fill={CHART_COLORS.sage} />
                                                <Cell fill={CHART_COLORS.slate} />
                                            </Pie>
                                            <Tooltip 
                                                contentStyle={{ backgroundColor: '#101E29', border: '1px solid #1B2D3C' }}
                                            />
                                            <Legend verticalAlign="bottom" height={36}/>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
            

                        {/* RECENT ORDERS: Dominant section */}
                        <Card className="xl:col-span-2 bg-[#1B2D3C] border-[#1B2D3C]">
                            <CardHeader className="flex flex-row items-center justify-between gap-4 border-b border-[#101E29]">
                                <div>
                                    <CardTitle className="text-2xl font-bold tracking-tighter uppercase text-[#FFFDEB]">Recent Orders & Fittings</CardTitle>
                                    <CardDescription className="text-[#6B8994]">Latest client purchases and service appointments.</CardDescription>
                                </div>
                                <Button size="sm" className="bg-[#BE8C56] text-[#101E29] hover:bg-[#CFBC85]">
                                    View All Orders
                                </Button>
                            </CardHeader>
                            <CardContent className="p-0">
                                <table className="w-full text-sm">
                                    <thead className="border-b border-[#101E29]">
                                        <tr className="text-left text-[#6B8994] uppercase tracking-wider text-xs">
                                            <th className="p-4 px-6">Order ID</th>
                                            <th className="p-4">Customer</th>
                                            <th className="p-4">Product/Service</th>
                                            <th className="p-4">Date</th>
                                            <th className="p-4">Amount</th>
                                            <th className="p-4 px-6 text-center">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#101E29]">
                                        {recentOrders.map((order) => (
                                            <tr key={order.id} className="hover:bg-[#101E29]/50 transition-colors">
                                                <td className="p-4 px-6 font-mono text-[#FFFDEB]/70">{order.id}</td>
                                                <td className="p-4 text-[#FFFDEB] font-medium">{order.customer}</td>
                                                <td className="p-4 text-[#CFBE85]">{order.product}</td>
                                                <td className="p-4 text-[#CFBE85]/70">{order.date}</td>
                                                <td className="p-4 text-[#BE8C56] font-bold">{order.amount}</td>
                                                <td className="p-4 px-6 text-center">
                                                    {/* Custom Badge styling based on the theme map */}
                                                    <Badge 
                                                        style={{ 
                                                            backgroundColor: statusThemeMap[order.status]?.bg, 
                                                            color: statusThemeMap[order.status]?.text 
                                                        }} 
                                                        className="font-semibold uppercase text-xs"
                                                    >
                                                        {order.status}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </CardContent>
                        </Card>

                        {/* LOW STOCK ALERT: Critical information */}
                        <Card className="bg-[#1B2D3C] border-[#1B2D3C]">
                            <CardHeader className="border-b border-[#101E29]">
                                <CardTitle className="text-2xl font-bold tracking-tighter uppercase text-[#FFFDEB]">Inventory Threshold Alerts</CardTitle>
                                <CardDescription className="text-[#6B8994]">Fabric, components, and apparel items requiring restock.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 pt-6">
                                <div className="space-y-6">
                                    {lowStockProducts.map((product) => (
                                        <div key={product.id} className="flex items-center justify-between gap-4 p-4 rounded-md border border-[#101E29] bg-[#101E29]">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 rounded-md bg-[#1B2D3C] text-[#BE8C56]">
                                                    <Package className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-[#FFFDEB]">{product.name}</p>
                                                    <p className="text-xs font-mono text-[#6B8994]">{product.sku}</p>
                                                    <p className="text-xs text-[#CFBE85] mt-1">Stock Level: <span className="font-bold">{product.stock} / {product.threshold}</span></p>
                                                </div>
                                            </div>
                                            {/* Terracotta/Brick Red alert color for priority actions */}
                                            <Button size="icon" variant="ghost" className="text-[#BF806C] hover:bg-[#BF806C]/10">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                    </div>
                </main>
            </div>
        </>
    );
}
AdminDashboardEnhanced.layout = (page: any) => <AdminLayout children={page} />;

export default AdminDashboardEnhanced;