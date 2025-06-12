import React from "react";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Users, BedDouble, Check } from "lucide-react";

export const BookingConfirmationSection = (): JSX.Element => {
    return (
        <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-none shadow-sm rounded-xl sm:rounded-2xl overflow-hidden">
            <div className="p-4 sm:p-6">
                {/* Room Type and Details */}
                <div className="flex flex-col sm:flex-row gap-4 mb-5 sm:mb-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="p-2 sm:p-2.5 bg-white rounded-xl shadow-sm flex-shrink-0">
                            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-['Lato',Helvetica] font-bold text-xl sm:text-2xl text-gray-900 mb-1 sm:mb-2">
                                Single Sharing
                            </h3>
                            <div className="flex flex-wrap gap-2 sm:gap-4">
                                <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600">
                                    <BedDouble className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                                    <span className="text-xs sm:text-sm">1 Person</span>
                                </div>
                                <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600">
                                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 text-green-500" />
                                    <span className="text-xs sm:text-sm">Available Now</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features List */}
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3 mb-5 sm:mb-6">
                    {["AC Room", "Attached Bathroom", "Daily Housekeeping", "High-Speed WiFi"].map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                            <span className="text-xs sm:text-sm text-gray-600 truncate">{feature}</span>
                        </div>
                    ))}
                </div>

                {/* Action Button */}
                <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg sm:rounded-xl h-auto py-3 sm:py-4 flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]"
                >
                    <span className="font-['Lato',Helvetica] font-semibold text-sm sm:text-base">
                        Change Room Type
                    </span>
                </Button>
            </div>
        </Card>
    );
};
