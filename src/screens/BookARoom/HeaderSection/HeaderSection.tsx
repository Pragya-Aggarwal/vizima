import React from "react";
import { Card, CardContent } from "../../../components/ui/card";

// Define the trust booster data for mapping
const trustBoosters = [
    {
        icon: "https://c.animaapp.com/mbi5x2be8VZzX7/img/eva-award-fill.svg",
        alt: "Eva award fill",
        text: "100% Verified Properties",
        width: "246px",
    },
    {
        icon: "https://c.animaapp.com/mbi5x2be8VZzX7/img/material-symbols-bed.svg",
        alt: "Material symbols bed",
        text: "Secure Online Payments",
        width: "190px",
    },
    {
        icon: "https://c.animaapp.com/mbi5x2be8VZzX7/img/bi-buildings-fill.svg",
        alt: "Bi buildings fill",
        text: "24x7 Support",
        width: "132px",
    },
    {
        id: 4,
        customIcon: true,
        iconSrc: "https://c.animaapp.com/mbi5x2be8VZzX7/img/group-1.png",
        alt: "Group",
        text: "Hassle-free Move-in Guarantee",
        width: "246px",
    },
];

export const HeaderSection = (): JSX.Element => {
    return (
        <section className="flex mt-20 flex-col w-full items-center gap-[30px] pt-2.5 pb-8 px-0 relative [background:linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.2)_100%),url(https://c.animaapp.com/mbi5x2be8VZzX7/img/adkoghe.png)_50%_50%_/_cover]">
            <h2 className="w-[847px] mt-[-1.00px] [text-shadow:0px_4px_30.2px_#0000001a] font-desktop-h2 font-[number:var(--desktop-h2-font-weight)] text-black text-[length:var(--desktop-h2-font-size)] text-center tracking-[var(--desktop-h2-letter-spacing)] leading-[var(--desktop-h2-line-height)] [font-style:var(--desktop-h2-font-style)]">
                Trust Boosters
            </h2>

            <div className="flex w-full items-start justify-center gap-[98px] px-20 py-0">
                {trustBoosters.map((booster, index) => (
                    <Card
                        key={index}
                        className="flex flex-col w-[246px] h-[142px] items-center gap-3 pt-[13px] pb-0 px-0 bg-[#ffffff99] rounded-xl shadow-[0px_4px_29.3px_#00000040] border-none"
                    >
                        <CardContent className="flex flex-col items-center p-0">
                            {booster.customIcon ? (
                                <div className="relative w-10 h-10">
                                    <img
                                        className="absolute w-[34px] h-[38px] top-0 left-0.5"
                                        alt={booster.alt}
                                        src={booster.iconSrc}
                                    />
                                </div>
                            ) : (
                                <img
                                    className="w-10 h-10"
                                    alt={booster.alt}
                                    src={booster.icon}
                                />
                            )}

                            <div
                                className="[font-family:'Lato',Helvetica] font-bold text-text text-[22px] text-center tracking-[0] leading-[25px]"
                                style={{ width: booster.width }}
                            >
                                {booster.text}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};
