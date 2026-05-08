import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, CheckCircle2, ChevronRight, Star, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

// Import your existing auth components
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";

export default function LandingPage() {
  const { auth } = usePage().props;

  return (
    <>
      <Head title="Common Thread - Modern Tailoring" />
      <div className="relative min-h-screen bg-[#101E29] text-stone-100 selection:bg-[#3B4B51]/30 overflow-hidden">
        {/* Header / Nav */}
        <header className="flex items-center justify-between px-6 pt-2 pb-1 md:px-12 border-b border-[#3B4B51]/20">
          <Link href="/" className="flex items-center gap-3 group">
            <img src="/images/ct-logo.svg" alt="Common Thread" className="w-10 h-10 object-contain" />
            <span className="text-white font-medium tracking-widest uppercase text-sm">Common Thread</span>
          </Link>

          <nav className="flex items-center gap-6 text-sm font-medium uppercase tracking-tighter">
            {auth.user ? (
            <>
                {/* 1. Log Out Text Link (Matches the 'Log in' text link) */}
                <Link 
                    href="/logout" 
                    method="post" 
                    as="button" 
                    className="text-[#6B8994] hover:text-white transition-colors uppercase tracking-tighter"
                >
                    Log out
                </Link>

                {/* 2. Dashboard Button (Matches the 'Join the Community' button) */}
                <Link href="/dashboard">
                    <Button variant="outline" className="border-[#3B4B51] text-[#3B4B51] hover:bg-[#3B4B51] hover:text-white transition-all">
                    Dashboard
                    </Button>
                </Link>
                </>
            ) : (
              <>
                {/* LOGIN MODAL */}
                    <Dialog>
                        <DialogTrigger asChild>
                        <button className="text-[#6B8994] hover:text-white transition-colors uppercase tracking-tighter">
                            Log in
                        </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] bg-[#101E29] border-[#3B4B51] text-white">
                        {/* We pass default props here to satisfy the typescript requirements of your Login component */}
                        <Login canResetPassword={true} canRegister={false} />
                        </DialogContent>
                    </Dialog>

                {/* REGISTER MODAL */}
                    <Dialog>
                        <DialogTrigger asChild>
                        <Button variant="outline" className="border-[#3B4B51] text-[#3B4B51] hover:bg-[#3B4B51] hover:text-white transition-all">
                            Join the Community
                        </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] bg-[#101E29] border-[#3B4B51] text-white">
                        <Register />
                        </DialogContent>
                    </Dialog>
              </>
            )}
          </nav>
        </header>

        {/* Hero Section - Merged Design */}
        <main className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-10 grid md:grid-cols-2 gap-16 items-start">
          <div>
            <div className="inline-flex items-center px-3 py-1 border border-[#3B4B51]/40 rounded-full mb-6 bg-[#3B4B51]/5 backdrop-blur-sm">
              <span className="text-[#FF8904] text-[10px] font-bold uppercase tracking-widest">The Pursuit of Excellence</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-light text-white mb-8 leading-[1.1]">
              Mastering the <br />
              <span className="font-serif italic text-[#3B4B51]">Modern Silhouette</span>
            </h1>

            <p className="text-lg text-[#A0AEB6] mb-10 leading-relaxed max-w-lg">
              We combine traditional Savile Row craftsmanship with contemporary design to create bespoke apparel for the modern professional. A seamless digital experience woven into every interaction.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              <div className="flex gap-4">
                <Check className="w-5 h-5 text-[#3B4B51] shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-medium">Expert Tailoring</h3>
                  <p className="text-sm text-[#6B7880]">The roots of traditional craft.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Check className="w-5 h-5 text-[#3B4B51] shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-medium">Digital Storefront</h3>
                  <p className="text-sm text-[#6B7880]">Real-time tracking & management.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/appointments">
                <Button className="bg-[#3B4B51] text-white hover:bg-[#36454C] h-14 px-8 text-sm uppercase tracking-widest rounded-none transition-all duration-300 w-full sm:w-auto border border-[#3B4B51]">
                  Book a Fitting <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/shop">
                <Button variant="outline" className="border-[#3B4B51]/30 text-[#A0AEB6] hover:bg-[#3B4B51]/10 hover:text-white h-14 px-8 text-sm uppercase tracking-widest rounded-none transition-all duration-300 w-full sm:w-auto">
                  Explore Collection <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Feature Box with Video */}
          <div className="relative group">
            <div className="absolute inset-0 bg-[#3B4B51]/5 blur-[120px] rounded-full group-hover:bg-[#3B4B51]/10 transition-all duration-500"></div>
            <div className="relative border border-[#3B4B51]/20 p-8 bg-[#36454C]/20 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.2em] text-[#FF8904] mb-4">Current Edition</p>
              <h2 className="text-3xl text-white font-serif mb-6">The Professional Suit Selection</h2>
              <div className="aspect-[4/5] bg-[#101E29] flex items-center justify-center text-[#36454C] border border-[#3B4B51]/20">
                <video src="/videos/SC30walking.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </main>


        {/* Featured Products Gallery */}
        <section className="py-24 bg-[#101E29]/50 border-t border-[#3B4B51]/20">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-4xl text-white mb-4">Curated Essentials</h2>
                <p className="text-[#A0AEB6] max-w-2xl">
                  Discover our foundation pieces, tailored precisely to your measurements and crafted from the finest European mills.
                </p>
              </div>
              <Link href="/shop" className="hidden sm:flex items-center gap-1 text-[#3B4B51] font-medium hover:text-white transition-colors">
                View all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Product 1 */}
              <div className="group cursor-pointer">
                <div className="aspect-[3/4] overflow-hidden bg-[#36454C] mb-4 relative border border-[#3B4B51]/20">
                  <img
                    src="/images/SC30.jpg"
                    alt="The Executive Blazer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-medium text-white">The Executive Blazer</h3>
                <p className="text-[#6B7880] mb-2">Italian Wool, Navy</p>
                <p className="font-serif text-[#3B4B51]">From ₱8950</p>
              </div>

              {/* Product 2 */}
              <div className="group cursor-pointer">
                <div className="aspect-[3/4] overflow-hidden bg-[#36454C] mb-4 relative border border-[#3B4B51]/20">
                  <img
                    src="/images/goatlebron.png"
                    alt="Bespoke Trousers"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-medium text-white">Bespoke Suit</h3>
                <p className="text-[#6B7880] mb-2">Worsted Flannel, Charcoal</p>
                <p className="font-serif text-[#3B4B51]">From ₱3500</p>
              </div>

              {/* Product 3 */}
              <div className="group cursor-pointer">
                <div className="aspect-[3/4] overflow-hidden bg-[#36454C] mb-4 relative border border-[#3B4B51]/20">
                  <img
                    src="/images/kd.png"
                    alt="Signature Shirting"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-medium text-white">Beige Signature</h3>
                <p className="text-[#6B7880] mb-2">Egyptian Cotton, White</p>
                <p className="font-serif text-[#3B4B51]">From ₱1850</p>
              </div>
            </div>
          </div>
        </section>

        {/* Client Registration Section */}
        <section className="py-24 bg-[#101E29] border-t border-[#3B4B51]/20">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="bg-[#36454C]/30 border border-[#3B4B51]/30 flex flex-col lg:flex-row overflow-hidden backdrop-blur-md">
              {/* Left side: Info */}
              <div className="bg-gradient-to-br from-[#1a2834] to-[#101E29] lg:w-2/5 p-10 md:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[#3B4B51]/20">
                <h2 className="text-3xl font-serif text-white mb-6">Join Our Private Clientele</h2>
                <p className="text-[#A0AEB6] mb-10 leading-relaxed">
                  Experience unparalleled personalized service. Register today to gain access to exclusive fabrics, priority fitting appointments, and your digital measurements profile.
                </p>

                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-[#3B4B51] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-white">Digital Wardrobe</h4>
                      <p className="text-sm text-[#6B7880] mt-1">Access your measurements and previous orders anytime.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-[#3B4B51] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-white">Priority Booking</h4>
                      <p className="text-sm text-[#6B7880] mt-1">Skip the waitlist for seasonal trunk shows and fittings.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-[#3B4B51] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-white">Style Consultations</h4>
                      <p className="text-sm text-[#6B7880] mt-1">Direct access to our master tailors for wardrobing advice.</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Right side: Form */}
              <div className="lg:w-3/5 p-10 md:p-16">
                <form className="space-y-6 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="block text-sm font-medium text-[#A0AEB6]">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        className="w-full border-b border-[#3B4B51]/30 bg-transparent py-2 px-0 text-white placeholder-[#6B7880] focus:outline-none focus:border-[#3B4B51] focus:ring-0 transition-colors"
                        placeholder="James"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="block text-sm font-medium text-[#A0AEB6]">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        className="w-full border-b border-[#3B4B51]/30 bg-transparent py-2 px-0 text-white placeholder-[#6B7880] focus:outline-none focus:border-[#3B4B51] focus:ring-0 transition-colors"
                        placeholder="Bond"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-[#A0AEB6]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full border-b border-[#3B4B51]/30 bg-transparent py-2 px-0 text-white placeholder-[#6B7880] focus:outline-none focus:border-[#3B4B51] focus:ring-0 transition-colors"
                      placeholder="james@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-[#A0AEB6]">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full border-b border-[#3B4B51]/30 bg-transparent py-2 px-0 text-white placeholder-[#6B7880] focus:outline-none focus:border-[#3B4B51] focus:ring-0 transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="appointment" className="block text-sm font-medium text-[#A0AEB6]">
                      Preferred Initial Fitting Month
                    </label>
                    <select
                      id="appointment"
                      className="w-full border-b border-[#3B4B51]/30 bg-transparent py-2 px-0 text-white focus:outline-none focus:border-[#3B4B51] focus:ring-0 transition-colors"
                    >
                      <option value="" className="bg-[#101E29] text-white">Select a month...</option>
                      <option value="next-available" className="bg-[#101E29] text-white">Next Available</option>
                      <option value="june" className="bg-[#101E29] text-white">June</option>
                      <option value="july" className="bg-[#101E29] text-white">July</option>
                      <option value="august" className="bg-[#101E29] text-white">August</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#3B4B51] text-white py-4 font-medium hover:bg-[#36454C] transition-colors mt-8 uppercase tracking-wide rounded-none border border-[#3B4B51]"
                  >
                    Submit Registration
                  </button>
                  <p className="text-xs text-[#6B7880] text-center mt-4">By registering, you agree to our Terms of Service and Privacy Policy.</p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
