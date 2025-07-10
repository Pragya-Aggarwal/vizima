import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";

export const TestimonialsSection = (): JSX.Element => {
    const navigate = useNavigate();
    return (
        <section className="w-full relative">
            <div
                className="w-full min-h-[400px] md:h-[500px] bg-cover bg-center flex items-center relative"
                style={{
                    backgroundImage: "url(https://c.animaapp.com/mbi8y6iwSJDdWE/img/image-1.png)",
                }}
            >
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/40"></div>
                
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16">
                    <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
                            Looking for your next PG or hostel?
                        </h2>

                        <p className="text-lg md:text-xl text-white mb-8 text-center leading-relaxed">
                            At Vizima, our goal is simple — to take the stress out of finding
                            safe, comfortable, and affordable PGs & hostels.
                            Whether you're a student or a working professional, we bring you 
                            verified spaces with meals, amenities, and full transparency.
                        </p>

                        <div className="flex justify-center">
                            <Button 
                                onClick={() => navigate('/property-listing')}
                                className="bg-[#064749] hover:bg-[#053a3c] text-white text-lg px-8 py-6 rounded-full transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                                size="lg"
                            >
                                Start Exploring
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
