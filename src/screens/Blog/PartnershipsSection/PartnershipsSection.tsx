import React from "react";
import { Button } from "../../../components/ui/button";

export const PartnershipsSection = (): JSX.Element => {
    return (
        <section
            className="relative w-full bg-cover bg-center py-16"
            style={{
                backgroundImage:
                    "linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.38) 61%, rgba(0,0,0,0) 100%), url(https://c.animaapp.com/mbi8y6iwSJDdWE/img/bespoke-partnerships.png)",
            }}
        >
            <div className="container mx-auto px-4">
                <div className="max-w-2xl">
                    <h2 className="text-white font-desktop-h2 font-[number:var(--desktop-h2-font-weight)] text-[length:var(--desktop-h2-font-size)] tracking-[var(--desktop-h2-letter-spacing)] leading-[var(--desktop-h2-line-height)] [font-style:var(--desktop-h2-font-style)] mb-4 [text-shadow:0px_4px_87.5px_#00000040]">
                        Helping You Find Your Second Home, Hassle-Free
                    </h2>

                    <p className="text-white font-desktop-subtitle font-[number:var(--desktop-subtitle-font-weight)] text-[length:var(--desktop-subtitle-font-size)] tracking-[var(--desktop-subtitle-letter-spacing)] leading-[var(--desktop-subtitle-line-height)] [font-style:var(--desktop-subtitle-font-style)] mb-6 [text-shadow:0px_4px_87.5px_#00000040]">
                        At Vizima, our goal is simple — to take the stress out of finding
                        safe, comfortable, and affordable PGs &amp; hostels. Whether
                        you&apos;re a student or a working professional, we bring you
                        verified spaces with meals, amenities, and full transparency.
                    </p>

                    <Button className="bg-green hover:bg-green/90 text-white rounded-[40px] px-10 py-3 font-desktop-subtitle-bold font-[number:var(--desktop-subtitle-bold-font-weight)] text-[length:var(--desktop-subtitle-bold-font-size)] tracking-[var(--desktop-subtitle-bold-letter-spacing)] leading-[var(--desktop-subtitle-bold-line-height)] [font-style:var(--desktop-subtitle-bold-font-style)]">
                        Start booking
                    </Button>
                </div>
            </div>
        </section>
    );
};
