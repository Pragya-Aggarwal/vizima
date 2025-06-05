import React from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";

export const ApartmentListingsSection = (): JSX.Element => {
    // Data for apartment listings
    const apartmentListings = [
        {
            id: 1,
            name: "Comfort Stay PG – Karol Bagh",
            image: "https://c.animaapp.com/mbi2us3vKS97yu/img/rectangle-222.png",
            amenities: {
                bedroom: 1,
                bath: 1,
                wifi: true,
            },
            details: "Double Sharing | Unisex | Food: Included",
            rent: "From ₹7,500 / month",
        },
        {
            id: 2,
            name: "Comfort Stay PG – Karol Bagh",
            image: "https://c.animaapp.com/mbi2us3vKS97yu/img/rectangle-222-1.png",
            amenities: {
                bedroom: 1,
                bath: 1,
                wifi: true,
            },
            details: "Double Sharing | Unisex | Food: Included",
            rent: "From ₹7,500 / month",
        },
        {
            id: 3,
            name: "Comfort Stay PG – Karol Bagh",
            image: "https://c.animaapp.com/mbi2us3vKS97yu/img/rectangle-222-2.png",
            amenities: {
                bedroom: 1,
                bath: 1,
                wifi: true,
            },
            details: "Double Sharing | Unisex | Food: Included",
            rent: "From ₹7,500 / month",
        },
        {
            id: 4,
            name: "Comfort Stay PG – Karol Bagh",
            image: "https://c.animaapp.com/mbi2us3vKS97yu/img/rectangle-222-3.png",
            amenities: {
                bedroom: 1,
                bath: 1,
                wifi: true,
            },
            details: "Double Sharing | Unisex | Food: Included",
            rent: "From ₹7,500 / month",
        },
        {
            id: 5,
            name: "Comfort Stay PG – Karol Bagh",
            image: "https://c.animaapp.com/mbi2us3vKS97yu/img/rectangle-222-4.png",
            amenities: {
                bedroom: 1,
                bath: 1,
                wifi: true,
            },
            details: "Double Sharing | Unisex | Food: Included",
            rent: "From ₹7,500 / month",
        },
    ];

    return (
        <section className="flex flex-col items-center gap-[60px] w-full max-w-[900px] mx-auto">
            <div className="flex flex-col w-full items-start gap-5">
                {apartmentListings.map((apartment) => (
                    <Card
                        key={apartment.id}
                        className="flex w-full overflow-hidden rounded-[60px_60px_60px_12px] bg-bg"
                    >
                        <img
                            className="w-[205px] object-cover"
                            alt={`${apartment.name} property`}
                            src={apartment.image}
                        />
                        <CardContent className="flex flex-col items-start gap-1 px-2 py-5 flex-1">
                            <h3 className="self-stretch font-desktop-subtitle-bold font-[number:var(--desktop-subtitle-bold-font-weight)] text-text text-[length:var(--desktop-subtitle-bold-font-size)] tracking-[var(--desktop-subtitle-bold-letter-spacing)] leading-[var(--desktop-subtitle-bold-line-height)]">
                                {apartment.name}
                            </h3>

                            <div className="flex flex-col items-start gap-1 self-stretch w-full">
                                <div className="flex flex-col items-start gap-2 py-2.5 self-stretch w-full">
                                    <div className="flex gap-5 self-stretch w-full items-start">
                                        <div className="flex items-start gap-2">
                                            <div className="relative w-5 h-5">
                                                <img
                                                    className="absolute w-[17px] h-3.5 top-[3px] left-0.5"
                                                    alt="Bedroom icon"
                                                    src="https://c.animaapp.com/mbi2us3vKS97yu/img/group.png"
                                                />
                                            </div>
                                            <span className="font-desktop-description font-[number:var(--desktop-description-font-weight)] text-text text-[length:var(--desktop-description-font-size)] tracking-[var(--desktop-description-letter-spacing)] leading-[var(--desktop-description-line-height)] whitespace-nowrap">
                                                {apartment.amenities.bedroom} bedroom
                                            </span>
                                        </div>

                                        <div className="flex items-start gap-2">
                                            <img
                                                className="w-5 h-5"
                                                alt="Bath icon"
                                                src="https://c.animaapp.com/mbi2us3vKS97yu/img/fa-solid-bath.svg"
                                            />
                                            <span className="font-desktop-description font-[number:var(--desktop-description-font-weight)] text-text text-[length:var(--desktop-description-font-size)] tracking-[var(--desktop-description-letter-spacing)] leading-[var(--desktop-description-line-height)] whitespace-nowrap">
                                                {apartment.amenities.bath} bath
                                            </span>
                                        </div>

                                        <div className="flex items-start gap-2">
                                            <div className="relative w-5 h-5">
                                                <img
                                                    className="absolute w-[17px] h-[13px] top-[3px] left-0.5"
                                                    alt="WiFi icon"
                                                    src="https://c.animaapp.com/mbi2us3vKS97yu/img/group-1.png"
                                                />
                                            </div>
                                            <span className="font-desktop-description font-[number:var(--desktop-description-font-weight)] text-text text-[length:var(--desktop-description-font-size)] tracking-[var(--desktop-description-letter-spacing)] leading-[var(--desktop-description-line-height)] whitespace-nowrap">
                                                WiFi
                                            </span>
                                        </div>
                                    </div>

                                    <p className="self-stretch font-desktop-description font-[number:var(--desktop-description-font-weight)] text-text text-[length:var(--desktop-description-font-size)] tracking-[var(--desktop-description-letter-spacing)] leading-[var(--desktop-description-line-height)]">
                                        {apartment.details}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Button className="px-5 py-1 bg-[#064749] rounded-[30px] text-white font-bold">
                                        View Details
                                    </Button>
                                    <span className="[font-family:'Lato',Helvetica] font-extrabold text-[#49735a] text-base tracking-[0] leading-5 whitespace-nowrap">
                                        Rent: {apartment.rent}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Button className="px-10 py-3 rounded-[40px] bg-green">
                <span className="font-desktop-subtitle-bold font-[number:var(--desktop-subtitle-bold-font-weight)] text-white text-[length:var(--desktop-subtitle-bold-font-size)] tracking-[var(--desktop-subtitle-bold-letter-spacing)] leading-[var(--desktop-subtitle-bold-line-height)] whitespace-nowrap [font-style:var(--desktop-subtitle-bold-font-style)]">
                    Show more
                </span>
            </Button>
        </section>
    );
};
