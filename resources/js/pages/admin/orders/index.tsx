import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Search } from 'lucide-react';

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

export default function AdminOrders({ orders, filters }: Props) {
    const [statusFilter, setStatusFilter] = useState(filters.status || 'all');
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [sortFilter, setSortFilter] = useState(filters.sort || 'recent');

    const handleFilterChange = () => {
        router.get(route('admin.orders.index'), {
            status: statusFilter,
            search: searchQuery,
            sort: sortFilter,
        }, { preserveState: true });
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'processing':
                return 'bg-blue-100 text-blue-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <>
            <Head title="Manage Orders" />
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Manage Orders</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        View and manage all customer orders
                    </p>
                </div>

                {/* Filters */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="grid gap-4 md:grid-cols-4">
                            <div>
                                <label className="text-sm font-medium">Search</label>
                                <div className="mt-1 relative">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                                    <input
                                        type="text"
                                        placeholder="Search orders..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onBlur={handleFilterChange}
                                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium">Status</label>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => {
                                        setStatusFilter(e.target.value);
                                        handleFilterChange();
                                    }}
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="all">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="processing">Processing</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-sm font-medium">Sort By</label>
                                <select
                                    value={sortFilter}
                                    onChange={(e) => {
                                        setSortFilter(e.target.value);
                                        handleFilterChange();
                                    }}
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="recent">Most Recent</option>
                                    <option value="oldest">Oldest</option>
                                    <option value="highest_value">Highest Value</option>
                                    <option value="lowest_value">Lowest Value</option>
                                </select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Orders Table */}
                <Card>
                    <CardContent className="pt-6">
                        {orders.data.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-500">No orders found</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-3 px-4 font-medium">Order ID</th>
                                            <th className="text-left py-3 px-4 font-medium">Customer</th>
                                            <th className="text-left py-3 px-4 font-medium">Email</th>
                                            <th className="text-right py-3 px-4 font-medium">Total</th>
                                            <th className="text-center py-3 px-4 font-medium">Status</th>
                                            <th className="text-left py-3 px-4 font-medium">Date</th>
                                            <th className="text-center py-3 px-4 font-medium">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.data.map((order) => (
                                            <tr key={order.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900">
                                                <td className="py-3 px-4 font-mono">#{order.id}</td>
                                                <td className="py-3 px-4">{order.user.name}</td>
                                                <td className="py-3 px-4 text-sm text-gray-500">{order.user.email}</td>
                                                <td className="py-3 px-4 text-right font-semibold">{formatCurrency(order.total)}</td>
                                                <td className="py-3 px-4 text-center">
                                                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(order.status)}`}>
                                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-sm">{formatDate(order.created_at)}</td>
                                                <td className="py-3 px-4 text-center">
                                                    <Link href={route('admin.orders.show', order.id)}>
                                                        <Button size="sm" variant="outline">
                                                            <Eye className="w-4 h-4" />
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

                {/* Pagination */}
                {orders.links && (
                    <div className="flex justify-center gap-2">
                        {orders.links.map((link: any, index: number) => (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                className={`px-3 py-1 rounded ${
                                    link.active
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                }`}
                            >
                                {link.label.replace(/[<>]/g, '')}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
