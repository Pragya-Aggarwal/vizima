import { ChevronDownIcon } from "lucide-react";
import React from "react";
import { ListingsSection } from "./ListingsSection/ListingsSection";
import { CorporateSection } from "./CorporateSection";
import { PartnershipsSection } from "./PartnershipsSection";
import { FeaturesSection } from "./FeaturesSection";
import { HeroSection } from "./HeroSection";
import { TestimonialsSection } from "./TestimonialsSection";

export const Blog = (): JSX.Element => {
    return (
        <div className="bg-white flex flex-col items-center w-full">
            <div className="w-full max-w-[100%] relative">
                {/* Add vertical spacing containers */}
                <div className="py-16">
                    <ListingsSection />
                </div>

                <div className="py-16">
                    <CorporateSection />
                </div>

                <div className="py-9">
                    <PartnershipsSection />
                </div>

                <div className="py-1">
                    <FeaturesSection />
                </div>

                <div className="py-16">
                    <HeroSection />
                </div>

                <div className="py-16">
                    <TestimonialsSection />
                </div>
            </div>
        </div>
    );
};