import React from "react";
import { Button } from "../../../components/ui/button";

export const TestimonialsSection = (): JSX.Element => {
    return (
        <section className="w-full relative">
            <div
                className="w-full h-[360px] bg-cover bg-center flex items-center"
                style={{
                    backgroundImage:
                        "url(https://c.animaapp.com/mbi8y6iwSJDdWE/img/image-1.png)",
                }}
            >
                <div className="container px-6 md:px-8">
                    <div className="flex flex-col max-w-[1075px] gap-6">
                        <h2 className="font-desktop-h1 font-[number:var(--desktop-h1-font-weight)] text-white text-[length:var(--desktop-h1-font-size)] tracking-[var(--desktop-h1-letter-spacing)] leading-[var(--desktop-h1-line-height)] [font-style:var(--desktop-h1-font-style)] [text-shadow:0px_4px_87.5px_#00000040]">
                            Looking for your next PG or hostel?
                        </h2>

                        <p className="font-desktop-subtitle font-[number:var(--desktop-subtitle-font-weight)] text-white text-[length:var(--desktop-subtitle-font-size)] tracking-[var(--desktop-subtitle-letter-spacing)] leading-[var(--desktop-subtitle-line-height)] [font-style:var(--desktop-subtitle-font-style)] [text-shadow:0px_4px_87.5px_#00000040]">
                            At Vizima, our goal is simple — to take the stress out of finding
                            safe, comfortable,&nbsp;&nbsp;and affordable PGs &amp; hostels.
                            Whether you&apos;re a student or a working
                            professional,&nbsp;&nbsp;we bring you verified spaces with meals,
                            amenities, and full transparency.
                        </p>

                        <Button className="bg-green text-white rounded-[40px] px-10 py-3 w-fit font-desktop-subtitle-bold font-[number:var(--desktop-subtitle-bold-font-weight)] text-[length:var(--desktop-subtitle-bold-font-size)] tracking-[var(--desktop-subtitle-bold-letter-spacing)] leading-[var(--desktop-subtitle-bold-line-height)] [font-style:var(--desktop-subtitle-bold-font-style)]">
                            Start Exploring
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};
