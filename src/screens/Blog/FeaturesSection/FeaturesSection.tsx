import { CreditCardIcon, SearchIcon } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../../../components/ui/card";

export const FeaturesSection = (): JSX.Element => {
    // Feature data for mapping
    const features = [
        {
            id: 1,
            icon: <SearchIcon className="w-20 h-20" />,
            title: "SearchIcon Easily",
            description:
                "Enter your city, choose filters, and browse verified stays.",
            position: "right",
        },
        {
            id: 2,
            icon: (
                <div className="relative w-20 h-20">
                    <img
                        className="w-[65px] h-[72px] mt-1 ml-2"
                        alt="Book icon"
                        src="https://c.animaapp.com/mbi8y6iwSJDdWE/img/group-2.png"
                    />
                </div>
            ),
            title: "Book Instantly or Schedule a Visit",
            description: "Choose what suits you — visit or book online securely.",
            position: "left",
        },
        {
            id: 3,
            icon: <CreditCardIcon className="w-20 h-20" />,
            title: "Pay & Move In",
            description: "Hassle-free online payment and digital documentation.",
            position: "right",
        },
    ];

    return (
        <section className="w-full py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#e2f1e8]">
            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <div className="text-center mb-12 md:mb-20">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#064749] mb-4">
                        How it Works
                    </h2>
                    <div className="w-20 h-1 bg-[#064749] mx-auto"></div>
                </div>

                {/* Timeline with feature cards */}
                <div className="relative">
                    {/* Timeline line - only shown on medium screens and up */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#064749] transform -translate-x-1/2"></div>

                    {/* Feature cards */}
                    <div className="space-y-12 md:space-y-0">
                        {features.map((feature, index) => (
                            <div 
                                key={feature.id}
                                className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                            >
                                {/* Timeline dot */}
                                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 md:left-1/2 w-6 h-6 bg-[#064749] rounded-full z-10"></div>
                                
                                {/* Feature card */}
                                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} mb-8 md:mb-0`}>
                                    <Card className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-none overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                        <CardContent className="p-6">
                                            <div className="flex flex-col items-center md:items-start text-center md:text-left">
                                                <div className="mb-4 p-3 bg-[#064749]/10 rounded-full">
                                                    {React.cloneElement(feature.icon, { 
                                                        className: 'w-12 h-12 md:w-16 md:h-16 text-[#064749]' 
                                                    })}
                                                </div>
                                                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                                                    {feature.title}
                                                </h3>
                                                <p className="text-gray-600">
                                                    {feature.description}
                                                </p>
                                                {index < features.length - 1 && (
                                                    <div className="md:hidden mt-6 w-1 h-16 bg-[#064749] mx-auto"></div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                                
                                {/* Spacer for alternating layout */}
                                <div className="hidden md:block md:w-1/2"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
