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
        <div className="flex justify-center w-full px-4 mt-[-10px] z-[100]">
            <div className="flex w-full max-w-[1300px] items-center justify-between p-4 bg-white rounded-2xl border-2 border-green shadow-lg gap-4 hover:shadow-xl transition-shadow duration-300">

                {/* City input with proper focus */}
                <div className="flex items-center flex-1 gap-3 rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-green focus-within:bg-white transition-all duration-200">
                    <MapPinIcon className="w-5 h-5 text-gray-500" />
                    <Input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Search your PG or hostel location..."
                        className="flex-1 h-10 border-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 text-base font-medium placeholder:text-gray-400 text-gray-800 bg-transparent shadow-none"
                    />
                </div>

                {/* Vertical Separator */}
                <Separator orientation="vertical" className="h-10 bg-gray-200 mx-2" />

                {/* Gender dropdown with fixed focus */}
                <div className="flex items-center gap-3  rounded-lg px-4 py-2 ">
                    <UsersIcon className="w-5 h-5 text-gray-500" />
                    <Select value={gender} onValueChange={setGender}>
                        <SelectTrigger className="w-[440px] h-10 px-3 text-base font-medium border-0 focus:ring-0 focus:ring-offset-0 focus:bg-white bg-transparent shadow-none">
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
                    className="flex items-center gap-2 px-6 py-6 rounded-xl bg-green hover:bg-green-dark text-white text-base font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                    <SearchIcon className="w-5 h-5" />
                    <span>Search</span>
                </Button>
            </div>
        </div>
    );
};