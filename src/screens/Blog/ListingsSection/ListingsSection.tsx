import React from "react";
import { Button } from "../../../components/ui/button";
import { aboutUs } from "../../../assets";

export const ListingsSection = (): JSX.Element => {
    return (
        <section
            className="relative w-full min-h-[500px] md:h-[600px] lg:h-[767px] py-12 md:py-16 px-4 sm:px-6 lg:px-20 flex items-end"
            style={{
                backgroundImage: `url(${aboutUs})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* Dark overlay to improve text readability */}
            <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

            <div className="container mx-auto relative z-10 pb-12 md:pb-20">
                <div className="flex flex-col gap-6 max-w-3xl">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg">
                        Not Just A Stay. A Better Living Experience.
                    </h1>

                    <p className="text-white text-lg md:text-xl max-w-2xl leading-relaxed">
                        Explore a new way of living with Vizima's curated PGs & hostels across India.
                    </p>
                </div>

                <Button 
                    className="mt-8 bg-[#064749] hover:bg-[#053a3c] text-white text-base md:text-lg px-8 py-6 rounded-full transition-all duration-300 hover:shadow-lg"
                    size="lg"
                >
                    Explore Properties
                </Button>
            </div>
        </section>
    );
};