import { Head, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface OrderItem {
    id: number;
    product_id: number;
    quantity: number;
    price: number;
    product?: {
        name: string;
    };
}

interface Order {
    id: number;
    status: string;
    total: number;
    created_at: string;
    updated_at: string;
    user: {
        name: string;
        email: string;
    };
    items: OrderItem[];
}

export default function AdminOrderShow({ order }: { order: Order }) {
    const { data, setData, patch, processing } = useForm({
        status: order.status,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('admin.orders.update-status', order.id));
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
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

    const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1; // Assuming 10% tax
    const total = subtotal + tax;

    return (
        <>
            <Head title={`Order #${order.id}`} />
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <a href={route('admin.orders.index')} className="p-2 hover:bg-gray-100 rounded">
                        <ArrowLeft className="w-5 h-5" />
                    </a>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Order #{order.id}</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Placed on {formatDate(order.created_at)}
                        </p>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Order Details */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Customer Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Customer Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-500">Name</p>
                                        <p className="font-medium">{order.user.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="font-medium">{order.user.email}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Order Items */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Items</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left py-2 font-medium">Product</th>
                                                <th className="text-center py-2 font-medium">Quantity</th>
                                                <th className="text-right py-2 font-medium">Price</th>
                                                <th className="text-right py-2 font-medium">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.items.map((item) => (
                                                <tr key={item.id} className="border-b">
                                                    <td className="py-2">{item.product?.name || `Product #${item.product_id}`}</td>
                                                    <td className="py-2 text-center">{item.quantity}</td>
                                                    <td className="py-2 text-right">{formatCurrency(item.price)}</td>
                                                    <td className="py-2 text-right font-semibold">{formatCurrency(item.price * item.quantity)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Order Summary */}
                                <div className="mt-6 space-y-2 text-right">
                                    <div className="flex justify-end gap-4">
                                        <span>Subtotal:</span>
                                        <span>{formatCurrency(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-end gap-4">
                                        <span>Tax (10%):</span>
                                        <span>{formatCurrency(tax)}</span>
                                    </div>
                                    <div className="flex justify-end gap-4 font-bold text-lg pt-2 border-t">
                                        <span>Total:</span>
                                        <span>{formatCurrency(total)}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Order Status */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Status</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500 mb-2">Current Status</p>
                                    <p className={`inline-block px-3 py-1 rounded font-medium ${getStatusColor(order.status)}`}>
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium block mb-2">Update Status</label>
                                        <select
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="processing">Processing</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                    <Button type="submit" className="w-full" disabled={processing}>
                                        {processing ? 'Updating...' : 'Update Status'}
                                    </Button>
                                </form>

                                <div className="pt-4 border-t">
                                    <p className="text-xs text-gray-500">
                                        Last updated: {formatDate(order.updated_at)}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
