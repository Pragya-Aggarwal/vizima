import { StarIcon, MapPinIcon, BedDoubleIcon } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { BookingConfirmationSection } from "./BookingConfirmationSection/BookingConfirmationSection";
import { CancellationPolicySection } from "./CancellationPolicySection/CancellationPolicySection";
import { HeaderSection } from "./HeaderSection/HeaderSection";
import { TrustBoostersSection } from "./TrustBoostersSection/TrustBoostersSection";
import { BookingFormSection } from "./BookingFormSection/BookingFormSection";
import { BookAForm } from "./BookForm/BookAForm";
import { TabsContent } from "@radix-ui/react-tabs";
import { ScheduleAForm } from "./ScheduleAForm/ScheduleAForm";
import { DateForm } from "./ScheduleAForm/DateForm";

export const BookARoom = (): JSX.Element => {
    // Property data
    const propertyData = {
        name: "Comfort Stay PG Karol Bagh",
        price: "Rs. 8,000",
        period: "/ month",
        rating: "4.5",
        reviews: "230",
        location: "Karol Bagh, New Delhi",
        amenities: ["Furnished Room", "24/7 Security", "WiFi"],
        images: [
            "https://c.animaapp.com/mbi5x2be8VZzX7/img/rectangle-229.svg",
            "https://c.animaapp.com/mbi5x2be8VZzX7/img/rectangle-230.svg",
        ],
    };

    return (
        <div className="bg-white flex flex-row justify-center w-full">
            <div className="bg-white overflow-hidden w-full max-w-[100%] relative">
                <div className="w-full max-w-[1500px] mx-auto mt-28 mb-8">
                    <Card className="rounded-[30px] border-none shadow-lg overflow-hidden">
                        <CardContent className="p-0">
                            <div className="flex flex-col md:flex-row">
                                {/* Image Gallery Section */}
                                <div className="flex flex-col w-full md:w-[595px] relative">
                                    <div className="relative h-[400px] md:h-[600px]">
                                        <img
                                            className="w-full h-full object-cover"
                                            alt="Property main view"
                                            src={propertyData.images[0]}
                                        />
                                        <div className="absolute bottom-4 left-4 flex gap-2">
                                            {propertyData.images.map((_, index) => (
                                                <div
                                                    key={index}
                                                    className={`w-2 h-2 rounded-full ${index === 0 ? "bg-white" : "bg-white/50"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Property Details Section */}
                                <div className="flex flex-col p-8 md:p-12 flex-grow bg-white">
                                    {/* Location and Rating Row */}
                                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                                        <MapPinIcon className="w-5 h-5" />
                                        <span className="text-sm">{propertyData.location}</span>
                                    </div>

                                    {/* Property Name */}
                                    <h1 className="font-['Lato',Helvetica] font-bold text-[32px] leading-tight text-gray-900 mb-6">
                                        {propertyData.name}
                                    </h1>

                                    {/* Rating Section */}
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, index) => (
                                                <StarIcon
                                                    key={index}
                                                    className={`w-5 h-5 ${index < Math.floor(Number(propertyData.rating))
                                                        ? "text-yellow-400 fill-current"
                                                        : "text-gray-300"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-lg font-semibold">{propertyData.rating}</span>
                                        <span className="text-gray-600">({propertyData.reviews} reviews)</span>
                                    </div>

                                    {/* Amenities */}
                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        {propertyData.amenities.map((amenity, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <BedDoubleIcon className="w-5 h-5 text-gray-600" />
                                                <span className="text-gray-700">{amenity}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Price Section */}
                                    <div className="flex items-baseline gap-2 mb-8">
                                        <span className="text-4xl font-bold text-gray-900">
                                            {propertyData.price}
                                        </span>
                                        <span className="text-xl text-gray-600">
                                            {propertyData.period}
                                        </span>
                                    </div>

                                    <BookingConfirmationSection />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="w-full max-w-[1000px] mx-auto">
                    <Tabs defaultValue="book" className="w-full">
                        {/* Tabs Navigation - Styled as a toggle button */}
                        <div className="flex justify-center mb-8">
                            <TabsList className="h-42 p-1 bg-[#e2f1e8] rounded-full">
                                <TabsTrigger
                                    value="book"
                                    className="px-6 h-14 rounded-full transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=inactive]:bg-transparent"
                                >
                                    <span className="font-['Lato',Helvetica] font-medium text-black text-lg">
                                        Book a Room
                                    </span>
                                </TabsTrigger>
                                <TabsTrigger
                                    value="schedule"
                                    className="px-6 h-10 rounded-full transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=inactive]:bg-transparent"
                                >
                                    <span className="font-['Lato',Helvetica] font-medium text-black text-lg">
                                        Schedule a Visit
                                    </span>
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        {/* Tab Content */}
                        <div className="mt-8">
                            <TabsContent value="book">
                                <div className="flex justify-center">
                                    <div className="w-full max-w-[900px]">
                                        <h2 className="font-desktop-h2 font-[number:var(--desktop-h2-font-weight)] text-text text-[length:var(--desktop-h2-font-size)] tracking-[var(--desktop-h2-letter-spacing)] leading-[var(--desktop-h2-line-height)] mb-6">
                                            Booking Form
                                        </h2>
                                        <BookAForm />
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="schedule">
                                <div className="flex justify-center">
                                    <div className="w-full max-w-[900px]">
                                        <h2 className="font-desktop-h2 font-[number:var(--desktop-h2-font-weight)] text-text text-[length:var(--desktop-h2-font-size)] tracking-[var(--desktop-h2-letter-spacing)] leading-[var(--desktop-h2-line-height)] mb-6">
                                            Schedule A Form
                                        </h2>
                                        <ScheduleAForm />
                                    </div>
                                </div>
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>

                <HeaderSection />
                <TrustBoostersSection />
                <BookingFormSection />
            </div>
        </div>
    );
};
