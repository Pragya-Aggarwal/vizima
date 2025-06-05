import React from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { useNavigate } from "react-router-dom";
import { Wifi, Bath, BedDouble, Users, MapPin, UtensilsCrossed, Star, Heart } from "lucide-react";

interface ApartmentListing {
    id: number;
    name: string;
    location: string;
    image: string;
    amenities: {
        bedroom: number;
        bath: number;
        wifi: boolean;
    };
    tags: string[];
    rent: string;
    rating: number;
    reviews: number;
    isNew?: boolean;
}

export const ApartmentListingsSection = (): JSX.Element => {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate("/property-details");
    };

    const apartmentListings: ApartmentListing[] = [
        {
            id: 1,
            name: "Comfort Stay PG – Karol Bagh",
            location: "Karol Bagh, New Delhi",
            image: "https://c.animaapp.com/mbi2us3vKS97yu/img/rectangle-222.png",
            amenities: {
                bedroom: 1,
                bath: 1,
                wifi: true,
            },
            tags: ["Double Sharing", "Unisex", "Food Included"],
            rent: "7,500",
            rating: 4.5,
            reviews: 230,
            isNew: true
        },
        {
            id: 2,
            name: "Comfort Stay PG – Karol Bagh",
            location: "Karol Bagh, New Delhi",
            image: "https://c.animaapp.com/mbi2us3vKS97yu/img/rectangle-222-1.png",
            amenities: {
                bedroom: 1,
                bath: 1,
                wifi: true,
            },
            tags: ["Double Sharing", "Unisex", "Food Included"],
            rent: "7,500",
            rating: 4.3,
            reviews: 180,
        },
        {
            id: 3,
            name: "Comfort Stay PG – Karol Bagh",
            location: "Karol Bagh, New Delhi",
            image: "https://c.animaapp.com/mbi2us3vKS97yu/img/rectangle-222-2.png",
            amenities: {
                bedroom: 1,
                bath: 1,
                wifi: true,
            },
            tags: ["Double Sharing", "Unisex", "Food Included"],
            rent: "7,500",
            rating: 4.7,
            reviews: 320,
        },
        // {
        //     id: 4,
        //     name: "Comfort Stay PG – Karol Bagh",
        //     location: "Karol Bagh, New Delhi",
        //     image: "https://c.animaapp.com/mbi2us3vKS97yu/img/rectangle-222-3.png",
        //     amenities: {
        //         bedroom: 1,
        //         bath: 1,
        //         wifi: true,
        //     },
        //     tags: ["Double Sharing", "Unisex", "Food Included"],
        //     rent: "7,500",
        //     rating: 4.4,
        //     reviews: 156,
        // },
        // {
        //     id: 5,
        //     name: "Comfort Stay PG – Karol Bagh",
        //     location: "Karol Bagh, New Delhi",
        //     image: "https://c.animaapp.com/mbi2us3vKS97yu/img/rectangle-222-4.png",
        //     amenities: {
        //         bedroom: 1,
        //         bath: 1,
        //         wifi: true,
        //     },
        //     tags: ["Double Sharing", "Unisex", "Food Included"],
        //     rent: "7,500",
        //     rating: 4.6,
        //     reviews: 275,
        // },
    ];

    return (
        <section className="py-6 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-4">
                    {apartmentListings.map((apartment) => (
                        <Card
                            key={apartment.id}
                            className="bg-white overflow-hidden rounded-2xl border-none shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <div className="flex flex-col lg:flex-row">
                                {/* Image Section */}
                                <div className="relative lg:w-[300px] h-[140px] lg:h-[180px] overflow-hidden group">
                                    <img
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        alt={`${apartment.name} property`}
                                        src={apartment.image}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                    {/* Tags Overlay */}
                                    <div className="absolute top-2 left-2 flex items-center gap-2">
                                        {apartment.isNew && (
                                            <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-semibold rounded-full">
                                                New
                                            </span>
                                        )}
                                        <span className="px-2 py-0.5 bg-blue-500 text-white text-xs font-semibold rounded-full">
                                            Featured
                                        </span>
                                    </div>

                                    {/* Wishlist Button */}
                                    <button className="absolute top-2 right-2 p-1.5 bg-green rounded-full hover:bg-white transition-colors">
                                        <Heart className="w-4 h-4 text-white" />
                                    </button>
                                </div>

                                {/* Content Section */}
                                <div className="flex-1 p-4">
                                    <div className="flex flex-col h-full">
                                        {/* Header */}
                                        <div className="mb-3">
                                            <div className="flex items-center gap-2 text-gray-500 mb-1">
                                                <MapPin className="w-4 h-4 text-green-600" />
                                                <span className="text-xs font-medium">{apartment.location}</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                                                {apartment.name}
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center gap-1 px-2 py-0.5 bg-yellow-50 rounded-lg">
                                                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                                    <span className="text-xs font-semibold text-gray-900">{apartment.rating}</span>
                                                </div>
                                                <span className="text-xs text-gray-500">({apartment.reviews} reviews)</span>
                                            </div>
                                        </div>

                                        {/* Amenities Grid */}
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                                            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                                                <Users className="w-4 h-4 text-gray-600" />
                                                <div>
                                                    <p className="text-xs font-medium text-gray-900">1 Room</p>
                                                    <p className="text-[10px] text-gray-500">Double Sharing</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                                                <Bath className="w-4 h-4 text-gray-600" />
                                                <div>
                                                    <p className="text-xs font-medium text-gray-900">1 Bath</p>
                                                    <p className="text-[10px] text-gray-500">Attached</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                                                <Wifi className="w-4 h-4 text-gray-600" />
                                                <div>
                                                    <p className="text-xs font-medium text-gray-900">WiFi</p>
                                                    <p className="text-[10px] text-gray-500">High Speed</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                                                <UtensilsCrossed className="w-4 h-4 text-gray-600" />
                                                <div>
                                                    <p className="text-xs font-medium text-gray-900">Food</p>
                                                    <p className="text-[10px] text-gray-500">3 Times</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                                            <div>
                                                <p className="text-xs text-gray-500">Starting from</p>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-xl font-bold text-gray-900">₹{apartment.rent}</span>
                                                    <span className="text-sm text-gray-600">/month</span>
                                                </div>
                                            </div>
                                            <Button
                                                onClick={handleViewDetails}
                                                className="bg-green hover:bg-green text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                            >
                                                View Details
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-6">
                    <Button className="bg-white border-2 border-green text-green hover:bg-green hover:text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors">
                        Show More Properties
                    </Button>
                </div>
            </div>
        </section>
    );
};
