import { AwardIcon, BedIcon, BuildingIcon, StarIcon } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../../../components/ui/card";

export const HeroSection = (): JSX.Element => {
    // Data for stats cards to enable mapping
    const statsData = [
        {
            icon: <AwardIcon className="w-10 h-10" />,
            text: "Served 5,000+ Students & Professionals",
            width: "w-[223px]",
        },
        {
            icon: <BedIcon className="w-10 h-10" />,
            text: "10,000+ Beds Listed",
            width: "w-[157px]",
        },
        {
            icon: <BuildingIcon className="w-10 h-10" />,
            text: "20+ Cities Covered elit",
            width: "w-[184px]",
        },
        {
            icon: <StarIcon className="w-10 h-10" />,
            text: "4.8/5 Average User Rating",
            width: "w-[183px]",
        },
    ];

    return (
        <section className="w-full py-8 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-black/20 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(https://c.animaapp.com/mbi8y6iwSJDdWE/img/bespoke-partnerships.png)' }}>
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-black mb-8 md:mb-16">
                    Stats / Social Proof
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {statsData.map((stat, index) => (
                        <Card
                            key={index}
                            className="flex flex-col items-center bg-white/10 hover:bg-white transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl border-none overflow-hidden"
                        >
                            <CardContent className="flex flex-col items-center gap-3 p-6 w-full">
                                <div className="p-2 bg-[#064749] bg-opacity-50 rounded-full">
                                    {React.cloneElement(stat.icon, { className: 'w-8 h-8 md:w-10 md:h-10 text-[#064749]' })}
                                </div>
                                <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 text-center leading-tight">
                                    {stat.text}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
