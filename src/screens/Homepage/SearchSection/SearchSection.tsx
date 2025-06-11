import { MapPinIcon, SearchIcon, UsersIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "../../../components/ui/select";
import { Input } from "../../../components/ui/input";

export const SearchSection = (): JSX.Element => {
    const [city, setCity] = useState("");
    const [gender, setGender] = useState("");

    const handleSearch = () => {
        console.log("Search with:", { city, gender });
    };

    return (
        <div className="w-full px-3 sm:px-4 md:px-6">
            <div className="relative w-full max-w-[900px] mx-auto">
                <div className="flex flex-col sm:flex-row w-full items-center justify-between p-2 sm:p-2 bg-white rounded-xl border border-green shadow-md gap-2 sm:gap-3 hover:shadow-lg transition-shadow duration-300">
                    {/* City input with proper focus */}
                    <div className="flex items-center flex-1 w-full sm:w-auto gap-2 rounded-lg px-2 sm:px-3 py-1 focus-within:ring-1 focus-within:ring-green focus-within:bg-white transition-all duration-200">
                        <MapPinIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        <Input
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Search your PG or hostel location..."
                            className="flex-1 h-6 border-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 text-sm font-medium placeholder:text-gray-400 text-gray-800 bg-transparent shadow-none"
                        />
                    </div>

                    {/* Vertical Separator - hidden on mobile */}
                    <Separator orientation="vertical" className="hidden sm:block h-8 bg-gray-200" />

                    {/* Gender dropdown with fixed focus */}
                    <div className="flex items-center w-full sm:w-auto gap-2 rounded-lg px-2 sm:px-3 py-1">
                        <UsersIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        <Select value={gender} onValueChange={setGender}>
                            <SelectTrigger className="w-full sm:w-[140px] md:w-[180px] lg:w-[200px] h-6 px-2 text-sm font-medium border-0 focus:ring-0 focus:ring-offset-0 focus:bg-white bg-transparent shadow-none">
                                <SelectValue placeholder="Select Gender" />
                            </SelectTrigger>
                            <SelectContent className="border-0 shadow-lg">
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="unisex">Unisex</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Search button */}
                    <Button
                        onClick={handleSearch}
                        className="flex items-center gap-1 w-full sm:w-auto px-3 sm:px-4 py-1.5 rounded-lg bg-green hover:bg-green-dark text-white text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
                    >
                        <SearchIcon className="w-4 h-4" />
                        <span>Search</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};