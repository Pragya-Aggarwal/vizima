import { CalendarIcon, Clock, Command, Phone, Sparkles, User, ChevronDown } from "lucide-react";
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
import { OTPVerification } from "../../../components/OTPVerification";
import { isLoggedIn } from "../../../utils/auth";

// Add global styles for TimePicker
const timePickerStyles = `
  .react-time-picker {
    width: 100%;
  }
  
  .react-time-picker__wrapper {
    border: 1px solid #d1d5db !important;
    border-radius: 0.75rem !important;
    background: white !important;
    padding: 0.5rem 1rem !important;
    transition: all 0.2s ease;
  }
  
  .react-time-picker__wrapper:hover {
    border-color: #9ca3af !important;
  }
  
  .react-time-picker__wrapper:focus-within {
    border-color: #3b82f6 !important;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2) !important;
  }
  
  .react-time-picker__inputGroup {
    min-width: 0.5rem !important;
  }
  
  .react-time-picker__inputGroup__input,
  .react-time-picker__inputGroup__leadingZero,
  .react-time-picker__inputGroup__divider,
  .react-time-picker__inputGroup__amPm {
    color: #1f2937 !important;
    background: white !important;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
  
  .react-time-picker__select {
    background: white !important;
  }
  
  .react-time-picker__select select {
    background: white !important;
    color: #1f2937 !important;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
  
  .react-time-picker__button {
    padding: 0 0.5rem;
  }
  
  .react-time-picker__button:enabled:hover .react-time-picker__button__icon {
    stroke: #3b82f6;
  }
  
  .react-time-picker__button:enabled:active .react-time-picker__button__icon {
    stroke: #2563eb;
  }
`;



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

    // OTP verification state
    const [showOTPVerification, setShowOTPVerification] = useState(false);
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);

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

    // Handle OTP verification success
    const handleVerificationSuccess = (phone: string) => {
        setIsPhoneVerified(true);
        toast({
            title: "Phone Verified!",
            description: "Your mobile number has been verified successfully.",
            variant: "success",
        });
    };

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

        // Check if user is logged in, if not, verify phone number
        if (!isLoggedIn() && !isPhoneVerified) {
            setShowOTPVerification(true);
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
            const number = phone.startsWith('+91') ? phone : `+91${phone}`;
            const requestData = {
                date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '',
                timeSlot: formattedTime,
                mode: meetingType.toLowerCase(),
                description: description || '',
                name: name,
                phone: number
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
        <section className="flex flex-col lg:flex-row w-full items-center lg:items-stretch justify-between gap-8 lg:gap-12 px-4 sm:px-8 lg:px-20 py-16 sm:py-20 lg:py-28 relative overflow-hidden bg-cover bg-center bg-[var(--bg)]" 
                style={{
                    background: 'url(https://c.animaapp.com/mbhmsf5eMRDRNk/img/bespoke-partnerships.png) center/cover no-repeat',
                    // background: 'linear-gradient(90deg, white 0%, rgba(6, 71, 73, 0.8) 100%), url(https://c.animaapp.com/mbhmsf5eMRDRNk/img/bespoke-partnerships.png) center/cover no-repeat',
                    backgroundAttachment: 'fixed'
                }}>
                <div className="flex flex-col items-start justify-center gap-8 lg:gap-10 max-w-[600px] w-full lg:w-auto relative z-10">
                    <div className="flex flex-col items-start gap-5 w-full">
                        <div className="inline-block bg-[var(--green)] backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full mb-2 border border-white/20">
                            Schedule a Visit
                        </div>
                        <h2 className="font-desktop-h2 text-black lg:text-white text-[36px] lg:text-[48px] leading-[1.2] lg:leading-[54px] font-bold">
                            Experience Our Space <span className="text-[var(--black)] lg:text-white/90">Before You Commit</span>
                        </h2>
                        <p className="font-desktop-subtitle text-black/80 lg:text-white text-[16px] lg:text-[18px] leading-relaxed max-w-lg">
                            See our facilities in person or take a virtual tour. Schedule a visit that fits your schedule and let us show you why we're the perfect choice.
                        </p>
                        
                        <div className="mt-6 flex flex-col gap-4 text-black/80 lg:text-white">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-green flex items-center justify-center">
                                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <span className="text-sm font-desktop-text-regular">Flexible scheduling</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-green flex items-center justify-center">
                                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <span className="text-sm">Virtual or in-person options</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-green flex items-center justify-center">
                                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <span className="text-sm">No-obligation consultation</span>
                            </div>
                        </div>
                    </div>
                </div>

            <style>{timePickerStyles}</style>
            <Card className="w-full lg:w-[500px] bg-white/95 backdrop-blur-sm rounded-2xl shadow-cards border border-white/20 overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="bg-[var(--green)] p-5 text-white">
                    <h3 className="font-desktop-h4 text-white">Schedule a Visit</h3>
                    <p className="font-desktop-text-regular text-white/90 text-sm mt-1">Book your appointment in just a few clicks</p>
                </div>
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                        {formFields.map((field) => (
                            <div key={field.id} className="flex flex-col w-full items-start gap-3 sm:gap-4 relative">
                                <div className="flex items-center gap-2 w-full">
                                    <div className="text-green">
                                        {field.icon}
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor={field.id} className="block text-sm font-medium text-[var(--text)]">
                                            {field.label}
                                            {field.id === 'phone' && !isLoggedIn() && (
                                                <span className={`text-xs font-normal ml-1 ${isPhoneVerified ? 'text-green' : 'text-black'}`}>
                                                    {isPhoneVerified ? '(✓ Verified)' : '(Verification required)'}
                                                </span>
                                            )}
                                        </label>
                                    </div>
                                </div>

                                {field.picker === 'time' ? (
                                    <div className="w-full relative">
                                        <div className="w-full">
                                            <TimePicker
                                                id="time"
                                                onChange={(value) => setTime(value)}
                                                value={time}
                                                disableClock={true}
                                                clearIcon={null}
                                                className="w-full [&>div]:w-full [&>div]:border [&>div]:rounded-lg [&>div]:border-[var(--border)] [&>div]:bg-white [&>div]:px-4 [&>div]:py-2.5 [&>div]:text-sm [&>div]:text-[var(--text)] [&>div]:focus:ring-2 [&>div]:focus:ring-[var(--green)] [&>div]:focus:border-[var(--green)] [&>div]:transition-all [&>div]:duration-200 [&>div]:shadow-sm"
                                                format="h:mm a"
                                                hourPlaceholder="HH"
                                                minutePlaceholder="MM"
                                                amPmAriaLabel="Select AM/PM"
                                                required
                                            />
                                        </div>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                            <ChevronDown className="h-4 w-4" />
                                        </div>
                                    </div>
                                ) : field.id === "meetingType" ? (
                                    <Select
                                        value={field.value as string}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className="w-full h-auto min-h-[42px] px-4 py-2.5 bg-white border-[var(--border)] rounded-lg text-sm text-[var(--text)] focus:ring-2 focus:ring-[var(--green)] focus:border-[var(--green)] transition-all duration-200 shadow-sm">
                                            <SelectValue placeholder={field.placeholder} />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border border-[var(--border)] rounded-lg shadow-lg mt-1">
                                            <SelectItem value="select" className="text-muted-foreground hover:bg-accent/50">Select an option</SelectItem>
                                            {field.options?.map((option) => (
                                                <SelectItem 
                                                    key={option} 
                                                    value={option}
                                                    className="hover:bg-accent/50 focus:bg-accent/50"
                                                >
                                                    {option}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                ) : field.picker ? (
                                    <div className="relative w-full">
                                        <div
                                            className="w-full px-4 py-2.5 bg-white border border-[var(--border)] rounded-lg text-sm text-[var(--text)] cursor-pointer flex items-center justify-between hover:border-[var(--green)] focus:outline-none focus:ring-2 focus:ring-[var(--green)] focus:border-[var(--green)] transition-all duration-200"
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
                                            <span className={!field.value ? 'text-muted-foreground' : 'text-foreground'}>
                                                {field.id === 'date'
                                                    ? (field.value ? format(field.value as Date, 'dd MMM yyyy') : field.placeholder)
                                                    : (field.value !== undefined && field.value !== null ? String(field.value) : field.placeholder)
                                                }
                                            </span>
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
                                            <div className="absolute z-50 mt-2 left-0 w-[320px] max-w-[95vw] bg-white border border-gray-200 rounded-md shadow-lg overflow-x-auto">

                                                <DayPicker
                                                    mode="single"
                                                    selected={field.value as Date | undefined}
                                                    onSelect={(date) => {
                                                        field.onChange(date);
                                                        setShowDatePicker(false);
                                                    }}
                                                    className="p-3 border border-[var(--border)] rounded-lg shadow-lg bg-white"
                                                    styles={{
                                                        caption: { color: '#1e40af' },
                                                        day: { 
                                                            margin: '0.2em',
                                                            padding: '0.3em 0',
                                                            borderRadius: '0.25rem',
                                                            transition: 'all 0.2s ease-in-out'
                                                        },
                                                        day_selected: { 
                                                            backgroundColor: 'var(--green)',
                                                            color: 'white',
                                                            fontWeight: '500'
                                                        },
                                                        day_today: { 
                                                            color: 'var(--green)',
                                                            fontWeight: 'bold' 
                                                        },
                                                        day_disabled: { 
                                                            color: '#9ca3af',
                                                            cursor: 'not-allowed' 
                                                        },
                                                        day_outside: { 
                                                            color: '#9ca3af',
                                                            opacity: 0.5 
                                                        },
                                                        day_range_middle: {
                                                            backgroundColor: 'rgba(6, 71, 73, 0.1)',
                                                            color: 'var(--green)'
                                                        }
                                                    }}
                                                    classNames={{
                                                        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                                                        month: "space-y-4",
                                                        caption: "flex justify-center pt-1 relative items-center",

                                                        nav: "space-x-1 flex items-center",
                                                        nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                                                        nav_button_previous: "absolute left-1",
                                                        nav_button_next: "absolute right-1",
                                                        table: "w-full table-fixed", // Force fixed table layout
                                                        row: "flex w-full mt-2",
                                                        cell: "flex-1 text-center text-sm p-0",
                                                        day: "w-full h-8 sm:h-9 text-xs sm:text-sm",
                                                        caption_label: "text-sm font-medium truncate w-full text-center",
                                                        head_row: "flex w-full",
                                                        head_cell: "flex-1 text-center text-muted-foreground rounded-md font-normal text-xs truncate",
                                                        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                                                        day_today: "bg-accent text-accent-foreground",
                                                        day_outside: "text-muted-foreground opacity-50",
                                                        day_disabled: "text-muted-foreground opacity-50",
                                                        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                                                        day_hidden: "invisible",
                                                    }}
                                                />
                                            </div>
                                        )}

                                        {field.id === "time" && showTimePicker && (
                                            <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-md shadow-lg w-full sm:w-auto min-w-[200px] sm:min-w-[250px] max-w-[calc(100vw-2rem)] sm:max-w-none left-0 sm:left-auto right-0 sm:right-auto">
                                                <div className="p-2 sm:p-4">
                                                    <TimePicker
                                                        onChange={(value) => {
                                                            field.onChange(value as string | null);
                                                            setShowTimePicker(false);
                                                        }}
                                                        value={field.value as string | null}
                                                        disableClock={true}
                                                        clearIcon={null}
                                                        className="border-0 w-full [&>div]:w-full [&>div]:border [&>div]:rounded-xl [&>div]:border-input [&>div]:bg-background [&>div]:px-3 sm:px-4 [&>div]:py-2 sm:py-3 [&>div]:text-sm [&>div]:ring-offset-background [&>div]:focus-visible:outline-none [&>div]:focus-visible:ring-2 [&>div]:focus-visible:ring-ring [&>div]:focus-visible:ring-offset-2 [&>div]:disabled:cursor-not-allowed [&>div]:disabled:opacity-50"
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

                        <div className="w-full flex justify-center col-span-1 sm:col-span-2">
                            <Button 
                                type="submit" 
                                className="w-full sm:w-auto mt-2 sm:mt-4 bg-[var(--green)] hover:bg-[#053a3c] text-white font-medium py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-cards hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                                disabled={isSubmitting}
                            >
                                <span className="font-desktop-subtitle-bold font-[number:var(--desktop-subtitle-bold-font-weight)] text-white text-[length:var(--desktop-subtitle-bold-font-size)] tracking-[var(--desktop-subtitle-bold-letter-spacing)] leading-[var(--desktop-subtitle-bold-line-height)] [font-style:var(--desktop-subtitle-bold-font-style)]">
                                    {isSubmitting ? 'Scheduling...' : 'Start booking'}
                                </span>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* OTP Verification Modal */}
            <OTPVerification
                isOpen={showOTPVerification}
                onClose={() => setShowOTPVerification(false)}
                onVerificationSuccess={handleVerificationSuccess}
                phoneNumber={phone}
            />
        </section>
    );
};