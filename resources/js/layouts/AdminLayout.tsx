import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, ShoppingBag, Package, Users, Settings, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

// Use the same logo path you used in the dashboard
const commonThreadLogoUrl = "/assets/images/Common Thread.png"; 

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { auth } = usePage().props as any;

    // Normalize current URL for reliable "active" link highlighting
    // - strip querystring (?foo=bar)
    // - trim trailing slash (except keep root "/")
    const currentUrlRaw = usePage().url || '';
    const currentUrl = currentUrlRaw.split('?')[0].replace(/\/+$/, '') || '/';

    // Navigation Links
    const navLinks = [
        { name: 'Dashboard', href: '/admin', icon: <LayoutDashboard className="w-4 h-4 mr-2" /> },
        { name: 'Orders', href: '/admin/orders', icon: <ShoppingBag className="w-4 h-4 mr-2" /> },
        { name: 'Inventory', href: '/admin/products', icon: <Package className="w-4 h-4 mr-2" /> },
        { name: 'Clients', href: '/admin/customers', icon: <Users className="w-4 h-4 mr-2" /> },
    ];

    return (
        <div className="min-h-screen bg-[#101E29] text-[#FFFDEB] font-sans">
            {/* TOP NAVIGATION BAR */}
            <header className="sticky top-0 z-50 w-full border-b border-[#1B2D3C] bg-[#101E29]/95 backdrop-blur supports-[backdrop-filter]:bg-[#101E29]/80">
                <div className="flex h-16 items-center px-6 md:px-8 justify-between">
                    
                    {/* Left Side: Logo & Desktop Links */}
                    <div className="flex items-center gap-8">
                        <Link href="/admin" className="flex items-center gap-3 transition-opacity hover:opacity-80">
                            <img src="/images/maninlogo.png" alt="Logo" className="h-8 w-auto" />
                            <span className="hidden lg:inline-block font-bold tracking-widest uppercase text-sm text-[#BE8C56]">
                                Admin
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => {
                                /** * 2. FIXED ACTIVE LOGIC:
                                 * - For 'Dashboard' (/admin), we check for an exact match or an exact match with trailing slash.
                                 * - For others, we check if the current path starts with the href to catch sub-pages (e.g., /admin/orders/1).
                                 */
                                const isActive = link.href === '/admin' 
                                    ? (currentUrl === '/admin' || currentUrl === '/admin/') 
                                    : currentUrl.startsWith(link.href);

                                return (
                                    <Link key={link.name} href={link.href}>
                                        <Button
                                            variant="ghost"
                                            className={`text-sm tracking-wide uppercase transition-colors ${
                                                isActive
                                                    ? 'bg-[#1B2D3C] text-[#BE8C56] border-b-2 border-[#BE8C56] rounded-none' // Added a subtle border for visual confirmation
                                                    : 'text-[#6B8994] hover:bg-[#1B2D3C]/50 hover:text-[#FFFDEB]'
                                            }`}
                                        >
                                            {link.icon}
                                            {link.name}
                                        </Button>
                                    </Link>
                                )
                            })}
                        </nav>
                    </div>

                    {/* Right Side: User Menu & Mobile Toggle */}
                    <div className="flex items-center gap-4">
                        
                        {/* User Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-9 rounded-full border border-[#1B2D3C] bg-[#101E29] px-4 text-[#FFFDEB] hover:bg-[#1B2D3C] hover:text-white">
                                    <span className="text-sm font-medium tracking-wide">{auth?.user?.name || 'Admin User'}</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 bg-[#1B2D3C] border-[#101E29] text-[#FFFDEB]">
                                <DropdownMenuLabel className="text-[#6B8994] uppercase tracking-wider text-xs">My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-[#101E29]" />
                                <DropdownMenuItem className="focus:bg-[#101E29] focus:text-[#BE8C56] cursor-pointer">
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-[#101E29]" />
                                <Link href="/logout" method="post" as="button" className="w-full">
                                    <DropdownMenuItem className="focus:bg-[#BF806C]/20 focus:text-[#BF806C] cursor-pointer">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </Link>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Mobile Menu (Hamburger) */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden text-[#6B8994] hover:text-[#FFFDEB]">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="bg-[#101E29] border-r-[#1B2D3C] text-[#FFFDEB] p-0">
                                <div className="p-6 border-b border-[#1B2D3C]">
                                    <img src={commonThreadLogoUrl} alt="Logo" className="h-10 w-auto mb-4" />
                                </div>
                                <div className="flex flex-col p-4 gap-2">
                                    {navLinks.map((link) => (
                                        <Link key={link.name} href={link.href}>
                                            <Button variant="ghost" className="w-full justify-start text-[#6B8994] hover:bg-[#1B2D3C] hover:text-[#FFFDEB]">
                                                {link.icon}
                                                {link.name}
                                            </Button>
                                        </Link>
                                    ))}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>

            {/* MAIN PAGE CONTENT INJECTED HERE */}
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}