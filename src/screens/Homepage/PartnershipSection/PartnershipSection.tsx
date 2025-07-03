import { CalendarIcon, Clock, Command, Phone, Sparkles, User } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "../../../components/ui/select";
import { format } from "date-fns";
import { useToast } from "../../../components/ui/use-toast";
import { homeService } from "../../../api/services/homeService";
import TimePicker from 'react-time-picker';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

interface FormFieldBase {
    id: string;
    label: string;
    placeholder: string;
    value: string | Date | undefined | null;
    icon: React.ReactNode;
    picker?: boolean | 'time';
    options?: string[];
    onChange: (value: any) => void;
}

type FormField =
    | (FormFieldBase & { picker: true; value: Date | undefined; onChange: (value: Date | undefined) => void })
    | (FormFieldBase & { picker: 'time'; value: string | null; onChange: (value: string | null) => void })
    | (FormFieldBase & { picker?: false; value: string; onChange: (value: string) => void });

export const PartnershipSection = (): JSX.Element => {
    const { toast } = useToast();
    // State for form fields
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [time, setTime] = useState<string | null>(null);
    const [meetingType, setMeetingType] = useState("");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    // Format time for display
    const formatTimeDisplay = (timeStr: string | null) => {
        if (!timeStr) return 'Select time';
        const [hours, minutes] = timeStr.split(':');
        const hour = parseInt(hours);
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${period}`;
    };

    // Form field configuration
    const formFields: FormField[] = [
        {
            id: "date",
            label: "Choose date",
            placeholder: "DD/MM/YYYY",
            value: selectedDate,
            onChange: (date: Date | undefined) => setSelectedDate(date),
            icon: <CalendarIcon className="w-6 h-6" />,
            picker: true
        },
        {
            id: "time",
            label: "Time slot",
            placeholder: "Select time",
            value: time,
            onChange: (value: string | null) => setTime(value),
            icon: <Clock className="w-6 h-6" />,
            picker: 'time'
        },
        {
            id: "name",
            label: "Name",
            placeholder: "Name",
            value: name,
            onChange: (value: string) => setName(value),
            icon: <User className="w-6 h-6" />,
            picker: false
        },
        {
            id: "phone",
            label: "Phone",
            placeholder: "Phone",
            value: phone,
            onChange: (value: string) => setPhone(value),
            icon: <Phone className="w-6 h-6" />,
            picker: false
        },
        {
            id: "meetingType",
            label: "Visit Type",
            placeholder: "select",
            options: ["Physical", "Virtual"],
            value: meetingType,
            onChange: (value: string) => setMeetingType(value),
            icon: (
                <Command className="w-6 h-6" />
            ),
            picker: false
        },
        {
            id: "description",
            label: "Description",
            placeholder: "Description",
            value: description,
            onChange: (value: string) => setDescription(value),
            icon: (
                <Sparkles className="w-6 h-6" />
            ),
            picker: false
        }
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate required fields
        const missingFields = [];
        if (!selectedDate) missingFields.push('date');
        if (!time) missingFields.push('time');
        if (!meetingType) missingFields.push('meeting type');
        if (!name) missingFields.push('name');
        if (!phone) missingFields.push('phone');

        if (missingFields.length > 0) {
            toast({
                title: 'Missing required fields',
                description: `Please fill in: ${missingFields.join(', ')}`,
                variant: 'destructive'
            });
            return;
        }

        try {
            setIsSubmitting(true);
            // Format time to include AM/PM if not already present
            let formattedTime = time || '';
            if (time) {
                // If time is in 24-hour format (e.g., '12:00'), convert to 12-hour format with AM/PM
                if (time.match(/^\d{1,2}:\d{2}$/)) {
                    const [hours, minutes] = time.split(':');
                    const hoursNum = parseInt(hours, 10);
                    const period = hoursNum >= 12 ? 'PM' : 'AM';
                    const hours12 = hoursNum % 12 || 12; // Convert 0 to 12 for 12 AM
                    formattedTime = `${hours12}:${minutes} ${period}`;
                }
            }

            const requestData = {
                date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '',
                timeSlot: formattedTime,
                mode: meetingType.toLowerCase(),
                description: description || '',
                name: name,
                phone: phone
            };

            const response = await homeService.bookVisit(requestData);

            // Show success toast
            toast({
                title: 'Booking Successful!',
                description: 'Your visit has been booked successfully. We\'ll contact you soon!',
                variant: 'success',
                duration: 5000
            });

            // Reset form
            setSelectedDate(undefined);
            setTime("");
            setMeetingType("");
            setDescription("");
            setName("");
            setPhone("");

        } catch (error) {
            console.error('Booking failed:', error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to book visit. Please try again later.';

            toast({
                title: 'Booking Failed',
                description: errorMessage,
                variant: 'destructive',
                duration: 5000
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="flex flex-col lg:flex-row w-full items-center lg:items-stretch justify-between gap-6 lg:gap-8 px-4 sm:px-8 lg:px-20 py-12 sm:py-16 lg:py-24 relative [background:linear-gradient(90deg,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0)_100%),url(https://c.animaapp.com/mbhmsf5eMRDRNk/img/bespoke-partnerships.png)_50%_50%_/_cover]">
            <div className="flex flex-col items-start justify-center gap-8 lg:gap-[60px] max-w-[522px] w-full lg:w-auto">
                <div className="flex flex-col items-start gap-4 w-full">
                    <h2 className="text-2xl sm:text-[length:var(--desktop-h2-font-size)] font-desktop-h2 font-[number:var(--desktop-h2-font-weight)] text-white tracking-[var(--desktop-h2-letter-spacing)] leading-[var(--desktop-h2-line-height)] [font-style:var(--desktop-h2-font-style)]">
                        Visit Before You Book
                    </h2>
                    <p className="font-desktop-subtitle font-[number:var(--desktop-subtitle-font-weight)] text-white text-[length:var(--desktop-subtitle-font-size)] tracking-[var(--desktop-subtitle-letter-spacing)] leading-[var(--desktop-subtitle-line-height)] [font-style:var(--desktop-subtitle-font-style)]">
                        Schedule in-person or virtual tours easily.
                    </p>
                </div>


            </div>

            <Card className="w-full lg:w-[443px] bg-[#ffffffcc] rounded-[30px] shadow-cards">
                <CardContent className="p-4 sm:p-5">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 w-full">
                        {formFields.map((field) => (
                            <div key={field.id} className="flex flex-col w-full items-start gap-3 sm:gap-4 relative">
                                <div className="flex items-center gap-2">
                                    {field.icon}
                                    <span className="font-desktop-subtitle-bold font-[number:var(--desktop-subtitle-bold-font-weight)] text-[#181a18] text-[length:var(--desktop-subtitle-bold-font-size)] tracking-[var(--desktop-subtitle-bold-letter-spacing)] leading-[var(--desktop-subtitle-bold-line-height)] [font-style:var(--desktop-subtitle-bold-font-style)]">
                                        {field.label}
                                    </span>
                                    {field.id === "meetingType" && (
                                        <div className="w-5 h-5 bg-[url(https://c.animaapp.com/mbhmsf5eMRDRNk/img/asset---icon---arrow.svg)] bg-[100%_100%]" />
                                    )}
                                </div>

                                {field.picker === 'time' ? (
                                    <div className="w-full">
                                        <div className="w-full [&_.react-time-picker]:w-full">
                                            <TimePicker
                                                onChange={(value) => setTime(value)}
                                                value={time}
                                                disableClock={true}
                                                clearIcon={null}
                                                className="w-full [&>div]:w-full [&>div]:border [&>div]:rounded-xl [&>div]:border-input [&>div]:bg-background [&>div]:px-4 [&>div]:py-3 [&>div]:text-sm [&>div]:ring-offset-background [&>div]:focus-visible:outline-none [&>div]:focus-visible:ring-2 [&>div]:focus-visible:ring-ring [&>div]:focus-visible:ring-offset-2 [&>div]:disabled:cursor-not-allowed [&>div]:disabled:opacity-50"
                                                format="h:mm a"
                                                hourPlaceholder="HH"
                                                minutePlaceholder="MM"
                                                amPmAriaLabel="Select AM/PM"
                                                required
                                            />
                                        </div>
                                    </div>
                                ) : field.id === "meetingType" ? (
                                    <Select
                                        value={field.value as string}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-white rounded-xl">
                                            <SelectValue placeholder={field.placeholder} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="select" >Select</SelectItem>
                                            {field.options?.map((option) => (
                                                <SelectItem key={option} value={option}>
                                                    {option}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                ) : field.picker ? (
                                    <div className="relative w-full">
                                        <div
                                            className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-white rounded-xl font-main-text-p1-500 font-[number:var(--main-text-p1-500-font-weight)] text-[#8b8b8b] text-[length:var(--main-text-p1-500-font-size)] tracking-[var(--main-text-p1-500-letter-spacing)] leading-[var(--main-text-p1-500-line-height)] [font-style:var(--main-text-p1-500-font-style)] cursor-pointer flex items-center justify-between"
                                            onClick={() => {
                                                if (field.id === "date") {
                                                    setShowDatePicker(!showDatePicker);
                                                    setShowTimePicker(false);
                                                } else {
                                                    setShowTimePicker(!showTimePicker);
                                                    setShowDatePicker(false);
                                                }
                                            }}
                                        >
                                            {field.id === 'date'
                                                ? (field.value ? format(field.value as Date, 'dd/MM/yyyy') : field.placeholder)
                                                : (field.value !== undefined && field.value !== null ? String(field.value) : field.placeholder)
                                            }
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-gray-400"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14.5a6.5 6.5 0 110-13 6.5 6.5 0 010 13z"
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                />
                                                <path
                                                    d="M10 5a1 1 0 011 1v3.5h2a1 1 0 110 2h-3a1 1 0 01-1-1V6a1 1 0 011-1z"
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        {field.id === "date" && showDatePicker && (
                                            <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                                                <DayPicker
                                                    mode="single"
                                                    selected={field.value as Date | undefined}
                                                    onSelect={(date) => {
                                                        field.onChange(date);
                                                        setShowDatePicker(false);
                                                    }}
                                                />
                                            </div>
                                        )}
                                        {field.id === "time" && showTimePicker && (
                                            <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                                                <div className="p-2">
                                                    <TimePicker
                                                        onChange={(value) => {
                                                            field.onChange(value as string | null);
                                                            setShowTimePicker(false);
                                                        }}
                                                        value={field.value as string | null}
                                                        disableClock={true}
                                                        clearIcon={null}
                                                        className="border-0"
                                                        format="h:mm a"
                                                        hourPlaceholder="HH"
                                                        minutePlaceholder="MM"
                                                        amPmAriaLabel="Select AM/PM"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Input
                                        id={field.id}
                                        value={field.value as string}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        placeholder={field.placeholder}
                                        className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-white rounded-xl font-main-text-p1-500 font-[number:var(--main-text-p1-500-font-weight)] text-[#8b8b8b] text-[length:var(--main-text-p1-500-font-size)] tracking-[var(--main-text-p1-500-letter-spacing)] leading-[var(--main-text-p1-500-line-height)] [font-style:var(--main-text-p1-500-font-style)]"
                                    />
                                )}
                            </div>
                        ))}

                        <Button
                            className="w-full sm:w-auto px-10 py-3 rounded-[40px] bg-green hover:bg-green/90 col-span-1 sm:col-span-2"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            <span className="font-desktop-subtitle-bold font-[number:var(--desktop-subtitle-bold-font-weight)] text-white text-[length:var(--desktop-subtitle-bold-font-size)] tracking-[var(--desktop-subtitle-bold-letter-spacing)] leading-[var(--desktop-subtitle-bold-line-height)] [font-style:var(--desktop-subtitle-bold-font-style)]">
                                {isSubmitting ? 'Scheduling...' : 'Start booking'}
                            </span>
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </section>
    );
};