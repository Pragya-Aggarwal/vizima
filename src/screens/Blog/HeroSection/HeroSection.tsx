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
        <section className="flex flex-col w-full items-center gap-[60px] pt-2.5 pb-[38px] px-0 border border-solid border-[#c3d0d7] [background:linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.2)_100%),url(https://c.animaapp.com/mbi8y6iwSJDdWE/img/bespoke-partnerships.png)_50%_50%_/_cover,linear-gradient(0deg,rgba(242,240,242,1)_0%,rgba(242,240,242,1)_100%)]">
            <h2 className="w-[847px] mt-[-1.00px] font-desktop-h2 font-[number:var(--desktop-h2-font-weight)] text-text text-[length:var(--desktop-h2-font-size)] text-center tracking-[var(--desktop-h2-letter-spacing)] leading-[var(--desktop-h2-line-height)] [font-style:var(--desktop-h2-font-style)]">
                Stats / Social Proof
            </h2>

            <div className="flex w-full max-w-[1440px] items-start justify-center gap-[131px] px-20 py-0">
                {statsData.map((stat, index) => (
                    <Card
                        key={index}
                        className="flex flex-col w-[223px] items-center bg-[#ffffff99] rounded-xl shadow-[0px_4px_29.3px_#00000040] border-none"
                    >
                        <CardContent className="flex flex-col items-center gap-3 px-0 py-[25px]">
                            {stat.icon}
                            <p
                                className={`${stat.width} font-['Lato',Helvetica] font-bold text-text text-lg text-center tracking-[0] leading-[25px]`}
                            >
                                {stat.text}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};
