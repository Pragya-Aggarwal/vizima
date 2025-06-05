import {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../components/ui/select";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";

interface FormData {
    fullName: string;
    mobileNumber: string;
    email: string;
    gender: string;
    doubleSharing: string;
    preferredProperty: string;
    selectedDateTime: string;
    couponCode: string;
    paymentMethod: string;
}

interface FormErrors {
    fullName?: string;
    mobileNumber?: string;
    email?: string;
    gender?: string;
    doubleSharing?: string;
    preferredProperty?: string;
    selectedDateTime?: string;
    couponCode?: string;
    paymentMethod?: string;
}

interface FormField {
    id: keyof Pick<FormData, 'fullName' | 'mobileNumber' | 'email'>;
    label: string;
    placeholder: string;
    validation: (value: string) => string | undefined;
}

export const BookAForm = (): JSX.Element => {
    // Form state
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        mobileNumber: "",
        email: "",
        gender: "male",
        doubleSharing: "Comfort Stay PG",
        preferredProperty: "Comfort Stay PG",
        selectedDateTime: "",
        couponCode: "",
        paymentMethod: "upi"
    });

    // Error state
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form field data
    const formFields: FormField[] = [
        {
            id: "fullName",
            label: "Full Name",
            placeholder: "Full Name",
            validation: (value: string) => value.length < 2 ? "Name must be at least 2 characters" : undefined
        },
        {
            id: "mobileNumber",
            label: "Mobile Number",
            placeholder: "+91- XXXXX XXXXX",
            validation: (value: string) => !/^\+91-\s?\d{5}\s?\d{5}$/.test(value) ? "Please enter a valid Indian mobile number" : undefined
        },
        {
            id: "email",
            label: "E-mail",
            placeholder: "E-mail",
            validation: (value: string) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Please enter a valid email address" : undefined
        },
    ];

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

    // Handle input changes
    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    // Form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Validate all fields
        const newErrors: FormErrors = {};
        formFields.forEach(field => {
            const error = field.validation(formData[field.id]);
            if (error) {
                newErrors[field.id] = error;
            }
        });

        if (!formData.selectedDateTime) {
            newErrors.selectedDateTime = "Please select a date and time";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsSubmitting(false);
            return;
        }

        try {
            // TODO: Replace with your actual API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Handle successful submission
            alert("Booking submitted successfully!");
            // Reset form
            setFormData({
                fullName: "",
                mobileNumber: "",
                email: "",
                gender: "male",
                doubleSharing: "Comfort Stay PG",
                preferredProperty: "Comfort Stay PG",
                selectedDateTime: "",
                couponCode: "",
                paymentMethod: "upi"
            });
            setErrors({});
        } catch (error) {
            alert("Failed to submit booking. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center p-4 w-full">
            <form onSubmit={handleSubmit} className="w-full max-w-[1000px]">
                <Card className="w-full bg-[#e2f1e8] rounded-xl border border-solid border-[#c3d0d7]">
                    <CardContent className="p-[34px]">
                        {/* Text input fields */}
                        {formFields.map((field) => (
                            <div key={field.id} className="mb-5">
                                <div className="font-desktop-subtitle-bold text-text mb-1 ml-2.5">
                                    {field.label}
                                </div>
                                <Input
                                    className={`h-[52px] bg-white rounded-xl border border-solid ${errors[field.id]
                                        ? "border-red-500"
                                        : "border-[#c3d0d7]"
                                        } pl-[26px] font-desktop-subtitle text-text`}
                                    placeholder={field.placeholder}
                                    value={formData[field.id]}
                                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                                    disabled={isSubmitting}
                                />
                                {errors[field.id] && (
                                    <p className="text-red-500 text-sm mt-1 ml-2.5">
                                        {errors[field.id]}
                                    </p>
                                )}
                            </div>
                        ))}

                        {/* Gender dropdown */}
                        <div className="mb-5">
                            <div className="font-desktop-subtitle-bold text-text mb-1 ml-2.5">
                                Gender
                            </div>
                            <Select
                                value={formData.gender}
                                onValueChange={(value) => handleInputChange("gender", value)}
                                disabled={isSubmitting}
                            >
                                <SelectTrigger className="h-[52px] bg-white rounded-xl border border-solid border-[#c3d0d7] pl-[26px] font-desktop-subtitle text-text">
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Double Sharing */}
                        <div className="mb-5">
                            <div className="flex items-center ml-2.5 mb-1">
                                <span className="font-desktop-subtitle-bold text-text">
                                    Double Sharing
                                </span>
                                <ChevronDownIcon className="w-[31px] h-[26px] ml-2" />
                            </div>
                            <Input
                                className="h-[52px] bg-white rounded-xl border border-solid border-[#c3d0d7] pl-[26px] font-desktop-subtitle text-text"
                                value={formData.doubleSharing}
                                onChange={(e) => handleInputChange("doubleSharing", e.target.value)}
                                disabled={isSubmitting}
                            />
                        </div>

                        {/* Preferred Property Name */}
                        <div className="mb-5">
                            <div className="flex items-center ml-2.5 mb-1">
                                <span className="font-desktop-subtitle-bold text-text">
                                    Preferred Property Name
                                </span>
                                <ChevronDownIcon className="w-[31px] h-[26px] ml-2" />
                            </div>
                            <Input
                                className="h-[52px] bg-white rounded-xl border border-solid border-[#c3d0d7] pl-[26px] font-desktop-subtitle text-text"
                                value={formData.preferredProperty}
                                onChange={(e) => handleInputChange("preferredProperty", e.target.value)}
                                disabled={isSubmitting}
                            />
                        </div>

                        {/* Date and Time Picker */}
                        <div className="mb-5">
                            <div className="font-desktop-subtitle-bold text-text mb-1 ml-2.5">
                                Choose a suitable Date And Time
                            </div>
                            <Input
                                type="datetime-local"
                                className="h-[52px] bg-white rounded-xl border border-solid border-[#c3d0d7] pl-[26px] font-desktop-subtitle text-text"
                                value={formData.selectedDateTime}
                                onChange={(e) => handleInputChange("selectedDateTime", e.target.value)}
                                disabled={isSubmitting}
                            />
                            {errors.selectedDateTime && (
                                <p className="text-red-500 text-sm mt-1 ml-2.5">
                                    {errors.selectedDateTime}
                                </p>
                            )}
                        </div>

                        {/* Payment Section */}
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
                                        value={formData.couponCode}
                                        onChange={(e) => handleInputChange("couponCode", e.target.value)}
                                        disabled={isSubmitting}
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
                                    <RadioGroup
                                        value={formData.paymentMethod}
                                        onValueChange={(value) => handleInputChange("paymentMethod", value)}
                                        className="space-y-3"
                                    >
                                        {paymentMethods.map((method) => (
                                            <div key={method.id} className="flex items-center space-x-3">
                                                <div className="relative h-5 w-5">
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
                                                    {formData.paymentMethod === method.id && (
                                                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                                                            <div className="h-2.5 w-2.5 rounded-full bg-[#064749]"></div>
                                                        </div>
                                                    )}
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

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-[52px] bg-green hover:bg-green/90 text-white rounded-[40px] font-desktop-subtitle-bold"
                            >
                                {isSubmitting ? "Processing..." : "Book Now"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
};
