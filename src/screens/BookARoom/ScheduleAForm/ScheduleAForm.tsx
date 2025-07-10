

import { ChevronDownIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import { propertiesService, PropertyTitle } from "../../../api/services/propertiesService";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../components/ui/select";
import { visitService } from "../../../api/services/visitService";
import { toast } from "../../../components/ui/use-toast";
import { OTPVerification } from "../../../components/OTPVerification";
import { isLoggedIn } from "../../../utils/auth";

interface FormData {
    fullName: string;
    mobileNumber: string;
    email: string;
    gender: string;
    doubleSharing: string;
    preferredProperty: string;
    selectedDateTime: string;
    visitType: string;
}

interface FormErrors {
    fullName?: string;
    mobileNumber?: string;
    email?: string;
    gender?: string;
    doubleSharing?: string;
    preferredProperty?: string;
    selectedDateTime?: string;
    visitType?: string;
}

interface FormField {
    id: keyof Pick<FormData, 'fullName' | 'mobileNumber' | 'email'>;
    label: string;
    placeholder: string;
    validation: (value: string) => string | undefined;
}

interface ScheduleAFormProps {
    propertyId?: string;
    propertyName?: string;
}

export const ScheduleAForm = ({ propertyId, propertyName }: ScheduleAFormProps): JSX.Element => {
    // Form state
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        mobileNumber: "",
        email: "",
        gender: "",
        doubleSharing: "",
        preferredProperty: "",
        selectedDateTime: "",
        visitType: "",
    });
    // Error state
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // OTP verification state
    const [showOTPVerification, setShowOTPVerification] = useState(false);
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);

    // Property titles state
    const [propertyTitles, setPropertyTitles] = useState<PropertyTitle[]>([]);
    const [isLoadingProperties, setIsLoadingProperties] = useState(true);

    // Fetch property titles on component mount
    useEffect(() => {
        const fetchPropertyTitles = async () => {
            try {
                const response = await propertiesService.getPropertyTitles(1, 100); // Fetch first 100 properties
                if (response.data) {
                    setPropertyTitles(response.data.map((p: any) => ({ id: p._id || p.id, title: p.title })));
                    // If propertyName is provided but not in the list, add it
                    if (propertyName && !response.data.some(p => p.title === propertyName)) {
                        setPropertyTitles(prev => [
                            ...prev,
                            { id: propertyId || '', title: propertyName }
                        ]);
                    }
                }
            } catch (error) {
                console.error('Error fetching property titles:', error);
                toast({
                    title: "Error",
                    description: "Failed to load property titles. Please try again later.",
                    variant: "destructive",
                });
            } finally {
                setIsLoadingProperties(false);
            }
        };

        fetchPropertyTitles();
    }, [propertyId, propertyName]);

    // Debug log
    console.log('propertyTitles:', propertyTitles);
    console.log('preferredProperty:', formData.preferredProperty);

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
            validation: (value: string) => !/^\d{10}$/.test(value) ? "Please enter a valid Indian mobile number" : undefined
        },
        {
            id: "email",
            label: "E-mail",
            placeholder: "E-mail",
            validation: (value: string) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Please enter a valid email address" : undefined
        },
    ];

    // Removed unused variables

    // Handle OTP verification success
    const handleVerificationSuccess = (phone: string) => {
        setIsPhoneVerified(true);
        toast({
            title: "Phone Verified!",
            description: "Your mobile number has been verified successfully.",
            variant: "success",
        });
    };

    // Handle input changes
    const handleInputChange = (field: Exclude<keyof FormData, 'description'>, value: string) => {
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

        if (!formData.visitType) {
            newErrors.visitType = "Please select visit type";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsSubmitting(false);
            return;
        }

        // Check if user is logged in, if not, verify phone number
        if (!isLoggedIn() && !isPhoneVerified) {
            setShowOTPVerification(true);
            setIsSubmitting(false);
            return;
        }

        try {
            // Format the date and time for the API in ISO 8601 format with timezone
            const dateTime = new Date(formData.selectedDateTime);
            // Ensure we're using the correct timezone offset
            const timezoneOffset = dateTime.getTimezoneOffset() * 60000; // in milliseconds
            const localISOTime = new Date(dateTime.getTime() - timezoneOffset).toISOString();

            // Format: "2023-12-25T14:30:00Z"
            const formattedDateTime = localISOTime.slice(0, 19) + 'Z';

            const number = formData.mobileNumber.startsWith('+91') ? formData.mobileNumber : `+91${formData.mobileNumber}`;
            // Prepare the visit data
            const visitData = {
                fullName: formData.fullName,
                phoneNumber: number,
                email: formData.email,
                gender: formData.gender,
                date: formattedDateTime,
                mode: formData.visitType,
                sharing: formData.doubleSharing.toLowerCase(),
                propertyId: propertyId || "507f191e810c19729de860ea",
                propertyName: propertyName || "",
            };

            // Call the visit service
            await visitService.scheduleVisit(visitData);

            // Handle successful submission
            toast({
                title: "Success!",
                description: "Your visit has been successfully scheduled!",
                variant: "success",
            });

            // Reset form
            setFormData({
                fullName: "",
                mobileNumber: "",
                email: "",
                gender: "male",
                doubleSharing: "Comfort Stay PG",
                selectedDateTime: "",
                visitType: "physical",
                preferredProperty: "",
            });
            setErrors({});
        } catch (error) {
            console.error('Error scheduling visit:', error);
            toast({
                title: "Error!",
                description: "Failed to schedule visit. Please try again.",
                variant: "destructive",
            });
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
                                    {field.id === 'mobileNumber' && !isLoggedIn() && (
                                        <span className="text-sm text-gray-500 ml-2">
                                            {isPhoneVerified ? '(✓ Verified)' : '(Verification required)'}
                                        </span>
                                    )}
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
                                {field.id === 'mobileNumber' && !isLoggedIn() && !isPhoneVerified && formData.mobileNumber && (
                                    <p className="text-blue-600 text-sm mt-1 ml-2.5">
                                        Mobile verification will be required to complete scheduling
                                    </p>
                                )}
                            </div>
                        ))}

                        <div className="mb-5">
                            <div className="font-desktop-subtitle-bold text-text mb-1 ml-2.5">
                                How would you like to see around?
                            </div>
                            <Select
                                value={formData.visitType}
                                onValueChange={(value: 'physical' | 'virtual') => handleInputChange("visitType", value)}
                                disabled={isSubmitting}
                            >
                                <SelectTrigger className="h-[52px] bg-white rounded-xl border border-solid border-[#c3d0d7] pl-[26px] font-desktop-subtitle text-text">
                                    <SelectValue placeholder="Select visit Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="select" >Select</SelectItem>
                                    <SelectItem value="physical">Physical</SelectItem>
                                    <SelectItem value="virtual">Virtual</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.visitType && (
                                <p className="text-red-500 text-sm mt-1 ml-2.5">
                                    {errors.visitType}
                                </p>
                            )}
                        </div>

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
                                    <SelectItem value="select" >Select</SelectItem>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Sharing */}
                        <div className="mb-5">
                            <div className="flex items-center ml-2.5 mb-1">
                                <span className="font-desktop-subtitle-bold text-text">
                                    Sharing
                                </span>
                            </div>
                            <Select
                                value={formData.doubleSharing}
                                onValueChange={(value) => handleInputChange("doubleSharing", value)}
                                disabled={isSubmitting}
                            >
                                <SelectTrigger className="h-[52px] bg-white rounded-xl border border-solid border-[#c3d0d7] pl-[26px] font-desktop-subtitle text-text">
                                    <SelectValue placeholder="Select sharing" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="single">Single</SelectItem>
                                    <SelectItem value="double">Double</SelectItem>
                                    <SelectItem value="triple">Triple</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Preferred Property Name */}
                        <div className="mb-5">
                            <div className="flex items-center ml-2.5 mb-1">
                                <span className="font-desktop-subtitle-bold text-text">
                                    Preferred Property Name
                                </span>
                            </div>
                            <Select
                                value={formData.preferredProperty}
                                onValueChange={(value) => handleInputChange("preferredProperty", value)}
                                disabled={isSubmitting || isLoadingProperties}
                            >
                                <SelectTrigger className="h-[52px] bg-white rounded-xl border border-solid border-[#c3d0d7] pl-[26px] font-desktop-subtitle text-text">
                                    <SelectValue
                                        placeholder={isLoadingProperties ? "Loading properties..." : "Select a property"}
                                    >
                                        {formData.preferredProperty && (propertyTitles.find(p => p.id === formData.preferredProperty)?.title || formData.preferredProperty)}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {propertyTitles.map((property) => (
                                        <SelectItem key={property.id} value={property.id}>
                                            {property.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.preferredProperty && (
                                <p className="text-red-500 text-sm mt-1 ml-2.5">
                                    {errors.preferredProperty}
                                </p>
                            )}
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
                                min={new Date().toISOString().slice(0, 16)}
                            />
                            {errors.selectedDateTime && (
                                <p className="text-red-500 text-sm mt-1 ml-2.5">
                                    {errors.selectedDateTime}
                                </p>
                            )}
                        </div>

                        {/* Payment Section */}
                        <div className="space-y-10">








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

            {/* OTP Verification Modal */}
            <OTPVerification
                isOpen={showOTPVerification}
                onClose={() => setShowOTPVerification(false)}
                onVerificationSuccess={handleVerificationSuccess}
                phoneNumber={formData.mobileNumber}
            />
        </div>
    );
};
