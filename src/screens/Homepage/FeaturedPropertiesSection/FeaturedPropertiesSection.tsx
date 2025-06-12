import React from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { useNavigate } from "react-router-dom";

export const FeaturedPropertiesSection = (): JSX.Element => {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate("/property-details");
    };
    // Property data array for mapping
    const properties = [
        {
            id: 1,
            name: "XYZ PG or Hotel",
            location: "Delhi, India",
            price: "Rs. 5000/Month",
            image:
                "https://c.animaapp.com/mbhmsf5eMRDRNk/img/unsplash-ywwuobjy60c.svg",
            amenities: [
                {
                    icon: "https://c.animaapp.com/mbhmsf5eMRDRNk/img/group-4.png",
                    text: "1 bedroom",
                },
                {
                    icon: "https://c.animaapp.com/mbhmsf5eMRDRNk/img/fa-solid-bath.svg",
                    text: "1 bath",
                },
                {
                    icon: "https://c.animaapp.com/mbhmsf5eMRDRNk/img/group-5.png",
                    text: "WiFi",
                },
            ],
        },
        {
            id: 2,
            name: "XYZ PG or Hotel",
            location: "Delhi, India",
            price: "Rs. 5000/Month",
            image:
                "https://c.animaapp.com/mbhmsf5eMRDRNk/img/unsplash-ywwuobjy60c.svg",
            amenities: [
                {
                    icon: "https://c.animaapp.com/mbhmsf5eMRDRNk/img/group-6.png",
                    text: "1 bedroom",
                },
                {
                    icon: "https://c.animaapp.com/mbhmsf5eMRDRNk/img/fa-solid-bath.svg",
                    text: "1 bath",
                },
                {
                    icon: "https://c.animaapp.com/mbhmsf5eMRDRNk/img/group-7.png",
                    text: "WiFi",
                },
            ],
        },
        {
            id: 3,
            name: "XYZ PG or Hotel",
            location: "Delhi, India",
            price: "Rs. 5000/Month",
            image:
                "https://c.animaapp.com/mbhmsf5eMRDRNk/img/unsplash-ywwuobjy60c.svg",
            amenities: [
                {
                    icon: "https://c.animaapp.com/mbhmsf5eMRDRNk/img/group-8.png",
                    text: "1 bedroom",
                },
                {
                    icon: "https://c.animaapp.com/mbhmsf5eMRDRNk/img/fa-solid-bath.svg",
                    text: "1 bath",
                },
                {
                    icon: "https://c.animaapp.com/mbhmsf5eMRDRNk/img/group-9.png",
                    text: "WiFi",
                },
            ],
        },
        {
            id: 4,
            name: "XYZ PG or Hotel",
            location: "Delhi, India",
            price: "Rs. 5000/Month",
            image:
                "https://c.animaapp.com/mbhmsf5eMRDRNk/img/unsplash-ywwuobjy60c.svg",
            amenities: [
                {
                    icon: "https://c.animaapp.com/mbhmsf5eMRDRNk/img/group-10.png",
                    text: "1 bedroom",
                },
                {
                    icon: "https://c.animaapp.com/mbhmsf5eMRDRNk/img/fa-solid-bath.svg",
                    text: "1 bath",
                },
                {
                    icon: "https://c.animaapp.com/mbhmsf5eMRDRNk/img/group-11.png",
                    text: "WiFi",
                },
            ],
        },
    ];

    return (
        <section className="py-4 sm:py-8 md:py-12 px-2 sm:px-4 w-full">
            <div className="container mx-auto">
                <h2 className="text-center mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold text-gray-900">
                    Featured PG/Hostels
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                    {properties.map((property) => (
                        <Card
                            key={property.id}
                            className="rounded-xl sm:rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full flex flex-col border border-gray-100"
                        >
                            <div className="relative">
                                <div className="relative w-full pt-[70%] sm:pt-[75%] overflow-hidden">
                                    <img
                                        className="absolute top-0 left-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        alt="Property"
                                        src={property.image}
                                    />
                                </div>
                            </div>

                            <CardContent className="p-3 sm:p-4 flex-grow flex flex-col">
                                <div className="mb-2 sm:mb-3">
                                    <h3 className="text-base font-medium text-gray-900 mb-1">
                                        {property.name}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {property.location}
                                    </p>
                                </div>

                                <div className="mt-auto">
                                    <div className="mb-2 sm:mb-3">
                                        <p className="text-sm">
                                            <span className="text-gray-500">Starting at </span>
                                            <span className="text-green-600 font-semibold">{property.price}</span>
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-1.5 mb-3">
                                        {property.amenities.map((amenity, index) => (
                                            <div key={index} className="flex items-center gap-1 bg-gray-50 rounded-full px-2 py-1">
                                                <img
                                                    className="w-3 h-3"
                                                    alt={amenity.text}
                                                    src={amenity.icon}
                                                />
                                                <span className="text-xs text-gray-600">
                                                    {amenity.text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <Button
                                        onClick={handleViewDetails}
                                        className="w-full bg-[#064749] hover:bg-[#053435] text-white rounded-lg py-2 text-sm font-medium transition-colors duration-200"
                                    >
                                        View Details
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
