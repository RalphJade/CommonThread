import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Printer, Download } from 'lucide-react';
import { formatDate } from '@/lib/date-utils';

interface OrderItem {
    id: number;
    product_id: number;
    order_id: number;
    quantity: number;
    unit_price: number;
    created_at: string;
    product?: {
        id: number;
        name: string;
        type?: string;
        color?: string;
        fabric?: string;
    };
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface Order {
    id: number;
    order_number: string;
    user_id: number;
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
    total_amount: number;
    created_at: string;
    updated_at: string;
    items?: OrderItem[];
    user?: User;
}

interface Props {
    order: Order;
}

const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
    confirmed: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
    shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
    delivered: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
};

const statusTimeline = [
    { status: 'pending', label: 'Order Placed' },
    { status: 'confirmed', label: 'Confirmed' },
    { status: 'shipped', label: 'Shipped' },
    { status: 'delivered', label: 'Delivered' },
];

export default function OrderShow({ order }: Props) {
    const currentStatusIndex = statusTimeline.findIndex(s => s.status === order.status);

    return (
        <>
            <Head title={`Order #${order.order_number}`} />
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/orders">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Orders
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold">Order #{order.order_number}</h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Placed on {formatDate(order.created_at)}
                            </p>
                        </div>
                    </div>
                    <Badge className={statusColors[order.status]}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Order Status Timeline */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Status Timeline</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {statusTimeline.map((step, index) => {
                                        const isActive = index <= currentStatusIndex;
                                        const isCompleted = index < currentStatusIndex;

                                        return (
                                            <div key={step.status} className="flex items-start gap-4">
                                                <div className="flex flex-col items-center">
                                                    <div
                                                        className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                                                            isActive
                                                                ? 'bg-green-500 border-green-500 text-white'
                                                                : 'border-gray-300 dark:border-gray-600'
                                                        }`}
                                                    >
                                                        {isCompleted ? '✓' : step.status.charAt(0).toUpperCase()}
                                                    </div>
                                                    {index < statusTimeline.length - 1 && (
                                                        <div
                                                            className={`w-0.5 h-12 mt-2 ${
                                                                index < currentStatusIndex
                                                                    ? 'bg-green-500'
                                                                    : 'bg-gray-300 dark:bg-gray-600'
                                                            }`}
                                                        />
                                                    )}
                                                </div>
                                                <div className="pt-2">
                                                    <p className="font-semibold">{step.label}</p>
                                                    {isActive && (
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            {formatDate(order.updated_at)}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Order Items */}
                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle>Order Items</CardTitle>
                                <CardDescription>
                                    {order.items?.length || 0} item{order.items?.length !== 1 ? 's' : ''} in this order
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {order.items && order.items.length > 0 ? (
                                        order.items.map((item, index) => (
                                            <div key={item.id}>
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold">{item.product?.name}</h3>
                                                        {item.product?.type && (
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                Type: {item.product.type}
                                                            </p>
                                                        )}
                                                        {item.product?.color && (
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                Color: {item.product.color}
                                                            </p>
                                                        )}
                                                        {item.product?.fabric && (
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                Fabric: {item.product.fabric}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-semibold">${item.unit_price.toFixed(2)}</p>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            Qty: {item.quantity}
                                                        </p>
                                                    </div>
                                                </div>
                                                {index < order.items!.length - 1 && <Separator className="mt-4" />}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-600 dark:text-gray-400">No items in this order.</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar - Order Summary & Actions */}
                    <div className="space-y-6">
                        {/* Order Summary */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                                    <span>${order.total_amount.toFixed(2)}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-semibold text-lg">
                                    <span>Total</span>
                                    <span>${order.total_amount.toFixed(2)}</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Customer Info */}
                        {order.user && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Customer Info</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Name</p>
                                        <p className="font-semibold">{order.user.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                                        <p className="font-semibold break-all">{order.user.email}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Actions */}
                        <div className="space-y-2">
                            <Link href={`/orders/${order.id}/print`} className="block">
                                <Button variant="outline" className="w-full gap-2">
                                    <Printer className="w-4 h-4" />
                                    Print Order
                                </Button>
                            </Link>
                            <Button variant="outline" className="w-full gap-2" onClick={() => window.print()}>
                                <Download className="w-4 h-4" />
                                Download PDF
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

OrderShow.layout = {
    breadcrumbs: [
        {
            title: 'Orders',
            href: '/orders',
        },
        {
            title: 'Order Details',
            href: '#',
        },
    ],
};
