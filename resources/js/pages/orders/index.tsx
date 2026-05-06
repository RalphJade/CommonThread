import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { orders as ordersRoute } from '@/routes';
import { formatDate } from '@/lib/date-utils';
import { Eye, Printer, Download } from 'lucide-react';

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
    };
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
}

interface Props {
    orders: {
        data: Order[];
        links?: {
            first: string;
            last: string;
            prev: string | null;
            next: string | null;
        };
        meta?: {
            current_page: number;
            from: number;
            last_page: number;
            path: string;
            per_page: number;
            to: number;
            total: number;
        };
    };
}

const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
    confirmed: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
    shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
    delivered: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
};

export default function OrdersIndex({ orders }: Props) {
    return (
        <>
            <Head title="My Orders" />
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Order History</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        View and track all your orders from Common Thread Apparel.
                    </p>
                </div>

                {orders.data.length === 0 ? (
                    <Card>
                        <CardContent className="py-12">
                            <div className="text-center">
                                <p className="text-gray-600 dark:text-gray-400 mb-4">No orders yet</p>
                                <Link href="/products">
                                    <Button>Start Shopping</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {orders.data.map((order) => (
                            <Card key={order.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <CardTitle className="text-lg">
                                                    Order #{order.order_number}
                                                </CardTitle>
                                                <Badge className={statusColors[order.status]}>
                                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                </Badge>
                                            </div>
                                            <CardDescription>
                                                Placed on {formatDate(order.created_at)} • Updated {formatDate(order.updated_at)}
                                            </CardDescription>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold">
                                                ${order.total_amount.toFixed(2)}
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {order.items?.length || 0} item{order.items?.length !== 1 ? 's' : ''}
                                            </p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {order.items && order.items.length > 0 && (
                                            <div className="border-t pt-3">
                                                <p className="text-sm font-semibold mb-2">Items:</p>
                                                <ul className="space-y-1 text-sm">
                                                    {order.items.map((item) => (
                                                        <li key={item.id} className="text-gray-700 dark:text-gray-300">
                                                            {item.product?.name} × {item.quantity}
                                                            {item.unit_price > 0 && (
                                                                <span className="text-gray-600 dark:text-gray-400">
                                                                    {' '}(${item.unit_price.toFixed(2)} each)
                                                                </span>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        <div className="flex gap-2 pt-3">
                                            <Link href={`/orders/${order.id}`} className="flex-1">
                                                <Button variant="outline" className="w-full gap-2">
                                                    <Eye className="w-4 h-4" />
                                                    View Details
                                                </Button>
                                            </Link>
                                            <Link href={`/orders/${order.id}/print`} className="flex-1">
                                                <Button variant="outline" className="w-full gap-2">
                                                    <Printer className="w-4 h-4" />
                                                    Print
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

OrdersIndex.layout = {
    breadcrumbs: [
        {
            title: 'Orders',
            href: ordersRoute(),
        },
    ],
};
