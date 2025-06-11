import { ChevronDownIcon, FilterIcon, SlidersHorizontal } from "lucide-react";
import React, { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../components/ui/select";
import { Button } from "../../../components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../../../components/ui/sheet";
import { cn } from "../../../lib/utils";
import "./FiltersAndSortingSection.css";

export const FiltersAndSortingSection = (): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeFilters, setActiveFilters] = useState(0);

    // Filter options data
    const filterOptions = [
        { name: "Location", width: "w-[194px]" },
        { name: "Property Type", width: "w-[138px]" },
        { name: "Sharing Type", width: "w-36" },
        { name: "Budget", width: "w-[118px]" },
        { name: "Amenities", width: "w-[124px]" },
    ];

    const renderFilters = (isMobile = false) => (
        <div className={cn(
            "flex gap-3",
            isMobile ? "flex-col" : "flex-row items-center overflow-x-auto hide-scrollbar"
        )}>
            {filterOptions.map((filter, index) => (
                <Select key={index}>
                    <SelectTrigger
                        className={cn(
                            "h-10 rounded-[40px] border border-solid border-[#00000080] px-4",
                            isMobile ? "w-full" : filter.width
                        )}
                    >
                        <SelectValue
                            placeholder={filter.name}
                            className="font-medium text-sm text-black"
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
    );

    const renderSortSection = (isMobile = false) => (
        <div className={cn(
            "flex items-center gap-2",
            isMobile ? "w-full justify-between" : ""
        )}>
            <span className="text-sm font-medium text-text whitespace-nowrap">
                Sort by:
            </span>

            <Select defaultValue="availability">
                <SelectTrigger className={cn(
                    "border-none shadow-none h-auto",
                    isMobile ? "px-0" : "p-0"
                )}>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-[#49735a] whitespace-nowrap">
                            Availability
                        </span>
                        <ChevronDownIcon className="h-4 w-4 text-[#49735a]" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="availability">Availability</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );

    // Mobile View
    const renderMobileView = () => (
        <div className="flex flex-col lg:hidden">
            {/* Top bar with filter button and sort */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            className="flex items-center gap-2 border-[#00000080] rounded-full"
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            <span>Filters</span>
                            {activeFilters > 0 && (
                                <span className="ml-1 flex items-center justify-center w-5 h-5 rounded-full bg-green text-white text-xs">
                                    {activeFilters}
                                </span>
                            )}
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-[80vh]">
                        <SheetHeader className="mb-6">
                            <div className="flex items-center justify-between">
                                <SheetTitle>Filters</SheetTitle>
                                <Button
                                    variant="link"
                                    className="text-sm text-gray-500"
                                    onClick={() => setActiveFilters(0)}
                                >
                                    Clear all
                                </Button>
                            </div>
                        </SheetHeader>
                        <div className="space-y-6">
                            {renderFilters(true)}
                            <div className="pt-4 border-t">
                                {renderSortSection(true)}
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
                {renderSortSection()}
            </div>

            {/* Active filters chips */}
            {activeFilters > 0 && (
                <div className="flex gap-2 overflow-x-auto hide-scrollbar px-4 py-2 bg-gray-50">
                    {[...Array(activeFilters)].map((_, i) => (
                        <div key={i} className="flex items-center gap-1 px-3 py-1 bg-white rounded-full border border-gray-200 text-sm">
                            <span>Filter {i + 1}</span>
                            <button
                                className="text-gray-400 hover:text-gray-600"
                                onClick={() => setActiveFilters(prev => prev - 1)}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    // Desktop View
    const renderDesktopView = () => (
        <div className="hidden lg:flex items-center justify-between px-12 py-4">
            {renderFilters()}
            {renderSortSection()}
        </div>
    );

    return (
        <>
            {renderMobileView()}
            {renderDesktopView()}
        </>
    );
};
