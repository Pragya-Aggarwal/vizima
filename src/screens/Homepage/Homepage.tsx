import React from "react";
import { NavigationMenuSection } from "./NavigationMenuSection/NavigationMenuSection";
import { RentYourSpaceSection } from "./RentYourSpaceSection";
import { SearchSection } from "./SearchSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { WhyChooseUsSection } from "./WhyChooseUsSection/WhyChooseUsSection";
import { HeroSection } from "./HeroSection";
import { FeaturedPropertiesSection } from "./FeaturedPropertiesSection/FeaturedPropertiesSection";
import { PartnershipSection } from "./PartnershipSection/PartnershipSection";
import { CorporateInfoSection } from "./CorporateInfoSection";
import { home } from "../../assets";

export const Homepage = (): JSX.Element => {
    return (
        <div className="bg-white flex flex-col items-center w-full">
            <div className="w-full relative">
                {/* Navigation Menu */}
                <NavigationMenuSection />

                {/* Hero Section with RentYourSpace and Search */}
                <div className="w-full relative">
                    {/* Background Image */}
                    <img
                        className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[720px] object-cover"
                        alt="Hero background"
                        src={home}
                    />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col">
                        {/* RentYourSpace Section - Hidden on mobile */}
                        <div className="mt-6 sm:mt-12 md:mt-20 lg:mt-36 px-4 sm:px-6 md:px-8 lg:px-10">
                            <RentYourSpaceSection />
                        </div>

                        {/* Search Section - Centered on mobile, bottom on larger screens */}
                        <div className="absolute w-full sm:bottom-0 top-[60%] sm:top-auto transform -translate-y-1/2 sm:-translate-y-1/2 z-10">
                            <SearchSection />
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="mt-20 sm:mt-32 md:mt-40 lg:mt-44">
                    <WhyChooseUsSection />
                    <HeroSection />
                    <FeaturedPropertiesSection />
                    <PartnershipSection />
                    <CorporateInfoSection />
                    <TestimonialsSection />
                </div>
            </div>
        </div>
    );
};

