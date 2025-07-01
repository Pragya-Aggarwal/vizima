import React, { useState, useEffect, useCallback } from "react";
import { NavigationMenuSection } from "./NavigationMenuSection/NavigationMenuSection";
import { RentYourSpaceSection } from "./RentYourSpaceSection";
import { SearchSection } from "./SearchSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { WhyChooseUsSection } from "./WhyChooseUsSection/WhyChooseUsSection";
import { HeroSection } from "./HeroSection";
import { FeaturedPropertiesSection } from "./FeaturedPropertiesSection/FeaturedPropertiesSection";
import { PartnershipSection } from "./PartnershipSection/PartnershipSection";
import { CorporateInfoSection } from "./CorporateInfoSection";
import { bannerService, Banner } from '../../api/services/bannerService';
import { home } from "../../assets";

const BannerSlider = () => {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch banners
    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const data = await bannerService.getBanners();
                setBanners(data);
            } catch (error) {
                console.error('Error loading banners:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBanners();
    }, []);

    // Auto-slide functionality
    useEffect(() => {
        if (banners.length <= 1) return;
        
        const interval = setInterval(() => {
            setCurrentBannerIndex((prevIndex) => 
                prevIndex === banners.length - 1 ? 0 : prevIndex + 1
            );
        }, 20000); // 20 seconds

        return () => clearInterval(interval);
    }, [banners.length]);

    if (isLoading) {
        return (
            <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[720px] bg-gray-200 animate-pulse" />
        );
    }

    // If no banners, show default image
    if (banners.length === 0) {
        return (
            <img
                className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[720px] object-cover"
                alt="Default background"
                src={home}
            />
        );
    }

    return (
        <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[720px] overflow-hidden">
            {banners.map((banner, index) => (
                <div 
                    key={banner.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentBannerIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <img
                        className="w-full h-full object-cover"
                        src={banner.imageUrl}
                        alt={banner.title || 'Banner'}
                        loading={index === 0 ? 'eager' : 'lazy'}
                    />
                </div>
            ))}
            
            {/* Banner indicators */}
            {banners.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                    {banners.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentBannerIndex(index)}
                            className={`w-3 h-3 rounded-full ${
                                index === currentBannerIndex 
                                    ? 'bg-white w-6' 
                                    : 'bg-white/50 hover:bg-white/75'
                            } transition-all duration-300`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export const Homepage = (): JSX.Element => {
    return (
        <div className="bg-white flex flex-col items-center w-full">
            <div className="w-full relative">
                {/* Navigation Menu */}
                <NavigationMenuSection />

                {/* Hero Section with RentYourSpace and Search */}
                <div className="w-full relative">
                    {/* Banner Images */}
                <BannerSlider />

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
                <div className="mt-10 sm:mt-20 md:mt-28 lg:mt-24">
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

