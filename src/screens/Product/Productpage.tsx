import { MapIcon, ListIcon } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
    const city = searchParams.get('city')?.toLowerCase();
    const gender = searchParams.get('gender')?.toLowerCase();

    // State to store all accommodations and filters
    const [allAccommodations, setAllAccommodations] = useState<Accommodation[]>([]);
    const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
    const [sortBy, setSortBy] = useState<string>('availability');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    // Initialize search states from URL params
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || searchParams.get('city') || '');
    const [searchInput, setSearchInput] = useState(searchParams.get('search') || searchParams.get('city') || '');

    // Handle search submission
    const handleSearch = useCallback(() => {
        // Update URL with search query
        const params = new URLSearchParams(searchParams);
        const searchTerm = searchInput.trim();
        
        if (searchTerm) {
            // Only update the search parameter
            params.set('search', searchTerm);
            // Remove city parameter to avoid conflicts
            params.delete('city');
        } else {
            params.delete('search');
            // Only delete city if it's not part of the URL params
            if (!searchParams.get('city')) {
                params.delete('city');
            }
        }
        
        navigate(`/property-listing?${params.toString()}`, { replace: true });

        // Update the search query state which will trigger filtering
        setSearchQuery(searchTerm);
    }, [searchInput, searchParams, navigate]);

    // Handle input change
    const handleInputChange = useCallback((value: string) => {
        setSearchInput(value);
    }, []);

    // Sync URL search params with state on initial load and when params change
    useEffect(() => {
        const searchParam = searchParams.get('search') || searchParams.get('city') || '';
        if (searchParam !== searchQuery) {
            setSearchQuery(searchParam);
            setSearchInput(searchParam);
        }
    }, [searchParams, searchQuery]);

    // Filter accommodations based on search query, city, gender, and other filters
    const filterAccommodations = useCallback((data: Accommodation[]) => {
        return data.filter(acc => {
            const searchLower = searchQuery.toLowerCase().trim();
            const accTitle = String(acc.title || '').toLowerCase();
            const accLocation = String(acc.location || '').toLowerCase();
            const accCity = String(acc.city || '').toLowerCase();
            const accGender = String(acc.gender || '').toLowerCase();
            const accType = String(acc.type || '').toLowerCase();

            // Check if the search query matches title, location, or city (case-insensitive partial match)
            const matchesSearch = !searchLower ||
                accTitle.includes(searchLower) ||
                accLocation.includes(searchLower) ||
                accCity.includes(searchLower);

            // Check if the city filter matches (case-insensitive partial match)
            const matchesCity = !city || 
                accCity.includes(city.toLowerCase()) || 
                accLocation.includes(city.toLowerCase());

            // Check if the gender filter matches
            const matchesGender = !gender || accGender === gender.toLowerCase();

            // Apply active filters with null checks
            const activeLocation = String(activeFilters.location || '').toLowerCase();
            const activePropertyType = String(activeFilters.propertyType || '').toLowerCase();
            const activeSharingType = String(activeFilters.sharingType || '').toLowerCase();
            const activeGenderFilter = String(activeFilters.gender || '').toLowerCase();

            const matchesLocation = !activeLocation || accLocation.includes(activeLocation);
            const matchesPropertyType = !activePropertyType || accType === activePropertyType;
            const matchesSharingType = !activeSharingType ||
                (Array.isArray(acc.sharingType) &&
                    acc.sharingType.some(type => String(type).toLowerCase() === activeSharingType));
            const matchesGenderFilter = !activeGenderFilter || accGender === activeGenderFilter;

            return (
                matchesSearch &&
                matchesCity &&
                matchesGender &&
                matchesLocation &&
                matchesPropertyType &&
                matchesSharingType &&
                matchesGenderFilter
            );
        });
    }, [searchQuery, city, gender, activeFilters]);

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

    // Handler for clearing all filters
    const handleClearAll = useCallback(() => {
        setActiveFilters({});
        setSearchQuery('');
        navigate('/property-listing', { replace: true });
    }, [navigate]);

    // Handler for filter changes
    const handleFilterChange = useCallback((filters: Record<string, string>) => {
        setActiveFilters(prev => ({
            ...prev,
            ...filters
        }));
    }, []);

    // Handler for sort changes
    const handleSortChange = useCallback((sortOption: string) => {
        if (sortOption === 'price-desc') {
            setSortBy('price');
            setSortOrder('desc');
        } else {
            setSortBy(sortOption);
            setSortOrder('asc');
        }
    }, []);

    // Apply filters and sorting whenever dependencies change
    useEffect(() => {
        if (allAccommodations.length === 0) return;

        let result = [...allAccommodations];

        // Apply search query filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(acc =>
                String(acc.title || '').toLowerCase().includes(query) ||
                String(acc.location || '').toLowerCase().includes(query) ||
                String(acc.city || '').toLowerCase().includes(query)
            );
        }

        // Apply active filters
        Object.entries(activeFilters).forEach(([key, value]) => {
            if (value && value !== 'all') {
                result = result.filter(acc => {
                    const accValue = acc[key as keyof typeof acc];
                    if (Array.isArray(accValue)) {
                        return accValue.includes(value);
                    }
                    return String(accValue).toLowerCase() === value.toLowerCase();
                });
            }
        });

        // Apply sorting
        result = sortAccommodations(result);
        setFilteredAccommodations(result);
    }, [allAccommodations, searchQuery, activeFilters, sortAccommodations]);

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

    // Update searchQuery when URL search param changes
    useEffect(() => {
        const searchParam = searchParams.get('search');
        if (searchParam !== null) {
            setSearchQuery(searchParam);
        }
    }, [searchParams]);

    // Update searchInput when searchQuery changes (e.g., from URL or clear)
    useEffect(() => {
        setSearchInput(searchQuery);
    }, [searchQuery]);

    // Apply filters and sorting whenever dependencies change
    useEffect(() => {
        if (allAccommodations.length > 0) {
            let result = [...allAccommodations];

            // Apply search and filters
            if (searchQuery || Object.keys(activeFilters).length > 0 || city || gender) {
                result = filterAccommodations(result);
            }

            // Apply sorting
            result = sortAccommodations(result);

            // Always set filteredAccommodations, even if empty
            setFilteredAccommodations(result);
        }
    }, [allAccommodations, activeFilters, city, gender, searchQuery, filterAccommodations, sortAccommodations]);

    const toggleView = () => {
        setShowMap(!showMap);
    };



    return (
        <div className="bg-white min-h-screen">
            {/* Search Bar Section */}
            <div className="w-full bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-2">
                    <SearchBarSection
                        value={searchInput}
                        onChange={handleInputChange}
                        onSearch={handleSearch}
                    />
                </div>
            </div>

            {/* Mobile View Toggle */}
            <div className="fixed bottom-24 right-4 z-50 lg:hidden">
                <Button
                    onClick={toggleView}
                    className="bg-green hover:bg-green/90 text-white rounded-full px-4 py-2 sm:px-6 sm:py-3 flex items-center gap-2 shadow-lg transition-all duration-200 text-sm sm:text-base"
                >
                    {showMap ? (
                        <>
                            <ListIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>Show List</span>
                        </>
                    ) : (
                        <>
                            <MapIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>Show Map</span>
                        </>
                    )}
                </Button>
            </div>

            {/* Main content area with listings and map */}
            <div className="max-w-[1440px] mx-auto px-4 sm:px-2 md:px-8 lg:px-12 mt-2 sticky top-[80px]">
                <div className="flex flex-col w-full">
                    {/* Filters and Sorting Section */}
                    <div className="w-full mb-6 bg-white p-2 rounded-lg shadow-sm border border-gray-100">
                        <FiltersAndSortingSection
                            accommodations={allAccommodations}
                            onFilterChange={handleFilterChange}
                            onSortChange={handleSortChange}
                            onClearAll={handleClearAll}
                        />
                    </div>

                    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                        {/* Left column - Apartment listings */}
                        <div className={`w-full ${showMap ? 'hidden lg:block lg:flex-1' : 'block'}`}>
                            <ApartmentListingsSection
                                accommodations={filteredAccommodations}
                                loading={loading}
                                error={error}
                                onClearSearch={() => setSearchQuery('')}
                            />
                        </div>

                        {/* Right column - Map */}
                        <div className={`w-full lg:w-[500px] xl:w-[600px] ${showMap ? 'block' : 'hidden lg:block'}`}>
                            <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[calc(100vh-200px)] lg:sticky lg:top-[100px] rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                                <LocationMapSection searchQuery={searchQuery} city={city} />
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
        </div>
            );
};