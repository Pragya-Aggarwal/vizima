
import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { Button } from "../../../components/ui/button";

export const CancellationPolicySection = (): JSX.Element => {
    // Payment details data
    const paymentDetails = [
        { label: "Room Rent", amount: "Rs. 12,000" },
        { label: "Security Deposit", amount: "Rs. 6,000" },
        { label: "GST", amount: "XYZ" },
    ];

    // Payment methods data
    const paymentMethods = [
        { id: "upi", label: "UPI" },
        { id: "card", label: "Credit/Debit Card" },
        { id: "netbanking", label: "Net Banking" },
        { id: "wallets", label: "Wallets" },
    ];

    const handleBookNow = () => {
        // Handle book now action
        console.log("Booking confirmed!");
    };

    // Trust features data
    const trustFeatures = [
        {
            icon: "https://c.animaapp.com/mbi5x2be8VZzX7/img/mdi-recurring-payment.svg",
            label: "Secure Payment",
        },
        {
            icon: "https://c.animaapp.com/mbi5x2be8VZzX7/img/bi-buildings-fill.svg",
            label: "24x7 Support",
        },
        {
            icon: "https://c.animaapp.com/mbi5x2be8VZzX7/img/bitcoin-icons-verify-filled.svg",
            label: "Fully Verified",
        },
    ];

    return (
        <Card className="w-full max-w-[600px] bg-[#e2f1e8] rounded-xl border border-solid border-[#c3d0d7]">
            <CardContent className="p-8">
                <div className="space-y-10">
                    <h3 className="font-desktop-h3 text-text text-center">
                        Confirm your booking by paying a small token amount
                    </h3>

                    {/* Payment details */}
                    <div className="space-y-6">
                        {paymentDetails.map((item, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <span className="font-desktop-subtitle text-text">
                                    {item.label}
                                </span>
                                <span className="font-desktop-subtitle-bold text-text text-right">
                                    {item.amount}
                                </span>
                            </div>
                        ))}

                        {/* Coupon code section */}
                        <div className="space-y-2">
                            <Input
                                className="bg-white rounded-xl border border-solid border-[#c3d0d7] h-[52px] px-6 py-3"
                                placeholder="Enter Coupon Code"
                            />
                        </div>

                        {/* Total amount */}
                        <div className="flex justify-between items-center pt-4">
                            <span className="font-desktop-subtitle-bold text-text">
                                Total Payable Amount
                            </span>
                            <span className="font-desktop-subtitle-bold text-text text-right">
                                Rs. 18,000
                            </span>
                        </div>
                    </div>

                    {/* Payment methods */}
                    <Card className="bg-white rounded-xl border border-solid border-[#c3d0d7]">
                        <CardContent className="p-7">
                            <h4 className="font-desktop-subtitle-bold text-text mb-4">
                                Payment Methods
                            </h4>
                            <RadioGroup defaultValue="upi" className="space-y-3">
                                {paymentMethods.map((method) => (
                                    <div key={method.id} className="flex items-center space-x-3">
                                        <div className="relative">
                                            <RadioGroupItem
                                                value={method.id}
                                                id={method.id}
                                                className={`
                                                    h-5 w-5 appearance-none rounded-full border-2 
                                                    border-[#064749] focus:outline-none 
                                                    focus-visible:ring-2 focus-visible:ring-[#064749]
                                                    focus-visible:ring-offset-2
                                                `}
                                            />
                                            <div className="
                                                absolute inset-0 flex items-center justify-center
                                                pointer-events-none
                                            ">
                                                <div className={`
                                                    h-2.5 w-2.5 rounded-full bg-[#064749] 
                                                    transition-opacity opacity-0
                                                    group-data-[state=checked]:opacity-100
                                                `} />
                                            </div>
                                        </div>
                                        <label
                                            htmlFor={method.id}
                                            className="font-['Lato',Helvetica] text-lg text-text leading-[35px] cursor-pointer"
                                        >
                                            {method.label}
                                        </label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </CardContent>
                    </Card>

                    {/* Trust features */}
                    <div className="flex justify-between">
                        {trustFeatures.map((feature, index) => (
                            <div key={index} className="flex flex-col items-center w-[134px]">
                                <img
                                    className="w-10 h-10 mb-2"
                                    alt={feature.label}
                                    src={feature.icon}
                                />
                                <span className="font-['Lato',Helvetica] font-medium text-text text-lg text-center leading-6">
                                    {feature.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Book now button */}
                    <Button className="w-full max h-[52px] mx-auto bg-green hover:bg-green/90 text-white rounded-[40px] font-desktop-subtitle-bold" onClick={handleBookNow}>
                        Book Now
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};