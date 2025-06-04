import { StarIcon } from "lucide-react";
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
        images: [
            "https://c.animaapp.com/mbi5x2be8VZzX7/img/rectangle-229.svg",
            "https://c.animaapp.com/mbi5x2be8VZzX7/img/rectangle-230.svg",
        ],
    };

    return (
        <div className="bg-white flex flex-row justify-center w-full">
            <div className="bg-white overflow-hidden w-full max-w-[100%] relative">


                <div className="w-full max-w-[1500px] mx-auto mt-28 mb-8">
                    <Card className="rounded-[30px] border-[3px] border-solid border-[#c3d0d7] p-0">
                        <CardContent className="p-0">
                            <div className="flex flex-col md:flex-row">
                                <div className="flex flex-col w-full md:w-[595px]">
                                    <img
                                        className="w-full h-72 object-cover"
                                        alt="Property image top"
                                        src={propertyData.images[0]}
                                    />
                                    <img
                                        className="w-full h-72 object-cover mt-[21px]"
                                        alt="Property image bottom"
                                        src={propertyData.images[1]}
                                    />
                                </div>

                                <div className="flex flex-col p-[50px] pl-[50px] md:pl-[60px]">
                                    <h1 className="font-['Lato',Helvetica] font-extrabold text-text text-[39px] leading-[60px]">
                                        {propertyData.name}
                                    </h1>

                                    <div className="flex items-end mt-[56px]">
                                        <div className="font-desktop-h1 font-[number:var(--desktop-h1-font-weight)] text-text text-[length:var(--desktop-h1-font-size)] tracking-[var(--desktop-h1-letter-spacing)] leading-[var(--desktop-h1-line-height)] whitespace-nowrap">
                                            {propertyData.price}
                                        </div>
                                        <div className="font-['Lato',Helvetica] font-normal text-text text-4xl tracking-[0] leading-[44px] ml-3">
                                            {propertyData.period}
                                        </div>
                                    </div>

                                    <BookingConfirmationSection />

                                    <div className="mt-4">
                                        <div className="font-['Lato',Helvetica] text-black text-3xl tracking-[0] leading-6 whitespace-nowrap">
                                            <span className="font-bold">{propertyData.rating}</span>
                                            <span className="font-normal">
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/
                                                {propertyData.reviews} reviews
                                            </span>
                                        </div>

                                        <div className="flex items-center mt-4">
                                            {[...Array(5)].map((_, index) => (
                                                <StarIcon
                                                    key={index}
                                                    className={`w-[19px] h-[18px] ${index === 4 ? "w-6 h-[23px] -mt-[6px]" : ""} fill-current text-yellow-400`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>


                <div className="w-full max-w-[1285px] mx-auto">
                    <Tabs defaultValue="book" className="w-full">
                        {/* Tabs Navigation */}
                        <TabsList className="w-full h-[103px] p-0 bg-transparent">
                            <TabsTrigger
                                value="book"
                                className="w-1/2 h-[102px] rounded-[30px] data-[state=active]:bg-white data-[state=active]:border data-[state=active]:border-solid data-[state=active]:border-[#e2f1e8] data-[state=inactive]:bg-[#e2f1e8]"
                            >
                                <span className="font-['Lato',Helvetica] font-bold text-black text-4xl tracking-[0] leading-6 whitespace-nowrap">
                                    Book a Room
                                </span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="schedule"
                                className="w-1/2 h-[102px] rounded-[30px] data-[state=active]:bg-white data-[state=active]:border data-[state=active]:border-solid data-[state=active]:border-[#e2f1e8] data-[state=inactive]:bg-[#e2f1e8]"
                            >
                                <span className="font-['Lato',Helvetica] font-bold text-black text-4xl tracking-[0] leading-6 whitespace-nowrap">
                                    Schedule a Visit
                                </span>
                            </TabsTrigger>
                        </TabsList>

                        {/* Tab Content */}
                        <div className="mt-8">
                            <TabsContent value="book">
                                <div className="w-full max-w-[1285px] mx-auto mt-10">
                                    <h2 className="font-desktop-h2 font-[number:var(--desktop-h2-font-weight)] text-text text-[length:var(--desktop-h2-font-size)] tracking-[var(--desktop-h2-letter-spacing)] leading-[var(--desktop-h2-line-height)] mb-6">
                                        Booking Form
                                    </h2>

                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="w-full md:w-1/2">
                                            <BookAForm />
                                        </div>
                                        <div className="w-full md:w-1/2">
                                            <CancellationPolicySection />
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="schedule">
                                <div className="w-full max-w-[1285px] mx-auto mt-10">
                                    <h2 className="font-desktop-h2 font-[number:var(--desktop-h2-font-weight)] text-text text-[length:var(--desktop-h2-font-size)] tracking-[var(--desktop-h2-letter-spacing)] leading-[var(--desktop-h2-line-height)] mb-6">
                                        Schedule A Visit
                                    </h2>

                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="w-full md:w-1/2">
                                            <ScheduleAForm />
                                        </div>
                                        <div className="w-full md:w-1/2">
                                            <DateForm />
                                        </div>
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
