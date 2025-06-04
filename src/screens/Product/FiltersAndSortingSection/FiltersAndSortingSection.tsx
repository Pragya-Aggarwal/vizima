import { ChevronDownIcon } from "lucide-react";
import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../components/ui/select";
import { Separator } from "../../../components/ui/separator";

export const FiltersAndSortingSection = (): JSX.Element => {
    // Filter options data
    const filterOptions = [
        { name: "Location", width: "w-[194px]" },
        { name: "Property Type", width: "w-[138px]" },
        { name: "Sharing Type", width: "w-36" },
        { name: "Budget", width: "w-[118px]" },
        { name: "Amenities", width: "w-[124px]" },
    ];

    return (
        <div className="flex w-full items-center  px-60 py-4 sticky top-[205px] bg-white z-10">
            <div className="flex items-start gap-[30px]">
                {filterOptions.map((filter, index) => (
                    <Select key={index}>
                        <SelectTrigger
                            className={`${filter.width} rounded-[40px] border border-solid border-[#00000080] px-5 py-3 h-auto`}
                        >
                            <SelectValue
                                placeholder={filter.name}
                                className="[font-family:'Lato',Helvetica] font-medium text-black text-lg"
                            />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="option1">Option 1</SelectItem>
                            <SelectItem value="option2">Option 2</SelectItem>
                            <SelectItem value="option3">Option 3</SelectItem>
                        </SelectContent>
                    </Select>
                ))}
            </div>

            <Separator orientation="vertical" className="h-[46px] mx-2" />

            <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                    <span className="font-desktop-subtitle-bold font-[number:var(--desktop-subtitle-bold-font-weight)] text-text text-[length:var(--desktop-subtitle-bold-font-size)] tracking-[var(--desktop-subtitle-bold-letter-spacing)] leading-[var(--desktop-subtitle-bold-line-height)] whitespace-nowrap [font-style:var(--desktop-subtitle-bold-font-style)]">
                        Sort by:
                    </span>

                    <Select defaultValue="availability">
                        <SelectTrigger className="border-none shadow-none p-0 h-auto">
                            <div className="flex items-center gap-2">
                                <span className="font-desktop-subtitle-bold font-[number:var(--desktop-subtitle-bold-font-weight)] text-[#49735a] text-[length:var(--desktop-subtitle-bold-font-size)] tracking-[var(--desktop-subtitle-bold-letter-spacing)] leading-[var(--desktop-subtitle-bold-line-height)] whitespace-nowrap [font-style:var(--desktop-subtitle-bold-font-style)]">
                                    Availability
                                </span>
                                {/* <ChevronDownIcon className="h-5 w-5" /> */}
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="availability">Availability</SelectItem>
                            <SelectItem value="price">Price</SelectItem>
                            <SelectItem value="rating">Rating</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
};
