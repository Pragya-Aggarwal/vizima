// import {
//     ChevronDownIcon,
//     ChevronLeftIcon,
//     ChevronRightIcon,
// } from "lucide-react";
// import React from "react";
// import { Button } from "../../../components/ui/button";
// import { Card, CardContent } from "../../../components/ui/card";
// import { Input } from "../../../components/ui/input";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "../../../components/ui/select";

// export const ScheduleAForm = (): JSX.Element => {
//     // Form field data
//     const formFields = [
//         { id: "fullName", label: "Full Name", placeholder: "Full Name" },
//         {
//             id: "mobileNumber",
//             label: "Mobile Number",
//             placeholder: "+91- XXXXX XXXXX",
//         },
//         { id: "email", label: "E-mail", placeholder: "E-mail" },
//     ];


//     return (
//         <Card className="w-full max-w-[600px] bg-[#e2f1e8] rounded-xl border border-solid border-[#c3d0d7]">
//             <CardContent className="p-[34px]">
//                 {/* Text input fields */}
//                 {formFields.map((field) => (
//                     <div key={field.id} className="mb-5">
//                         <div className="font-desktop-subtitle-bold text-text mb-1 ml-2.5">
//                             {field.label}
//                         </div>
//                         <Input
//                             className="h-[52px] bg-white rounded-xl border border-solid border-[#c3d0d7] pl-[26px] font-desktop-subtitle text-text"
//                             placeholder={field.placeholder}
//                         />
//                     </div>
//                 ))}

//                 <div className="mb-5">
//                     <div className="font-desktop-subtitle-bold text-text mb-1 ml-2.5">
//                         How would you Like to see around?
//                     </div>
//                     <Select defaultValue="Physical">
//                         <SelectTrigger className="h-[52px] bg-white rounded-xl border border-solid border-[#c3d0d7] pl-[26px] font-desktop-subtitle text-text">
//                             <SelectValue placeholder="Select gender" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectItem value="Physical">Physical</SelectItem>
//                             <SelectItem value="Online">Online</SelectItem>
//                         </SelectContent>
//                     </Select>
//                 </div>
//                 {/* Gender dropdown */}
//                 <div className="mb-5">
//                     <div className="font-desktop-subtitle-bold text-text mb-1 ml-2.5">
//                         Gender
//                     </div>
//                     <Select defaultValue="male">
//                         <SelectTrigger className="h-[52px] bg-white rounded-xl border border-solid border-[#c3d0d7] pl-[26px] font-desktop-subtitle text-text">
//                             <SelectValue placeholder="Select gender" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectItem value="male">Male</SelectItem>
//                             <SelectItem value="female">Female</SelectItem>
//                             <SelectItem value="other">Other</SelectItem>
//                         </SelectContent>
//                     </Select>
//                 </div>

//                 {/* Double Sharing */}
//                 <div className="mb-5">
//                     <div className="flex items-center ml-2.5 mb-1">
//                         <span className="font-desktop-subtitle-bold text-text">
//                             Double Sharing
//                         </span>
//                         <ChevronDownIcon className="w-[31px] h-[26px] ml-2" />
//                     </div>
//                     <Input
//                         className="h-[52px] bg-white rounded-xl border border-solid border-[#c3d0d7] pl-[26px] font-desktop-subtitle text-text"
//                         defaultValue="Comfort Stay PG"
//                     />
//                 </div>

//                 {/* Preferred Property Name */}
//                 <div className="mb-5">
//                     <div className="flex items-center ml-2.5 mb-1">
//                         <span className="font-desktop-subtitle-bold text-text">
//                             Preferred Property Name
//                         </span>
//                         <ChevronDownIcon className="w-[31px] h-[26px] ml-2" />
//                     </div>
//                     <Input
//                         className="h-[52px] bg-white rounded-xl border border-solid border-[#c3d0d7] pl-[26px] font-desktop-subtitle text-text"
//                         defaultValue="Comfort Stay PG"
//                     />
//                 </div>


//             </CardContent>
//         </Card>
//     );
// };


import { ChevronDownIcon } from "lucide-react";
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
import { visitService } from "../../../api/services/visitService";
import { toast } from "sonner";

interface FormData {
    fullName: string;
    mobileNumber: string;
    email: string;
    gender: string;
    doubleSharing: string;
    preferredProperty: string;
    selectedDateTime: string;
    visitType: 'physical' | 'virtual';
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
}

export const ScheduleAForm = ({ propertyId }: ScheduleAFormProps): JSX.Element => {
    // Form state
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        mobileNumber: "",
        email: "",
        gender: "male",
        doubleSharing: "Comfort Stay PG",
        preferredProperty: "Comfort Stay PG",
        selectedDateTime: "",
        visitType: "physical",
    });
    console.log(propertyId);
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


        try {
            // Format the date and time for the API in ISO 8601 format with timezone
            const dateTime = new Date(formData.selectedDateTime);
            // Ensure we're using the correct timezone offset
            const timezoneOffset = dateTime.getTimezoneOffset() * 60000; // in milliseconds
            const localISOTime = new Date(dateTime.getTime() - timezoneOffset).toISOString();

            // Format: "2023-12-25T14:30:00Z"
            const formattedDateTime = localISOTime.slice(0, 19) + 'Z';

            // Prepare the visit data
            const visitData = {
                fullName: formData.fullName,
                phoneNumber: formData.mobileNumber,
                email: formData.email,
                gender: formData.gender,
                date: formattedDateTime,
                mode: formData.visitType,
                sharing: "double",
                propertyId: propertyId || "507f191e810c19729de860ea",
            };

            // Call the visit service
            await visitService.scheduleVisit(visitData);

            // Handle successful submission
            toast.success("Visit scheduled successfully!");

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
            toast.error("Failed to schedule visit. Please try again.");
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
        </div>
    );
};
