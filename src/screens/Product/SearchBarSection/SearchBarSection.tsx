import React, { useState } from "react";
import { SearchIcon, LocateFixed } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

export const SearchBarSection = (): JSX.Element => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        console.log("Searching for:", searchQuery);
    };

    return (
        <div className="w-full max-w-5xl mx-auto flex items-center bg-white border-2 border-[#064749] rounded-full overflow-hidden mt-[120px] px-4 py-1">
            {/* Input Field */}
            <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Listings or Find PGs..."
                className="flex-1 h-10 sm:h-12 border-0 focus-visible:ring-0 placeholder:text-gray-400 focus-visible:ring-offset-0 px-4 text-sm sm:text-md text-black font-medium sm:font-semibold shadow-none"
            />

            <div className="flex items-center gap-2">
                {/* Location Icon Button */}
                <button
                    type="button"
                    className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#064749] text-white hover:bg-[#053a3c]"
                    aria-label="Use my location"
                >
                    <LocateFixed className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Search Button */}
                <Button
                    type="button"
                    onClick={handleSearch}
                    className="h-8 sm:h-10 px-4 sm:px-6 rounded-full bg-[#064749] text-white hover:bg-[#053a3c] text-xs sm:text-sm font-semibold"
                >
                    Search
                </Button>
            </div>
        </div>
    );
};