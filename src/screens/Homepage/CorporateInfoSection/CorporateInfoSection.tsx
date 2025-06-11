import React from "react";
import { Card, CardContent } from "../../../components/ui/card";

// Data for the cards to enable mapping
const accommodationCards = [
    {
        title: "For interns",
        description: "",
        backgroundImage: "https://c.animaapp.com/mbhmsf5eMRDRNk/img/1.png",
        iconSrc:
            "https://c.animaapp.com/mbhmsf5eMRDRNk/img/stash-arrow-up-solid-2.svg",
    },
    {
        title: "For Employees",
        description: "",
        backgroundImage: "https://c.animaapp.com/mbhmsf5eMRDRNk/img/4.png",
        iconSrc:
            "https://c.animaapp.com/mbhmsf5eMRDRNk/img/stash-arrow-up-solid.svg",
    },
    {
        title: "For Students",
        description: "",
        backgroundImage: "https://c.animaapp.com/mbhmsf5eMRDRNk/img/3.png",
        iconSrc:
            "https://c.animaapp.com/mbhmsf5eMRDRNk/img/stash-arrow-up-solid.svg",
    },
];

export const CorporateInfoSection = (): JSX.Element => {
    return (
        <section className="flex flex-col w-full items-start gap-8 sm:gap-10 lg:gap-[60px] py-12 sm:py-20 lg:py-[140px] px-4 sm:px-8 lg:px-20">
            <div className="flex flex-col items-center justify-center w-full gap-4">
                <h2 className="w-full font-desktop-h2 font-[number:var(--desktop-h2-font-weight)] text-text text-[length:var(--desktop-h2-font-size)] text-center tracking-[var(--desktop-h2-letter-spacing)] leading-[var(--desktop-h2-line-height)] [font-style:var(--desktop-h2-font-style)]">
                    Bulk Accommodation Solutions
                </h2>

                <p className="max-w-[782px] px-4 font-desktop-subtitle font-[number:var(--desktop-subtitle-font-weight)] text-text text-[length:var(--desktop-subtitle-font-size)] text-center tracking-[var(--desktop-subtitle-letter-spacing)] leading-[var(--desktop-subtitle-line-height)] [font-style:var(--desktop-subtitle-font-style)]">
                    Vizima offers bulk accommodation solutions for corporates and
                    universities—safe, affordable PGs for interns, employees, and students
                    with full amenities.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 w-full">
                {accommodationCards.map((card, index) => (
                    <Card
                        key={index}
                        className="group relative rounded-[30px] p-0 overflow-hidden border-0 w-full h-[180px] sm:h-[200px] transition-all duration-500 ease-in-out transform hover:scale-[1.02] hover:shadow-xl"
                    >
                        {/* Background image with zoom effect on hover */}
                        <div 
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{ backgroundImage: `url(${card.backgroundImage})` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 group-hover:from-black/60 group-hover:to-black/30 transition-all duration-500"></div>
                        </div>
                        
                        <CardContent className="relative z-10 h-full flex flex-col justify-between px-6 sm:px-8 lg:px-10 py-6 sm:py-8 transition-all duration-300 group-hover:translate-y-[-10px]">
                            <div>
                                <h4 className="w-full font-desktop-h4 font-[number:var(--desktop-h4-font-weight)] text-white text-[length:var(--desktop-h4-font-size)] tracking-[var(--desktop-h4-letter-spacing)] leading-[var(--desktop-h4-line-height)] [font-style:var(--desktop-h4-font-style)] transition-all duration-300 group-hover:text-[#f8f8f8]">
                                    {card.title}
                                    <span className="block w-0 h-0.5 bg-white mt-2 group-hover:w-12 transition-all duration-500"></span>
                                </h4>
                            </div>

                            <div className="relative w-[50px] sm:w-[60px] h-[50px] sm:h-[60px] rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-[#064749] group-hover:scale-110">
                                <img
                                    className="w-[40px] sm:w-[46px] h-[40px] sm:h-[46px] transition-transform duration-300 group-hover:scale-110"
                                    alt="Arrow up icon"
                                    src={card.iconSrc}
                                />
                            </div>

                            {card.description && (
                                <p className="w-full font-desktop-text-regular font-[number:var(--desktop-text-regular-font-weight)] text-white text-[length:var(--desktop-text-regular-font-size)] tracking-[var(--desktop-text-regular-letter-spacing)] leading-[var(--desktop-text-regular-line-height)] [font-style:var(--desktop-text-regular-font-style)]">
                                    {card.description}
                                </p>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};
