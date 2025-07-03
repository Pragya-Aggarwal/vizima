import { ChevronDownIcon } from "lucide-react";
import { useState, FormEvent } from "react";
import { Button } from "../../../components/ui/button";
import { bookingService } from "../../../api/services/bookingService";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../components/ui/select";
import { toast } from "../../../components/ui/use-toast";

interface ContactInfo {
    phone: string;
    email: string;
}

interface FormData {
    property: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    specialRequests: string;
    paymentMethod: string;
    doubleSharing: string;
    preferredProperty: string;
    selectedDateTime: string;
    couponCode: string;
    contactInfo: ContactInfo;
    fullName: string;
    mobileNumber: string;
    email: string;
    gender: string;
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

interface BookAFormProps {
    propertyId?: string;
}

export const BookAForm = ({ propertyId }: BookAFormProps): JSX.Element => {
    // Form state
    const [formData, setFormData] = useState<FormData>({
        property: propertyId || "64f8b2c1d4e5f6a7b8c9d0e2",
        checkIn: new Date().toISOString().split('T')[0], // Today's date as default
        checkOut: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow's date as default
        guests: 1,
        specialRequests: "",
        paymentMethod: "credit_card",
        doubleSharing: "",
        preferredProperty: "",
        selectedDateTime: "",
        couponCode: "",
        contactInfo: {
            phone: "",
            email: "",
        },
        fullName: "",
        mobileNumber: "",
        email: "",
        gender: ""
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
            placeholder: "XXXXXXXXXX",
            validation: (value: string) => !/^\d{10}$/.test(value) ? "Please enter a valid mobile number" : undefined
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

    // Handle form submission
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Validate form
        const newErrors: FormErrors = {};
        let isValid = true;

        formFields.forEach(field => {
            const error = field.validation(formData[field.id as keyof typeof formData] as string);
            if (error) {
                newErrors[field.id as keyof FormErrors] = error;
                isValid = false;
            }
        });

        if (!isValid) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);

        try {


            // Prepare booking data as per API contract
            const bookingData = {
                property: formData.property,
                checkInDate: formData.checkIn,
                checkOutDate: formData.checkOut,
                fullName: formData.fullName,
                email: formData.email,
                gender: formData.gender,
                sharing: formData.doubleSharing,
                phoneNumber: formData.mobileNumber,
                specialRequests: formData.specialRequests,
                paymentMethod: formData.paymentMethod,
                guests: formData.guests
            };

            // Get token for Authorization header
            const response = await bookingService.createBooking(bookingData);

            // Handle successful booking
            toast({
                title: "Success!",
                description: "Your booking has been successfully created!",
                variant: "success",
            });

            // Reset form
            setFormData({
                property: propertyId || "64f8b2c1d4e5f6a7b8c9d0e2",
                checkIn: new Date().toISOString().split('T')[0],
                checkOut: new Date(Date.now() + 86400000).toISOString().split('T')[0],
                guests: 1,
                specialRequests: "",
                paymentMethod: "credit_card",
                doubleSharing: "",
                preferredProperty: "",
                selectedDateTime: "",
                couponCode: "",
                contactInfo: {
                    phone: "",
                    email: "",
                },
                fullName: "",
                mobileNumber: "",
                email: "",
                gender: ""
            });
            setErrors({});
        } catch (error) {
            console.error('Booking submission failed:', error);
            toast({
                title: 'Booking Failed!',
                description: 'Failed to submit booking. Please try again.',
                variant: 'destructive',
                duration: 5000
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle input changes
    const handleInputChange = (fieldPath: string, value: string) => {
        setFormData(prev => {
            const newData = { ...prev };
            const keys = fieldPath.split('.');
            let current: any = newData;

            for (let i = 0; i < keys.length - 1; i++) {
                const key = keys[i];
                if (!current[key]) current[key] = {};
                current = current[key];
            }

            current[keys[keys.length - 1]] = value;
            return newData;
        });

        // Clear error for this field if it exists
        if ((errors as any)[fieldPath]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete (newErrors as any)[fieldPath];
                return newErrors;
            });
        }
    };

    return (
        <div className="flex items-center justify-center p-4 w-full">
            <form onSubmit={handleSubmit} className="w-full max-w-[1000px]">
                <Card className="w-full bg-[#e2f1e8] rounded-xl border border-solid border-[#c3d0d7]">
                    <CardContent className="p-2.5 md:p-[34px]">
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
                                    value={formData[field.id]}  // if moved to contactInfo
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
                            >
                                <SelectTrigger className="h-[52px] bg-white rounded-xl border border-solid border-[#c3d0d7] pl-[26px] font-desktop-subtitle text-text">
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="select" disabled>Select</SelectItem>
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


                        {/* <div className="space-y-10">
                            <h3 className="font-desktop-h3 text-text text-center">
                                Confirm your booking by paying a small token amount
                            </h3>

                           
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
                                <div className="space-y-2">
                                    <Input
                                        className="bg-white rounded-xl border border-solid border-[#c3d0d7] h-[52px] px-6 py-3"
                                        placeholder="Enter Coupon Code"
                                        value={formData.couponCode}
                                        onChange={(e) => handleInputChange("couponCode", e.target.value)}
                                        disabled={isSubmitting}
                                    />
                                </div>

                               
                                <div className="flex justify-between items-center pt-4">
                                    <span className="font-desktop-subtitle-bold text-text">
                                        Total Payable Amount
                                    </span>
                                    <span className="font-desktop-subtitle-bold text-text text-right">
                                        Rs. 18,000
                                    </span>
                                </div>
                            </div>

                            
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
                            </div> */}

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-[52px] bg-green hover:bg-green/90 text-white rounded-[40px] font-desktop-subtitle-bold"
                        >
                            {isSubmitting ? "Processing..." : "Book Now"}
                        </Button>
                        {/* </div> */}
                    </CardContent>
                </Card>
            </form>
        </div>
    );
};
