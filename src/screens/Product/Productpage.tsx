import { MinusIcon, PlusIcon, MapIcon, ListIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
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
    const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAccommodations = async () => {
            try {
                setLoading(true);
                const data = await accommodationService.getAccommodations();
                setAccommodations(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching accommodations:', err);
                setError('Failed to load accommodations. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchAccommodations();
    }, []);

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
                        <FiltersAndSortingSection />
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
                <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 mt-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Left column - Apartment listings */}
                        <div className={`flex-1 min-w-0 ${showMap ? 'hidden lg:block' : 'block'}`}>
                            <ApartmentListingsSection 
                                accommodations={accommodations}
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