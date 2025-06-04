import React from "react";
import { Button } from "../../../components/ui/button";
import { aboutUs } from "../../../assets";

export const ListingsSection = (): JSX.Element => {
    return (
        <section
            className="relative py-[60px] px-20 w-full h-[767px]"
            style={{
                backgroundImage: `url(${aboutUs})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >
            {/* Dark overlay to improve text readability */}
            <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

            <div className="flex flex-col gap-8 relative z-10 mt-[350px]">
                <div className="flex flex-col gap-6 max-w-[599px]">
                    <h1 className="text-white font-desktop-h1 text-[length:var(--desktop-h1-font-size)] font-[number:var(--desktop-h1-font-weight)] leading-[var(--desktop-h1-line-height)] tracking-[var(--desktop-h1-letter-spacing)] [font-style:var(--desktop-h1-font-style)] [text-shadow:0px_4px_74.5px_#00000040]">
                        Not Just A Stay. A Better Living Experience.
                    </h1>

                    <p className="text-white font-desktop-subtitle text-[length:var(--desktop-subtitle-font-size)] font-[number:var(--desktop-subtitle-font-weight)] leading-[var(--desktop-subtitle-line-height)] tracking-[var(--desktop-subtitle-letter-spacing)] [font-style:var(--desktop-subtitle-font-style)] [text-shadow:0px_4px_74.5px_#00000040]">
                        Explore a new way of living with Vizima&apos;s curated PGs &amp;
                        hostels across&nbsp;&nbsp;India.
                    </p>
                </div>

                <Button className="bg-green hover:bg-green/90 text-white rounded-[40px] px-10 py-3 w-fit">
                    <span className="font-desktop-subtitle-bold text-[length:var(--desktop-subtitle-bold-font-size)] font-[number:var(--desktop-subtitle-bold-font-weight)] leading-[var(--desktop-subtitle-bold-line-height)] tracking-[var(--desktop-subtitle-bold-letter-spacing)] [font-style:var(--desktop-subtitle-bold-font-style)]">
                        Explore Properties
                    </span>
                </Button>
            </div>
        </section>
    );
};