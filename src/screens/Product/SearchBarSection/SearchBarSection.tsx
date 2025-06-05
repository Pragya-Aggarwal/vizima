import React, { useState } from "react";
import { SearchIcon, LocateFixed } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

export const SearchBarSection = (): JSX.Element => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        console.log("Searching for:", searchQuery);
        // Trigger your search logic here
    };

    return (
        <div className="w-full max-w-5xl mx-auto flex items-center bg-white border-2 border-[#064749] rounded-full overflow-hidden mt-[120px] px-4 py-2">
            {/* Input Field */}
            <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Listings or Find PGs"
                className="flex-1 h-12 border-none focus-visible:ring-0 focus-visible:ring-offset-0 px-4 text-sm text-black placeholder:text-black font-semibold"
            />

            {/* Location Icon Button */}
            <button
                type="button"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#064749] text-white hover:bg-[#053a3c] mx-2"
                aria-label="Use my location"
            >
                <LocateFixed className="w-5 h-5" />
            </button>

            {/* Search Button */}
            <Button
                type="button"
                onClick={handleSearch}
                className="h-10 px-6 rounded-full bg-[#064749] text-white hover:bg-[#053a3c] text-sm font-semibold"
            >
                Search
            </Button>
        </div>
    );
};
