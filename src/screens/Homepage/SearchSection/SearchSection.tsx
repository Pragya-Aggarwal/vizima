import { ChevronDownIcon, MapPinIcon, SearchIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";

export const SearchSection = (): JSX.Element => {
    return (
        <div className="flex justify-center w-full px-4 mt-[-10px] z-[100]"> {/* Centering container */}
            <div className="flex w-full max-w-[1610px] items-center justify-between p-1.5 pl-10 pr-1.5 bg-white rounded-[15px] border-4 border-solid border-green shadow-lg">
                {/* Location selector */}
                <div className="inline-flex items-center gap-3 relative">
                    <div className="relative w-6 h-6">
                        <MapPinIcon className="w-6 h-6 text-text" />
                    </div>

                    <div className="relative w-fit font-desktop-subtitle-bold font-[number:var(--desktop-subtitle-bold-font-weight)] text-text text-[length:var(--desktop-subtitle-bold-font-size)] tracking-[var(--desktop-subtitle-bold-letter-spacing)] leading-[var(--desktop-subtitle-bold-line-height)] whitespace-nowrap [font-style:var(--desktop-subtitle-bold-font-style)]">
                        Select a city
                    </div>

                    <ChevronDownIcon className="w-6 h-6 text-text" />
                </div>

                {/* Divider */}
                <Separator orientation="vertical" className="h-12" />

                {/* Gender filter */}
                <div className="inline-flex items-start gap-5 relative">
                    <div className="inline-flex items-center gap-2 relative">
                        <img
                            className="relative w-[26px] h-6"
                            alt="Vector"
                            src="https://c.animaapp.com/mbhqlborYGJdod/img/vector.svg"
                        />

                        <div className="relative w-fit font-desktop-subtitle-bold font-[number:var(--desktop-subtitle-bold-font-weight)] text-text text-[length:var(--desktop-subtitle-bold-font-size)] tracking-[var(--desktop-subtitle-bold-letter-spacing)] leading-[var(--desktop-subtitle-bold-line-height)] whitespace-nowrap [font-style:var(--desktop-subtitle-bold-font-style)]">
                            Gender
                        </div>

                        <ChevronDownIcon className="w-5 h-5 text-text" />
                    </div>
                </div>

                {/* Search button */}
                <Button className="flex items-center gap-2.5 px-10 py-3 rounded-[15px] bg-green text-white h-auto hover:bg-green/90">
                    <SearchIcon className="w-7 h-7" />
                    <span className="font-desktop-subtitle-bold font-[number:var(--desktop-subtitle-bold-font-weight)] text-[length:var(--desktop-subtitle-bold-font-size)] tracking-[var(--desktop-subtitle-bold-letter-spacing)] leading-[var(--desktop-subtitle-bold-line-height)] [font-style:var(--desktop-subtitle-bold-font-style)]">
                        Search
                    </span>
                </Button>
            </div>
        </div>
    );
};