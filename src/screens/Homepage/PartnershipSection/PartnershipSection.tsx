import { CalendarIcon } from "lucide-react";
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
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

export const PartnershipSection = (): JSX.Element => {
    // State for form fields
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [time, setTime] = useState("");
    const [meetingType, setMeetingType] = useState("");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [description, setDescription] = useState("");

    // Generate time slots
    const timeSlots: string[] = [];
    for (let hour = 9; hour <= 17; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const period = hour >= 12 ? "PM" : "AM";
            const displayHour = hour % 12 || 12;
            const formattedMinute = minute.toString().padStart(2, "0");
            timeSlots.push(`${displayHour}:${formattedMinute} ${period}`);
        }
    }

    // Form field configuration
    const formFields = [
        {
            id: "date",
            label: "Choose date",
            placeholder: "DD/MM/YYYY",
            value: selectedDate ? format(selectedDate, "dd/MM/yyyy") : "",
            onChange: (date: Date | undefined) => setSelectedDate(date),
            icon: <CalendarIcon className="w-6 h-6" />,
            picker: true,
        },
        {
            id: "time",
            label: "Time slot",
            placeholder: "Select time",
            value: time,
            onChange: (value: string) => setTime(value),
            icon: (
                <div className="relative w-6 h-6">
                    <img
                        className="absolute w-[18px] h-5 top-0.5 left-[3px]"
                        alt="ClockIcon icon"
                        src="https://c.animaapp.com/mbhmsf5eMRDRNk/img/group-2.png"
                    />
                </div>
            ),
            picker: true,
        },
        {
            id: "meetingType",
            label: "Physical / Virtual",
            placeholder: "Physical",
            options: ["Physical", "Virtual"],
            value: meetingType,
            onChange: (value: string) => setMeetingType(value),
            icon: (
                <img
                    className="w-6 h-6"
                    alt="Meeting type icon"
                    src="https://c.animaapp.com/mbhmsf5eMRDRNk/img/simple-icons-gotomeeting.svg"
                />
            ),
        },
        {
            id: "description",
            label: "Description",
            placeholder: "Description",
            value: description,
            onChange: (value: string) => setDescription(value),
            icon: (
                <img
                    className="w-6 h-6"
                    alt="Meeting type icon"
                    src="https://c.animaapp.com/mbhmsf5eMRDRNk/img/simple-icons-gotomeeting.svg"
                />
            ),
        },
    ];

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

                <Button className="w-full sm:w-auto px-10 py-3 rounded-[40px] bg-green hover:bg-green/90">
                    <span className="font-desktop-subtitle-bold font-[number:var(--desktop-subtitle-bold-font-weight)] text-white text-[length:var(--desktop-subtitle-bold-font-size)] tracking-[var(--desktop-subtitle-bold-letter-spacing)] leading-[var(--desktop-subtitle-bold-line-height)] [font-style:var(--desktop-subtitle-bold-font-style)]">
                        Start booking
                    </span>
                </Button>
            </div>

            <Card className="w-full lg:w-[443px] bg-[#ffffffcc] rounded-[30px] shadow-cards">
                <CardContent className="p-4 sm:p-5">
                    <div className="flex flex-col items-center gap-6 sm:gap-8 w-full">
                        <div className="flex flex-col items-start gap-4 sm:gap-6 w-full">
                            {formFields.map((field) => (
                                <div
                                    key={field.id}
                                    className="flex flex-col w-full items-start gap-3 sm:gap-4 relative"
                                >
                                    <div className="flex items-center gap-2">
                                        {field.icon}
                                        <span className="font-desktop-subtitle-bold font-[number:var(--desktop-subtitle-bold-font-weight)] text-[#181a18] text-[length:var(--desktop-subtitle-bold-font-size)] tracking-[var(--desktop-subtitle-bold-letter-spacing)] leading-[var(--desktop-subtitle-bold-line-height)] [font-style:var(--desktop-subtitle-bold-font-style)]">
                                            {field.label}
                                        </span>
                                        {field.id === "meetingType" && (
                                            <div className="w-5 h-5 bg-[url(https://c.animaapp.com/mbhmsf5eMRDRNk/img/asset---icon---arrow.svg)] bg-[100%_100%]" />
                                        )}
                                    </div>

                                    {field.id === "meetingType" ? (
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange as (value: string) => void}
                                        >
                                            <SelectTrigger className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-white rounded-xl">
                                                <SelectValue
                                                    placeholder={field.placeholder}
                                                    className="font-main-text-p1-500 font-[number:var(--main-text-p1-500-font-weight)] text-[#8b8b8b] text-[length:var(--main-text-p1-500-font-size)] tracking-[var(--main-text-p1-500-letter-spacing)] leading-[var(--main-text-p1-500-line-height)] [font-style:var(--main-text-p1-500-font-style)]"
                                                />
                                            </SelectTrigger>
                                            <SelectContent>
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
                                                {field.value || field.placeholder}
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 text-gray-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </div>

                                            {/* Date Picker */}
                                            {field.id === "date" && showDatePicker && (
                                                <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-lg z-10 p-4 border border-gray-200">
                                                    <DayPicker
                                                        mode="single"
                                                        selected={selectedDate}
                                                        onSelect={(date) => {
                                                            field.onChange(date as Date & string);
                                                            setShowDatePicker(false);
                                                        }}
                                                        disabled={{ before: new Date() }}
                                                        className="p-3"
                                                    />
                                                </div>
                                            )}

                                            {/* Time Picker */}
                                            {field.id === "time" && showTimePicker && (
                                                <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto border border-gray-200">
                                                    {timeSlots.map((slot) => (
                                                        <div
                                                            key={slot}
                                                            className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                                                            onClick={() => {
                                                                field.onChange(slot as Date & string);
                                                                setShowTimePicker(false);
                                                            }}
                                                        >
                                                            {slot}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <Input
                                            id={field.id}
                                            value={field.value}
                                            onChange={(e) => field.onChange(e.target.value as Date & string)}
                                            placeholder={field.placeholder}
                                            className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-white rounded-xl font-main-text-p1-500 font-[number:var(--main-text-p1-500-font-weight)] text-[#8b8b8b] text-[length:var(--main-text-p1-500-font-size)] tracking-[var(--main-text-p1-500-letter-spacing)] leading-[var(--main-text-p1-500-line-height)] [font-style:var(--main-text-p1-500-font-style)]"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        <Button className="w-full sm:w-auto px-10 py-3 rounded-[40px] bg-green hover:bg-green/90">
                            <span className="font-desktop-subtitle-bold font-[number:var(--desktop-subtitle-bold-font-weight)] text-white text-[length:var(--desktop-subtitle-bold-font-size)] tracking-[var(--desktop-subtitle-bold-letter-spacing)] leading-[var(--desktop-subtitle-bold-line-height)] [font-style:var(--desktop-subtitle-bold-font-style)]">
                                Start booking
                            </span>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
};