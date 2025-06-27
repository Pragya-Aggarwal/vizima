import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { cityService, City } from "../../../api/services/cityService";
import { Skeleton } from "../../../components/ui/skeleton"

export const HeroSection = (): JSX.Element => {
    const navigate = useNavigate();
    const [showAllCities, setShowAllCities] = useState(false);
    const [cities, setCities] = useState<City[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                setIsLoading(true);
                const data = await cityService.getCities();
                const transformedCities = cityService.transformCities(data);
                setCities(transformedCities);
            } catch (err) {
                console.error('Failed to fetch cities:', err);
                setError('Failed to load cities. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCities();
    }, []);

    // Determine which cities to display
    const displayedCities = showAllCities ? cities : cities.slice(0, 5);
    
    // Navigate to product page with city filter
    const handleCityClick = (cityName: string) => {
        navigate(`/product`);
    };

    // Loading state
    if (isLoading) {
        return (
            <section className="flex flex-col items-center gap-8 sm:gap-12 md:gap-16 px-4 sm:px-6 md:px-8 lg:px-20 py-10 sm:py-12 md:py-16 w-full">
                <h2 className="text-2xl sm:text-[length:var(--desktop-h2-font-size)] font-desktop-h2 font-[number:var(--desktop-h2-font-weight)] text-text tracking-[var(--desktop-h2-letter-spacing)] leading-[var(--desktop-h2-line-height)] [font-style:var(--desktop-h2-font-style)]">
                    Choose Your City
                </h2>
                <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 w-full max-w-7xl mx-auto">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="flex flex-col items-center gap-3 sm:gap-4 w-full">
                            <Skeleton className="w-full aspect-square rounded-2xl" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    // Error state
    if (error) {
        return (
            <section className="flex flex-col items-center gap-8 sm:gap-12 md:gap-16 px-4 sm:px-6 md:px-8 lg:px-20 py-10 sm:py-12 md:py-16 w-full">
                <h2 className="text-2xl sm:text-[length:var(--desktop-h2-font-size)] font-desktop-h2 font-[number:var(--desktop-h2-font-weight)] text-text tracking-[var(--desktop-h2-letter-spacing)] leading-[var(--desktop-h2-line-height)] [font-style:var(--desktop-h2-font-style)]">
                    Choose Your City
                </h2>
                <div className="text-center">
                    <p className="text-red-500 mb-4">{error}</p>
                    <Button 
                        onClick={() => window.location.reload()}
                        className="bg-green-600 hover:bg-green-700"
                    >
                        Retry
                    </Button>
                </div>
            </section>
        );
    }

    // Empty state
    if (cities.length === 0) {
        return (
            <section className="flex flex-col items-center gap-8 sm:gap-12 md:gap-16 px-4 sm:px-6 md:px-8 lg:px-20 py-10 sm:py-12 md:py-16 w-full">
                <h2 className="text-2xl sm:text-[length:var(--desktop-h2-font-size)] font-desktop-h2 font-[number:var(--desktop-h2-font-weight)] text-text tracking-[var(--desktop-h2-letter-spacing)] leading-[var(--desktop-h2-line-height)] [font-style:var(--desktop-h2-font-style)]">
                    No Cities Available
                </h2>
                <p className="text-gray-500">Check back later for available cities.</p>
            </section>
        );
    }

    return (
        <section className="flex flex-col items-center gap-8 sm:gap-12 md:gap-16 px-4 sm:px-6 md:px-8 lg:px-20 py-10 sm:py-12 md:py-16 w-full">
            <h2 className="text-2xl sm:text-[length:var(--desktop-h2-font-size)] font-desktop-h2 font-[number:var(--desktop-h2-font-weight)] text-text tracking-[var(--desktop-h2-letter-spacing)] leading-[var(--desktop-h2-line-height)] [font-style:var(--desktop-h2-font-style)]">
                Choose Your City
            </h2>

            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 w-full max-w-7xl mx-auto">
                {displayedCities.map((city, index) => (
                    <div key={index} className="flex flex-col items-center gap-3 sm:gap-4 w-full">
                        <div 
                            className="w-full group mx-auto cursor-pointer" 
                            style={{ 
                                aspectRatio: '1/1',
                                maxWidth: displayedCities.length <= 2 ? '300px' : 'none'
                            }}
                            onClick={() => handleCityClick(city.name)}
                        >
                        <div
                            className="relative w-full h-full group"
                            style={{
                                aspectRatio: '1/1',
                                borderRadius: '1.5rem',
                                overflow: 'hidden',
                                backgroundColor: 'transparent', // Ensures background doesn't show
                                boxShadow: 'none' // Remove all shadows causing the white glow
                            }}
                        >
                            <img
                                src={city.imageUrl}
                                alt={city.name}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                style={{
                                    display: 'block',
                                    borderRadius: '0', // Don't round the image, let the container clip it
                                }}
                            />
                        </div>
                        </div>
                        <h3 className="font-desktop-h4 font-medium text-text text-base sm:text-lg md:text-xl text-center w-full truncate px-1 sm:px-2">
                            {city.name}
                        </h3>
                    </div>
                ))}
            </div>

            {cities.length > 5 && (
                <Button
                    className="px-10 py-3 bg-green rounded-[40px] hover:bg-green/90"
                    onClick={() => setShowAllCities(!showAllCities)}
                >
                    <span className="font-desktop-subtitle-bold font-[number:var(--desktop-subtitle-bold-font-weight)] text-white text-[length:var(--desktop-subtitle-bold-font-size)] tracking-[var(--desktop-subtitle-bold-letter-spacing)] leading-[var(--desktop-subtitle-bold-line-height)] [font-style:var(--desktop-subtitle-bold-font-style)]">
                        {showAllCities ? "Show Less Cities" : `View All ${cities.length} Cities`}
                    </span>
                </Button>
            )}
        </section>
    );
};