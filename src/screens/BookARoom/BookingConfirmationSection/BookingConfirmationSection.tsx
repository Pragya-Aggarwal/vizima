import React from "react";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Users, BedDouble, Check } from "lucide-react";

export const BookingConfirmationSection = (): JSX.Element => {
    return (
        <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-none shadow-sm">
            <div className="p-6">
                {/* Room Type and Details */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex gap-4">
                        <div className="p-2.5 bg-white rounded-xl shadow-sm">
                            <Users className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <h3 className="font-['Lato',Helvetica] font-bold text-2xl text-gray-900 mb-2">
                                Single Sharing
                            </h3>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <BedDouble className="w-4 h-4" />
                                    <span className="text-sm">1 Person</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Check className="w-4 h-4" />
                                    <span className="text-sm">Available Now</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features List */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    {["AC Room", "Attached Bathroom", "Daily Housekeeping", "High-Speed WiFi"].map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                    ))}
                </div>

                {/* Action Button */}
                <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl h-auto py-4 flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                    <span className="font-['Lato',Helvetica] font-semibold text-lg">
                        Change Room Type
                    </span>
                </Button>
            </div>
        </Card>
    );
};
