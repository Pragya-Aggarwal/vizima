import React from "react";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

export const BookingConfirmationSection = (): JSX.Element => {
    return (
        <Card className="flex items-center justify-between gap-6 p-5 border border-[#c3d0d7] rounded-xl">
            <div className="font-['Lato',Helvetica] font-normal text-text text-4xl leading-6">
                Single Sharing
            </div>

            <Button className="bg-green hover:bg-green/90 text-white rounded-xl px-10 py-3 h-auto">
                <span className="font-['Lato',Helvetica] font-bold text-4xl leading-6 whitespace-nowrap">
                    Change Room
                </span>
            </Button>
        </Card>
    );
};
