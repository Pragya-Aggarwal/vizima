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
import { BulkAccommodationSection } from "./BulkAccommodationSection/BulkAccommodationSection";
import { home } from "../../assets";
import { ChevronDownIcon } from "lucide-react";

export const Homepage = (): JSX.Element => {
    return (
        <div className="bg-white flex flex-col items-center w-full">
            <div className="w-full relative">
                {/* Navigation Menu */}


                {/* Hero Section with Background Image */}
                <div className="w-full relative">
                    <img
                        className="w-full h-[767px] object-cover"
                        alt="Hero background"
                        src={home}
                    />

                    {/* Overlay Sections */}
                    <div className="absolute inset-0 flex flex-col justify-between mt-24">
                        <RentYourSpaceSection />

                    </div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20 w-full px-4">
                        <SearchSection />
                    </div>
                </div>

                {/* Main Content Sections */}
                <WhyChooseUsSection />
                <HeroSection />

                <FeaturedPropertiesSection />
                <PartnershipSection />
                <CorporateInfoSection />
                <TestimonialsSection />

            </div>
        </div >
    );
};

