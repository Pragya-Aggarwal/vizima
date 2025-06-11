import React from "react";
import { Card, CardContent } from "../../../components/ui/card";

export const RentYourSpaceSection = (): JSX.Element => {
    return (
        <Card className="relative hidden sm:block w-full max-w-[610px] border-none rounded-none md:rounded-r-[60px] shadow-none bg-white">
            <CardContent className="flex flex-col items-start gap-6 px-4 sm:px-6 md:px-8 lg:px-20 py-6 sm:py-8 md:py-[30px]">
                <div className="flex flex-col w-full max-w-[569px] items-start gap-4 sm:gap-6">
                    {/* <h1 className="font-desktop-h1 text-text text-[length:var(--desktop-h1-font-size)] tracking-[var(--desktop-h1-letter-spacing)] leading-[var(--desktop-h1-line-height)] font-[number:var(--desktop-h1-font-weight)] [font-style:var(--desktop-h1-font-style)]"> */}
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text leading-tight">
                        Find Verified PGs &amp; Hostels That Feel Like Home
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-text leading-relaxed">
                        Trusted listings, meals, AC, Wi-Fi — everything ready to move in
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};
