import React from 'react';


export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            <Navbar />
            <main>
                {children}
            </main>
            {/* You can add a Footer here later */}
        </div>
    );
}