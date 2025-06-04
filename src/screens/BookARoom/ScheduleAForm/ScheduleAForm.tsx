import {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "lucide-react";
import React from "react";
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

export const ScheduleAForm = (): JSX.Element => {
    // Form field data
    const formFields = [
        { id: "fullName", label: "Full Name", placeholder: "Full Name" },
        {
            id: "mobileNumber",
            label: "Mobile Number",
            placeholder: "+91- XXXXX XXXXX",
        },
        { id: "email", label: "E-mail", placeholder: "E-mail" },
    ];

    // Time slots data
    const timeSlots = ["10:00 AM", "12:00 PM", "02:00 PM"];

    // Calendar days header
    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

    // Calendar days for August 2025
    const calendarDays = [
        [null, null, null, null, 1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10, 11, 12],
        [13, 14, 15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24, 25, 26],
        [27, 28, 29, 30],
    ];

    return (
        <Card className="w-full max-w-[600px] bg-[#e2f1e8] rounded-xl border border-solid border-[#c3d0d7]">
            <CardContent className="p-[34px]">
                {/* Text input fields */}
                {formFields.map((field) => (
                    <div key={field.id} className="mb-5">
                        <div className="font-desktop-subtitle-bold text-text mb-1 ml-2.5">
                            {field.label}
                        </div>
                        <Input
                            className="h-[52px] bg-white rounded-xl border border-solid border-[#c3d0d7] pl-[26px] font-desktop-subtitle text-text"
                            placeholder={field.placeholder}
                        />
                    </div>
                ))}

                <div className="mb-5">
                    <div className="font-desktop-subtitle-bold text-text mb-1 ml-2.5">
                        How would you Like to see around?
                    </div>
                    <Select defaultValue="Physical">
                        <SelectTrigger className="h-[52px] bg-white rounded-xl border border-solid border-[#c3d0d7] pl-[26px] font-desktop-subtitle text-text">
                            <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Physical">Physical</SelectItem>
                            <SelectItem value="Online">Online</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {/* Gender dropdown */}
                <div className="mb-5">
                    <div className="font-desktop-subtitle-bold text-text mb-1 ml-2.5">
                        Gender
                    </div>
                    <Select defaultValue="male">
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
                        defaultValue="Comfort Stay PG"
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
                        defaultValue="Comfort Stay PG"
                    />
                </div>

                {/* Calendar Section */}
                <div className="mb-5">
                    <div className="font-desktop-subtitle-bold text-text mb-1 ml-2.5">
                        Choose a suitable Date And Time
                    </div>
                    <Card className="bg-white rounded-xl border border-solid border-[#c3d0d7] p-0">
                        <CardContent className="p-0">
                            {/* Calendar Header */}
                            <div className="relative flex justify-center items-center h-[26px] mt-[7px]">
                                <ChevronLeftIcon className="absolute left-0 w-[31px] h-[26px]" />
                                <div className="font-desktop-subtitle-bold text-text text-center">
                                    AUG 2025
                                </div>
                                <ChevronRightIcon className="absolute right-0 w-[31px] h-[26px]" />
                            </div>

                            {/* Days of Week Header */}
                            <div className="bg-[#f2f0f2] border border-solid border-[#c3d0d7] h-[42px] flex">
                                {daysOfWeek.map((day, index) => (
                                    <div
                                        key={index}
                                        className="flex-1 font-extrabold text-text text-lg text-center leading-6 font-['Lato',Helvetica] flex items-center justify-center"
                                    >
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Calendar Days */}
                            <div>
                                {calendarDays.map((week, weekIndex) => (
                                    <div key={weekIndex} className="flex">
                                        {week.map((day, dayIndex) =>
                                            day !== null ? (
                                                <div
                                                    key={`${weekIndex}-${dayIndex}`}
                                                    className="flex-1 h-[39px] font-desktop-subtitle text-text text-center flex items-center justify-center"
                                                >
                                                    {day}
                                                </div>
                                            ) : (
                                                <div
                                                    key={`${weekIndex}-${dayIndex}`}
                                                    className="flex-1 h-[39px]"
                                                ></div>
                                            )
                                        )}
                                        {/* Fill empty cells to maintain 7 columns */}
                                        {week.length < 7 &&
                                            Array.from({ length: 7 - week.length }).map((_, index) => (
                                                <div
                                                    key={`empty-${weekIndex}-${index}`}
                                                    className="flex-1 h-[39px]"
                                                ></div>
                                            ))
                                        }
                                    </div>
                                ))}
                            </div>

                            {/* Time Slots */}
                            <div className="relative flex items-center justify-between h-[60px] border-t border-solid border-[#c3d0d7]">
                                <ChevronLeftIcon className="w-[31px] h-[26px] ml-1" />
                                <div className="flex justify-center space-x-2">
                                    {timeSlots.map((time, index) => (
                                        <Button
                                            key={index}
                                            variant="outline"
                                            className="h-9 w-[141px] bg-[#f2f0f2] rounded-xl border border-solid border-[#c3d0d7] font-desktop-subtitle text-text"
                                        >
                                            {time}
                                        </Button>
                                    ))}
                                </div>
                                <ChevronRightIcon className="w-[31px] h-[26px] mr-1" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
        </Card>
    );
};
