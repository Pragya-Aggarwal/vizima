import { ChevronDownIcon, SlidersHorizontal, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "../../../components/ui/select";
import { Button } from "../../../components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../../../components/ui/sheet";
import { cn } from "../../../lib/utils";
import type { Accommodation } from "../../../api/services/accommodationService";
import "./FiltersAndSortingSection.css";

type FilterField = 'location' | 'propertyType' | 'sharingType' | 'gender';

type FilterOption = {
  name: string;
  width: string;
  options: string[];
  value: string;
  field: FilterField;
};

type ActiveFilter = {
  name: string;
  value: string;
  field: FilterField;
};

interface FiltersAndSortingSectionProps {
  onFilterChange: (filters: Record<string, string>) => void;
  onSortChange?: (sortBy: string) => void;
  onClearAll: () => void;
  accommodations: Accommodation[];
}

export const FiltersAndSortingSection: React.FC<FiltersAndSortingSectionProps> = ({
  onFilterChange,
  onSortChange,
  onClearAll,
  accommodations
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);
    const [filterOptions, setFilterOptions] = useState<FilterOption[]>([
        { 
          name: "Location", 
          width: "w-[194px]", 
          options: [], 
          value: 'all',
          field: 'location'
        },
        { 
          name: "Property Type", 
          width: "w-[265px]", 
          options: [], 
          value: 'all',
          field: 'propertyType'
        },
        { 
          name: "Sharing Type", 
          width: "w-[250px]", 
          options: [], 
          value: 'all',
          field: 'sharingType'
        },
        { 
          name: "Gender", 
          width: "w-[180px]", 
          options: [], 
          value: 'all',
          field: 'gender'
        },
    ]);

    // Extract unique filter options from accommodations
    useEffect(() => {
      if (!accommodations || accommodations.length === 0) return;

      // Get unique values for each filter type
      const locations = Array.from(new Set(
        accommodations
          .map(acc => acc.location)
          .filter((location): location is string => Boolean(location))
      ));

      const propertyTypes = Array.from(new Set(
        accommodations
          .map(acc => acc.type)
          .filter((type): type is string => Boolean(type))
      ));

      const sharingTypes = Array.from(new Set(
        accommodations
          .flatMap(acc => acc.sharingType || [])
          .filter((type): type is string => Boolean(type))
      ));

      const genders = Array.from(new Set(
        accommodations
          .map(acc => acc.gender)
          .filter((gender): gender is string => Boolean(gender))
      ));

      setFilterOptions([
        { 
          name: "Location", 
          width: "w-[194px]", 
          options: locations, 
          value: activeFilters.find(f => f.field === 'location')?.value || 'all',
          field: 'location' 
        },
        { 
          name: "Property Type", 
          width: "w-[265px]", 
          options: propertyTypes, 
          value: activeFilters.find(f => f.field === 'propertyType')?.value || 'all',
          field: 'propertyType' 
        },
        { 
          name: "Sharing Type", 
          width: "w-[250px]", 
          options: sharingTypes, 
          value: activeFilters.find(f => f.field === 'sharingType')?.value || 'all',
          field: 'sharingType' 
        },
        { 
          name: "Gender", 
          width: "w-[180px]", 
          options: genders, 
          value: activeFilters.find(f => f.field === 'gender')?.value || 'all',
          field: 'gender' 
        }
      ]);
    }, [accommodations, activeFilters]);

    const handleFilterChange = (field: FilterField, value: string) => {
      setActiveFilters(prev => {
        const newFilters = [...prev];
        const existingFilterIndex = newFilters.findIndex(f => f.field === field);
        
        if (value === 'all') {
          // Remove the filter if 'all' is selected
          if (existingFilterIndex !== -1) {
            newFilters.splice(existingFilterIndex, 1);
          }
        } else {
          // Update or add the filter
          const filterOption = filterOptions.find(f => f.field === field);
          const filterName = filterOption?.name || field;
          
          if (existingFilterIndex !== -1) {
            newFilters[existingFilterIndex] = { name: filterName, value, field };
          } else {
            newFilters.push({ name: filterName, value, field });
          }
        }
        
        // Convert to simple object for parent component
        const filtersObj = newFilters.reduce((acc: Record<string, string>, filter: ActiveFilter) => ({
          ...acc,
          [filter.field]: filter.value
        }), {});
        
        onFilterChange(filtersObj);
        return newFilters;
      });
    };

    const removeFilter = (index: number) => {
      setActiveFilters(prev => {
        const newFilters = [...prev];
        const [removedFilter] = newFilters.splice(index, 1);
        
        // Update parent component with current filters
        const filtersObj = newFilters.reduce<Record<string, string>>((acc, filter) => ({
          ...acc,
          [filter.field]: filter.value
        }), {});
        
        onFilterChange(filtersObj);
        return newFilters;
      });
    };

    const handleClearAll = () => {
      // Reset active filters
      setActiveFilters([]);
      
      // Reset filter options to their default state
      setFilterOptions(prevOptions => 
        prevOptions.map(option => ({
          ...option,
          value: 'all'
        }))
      );
      
      // Reset sort to default
      if (onSortChange) {
        onSortChange('availability');
      }
      
      // Call parent's clear all handler
      onClearAll();
    };

    const renderFilterSelect = (filter: FilterOption, isMobile = false) => (
        <div key={filter.field} className={cn("flex items-center gap-2", filter.width)}>
            <Select 
                value={activeFilters.find(f => f.field === filter.field)?.value || 'all'}
                onValueChange={(value) => handleFilterChange(filter.field, value)}
            >
                <SelectTrigger className={cn(
                    "h-10 rounded-[40px] border border-solid border-[#00000080] px-4",
                    isMobile ? "w-full" : ""
                )}>
                    <div className="flex items-center justify-between w-full">
                        <span className="text-sm font-medium">
                            {filter.name}: {activeFilters.find(f => f.field === filter.field)?.value || `All ${filter.name}s`}
                        </span>
                        <ChevronDownIcon className="h-4 w-4 ml-2 text-gray-400" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All {filter.name}s</SelectItem>
                    {filter.options.map((option, idx) => (
                        <SelectItem key={idx} value={option}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );

    const [sortBy, setSortBy] = useState('availability');

    const handleSortChange = (value: string) => {
        setSortBy(value);
        if (onSortChange) {
            onSortChange(value);
        } else {
            console.warn('onSortChange prop is not provided');
        }
    };

    const renderSortSection = (isMobile = false) => (
        <div className={cn(
            "flex items-center gap-2",
            isMobile ? "w-full justify-between" : ""
        )}>
            <span className="text-sm font-medium text-text whitespace-nowrap">
                Sort by:
            </span>
            <Select 
                value={sortBy}
                onValueChange={handleSortChange}
            >
                <SelectTrigger className={cn(
                    "border-none shadow-none h-auto",
                    isMobile ? "px-0" : "p-0"
                )}>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-[#49735a] whitespace-nowrap">
                            {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                        </span>
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="availability">Availability</SelectItem>
                    <SelectItem value="price">Price (Low to High)</SelectItem>
                    <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                    <SelectItem value="rating">Rating (High to Low)</SelectItem>
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
                            {activeFilters.length > 0 && (
                                <span className="ml-1 flex items-center justify-center w-5 h-5 rounded-full bg-green-500 text-white text-xs">
                                    {activeFilters.length}
                                </span>
                            )}
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
                        <SheetHeader className="mb-6">
                            <div className="flex items-center justify-between">
                                <SheetTitle>Filters</SheetTitle>
                                <Button
                                    variant="link"
                                    className="text-sm text-gray-500"
                                    onClick={handleClearAll}
                                >
                                    Clear all
                                </Button>
                            </div>
                        </SheetHeader>
                        <div className="space-y-6">
                            <div className="grid gap-4">
                                {filterOptions.map(filter => renderFilterSelect(filter, true))}
                            </div>
                            <div className="pt-4 border-t">
                                {renderSortSection(true)}
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
                {renderSortSection()}
            </div>

            {/* Active filters chips */}
            {activeFilters.length > 0 && (
                <div className="flex gap-2 overflow-x-auto hide-scrollbar px-4 py-2 bg-gray-50">
                    {activeFilters.map((filter, i) => (
                        <div key={i} className="flex items-center gap-1 px-3 py-1 bg-white rounded-full border border-gray-200 text-sm">
                            <span>{filter.name}: {filter.value}</span>
                            <button
                                className="text-gray-400 hover:text-gray-600"
                                onClick={() => removeFilter(i)}
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </div>
                    ))}
                    <button 
                        className="text-sm text-blue-500 whitespace-nowrap"
                        onClick={handleClearAll}
                    >
                        Clear all
                    </button>
                </div>
            )}
        </div>
    );

    // Desktop View
    const renderDesktopView = () => (
        <div className="hidden lg:flex flex-col gap-4 px-12 py-4">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4">
                    {filterOptions.map(filter => renderFilterSelect(filter))}
                </div>
                <div className="flex items-center gap-4">
                    {renderSortSection()}
                </div>
            </div>
            
            {/* Active filters */}
            {activeFilters.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-gray-500">Filters:</span>
                    {activeFilters.map((filter, i) => (
                        <div key={i} className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm">
                            <span>{filter.name}: {filter.value}</span>
                            <button
                                className="text-gray-400 hover:text-gray-600"
                                onClick={() => removeFilter(i)}
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </div>
                    ))}
                    <button 
                        className="text-sm text-blue-500"
                        onClick={handleClearAll}
                    >
                        Clear all
                    </button>
                </div>
            )}
        </div>
    );

    return (
        <>
            {renderMobileView()}
            {renderDesktopView()}
            

        </>
    );
};
