import { MinusIcon, PlusIcon, MapIcon, ListIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { ApartmentListingsSection } from "./ApartmentListingsSection/ApartmentListingsSection";
import { FAQSection } from "./FAQSection/FAQSection";
import { PageTitleSection } from "./PageTitleSection";
import { SearchBarSection } from "./SearchBarSection/SearchBarSection";
import { FiltersAndSortingSection } from "./FiltersAndSortingSection";
import { LocationMapSection } from "./LocationMapSection";
import { Button } from "../../components/ui/button";
import { accommodationService, Accommodation } from '../../api/services/accommodationService';

export const ProductPage = (): JSX.Element => {
    const [showMap, setShowMap] = useState(false);
    const [filteredAccommodations, setFilteredAccommodations] = useState<Accommodation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const city = searchParams.get('city')?.toLowerCase();
    const gender = searchParams.get('gender')?.toLowerCase();

    // Filter accommodations based on search parameters and active filters
    const filterAccommodations = (data: Accommodation[], filters: Record<string, string> = {}) => {
        return data.filter(acc => {
            // Apply URL search params filters
            const matchesCity = !city || acc.city?.toLowerCase().includes(city);
            const matchesGender = !gender || acc.gender?.toLowerCase() === gender;
            
            // Apply component filters
            const matchesLocation = !filters.location || acc.city === filters.location;
            const matchesPropertyType = !filters.propertyType || acc.type === filters.propertyType;
            const matchesSharingType = !filters.sharingType || 
                (acc.sharingType && acc.sharingType.includes(filters.sharingType));
            const matchesGenderFilter = !filters.gender || acc.gender === filters.gender;
            
            return (
                matchesCity && 
                matchesGender && 
                matchesLocation &&
                matchesPropertyType &&
                matchesSharingType &&
                matchesGenderFilter
            );
        });
    };

    // Handle filter changes from FiltersAndSortingSection
    const handleFilterChange = (filters: Record<string, string>) => {
        setFilteredAccommodations(prev => {
            const allAccommodations = location.state?.initialResults || prev;
            return filterAccommodations(allAccommodations, filters);
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                let data: Accommodation[] = [];
                
                // Check if we have initial results from the search
                if (location.state?.initialResults) {
                    data = location.state.initialResults;
                } else {
                    // Otherwise, fetch all accommodations
                    data = await accommodationService.getAccommodations();
                }
                
                // Filter the data based on search params
                const filteredData = filterAccommodations(data);
                setFilteredAccommodations(filteredData);
                setError(null);
            } catch (err) {
                console.error('Error fetching accommodations:', err);
                setError('Failed to load accommodations. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [location.state, city, gender]);

    const toggleView = () => {
        setShowMap(!showMap);
    };

    return (
        <div className="bg-[#ffffff] flex flex-row justify-center w-full overflow-x-hidden">
            <div className="bg-white w-full relative">
                {/* Search Bar Section */}
                <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
                    <SearchBarSection />
                </div>

                {/* Filters and Sorting Section */}
                <div className="sticky top-0 z-30 bg-white border-b border-gray-100">
                    <div className="max-w-[1440px] mx-auto">
                        <FiltersAndSortingSection 
                            onFilterChange={handleFilterChange}
                            accommodations={filteredAccommodations}
                        />
                    </div>
                </div>

                {/* Mobile View Toggle */}
                <div className="fixed bottom-24 right-4 z-20 lg:hidden">
                    <Button
                        onClick={toggleView}
                        className="bg-green hover:bg-green/90 text-white rounded-full px-6 py-3 flex items-center gap-2 shadow-lg"
                    >
                        {showMap ? (
                            <>
                                <ListIcon className="w-5 h-5" />
                                Show List
                            </>
                        ) : (
                            <>
                                <MapIcon className="w-5 h-5" />
                                Show Map
                            </>
                        )}
                    </Button>
                </div>

                {/* Main content area with listings and map */}
                <div className="max-w-[1440px] mx-auto px-4 sm:px-2 md:px-8 lg:px-12 mt-6">
                    <div className="flex flex-col lg:flex-row gap-6 sm:gap-2">
                        {/* Left column - Apartment listings */}
                        <div className={`flex-1 min-w-0 ${showMap ? 'hidden lg:block' : 'block'}`}>
                            <ApartmentListingsSection 
                                accommodations={filteredAccommodations}
                                loading={loading}
                                error={error}
                            />
                        </div>

                        {/* Right column - Map */}
                        <div className={`lg:w-[500px] xl:w-[600px] sticky top-[80px] h-[600px] lg:h-[calc(100vh-120px)] ${showMap ? 'block' : 'hidden lg:block'}`}>
                            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-gray-200">
                                <LocationMapSection />
                                {/* Map Controls */}
                                <div className="absolute top-4 right-4 flex flex-col gap-2">
                                    <button className="p-2 bg-green hover:bg-green/90 rounded-lg transition-colors shadow-md">
                                        <PlusIcon className="w-5 h-5 text-white" />
                                    </button>
                                    <button className="p-2 bg-green hover:bg-green/90 rounded-lg transition-colors shadow-md">
                                        <MinusIcon className="w-5 h-5 text-white" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page Title and FAQ Sections */}
                <div className="bg-gray-50 mt-12">
                    <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
                        {/* Page Title Section */}
                        <div className="py-8 sm:py-12 border-b border-gray-200">
                            <PageTitleSection />
                        </div>

                        {/* FAQ Section */}
                        <div className="py-8 sm:py-12">
                            <FAQSection />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};