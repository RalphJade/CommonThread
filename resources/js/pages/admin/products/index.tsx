import { Head } from "@inertiajs/react";
import { 
    Package, 
    Plus, 
    Search, 
    Filter, 
    MoreHorizontal, 
    Edit, 
    Trash2, 
    ExternalLink,
    AlertTriangle,
    Layers
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import AdminLayout from "@/layouts/AdminLayout";

interface Product {
    id: string;
    name: string;
    category: string;
    sku: string;
    price: string;
    stock: number;
    status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export default function ProductIndex() {
    // Sample high-end product data
    const products: Product[] = [
        { id: "1", name: "Midnight Navy Wool Suit", category: "Bespoke", sku: "CT-BS-001", price: "₱45,000", stock: 12, status: 'In Stock' },
        { id: "2", name: "Egyptian Cotton Shirt (White)", category: "Essentials", sku: "CT-ES-042", price: "₱4,500", stock: 3, status: 'Low Stock' },
        { id: "3", name: "Bronze Silk Lining", category: "Fabric", sku: "CT-FB-009", price: "₱1,200/m", stock: 0, status: 'Out of Stock' },
        { id: "4", name: "Charcoal Grey Overcoat", category: "Outerwear", sku: "CT-OW-015", price: "₱28,500", stock: 5, status: 'In Stock' },
    ];

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'In Stock': return 'bg-[#A4BF8E]/20 text-[#A4BF8E] border-[#A4BF8E]/30';
            case 'Low Stock': return 'bg-[#CFBC85]/20 text-[#CFBC85] border-[#CFBC85]/30';
            case 'Out of Stock': return 'bg-[#BF806C]/20 text-[#BF806C] border-[#BF806C]/30';
            default: return 'bg-[#1B2D3C] text-[#6B8994]';
        }
    };

    return (
        <>
            <Head title="Inventory Management | Common Thread" />

            <div className="p-8 space-y-8 bg-[#101E29] min-h-screen text-[#FFFDEB]">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#1B2D3C]">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tighter uppercase">Product Inventory</h1>
                        <p className="text-[#CFBE85] mt-1">Manage your curated collections, fabrics, and bespoke offerings.</p>
                    </div>
                    <Button className="bg-[#BE8C56] text-[#101E29] hover:bg-[#CFBC85] font-bold uppercase tracking-tight">
                        <Plus className="w-4 h-4 mr-2" /> Add New Product
                    </Button>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B8994]" />
                        <Input 
                            placeholder="Search products, SKUs, or categories..." 
                            className="pl-10 bg-[#1B2D3C] border-[#1B2D3C] text-[#FFFDEB] placeholder:text-[#6B8994]/70 focus:ring-[#BE8C56]"
                        />
                    </div>
                    <Button variant="outline" className="border-[#3B4B51] text-[#FFFDEB] hover:bg-[#1B2D3C]">
                        <Filter className="w-4 h-4 mr-2" /> Filter
                    </Button>
                </div>

                {/* Products Table Card */}
                <Card className="bg-[#1B2D3C] border-[#1B2D3C] overflow-hidden">
                    <CardHeader className="border-b border-[#101E29]">
                        <div className="flex items-center gap-2">
                            <Layers className="h-5 w-5 text-[#BE8C56]" />
                            <CardTitle className="text-xl font-bold uppercase tracking-tight">Stock Overview</CardTitle>
                        </div>
                        <CardDescription className="text-[#6B8994]">Showing {products.length} registered items in the system.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-[#101E29]/50">
                                    <tr className="text-left text-[#6B8994] uppercase tracking-widest text-xs">
                                        <th className="p-4 px-6">Product</th>
                                        <th className="p-4">SKU</th>
                                        <th className="p-4">Category</th>
                                        <th className="p-4">Price</th>
                                        <th className="p-4">Stock</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4 px-6 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#101E29]">
                                    {products.map((product) => (
                                        <tr key={product.id} className="hover:bg-[#101E29]/30 transition-colors group">
                                            <td className="p-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded bg-[#101E29] border border-[#3B4B51] flex items-center justify-center">
                                                        <Package className="h-5 w-5 text-[#6B8994] group-hover:text-[#BE8C56] transition-colors" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-[#FFFDEB]">{product.name}</p>
                                                        <p className="text-[10px] text-[#6B8994] uppercase">ID: {product.id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 font-mono text-[#6B8994]">{product.sku}</td>
                                            <td className="p-4">
                                                <span className="text-[#CFBE85]">{product.category}</span>
                                            </td>
                                            <td className="p-4 text-[#BE8C56] font-bold">{product.price}</td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <span className={product.stock <= 5 ? "text-[#BF806C] font-bold" : "text-[#FFFDEB]"}>
                                                        {product.stock}
                                                    </span>
                                                    {product.stock <= 5 && <AlertTriangle className="h-3 w-3 text-[#BF806C]" />}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <Badge className={`${getStatusStyles(product.status)} border rounded-sm font-semibold uppercase text-[10px]`}>
                                                    {product.status}
                                                </Badge>
                                            </td>
                                            <td className="p-4 px-6 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0 text-[#6B8994] hover:text-[#FFFDEB]">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="bg-[#1B2D3C] border-[#3B4B51] text-[#FFFDEB]">
                                                        <DropdownMenuItem className="focus:bg-[#101E29] flex items-center">
                                                            <Edit className="w-3 h-3 mr-2" /> Edit Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="focus:bg-[#101E29] flex items-center">
                                                            <ExternalLink className="w-3 h-3 mr-2" /> View on Store
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="focus:bg-[#101E29] text-[#BF806C] flex items-center">
                                                            <Trash2 className="w-3 h-3 mr-2" /> Remove Product
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
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

// Attach the AdminLayout for consistent sidebar navigation
ProductIndex.layout = (page: any) => <AdminLayout children={page} />;