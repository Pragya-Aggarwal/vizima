import { SearchIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

export const SearchBarSection = (): JSX.Element => {
    return (
        <div className="w-full flex items-center bg-white rounded-[40px] border-4 border-solid border-green overflow-hidden mt-[120px]">
            <div className="flex-1">
                <Input
                    className="w-full h-14 border-none shadow-none text-text font-desktop-subtitle-bold text-[length:var(--desktop-subtitle-bold-font-size)] tracking-[var(--desktop-subtitle-bold-letter-spacing)] leading-[var(--desktop-subtitle-bold-line-height)] focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-text px-6"
                    type="text"
                    placeholder="Search Listings or Find PGs"
                />
            </div>

            <Button className="bg-green hover:bg-green/90 text-white rounded-[40px] h-10 w-10 p-0 flex items-center justify-center mr-1.5">
                <SearchIcon className="w-5 h-5 text-white" />
            </Button>
        </div>
    );
};