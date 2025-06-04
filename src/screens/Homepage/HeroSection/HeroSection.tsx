import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";

export const HeroSection = (): JSX.Element => {
    const [showAllCities, setShowAllCities] = useState(false);

    // Full city data
    const allCities = [
        {
            name: "Delhi NCR",
            image: "https://c.animaapp.com/mbhqlborYGJdod/img/unsplash-kzogdvyb-hm.svg",
        },
        {
            name: "Mumbai",
            image: "https://c.animaapp.com/mbhqlborYGJdod/img/unsplash-trpi4zxpaqu.svg",
        },
        {
            name: "Bangalore",
            image: "https://c.animaapp.com/mbhqlborYGJdod/img/unsplash--7aftbn2jo4.svg",
        },
        {
            name: "Pune",
            image: "https://c.animaapp.com/mbhqlborYGJdod/img/unsplash-u3gtiojlmpg.svg",
        },
        {
            name: "Hyderabad",
            image: "https://c.animaapp.com/mbhqlborYGJdod/img/unsplash-19szvauj7ka.svg",
        },
        {
            name: "Chennai",
            image: "https://c.animaapp.com/mbhqlborYGJdod/img/chennai-placeholder.svg",
        },
        {
            name: "Kolkata",
            image: "https://c.animaapp.com/mbhqlborYGJdod/img/kolkata-placeholder.svg",
        },
        {
            name: "Ahmedabad",
            image: "https://c.animaapp.com/mbhqlborYGJdod/img/ahmedabad-placeholder.svg",
        },
        {
            name: "Jaipur",
            image: "https://c.animaapp.com/mbhqlborYGJdod/img/jaipur-placeholder.svg",
        },
        {
            name: "Lucknow",
            image: "https://c.animaapp.com/mbhqlborYGJdod/img/lucknow-placeholder.svg",
        },
    ];

    // Determine which cities to display
    const displayedCities = showAllCities ? allCities : allCities.slice(0, 5);

    return (
        <section className="flex flex-col items-center gap-[60px] px-20 py-16 w-full">
            <h2 className="font-desktop-h2 font-[number:var(--desktop-h2-font-weight)] text-text text-[length:var(--desktop-h2-font-size)] tracking-[var(--desktop-h2-letter-spacing)] leading-[var(--desktop-h2-line-height)] [font-style:var(--desktop-h2-font-style)]">
                Choose Your City
            </h2>

            <div className="flex flex-wrap items-end justify-center gap-[95px] w-full">
                {displayedCities.map((city, index) => (
                    <div key={index} className="flex flex-col items-center gap-5">
                        <h3 className="font-desktop-h4 font-[number:var(--desktop-h4-font-weight)] text-text text-[length:var(--desktop-h4-font-size)] text-center tracking-[var(--desktop-h4-letter-spacing)] leading-[var(--desktop-h4-line-height)] [font-style:var(--desktop-h4-font-style)]">
                            {city.name}
                        </h3>
                        <Card className=" rounded-[40px] ">
                            <CardContent className="p-0">
                                <div
                                    className="w-[216px] h-[216px]  bg-cover bg-center"
                                    style={{ backgroundImage: `url(${city.image})` }}
                                />
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>

            <Button
                className="px-10 py-3 bg-green rounded-[40px] hover:bg-green/90"
                onClick={() => setShowAllCities(!showAllCities)}
            >
                <span className="font-desktop-subtitle-bold font-[number:var(--desktop-subtitle-bold-font-weight)] text-white text-[length:var(--desktop-subtitle-bold-font-size)] tracking-[var(--desktop-subtitle-bold-letter-spacing)] leading-[var(--desktop-subtitle-bold-line-height)] [font-style:var(--desktop-subtitle-bold-font-style)]">
                    {showAllCities ? "Show Less Cities" : "View All Cities"}
                </span>
            </Button>
        </section>
    );
};