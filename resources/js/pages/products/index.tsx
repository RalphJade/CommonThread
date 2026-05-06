import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { 
    Search, 
    Filter, 
    ShoppingBag, 
    ChevronRight,
    Scissors,
    ArrowRight
} from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Product {
    id: string;
    name: string;
    category: string;
    price: string;
    image: string;
    description: string;
    tag?: string;
}

export default function ProductCollection() {
    // Curated collection data for the client storefront
    const collection: Product[] = [
        { 
            id: "1", 
            name: "The Midnight Navy", 
            category: "Bespoke Suit", 
            price: "₱45,000", 
            image: "/images/midnightnavy.png",
            description: "High-twist wool from Savile Row mills, featuring a modern silhouette and functional cuffs.",
            tag: "Bestseller"
        },
        { 
            id: "2", 
            name: "Forest Green Tweed", 
            category: "Signature Series", 
            price: "₱38,500", 
            image: "/images/forestgreentweed.png",
            description: "A versatile powerhouse for the modern professional. Structured shoulders and tapered trousers."
        },
        { 
            id: "3", 
            name: "Burgundy Velvet Maroon", 
            category: "Seasonal", 
            price: "₱38,000", 
            image: "/images/burgundy.png",
            description: "Breathable Italian linen construction, perfect for destination weddings and tropical climates.",
            tag: "New Arrival"
        },
        { 
            id: "4", 
            name: "Brown Cognac Tweed", 
            category: "Evening Wear", 
            price: "₱32,000", 
            image: "/images/cognac.png",
            description: "Peak lapel tuxedo with silk-satin details and a custom bronze lining for a heritage touch."
        },
    ];

    return (
        <>
            <Head title="Our Collection | Common Thread" />

            <div className="bg-[#101E29] min-h-screen text-[#FFFDEB]">
                {/* Hero Section / Header */}
                <div className="relative h-[40vh] flex items-center justify-center overflow-hidden border-b border-[#3B4B51]">
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    {/* Placeholder for a high-end background image like in your landing page */}
                    <div className="absolute inset-0 bg-[url('/images/hero-suits.jpg')] bg-cover bg-center grayscale-[0.5]" />
                    
                    <div className="relative z-20 text-center px-4">
                        <Badge variant="outline" className="mb-4 border-[#BE8C56] text-[#BE8C56] uppercase tracking-[0.3em] px-4 py-1">
                            The Pursuit of Excellence
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter uppercase mb-2">The Collection</h1>
                        <p className="text-[#CFBE85] text-lg max-w-2xl mx-auto font-light">
                            Traditional Savile Row craftsmanship met with contemporary silhouettes. 
                            Woven for the modern professional.
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto p-8 space-y-12">
                    {/* Browse & Search Bar */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex gap-8 text-sm font-bold uppercase tracking-widest text-[#6B8994]">
                            <button className="text-[#BE8C56] border-b border-[#BE8C56] pb-1">All Items</button>
                            <button className="hover:text-[#FFFDEB] transition-colors">Bespoke</button>
                            <button className="hover:text-[#FFFDEB] transition-colors">Essentials</button>
                            <button className="hover:text-[#FFFDEB] transition-colors">Accessories</button>
                        </div>
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B8994]" />
                            <Input 
                                placeholder="Find your fit..." 
                                className="pl-10 bg-[#1B2D3C] border-[#3B4B51] text-[#FFFDEB] placeholder:text-[#6B8994] focus:ring-[#BE8C56]"
                            />
                        </div>
                    </div>

                    {/* Collection Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {collection.map((item) => (
                            <Card key={item.id} className="bg-[#1B2D3C] border-[#3B4B51] overflow-hidden group transition-all duration-500 hover:translate-y-[-8px]">
                                <CardContent className="p-0 relative aspect-[3/4] overflow-hidden bg-[#101E29]">
                                    {item.tag && (
                                        <div className="absolute top-4 left-4 z-20">
                                            <span className="bg-[#BE8C56] text-[#101E29] text-[10px] font-black uppercase px-2 py-1 tracking-tighter">
                                                {item.tag}
                                            </span>
                                        </div>
                                    )}
                                    {/* Placeholder for product image */}
                                    {/* Actual Product Image */}
                                    <img 
                                        src={item.image} 
                                        alt={item.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-[#101E29]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-6 text-center">
                                        <p className="text-sm text-[#CFBE85] mb-4 italic">"{item.description}"</p>
                                        <Button className="bg-[#BE8C56] text-[#101E29] font-bold uppercase text-xs tracking-widest">
                                            Quick View
                                        </Button>
                                    </div>
                                </CardContent>
                                <CardFooter className="p-6 flex flex-col items-start gap-2">
                                    <div className="flex justify-between w-full items-start">
                                        <div>
                                            <p className="text-[10px] text-[#6B8994] uppercase tracking-[0.2em]">{item.category}</p>
                                            <h3 className="text-xl font-bold uppercase tracking-tight group-hover:text-[#BE8C56] transition-colors">
                                                {item.name}
                                            </h3>
                                        </div>
                                        <p className="text-[#BE8C56] font-bold">{item.price}</p>
                                    </div>
                                    <button className="mt-4 flex items-center text-[10px] font-black uppercase tracking-widest text-[#FFFDEB] group/btn">
                                        Details <ArrowRight className="ml-2 w-3 h-3 transition-transform group-hover/btn:translate-x-2" />
                                    </button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    {/* Bespoke Call to Action */}
                    <div className="bg-[#1B2D3C] border border-[#BE8C56]/30 p-12 rounded-sm flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="max-w-xl">
                            <h2 className="text-3xl font-extrabold uppercase tracking-tighter mb-4">Nothing beats the Bespoke Experience</h2>
                            <p className="text-[#6B8994]">Can't find exactly what you're looking for? Schedule a session with our master tailors to design a suit that is uniquely yours.</p>
                        </div>
                        <Button className="bg-[#BE8C56] text-[#101E29] hover:bg-[#CFBC85] px-8 py-6 text-lg font-black uppercase tracking-tighter shrink-0">
                            <ShoppingBag className="mr-2 h-5 w-5" /> Book Your Fitting
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

// Use the Customer App Layout
ProductCollection.layout = (page: any) => <AppLayout children={page} />;