import React from "react";
import { Card, CardContent } from "../../../components/ui/card";

export const WhyChooseUsSection = (): JSX.Element => {
    // Feature card data for mapping
    const featureCards = [
        {
            id: 1,
            icon: "https://c.animaapp.com/mbhqlborYGJdod/img/eva-calendar-fill.svg",
            iconAlt: "Eva calendar fill",
            title: "Verified Listings",
            description: "Only approved and inspected PGs",
            iconType: "img",
        },
        {
            id: 2,
            icon: "https://c.animaapp.com/mbhqlborYGJdod/img/mdi-sofa.svg",
            iconAlt: "Mdi sofa",
            title: "Includes Meals",
            description: "Breakfast, lunch, and dinner",
            iconType: "img",
        },
        {
            id: 3,
            icon: "https://c.animaapp.com/mbhqlborYGJdod/img/group.png",
            iconAlt: "Group",
            title: "High-speed Wi-Fi",
            description: "Best internet speeds suitable for working from home",
            iconType: "div",
            iconStyle: { top: "10px", left: "5px", width: "50px", height: "40px" },
        },
        {
            id: 4,
            icon: "https://c.animaapp.com/mbhqlborYGJdod/img/group-1.png",
            iconAlt: "Group",
            title: "Safe Booking",
            description: "Fully online with secure payment",
            iconType: "div",
            iconStyle: { top: "0", left: "3px", width: "54px", height: "60px" },
        },
    ];

    return (
        <section className="flex flex-col items-center gap-[60px] px-1 py-0 w-full mt-40">
            <div className="max-w-[870px] flex flex-col gap-4 text-center">
                <h2 className="font-desktop-h2 font-[number:var(--desktop-h2-font-weight)] text-text text-[length:var(--desktop-h2-font-size)] tracking-[var(--desktop-h2-letter-spacing)] leading-[var(--desktop-h2-line-height)] [font-style:var(--desktop-h2-font-style)]">
                    Why Choose Vizima?
                </h2>

                <p className="font-desktop-subtitle font-[number:var(--desktop-subtitle-font-weight)] text-text text-[length:var(--desktop-subtitle-font-size)] tracking-[var(--desktop-subtitle-letter-spacing)] leading-[var(--desktop-subtitle-line-height)] [font-style:var(--desktop-subtitle-font-style)]">
                    Vizima offers verified PGs with meals, Wi-Fi, secure booking, and
                    roommate options—ensuring a safe, comfortable, and hassle-free stay.
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-[16.5px]">
                {featureCards.map((card) => (
                    <Card
                        key={card.id}
                        className="flex flex-col w-[345px] h-[278px] bg-[#e2f1e8] rounded-[30px] border-none shadow-none"
                    >
                        <CardContent className="flex flex-col items-start gap-4 px-10 py-8 h-full">
                            {card.iconType === "img" ? (
                                <img
                                    className="w-[60px] h-[60px]"
                                    alt={card.iconAlt}
                                    src={card.icon}
                                />
                            ) : (
                                <div className="relative w-[60px] h-[60px]">
                                    <img
                                        className="absolute"
                                        style={card.iconStyle}
                                        alt={card.iconAlt}
                                        src={card.icon}
                                    />
                                </div>
                            )}

                            <h4 className="self-stretch font-desktop-h4 font-[number:var(--desktop-h4-font-weight)] text-text text-[length:var(--desktop-h4-font-size)] tracking-[var(--desktop-h4-letter-spacing)] leading-[var(--desktop-h4-line-height)] [font-style:var(--desktop-h4-font-style)]">
                                {card.title}
                            </h4>

                            <p className="self-stretch font-desktop-text-regular font-[number:var(--desktop-text-regular-font-weight)] text-text text-[length:var(--desktop-text-regular-font-size)] tracking-[var(--desktop-text-regular-letter-spacing)] leading-[var(--desktop-text-regular-line-height)] [font-style:var(--desktop-text-regular-font-style)]">
                                {card.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};
