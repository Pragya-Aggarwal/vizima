import { LockIcon, ShieldIcon, TagIcon, WifiIcon } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../../../components/ui/card";

export const CorporateSection = (): JSX.Element => {
    // Feature card data for mapping
    const featureCards = [
        {
            icon: <LockIcon className="w-[60px] h-[60px]" />,
            title: "Verified Listings",
            description: "Inspected PGs and hostels only",
        },
        {
            icon: <TagIcon className="w-[60px] h-[60px]" />,
            title: "Includes Meals",
            description: "Delicious home-style meals daily",
        },
        {
            icon: <WifiIcon className="w-[60px] h-[60px]" />,
            title: "High-Speed Wi-Fi",
            description: "Buffer-free work & entertainment",
        },
        {
            icon: <ShieldIcon className="w-[60px] h-[60px]" />,
            title: "Safe Booking",
            description: "Fully digital and secure payments",
        },
    ];

    return (
        <section className="w-full py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-4xl mx-auto mb-12 md:mb-20">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Why Vizima?
                    </h2>
                    <div className="w-20 h-1 bg-[#064749] mx-auto mb-6"></div>
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                        Vizima offers verified PGs with meals, Wi-Fi, secure booking, and
                        roommate options—ensuring a safe, comfortable, and hassle-free stay.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                    {featureCards.map((card, index) => (
                        <Card 
                            key={index} 
                            className="h-full bg-white rounded-xl sm:rounded-2xl shadow-sm sm:shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                        >
                            <CardContent className="h-full flex flex-col items-center text-center p-6 md:p-8">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center text-[#064749] bg-[#064749]/10 rounded-full mb-4 sm:mb-6">
                                    {React.cloneElement(card.icon, {
                                        className: 'w-8 h-8 md:w-10 md:h-10'
                                    })}
                                </div>
                                <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                                    {card.title}
                                </h4>
                                <p className="text-sm sm:text-base text-gray-600">
                                    {card.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
