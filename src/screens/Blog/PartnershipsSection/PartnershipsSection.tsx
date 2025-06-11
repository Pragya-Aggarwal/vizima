import React from "react";
import { Button } from "../../../components/ui/button";

export const PartnershipsSection = (): JSX.Element => {
    return (
        <section
            className="relative w-full min-h-[500px] md:min-h-[600px] bg-cover bg-center flex items-center py-16 md:py-24"
            style={{
                backgroundImage:
                    "linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.4) 100%), url(https://c.animaapp.com/mbi8y6iwSJDdWE/img/bespoke-partnerships.png)",
                backgroundPosition: 'center right',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="absolute inset-0 bg-black/30"></div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-2xl bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        Helping You Find Your Second Home, Hassle-Free
                    </h2>

                    <p className="text-lg md:text-xl text-white mb-8 leading-relaxed">
                        At Vizima, our goal is simple — to take the stress out of finding
                        safe, comfortable, and affordable PGs & hostels. Whether
                        you're a student or a working professional, we bring you
                        verified spaces with meals, amenities, and full transparency.
                    </p>

                    <Button 
                        className="bg-[#064749] hover:bg-[#053a3c] text-white text-lg px-8 py-6 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                        size="lg"
                    >
                        Start Booking
                    </Button>
                </div>
            </div>
        </section>
    );
};
