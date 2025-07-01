import React, { useState, KeyboardEvent } from "react";
import { SearchIcon, LocateFixed, MapPin } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { cn } from "../../../lib/utils";

interface SearchBarSectionProps {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export const SearchBarSection = ({ 
  className,
  value,
  onChange,
  onSearch
}: SearchBarSectionProps): JSX.Element => {
    const [isFocused, setIsFocused] = useState(false);

    const handleSearch = () => {
        onSearch();
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }; 
    
    const handleLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // In a real app, you would reverse geocode these coordinates to get the city
                    
                    // For now, we'll just focus the input
                    const input = document.querySelector('input[type="text"]') as HTMLInputElement;
                    input?.focus();
                },
                (error) => {
                    console.error('Error getting location:', error);
                    // Fallback to manual input
                    const input = document.querySelector('input[type="text"]') as HTMLInputElement;
                    input?.focus();
                }
            );
        } else {
            const input = document.querySelector('input[type="text"]') as HTMLInputElement;
            input?.focus();
        }
    };

    return (
        <div className={cn("w-full max-w-5xl mx-auto mt-[120px] px-4", className)}>
            <div className={cn(
                "flex items-center bg-white border-2 border-[#064749] rounded-full overflow-hidden transition-all duration-200",
                isFocused ? "ring-2 ring-[#064749] ring-opacity-30" : ""
            )}>
                {/* Location Icon */}
                <div className="pl-4 pr-2 text-gray-500">
                    <MapPin className="w-5 h-5" />
                </div>
                
                {/* Input Field */}
                <Input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Search by city..."
                    className="flex-1 h-12 sm:h-14 border-0 focus-visible:ring-0 placeholder:text-gray-400 focus-visible:ring-offset-0 px-2 text-sm sm:text-md text-black font-medium sm:font-semibold shadow-none"
                />

                {/* Location and Search Buttons */}
                <div className="flex items-center gap-2 pr-2">
                    {/* Location Button */}
                    <button
                        type="button"
                        onClick={handleLocationClick}
                        className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-[#064749] hover:bg-green-50 transition-colors"
                        aria-label="Use my location"
                    >
                        <LocateFixed className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>

                    {/* Search Button */}
                    <Button
                        type="button"
                        onClick={handleSearch}
                        className="h-10 sm:h-12 px-4 sm:px-6 rounded-full bg-[#064749] text-white hover:bg-[#053a3c] text-sm sm:text-base font-semibold transition-all whitespace-nowrap"
                    >
                        Search
                    </Button>
                </div>
            </div>
        </div>
    );
};