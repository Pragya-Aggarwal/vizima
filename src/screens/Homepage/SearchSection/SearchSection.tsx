import { MapPinIcon, SearchIcon, UsersIcon, Loader2, X } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Separator } from "../../../components/ui/separator";
import { toast } from "../../../components/ui/use-toast";

interface SearchSectionProps {
    onSearchResults?: (results: any[]) => void;
    onSearchStart?: () => void;
}

export const SearchSection = ({ onSearchStart }: SearchSectionProps): JSX.Element => {
    const [city, setCity] = useState("");
    const [gender, setGender] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showLocations, setShowLocations] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const locations = ["Noida", "Greater Noida"];

    const handleSearch = async (searchCity: string, searchGender: string) => {
        try {
            setIsLoading(true);
            onSearchStart?.();

            const searchParams: { city?: string; gender?: string } = {};
            if (searchCity.trim()) searchParams.city = searchCity.trim();
            if (searchGender) searchParams.gender = searchGender;

            // Prepare search parameters
            const queryParams = new URLSearchParams();
            if (searchParams.city) queryParams.set('city', searchParams.city.trim().toLowerCase());
            if (searchParams.gender) queryParams.set('gender', searchParams.gender.toLowerCase());

            // Navigate to product page with search parameters
            navigate(`/property-listing?${queryParams.toString()}`);

            // Show message if no search criteria provided
            // if (!searchParams.city && !searchParams.gender) {
            //     toast({
            //         title: "Search criteria required",
            //         description: "Please enter a city or select a gender to search.",
            //         variant: "destructive",
            //     });
            // }
        } catch (error) {
            console.error("Search failed:", error);
            toast({
                title: "Error",
                description: "Failed to search for hostels. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setShowLocations(false);
            // Use inputValue if it exists, otherwise use city
            const searchCity = inputValue.trim() || city;
            handleSearch(searchCity, gender);
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowLocations(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="w-full px-3 sm:px-4 md:px-6">
            <div className="relative w-full max-w-[900px] mx-auto">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    // Use inputValue if it exists, otherwise use city
                    const searchCity = inputValue.trim() || city;
                    handleSearch(searchCity, gender);
                }}>
                    <div className="flex flex-col sm:flex-row w-full items-center justify-between p-2 sm:p-2 bg-white rounded-xl border border-green shadow-md gap-2 sm:gap-3 hover:shadow-lg transition-shadow duration-300">
                        {/* City input with proper focus */}
                        <div className="relative flex-1 w-full" ref={dropdownRef}>
                            <div className="flex items-center w-full gap-2 rounded-lg px-2 sm:px-3 py-1">
                                <MapPinIcon className="w-6 h-6 text-gray-500 flex-shrink-0" />
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => {
                                            setInputValue(e.target.value);
                                            setShowLocations(true);
                                        }}
                                        onFocus={() => setShowLocations(true)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Search location..."
                                        className="w-full h-12 px-2 text-md font-medium border-0 focus:ring-0 focus:outline-none bg-transparent"
                                        disabled={isLoading}
                                    />
                                    {inputValue && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setInputValue('');
                                                setCity('');
                                            }}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                            {showLocations && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                                    {locations
                                        .filter(location => 
                                            location.toLowerCase().includes(inputValue.toLowerCase())
                                        )
                                        .map((location) => (
                                            <div
                                                key={location}
                                                className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                                                onClick={() => {
                                                    setCity(location.toLowerCase());
                                                    setInputValue(location);
                                                    setShowLocations(false);
                                                }}
                                            >
                                                {location}
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>

                        {/* Vertical Separator - hidden on mobile */}
                        <Separator orientation="vertical" className="hidden sm:block h-8 bg-gray-200" />

                        {/* Gender dropdown with fixed focus */}
                        <div className="flex items-center w-full sm:w-auto gap-2 rounded-lg px-2 sm:px-3 py-1">
                            <UsersIcon className="w-6 h-6 text-gray-500 flex-shrink-0" />
                            <Select value={gender} onValueChange={setGender} disabled={isLoading}>
                                <SelectTrigger className="w-full sm:w-[140px] md:w-[180px] lg:w-[200px] h-6 px-2 text-md font-medium border-0 focus:ring-0 focus:ring-offset-0 focus:bg-white bg-transparent shadow-none">
                                    <SelectValue placeholder="Select Gender" />
                                </SelectTrigger>
                                <SelectContent className="border-0 shadow-lg">
                                    <SelectItem value="select" >Select</SelectItem>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="unisex">Co-Living</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Search button */}
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="flex items-center gap-1 w-full sm:w-auto px-3 sm:px-4 py-4 rounded-lg bg-green hover:bg-green text-white text-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-6 h-6 animate-spin mr-1" />
                                    <span>Searching...</span>
                                </>
                            ) : (
                                <>
                                    <SearchIcon className="w-6 h-6" />
                                    <span>Search</span>
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};