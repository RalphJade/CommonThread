import { Head } from '@inertiajs/react';
import { BarChart3, TrendingUp, Users, Package, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface SalesData {
    date: string;
    sales: number;
    orders: number;
}

interface CustomerData {
    month: string;
    new_customers: number;
    total_customers: number;
}

interface ProductPerformance {
    id: number;
    name: string;
    units_sold: number;
    revenue: number;
    growth_rate: number;
}

interface Props {
    salesData: SalesData[];
    customerData: CustomerData[];
    topProducts: ProductPerformance[];
    metrics: {
        total_revenue: number;
        total_orders: number;
        average_order_value: number;
        customer_satisfaction: number;
        conversion_rate: number;
        repeat_customer_rate: number;
    };
}

export default function ReportsPage({ salesData, customerData, topProducts, metrics }: Props) {
    const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;
    const formatPercent = (value: number) => `${(value * 100).toFixed(1)}%`;

    return (
        <>
            <Head title="Reports & Analytics" />
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Comprehensive insights into your business performance
                        </p>
                    </div>
                    <Button gap-2>
                        <Download className="w-4 h-4" />
                        Export Report
                    </Button>
                </div>

                {/* Key Performance Indicators */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Key Performance Indicators</h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{formatCurrency(metrics.total_revenue)}</div>
                                <p className="text-xs text-green-600 mt-1">↑ 12% from last month</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{metrics.total_orders}</div>
                                <p className="text-xs text-green-600 mt-1">↑ 8% from last month</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">AOV</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{formatCurrency(metrics.average_order_value)}</div>
                                <p className="text-xs text-green-600 mt-1">↑ 3% from last month</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{formatPercent(metrics.conversion_rate)}</div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Overall rate</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Repeat Rate</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{formatPercent(metrics.repeat_customer_rate)}</div>
                                <p className="text-xs text-green-600 mt-1">↑ 5% from last month</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{(metrics.customer_satisfaction * 100).toFixed(0)}%</div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Rating</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Sales Trend */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Sales Trend</CardTitle>
                            <CardDescription>Last 30 days of sales data</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {salesData.map((data, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <div className="w-24 text-sm text-gray-600 dark:text-gray-400">
                                            {data.date}
                                        </div>
                                        <div className="flex-1">
                                            <div className="h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded opacity-80" style={{
                                                width: `${(data.sales / Math.max(...salesData.map(d => d.sales))) * 100}%`
                                            }} />
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold">{formatCurrency(data.sales)}</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{data.orders} orders</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Customer Growth */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Customer Growth</CardTitle>
                            <CardDescription>Monthly customer acquisition</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {customerData.map((data, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <div className="w-20 text-sm text-gray-600 dark:text-gray-400">
                                            {data.month}
                                        </div>
                                        <div className="flex-1">
                                            <div className="h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded opacity-80" style={{
                                                width: `${(data.new_customers / Math.max(...customerData.map(d => d.new_customers))) * 100}%`
                                            }} />
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold">+{data.new_customers}</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">Total: {data.total_customers}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Top Products Performance */}
                <Card>
                    <CardHeader>
                        <CardTitle>Top Products by Revenue</CardTitle>
                        <CardDescription>Best performing products this month</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-200 dark:border-gray-800">
                                        <th className="text-left py-3 px-4 font-semibold">Product</th>
                                        <th className="text-right py-3 px-4 font-semibold">Units Sold</th>
                                        <th className="text-right py-3 px-4 font-semibold">Revenue</th>
                                        <th className="text-right py-3 px-4 font-semibold">Growth</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topProducts.map((product) => (
                                        <tr key={product.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                                            <td className="py-3 px-4">{product.name}</td>
                                            <td className="text-right py-3 px-4">{product.units_sold}</td>
                                            <td className="text-right py-3 px-4 font-semibold">{formatCurrency(product.revenue)}</td>
                                            <td className="text-right py-3 px-4">
                                                <Badge className={product.growth_rate >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                                    {product.growth_rate >= 0 ? '↑' : '↓'} {Math.abs(product.growth_rate).toFixed(1)}%
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Sales by Category */}
                <div className="grid gap-6 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Top Product Types</CardTitle>
                            <CardDescription>Sales breakdown by product category</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    { name: 'Two-Piece Suits', percentage: 45, value: '$12,500' },
                                    { name: 'Three-Piece Formal', percentage: 30, value: '$8,300' },
                                    { name: 'Double Breasted', percentage: 15, value: '$4,100' },
                                    { name: 'Evening Wear', percentage: 10, value: '$2,800' },
                                ].map((category, index) => (
                                    <div key={index}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium">{category.name}</span>
                                            <span className="text-sm font-semibold">{category.value}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                                                style={{ width: `${category.percentage}%` }}
                                            />
                                        </div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                            {category.percentage}% of total sales
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Performance Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Performance Summary</CardTitle>
                            <CardDescription>This month vs last month</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    { metric: 'Revenue Growth', current: '+12%', status: 'positive' },
                                    { metric: 'Order Growth', current: '+8%', status: 'positive' },
                                    { metric: 'Customer Growth', current: '+6%', status: 'positive' },
                                    { metric: 'Average Order Value', current: '+3%', status: 'positive' },
                                    { metric: 'Cart Abandonment', current: '-2%', status: 'positive' },
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <span className="text-sm">{item.metric}</span>
                                        <Badge className={item.status === 'positive' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                            {item.current}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

ReportsPage.layout = {
    breadcrumbs: [
        {
            title: 'Reports',
            href: '/reports',
        },
    ],
};
