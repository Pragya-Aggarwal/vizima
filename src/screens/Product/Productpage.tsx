import { MinusIcon, PlusIcon } from "lucide-react";
import React from "react";
import { ApartmentListingsSection } from "./ApartmentListingsSection/ApartmentListingsSection";
import { FAQSection } from "./FAQSection/FAQSection";
import { PageTitleSection } from "./PageTitleSection";
import { SearchBarSection } from "./SearchBarSection/SearchBarSection";
import { FiltersAndSortingSection } from "./FiltersAndSortingSection";
import { LocationMapSection } from "./LocationMapSection";

export const ProductPage = (): JSX.Element => {
    return (
        <div className="bg-[#ffffff] flex flex-row justify-center w-full overflow-x-hidden">
            <div className="bg-white w-full max-w-[100%] relative px-4 md:px-6 lg:px-20">

                {/* Search Bar Section */}
                <div className="w-full max-w-[1200px] mx-auto mt-4">
                    <SearchBarSection />
                </div>


                {/* Filters and Sorting Section */}
                <FiltersAndSortingSection />

                <img
                    className="absolute w-6 h-6 top-[30px] right-[606px]"
                    alt="Gridicons dropdown"
                    src="https://c.animaapp.com/mbi2us3vKS97yu/img/gridicons-dropdown.svg"
                />

                {/* Main content area with listings and map */}
                <div className="flex flex-row px-20 mt-4 gap-6">
                    {/* Left column - Apartment listings */}
                    <div className="flex-1">
                        <ApartmentListingsSection />
                    </div>

                    {/* Right column - Map */}
                    <div className="w-[500px] relative">
                        <LocationMapSection />
                        <div className="absolute w-full h-full top-0 left-0">
                            <div className="justify-center gap-0.5 p-2 absolute top-5 right-5 rounded-[10px] inline-flex items-start bg-green">
                                <PlusIcon className="w-6 h-6 text-white" />
                            </div>

                            <div className="justify-center gap-0.5 p-2 absolute top-[68px] right-5 rounded-[10px] inline-flex items-start bg-green">
                                <MinusIcon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page Title Section */}
                <div className="px-20 mt-16">
                    <PageTitleSection />
                </div>

                {/* FAQ Section */}
                <div className="px-20 mt-16">
                    <FAQSection />
                </div>


            </div>
        </div>
    );
};