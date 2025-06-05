import { ChevronDownIcon, MapPinIcon, SearchIcon, UsersIcon } from "lucide-react";
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
            <div className="flex w-full max-w-[1300px] items-center justify-between p-1.5 pl-10 pr-1.5 bg-white rounded-[15px] border-4 border-solid border-green shadow-lg gap-6">

                {/* City input with icon */}
                <div className="flex items-center gap-2 relative text-text">
                    <MapPinIcon className="w-5 h-5" />
                    <Input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Search Your Pg and Hostel.."
                        className="w-[400px] h-8 border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 m-0 text-sm font-semibold placeholder:text-black text-black bg-transparent"
                    />
                </div>

                {/* Vertical Separator */}
                <Separator orientation="vertical" className="h-8 bg-green" />

                {/* Gender dropdown */}
                <div className="flex items-center gap-2 relative w-fit text-text">
                    <UsersIcon className="w-5 h-5" />
                    <Select value={gender} onValueChange={setGender}>
                        <SelectTrigger className="w-[120px] h-8 px-0 text-sm font-semibold border-none focus:ring-0 focus:ring-offset-0 bg-transparent">
                            <SelectValue placeholder="Gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="unisex">Unisex</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Search button */}
                <Button
                    onClick={handleSearch}
                    className="flex items-center gap-2.5 px-6 py-2 rounded-[15px] bg-green text-white text-sm font-semibold hover:bg-green/90"
                >
                    <SearchIcon className="w-4 h-4" />
                    Search
                </Button>
            </div>
        </div>
    );
};
