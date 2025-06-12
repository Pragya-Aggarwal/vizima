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

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full max-w-7xl mx-auto px-4 sm:px-6">
                {displayedCities.map((city, index) => (
                    <div key={index} className="flex flex-col items-center gap-3 sm:gap-4 w-full">
                        <Card className="rounded-3xl sm:rounded-[40px] w-full overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                            <CardContent className="p-0">
                                <div
                                    className="w-full aspect-square bg-cover bg-center hover:scale-105 transition-transform duration-300"
                                    style={{ backgroundImage: `url(${city.image})` }}
                                />
                            </CardContent>
                        </Card>
                        <h3 className="font-desktop-h4 font-medium text-text text-lg sm:text-xl text-center w-full truncate px-2">
                            {city.name}
                        </h3>
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