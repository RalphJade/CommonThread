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
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [confirmingProduct, setConfirmingProduct] = useState<Product | null>(null);
    const [isOrderComplete, setIsOrderComplete] = useState(false); // Optional: for a success state
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
        { 
            id: "5", 
            name: "Highland Forest Plaid", 
            category: "Bespoke Suiting", 
            price: "₱42,000", 
            image: "/images/model4.png",
            description: "A rugged yet refined green and navy plaid suit featuring soft shoulders and a modern slim-tapered trouser."
        },
        { 
            id: "6", 
            name: "Harvest Gold Velvet", 
            category: "Evening Wear", 
            price: "₱48,500", 
            image: "/images/model6.png",
            description: "A stunning three-piece velvet commission in deep mustard gold, featuring a matching waistcoat and wide peak lapels."
        },
        { 
            id: "7", 
            name: "Emerald Estate Velvet", 
            category: "Evening Wear", 
            price: "₱48,500", 
            image: "/images/model7.png",
            description: "Luxurious bottle-green velvet three-piece tuxedo. The deep pile of the fabric offers a rich luster perfect for gala events."
        },
        { 
            id: "8", 
            name: "Ivory Alabaster Corduroy", 
            category: "Seasonal Bespoke", 
            price: "₱38,000", 
            image: "/images/model8.png",
            description: "An architectural three-piece suit in winter white corduroy, accented with navy silk piping and custom blue buttons."
        },
        { 
            id: "9", 
            name: "Regency Crimson Tartan", 
            category: "Heritage Collection", 
            price: "₱45,000", 
            image: "/images/model9.png",
            description: "A bold red and black oversized plaid three-piece suit, paired with a custom silk cravat for a sophisticated, historical look."
        },
        { 
            id: "10", 
            name: "Iron Gate Micro-Check", 
            category: "Business Elite", 
            price: "₱39,500", 
            image: "/images/model10.png",
            description: "Sophisticated grey micro-houndstooth three-piece suit designed for high-stakes environments. Features a structured chest and classic drape."
        },
        { 
            id: "11", 
            name: "Obsidian Shadow Check", 
            category: "Business Elite", 
            price: "₱37,000", 
            image: "/images/model11.png",
            description: "Dark charcoal two-piece suit with a subtle windowpane check, paired with a black poplin shirt for a sharp, monochromatic aesthetic."
        },
        { 
            id: "12", 
            name: "Midnight Glen Plaid", 
            category: "Bespoke Suiting", 
            price: "₱41,000", 
            image: "/images/model12.png",
            description: "Classic blue and green Glen plaid suit with a modern cut. Includes a high-gorge notch lapel and bespoke copper silk lining."
        }
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
                                <CardFooter className="p-6 flex flex-col items-start gap-4">
                                    <div className="flex justify-between w-full items-start">
                                        <div>
                                            <p className="text-[10px] text-[#6B8994] uppercase tracking-[0.2em]">{item.category}</p>
                                            <h3 className="text-xl font-bold uppercase tracking-tight group-hover:text-[#BE8C56] transition-colors">
                                                {item.name}
                                            </h3>
                                        </div>
                                        <p className="text-[#BE8C56] font-bold text-lg">{item.price}</p>
                                    </div>

                                            {/* Order Actions */}
                                            <Dialog>
                                            <DialogTrigger asChild>
                                                <Button 
                                                    className="w-full bg-[#BE8C56] text-[#101E29] hover:bg-[#CFBC85] font-black uppercase tracking-widest text-[10px] h-10"
                                                    onClick={() => setConfirmingProduct(item)}
                                                >
                                                    <ShoppingBag className="mr-2 h-3.5 w-3.5" /> Order Now
                                                </Button>
                                            </DialogTrigger>
                                            
                                            <DialogContent className="bg-[#101E29] border-[#3B4B51] text-[#FFFDEB]">
                                                <DialogHeader>
                                                    <DialogTitle className="text-2xl font-extrabold uppercase tracking-tighter">
                                                        Confirm Commission
                                                    </DialogTitle>
                                                    <DialogDescription className="text-[#6B8994] uppercase tracking-widest text-[10px]">
                                                        Add to your bespoke collection
                                                    </DialogDescription>
                                                </DialogHeader>

                                                {/* Product Preview */}
                                                <div className="py-6 flex gap-4 items-center border-t border-[#3B4B51]/50">
                                                    <div className="w-20 h-24 bg-[#1B2D3C] rounded overflow-hidden">
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-lg uppercase">{item.name}</h4>
                                                        <p className="text-[#BE8C56] font-bold">{item.price}</p>
                                                        <p className="text-[10px] text-[#6B8994] mt-1 italic">Est. completion: 4-6 weeks</p>
                                                    </div>
                                                </div>

                                                {/* Size Selection Section */}
                                                <div className="py-6 border-t border-[#3B4B51]/50">
                                                    <div className="flex justify-between items-center mb-3">
                                                        <label className="text-[10px] uppercase tracking-[0.2em] text-[#6B8994] font-bold">Select Size</label>
                                                        <button className="text-[10px] uppercase tracking-widest text-[#BE8C56] hover:underline">Size Guide</button>
                                                    </div>
                                                    <div className="grid grid-cols-4 gap-2">
                                                        {['38R', '40R', '42R', '44R', '38L', '40L', '42L', '44L'].map((size) => (
                                                            <button
                                                                key={size}
                                                                onClick={() => setSelectedSize(size)}
                                                                className={`py-2 text-xs font-bold border transition-all duration-200 ${
                                                                    selectedSize === size 
                                                                    ? 'bg-[#BE8C56] border-[#BE8C56] text-[#101E29]' 
                                                                    : 'bg-transparent border-[#3B4B51] text-[#6B8994] hover:border-[#BE8C56] hover:text-[#FFFDEB]'
                                                                }`}
                                                            >
                                                                {size}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#3B4B51]/50">
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" className="border-[#3B4B51] text-[#6B8994] hover:text-[#FFFDEB] uppercase text-[10px]">
                                                            Cancel
                                                        </Button>
                                                    </DialogTrigger>
                                                    <Button 
                                                        className="bg-[#BE8C56] text-[#101E29] hover:bg-[#CFBC85] font-black uppercase tracking-tighter flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                                                        disabled={!selectedSize}
                                                        onClick={() => {
                                                            console.log(`Added to cart: ${item.name}, Size: ${selectedSize}`);
                                                            setSelectedSize(null); // Reset for next selection
                                                        }}
                                                    >
                                                        {selectedSize ? `Add Size ${selectedSize} to Bag` : 'Select a Size'}
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                        
                                        <button className="flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-[#6B8994] hover:text-[#FFFDEB] transition-colors group/btn">
                                            View Details 
                                            <ArrowRight className="ml-2 w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
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