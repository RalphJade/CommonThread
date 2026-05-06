import { useState, useEffect } from 'react';
import { Bell, X, Check, AlertCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface Notification {
    id: string;
    type: 'success' | 'error' | 'info' | 'warning';
    title: string;
    message: string;
    timestamp: Date;
    read: boolean;
    actionUrl?: string;
}

interface NotificationCenterProps {
    notifications?: Notification[];
    onNotificationRead?: (id: string) => void;
    onNotificationDismiss?: (id: string) => void;
}

const notificationIcons = {
    success: <Check className="w-4 h-4 text-green-600" />,
    error: <AlertCircle className="w-4 h-4 text-red-600" />,
    info: <Info className="w-4 h-4 text-blue-600" />,
    warning: <AlertCircle className="w-4 h-4 text-yellow-600" />,
};

const notificationColors = {
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
};

/**
 * NotificationCenter Component
 * Displays a list of notifications with different types and actions
 */
export function NotificationCenter({ 
    notifications = [], 
    onNotificationRead,
    onNotificationDismiss,
}: NotificationCenterProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        setUnreadCount(notifications.filter(n => !n.read).length);
    }, [notifications]);

    const handleNotificationClick = (notification: Notification) => {
        if (!notification.read && onNotificationRead) {
            onNotificationRead(notification.id);
        }
        if (notification.actionUrl) {
            window.location.href = notification.actionUrl;
        }
    };

    const handleDismiss = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (onNotificationDismiss) {
            onNotificationDismiss(id);
        }
    };

    return (
        <div className="relative">
            {/* Notification Bell Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                title="Notifications"
            >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {/* Notification Dropdown */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-slate-950 rounded-lg shadow-xl border border-gray-200 dark:border-gray-800 z-50">
                    {/* Header */}
                    <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                        <h3 className="font-semibold text-lg">Notifications</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Notification List */}
                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-8 text-center text-gray-600 dark:text-gray-400">
                                <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p>No notifications yet</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-200 dark:divide-gray-800">
                                {notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        onClick={() => handleNotificationClick(notification)}
                                        className={`p-4 cursor-pointer transition-colors ${
                                            notificationColors[notification.type]
                                        } ${!notification.read ? 'opacity-100' : 'opacity-75'}`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="mt-0.5">
                                                {notificationIcons[notification.type]}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between">
                                                    <p className="font-semibold text-sm">{notification.title}</p>
                                                    <button
                                                        onClick={(e) => handleDismiss(e, notification.id)}
                                                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 ml-2 flex-shrink-0"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                                    {notification.message}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                                    {formatTime(notification.timestamp)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                        <div className="p-3 border-t border-gray-200 dark:border-gray-800 text-center">
                            <Button variant="ghost" size="sm" className="w-full text-xs">
                                View All Notifications
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

/**
 * Toast Notification Component
 * Displays temporary notifications in the corner of the screen
 */
interface ToastProps {
    notification: Notification;
    onDismiss: () => void;
}

export function Toast({ notification, onDismiss }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(onDismiss, 5000);
        return () => clearTimeout(timer);
    }, [onDismiss]);

    return (
        <div className={`p-4 rounded-lg shadow-lg border ${notificationColors[notification.type]} flex items-center gap-3 animate-in fade-in slide-in-from-right-1/2 duration-300`}>
            <div>{notificationIcons[notification.type]}</div>
            <div className="flex-1">
                <p className="font-semibold text-sm">{notification.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{notification.message}</p>
            </div>
            <button
                onClick={onDismiss}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}

/**
 * Order Status Notification Component
 * Specialized component for order-related notifications
 */
interface OrderNotificationProps {
    orderNumber: string;
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
    timestamp?: Date;
}

export function OrderStatusNotification({ orderNumber, status, timestamp = new Date() }: OrderNotificationProps) {
    const statusMessages = {
        pending: 'Your order has been received and is being processed.',
        confirmed: 'Your order has been confirmed and will be prepared soon.',
        shipped: 'Your order has been shipped and is on its way!',
        delivered: 'Your order has been delivered. Thank you for shopping!',
        cancelled: 'Your order has been cancelled.',
    };

    const statusTypes = {
        pending: 'info' as const,
        confirmed: 'success' as const,
        shipped: 'info' as const,
        delivered: 'success' as const,
        cancelled: 'error' as const,
    };

    return (
        <Notification
            id={`order-${orderNumber}-${Date.now()}`}
            type={statusTypes[status]}
            title={`Order #${orderNumber} - ${status.charAt(0).toUpperCase() + status.slice(1)}`}
            message={statusMessages[status]}
            timestamp={timestamp}
            read={false}
            actionUrl={`/orders/${orderNumber}`}
        />
    );
}

/**
 * Standalone Notification Component
 */
interface NotificationProps {
    id: string;
    type: 'success' | 'error' | 'info' | 'warning';
    title: string;
    message: string;
    timestamp: Date;
    read: boolean;
    actionUrl?: string;
}

export function Notification({
    id,
    type,
    title,
    message,
    timestamp,
    read,
    actionUrl,
}: NotificationProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(false), 7000);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <Card
            className={`p-4 ${notificationColors[type]} border cursor-pointer transition-opacity hover:opacity-80`}
            onClick={() => {
                if (actionUrl) window.location.href = actionUrl;
            }}
        >
            <div className="flex items-start gap-3">
                <div className="mt-0.5">{notificationIcons[type]}</div>
                <div className="flex-1">
                    <p className="font-semibold text-sm">{title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{formatTime(timestamp)}</p>
                </div>
            </div>
        </Card>
    );
}

// Utility function to format time
function formatTime(date: Date): string {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
}
