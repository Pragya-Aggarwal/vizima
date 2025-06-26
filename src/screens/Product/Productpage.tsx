import { MinusIcon, PlusIcon, MapIcon, ListIcon } from "lucide-react";
import React, { useState, useEffect, useCallback } from "react";
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

    // State to store all accommodations and filters
    const [allAccommodations, setAllAccommodations] = useState<Accommodation[]>([]);
    const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
    const [sortBy, setSortBy] = useState<string>('availability');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    // Filter accommodations based on active filters and search params
    const filterAccommodations = useCallback((data: Accommodation[]) => {
        if (!data || data.length === 0) return [];

        return data.filter(acc => {
            // Apply URL search params filters
            const matchesCity = !city || (acc.city && acc.city.toLowerCase().includes(city.toLowerCase()));
            const matchesGender = !gender || (acc.gender && acc.gender.toLowerCase() === gender.toLowerCase());
            
            // Apply component filters
            const matchesLocation = !activeFilters.location || 
                                 (acc.city && acc.city.toLowerCase().includes(activeFilters.location.toLowerCase()));
            const matchesPropertyType = !activeFilters.propertyType || 
                                     (acc.type && acc.type.toLowerCase() === activeFilters.propertyType.toLowerCase());
            const matchesSharingType = !activeFilters.sharingType || 
                                    (acc.sharingType && 
                                     acc.sharingType.some((type: string) => 
                                         type.toLowerCase() === activeFilters.sharingType?.toLowerCase()
                                     ));
            const matchesGenderFilter = !activeFilters.gender || 
                                     (acc.gender && acc.gender.toLowerCase() === activeFilters.gender.toLowerCase());
            
            return (
                matchesCity && 
                matchesGender && 
                matchesLocation &&
                matchesPropertyType &&
                matchesSharingType &&
                matchesGenderFilter
            );
        });
    }, [city, gender, activeFilters]);

    // Sort accommodations
    const sortAccommodations = useCallback((data: Accommodation[]) => {
        
        return [...data].sort((a, b) => {
            let comparison = 0;
            
            switch (sortBy) {
                case 'price':
                    comparison = (a.price || 0) - (b.price || 0);
                    break;
                case 'rating':
                    // For rating, we want to sort high to low by default
                    comparison = (b.rating?.average || 0) - (a.rating?.average || 0);
                    // Only reverse if sortOrder is 'asc' (which would be unusual for ratings)
                    if (sortOrder === 'asc') comparison = -comparison;
                    return comparison;
                case 'availability':
                default:
                    // Sort by availability (assuming there's an isAvailable property)
                    comparison = (a.isAvailable === b.isAvailable) ? 0 : a.isAvailable ? -1 : 1;
                    break;
            }
            
            return sortOrder === 'asc' ? comparison : -comparison;
        });
    }, [sortBy, sortOrder]);

    // Handle clearing all filters
    const handleClearAll = () => {
        // Reset filtered accommodations to show all
        setFilteredAccommodations([...allAccommodations]);
        // Clear active filters
        setActiveFilters({});
    };

    // Handle filter changes from the FiltersAndSortingSection
    const handleFilterChange = (filters: Record<string, string>) => {
        setActiveFilters(filters);
        
        // If no filters, show all accommodations
        if (Object.keys(filters).length === 0) {
            setFilteredAccommodations([...allAccommodations]);
            return;
        }
        
        // Filter accommodations based on active filters
        let result = [...allAccommodations];
        
        // Apply each active filter
        Object.entries(filters).forEach(([key, value]) => {
            if (value && value !== 'all') {
                result = result.filter(acc => {
                    // Handle different filter types
                    const accValue = acc[key as keyof typeof acc];
                    if (Array.isArray(accValue)) {
                        return accValue.includes(value);
                    }
                    return String(accValue).toLowerCase() === value.toLowerCase();
                });
            }
        });
        
        setFilteredAccommodations(result);
    };

    // Handle sort changes from the FiltersAndSortingSection
    const handleSortChange = (sortOption: string) => {
        
        
        // Handle special cases for price-desc
        if (sortOption === 'price-desc') {
            setSortBy('price');
            setSortOrder('desc');
            return;
        }
        
        // For all other cases, check if we're toggling the same sort option
        if (sortOption === sortBy) {
            // Toggle sort order if clicking the same sort option
            setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            // Set new sort option with default ascending order
            setSortBy(sortOption);
            setSortOrder('asc');
        }
    };

    // Fetch data on initial load
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                let data: Accommodation[] = [];
                
                if (location.state?.initialResults) {
                    data = location.state.initialResults;
                } else {
                    data = await accommodationService.getAccommodations();
                }
                
                setAllAccommodations(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching accommodations:', err);
                setError('Failed to load accommodations. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [location.state]);

    // Apply filters and sorting whenever dependencies change
    useEffect(() => {
        if (allAccommodations.length > 0) {
            let result = [...allAccommodations];
            
            // Apply filters
            if (Object.keys(activeFilters).length > 0 || city || gender) {
                result = filterAccommodations(result);
            }
            
            // Apply sorting
            result = sortAccommodations(result);
            
            setFilteredAccommodations(result);
        }
    }, [allAccommodations, activeFilters, city, gender, filterAccommodations, sortAccommodations]);

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
                            onSortChange={handleSortChange}
                            onClearAll={handleClearAll}
                            accommodations={allAccommodations}
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