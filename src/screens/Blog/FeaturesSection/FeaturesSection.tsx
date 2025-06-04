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
        <section className="w-full py-16">
            <div className="relative w-full bg-[#e2f1e8] py-16">
                {/* Section Title */}
                <div className="flex justify-center mb-12">
                    <h2 className="font-desktop-h2 font-[number:var(--desktop-h2-font-weight)] text-text text-[length:var(--desktop-h2-font-size)] text-center tracking-[var(--desktop-h2-letter-spacing)] leading-[var(--desktop-h2-line-height)] [font-style:var(--desktop-h2-font-style)]">
                        How it Works
                    </h2>
                </div>

                {/* Timeline with feature cards */}
                <div className="relative max-w-6xl mx-auto">
                    {/* Timeline line and dots - centered properly */}
                    <div className="absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2 flex flex-col items-center justify-between z-0">
                        {features.map((_, index) => (
                            <div key={`dot-${index}`} className="flex flex-col items-center">
                                <div className="w-5 h-5 bg-green rounded-full"></div>
                                {index < features.length - 1 && (
                                    <div className="w-px h-[420px] bg-green"></div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Feature cards */}
                    <div className="relative z-10">
                        {features.map((feature, index) => (
                            <div
                                key={feature.id}
                                className={`flex ${index === 1 ? "justify-end" : "justify-start"} ${index !== 0 ? "mt-24" : ""}`}
                            >
                                <Card
                                    className={`w-[497px] ${index === 1 ? "mr-0" : "ml-0"} bg-[#ffffff80] rounded-[30px] border-none`}
                                >
                                    <CardContent className="p-6">
                                        <div
                                            className={`flex flex-col w-full gap-3 items-${feature.position === "right" ? "end" : "start"}`}
                                        >
                                            {feature.icon}
                                            <h3
                                                className={`font-desktop-h3 font-[number:var(--desktop-h3-font-weight)] text-text text-[length:var(--desktop-h3-font-size)] tracking-[var(--desktop-h3-letter-spacing)] leading-[var(--desktop-h3-line-height)] [font-style:var(--desktop-h3-font-style)] text-${feature.position}`}
                                            >
                                                {feature.title}
                                            </h3>
                                            <p
                                                className={`font-desktop-text-regular font-[number:var(--desktop-text-regular-font-weight)] text-text text-[length:var(--desktop-text-regular-font-size)] tracking-[var(--desktop-text-regular-letter-spacing)] leading-[var(--desktop-text-regular-line-height)] [font-style:var(--desktop-text-regular-font-style)] text-${feature.position}`}
                                            >
                                                {feature.description}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
