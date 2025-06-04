import { CalendarIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
} from "../../../components/ui/select";

export const PartnershipSection = (): JSX.Element => {
    // Form field data
    const formFields = [
        {
            id: "date",
            label: "Choose date",
            placeholder: "DD/MM/TTTT",
            icon: <CalendarIcon className="w-6 h-6" />,
        },
        {
            id: "time",
            label: "Time slot",
            placeholder: "Time",
            icon: (
                <div className="relative w-6 h-6">
                    <img
                        className="absolute w-[18px] h-5 top-0.5 left-[3px]"
                        alt="ClockIcon icon"
                        src="https://c.animaapp.com/mbhmsf5eMRDRNk/img/group-2.png"
                    />
                </div>
            ),
        },
        {
            id: "meetingType",
            label: "Physical / Virtual",
            placeholder: "Physical",
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
        <section className="flex w-full items-center justify-between gap-8 px-20 py-24 relative [background:linear-gradient(90deg,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0)_100%),url(https://c.animaapp.com/mbhmsf5eMRDRNk/img/bespoke-partnerships.png)_50%_50%_/_cover]">
            <div className="flex flex-col items-start justify-center gap-[60px] max-w-[522px]">
                <div className="flex flex-col items-start gap-4 w-full">
                    <h2 className="font-desktop-h2 font-[number:var(--desktop-h2-font-weight)] text-white text-[length:var(--desktop-h2-font-size)] tracking-[var(--desktop-h2-letter-spacing)] leading-[var(--desktop-h2-line-height)] [font-style:var(--desktop-h2-font-style)]">
                        Visit Before You Book
                    </h2>

                    <p className="font-desktop-subtitle font-[number:var(--desktop-subtitle-font-weight)] text-white text-[length:var(--desktop-subtitle-font-size)] tracking-[var(--desktop-subtitle-letter-spacing)] leading-[var(--desktop-subtitle-line-height)] [font-style:var(--desktop-subtitle-font-style)]">
                        Schedule in-person or virtual tours easily.
                    </p>
                </div>

                <Button className="px-10 py-3 rounded-[40px] bg-green hover:bg-green/90">
                    <span className="font-desktop-subtitle-bold font-[number:var(--desktop-subtitle-bold-font-weight)] text-white text-[length:var(--desktop-subtitle-bold-font-size)] tracking-[var(--desktop-subtitle-bold-letter-spacing)] leading-[var(--desktop-subtitle-bold-line-height)] [font-style:var(--desktop-subtitle-bold-font-style)]">
                        Start booking
                    </span>
                </Button>
            </div>

            <Card className="w-[443px] bg-[#ffffffcc] rounded-[30px] shadow-cards">
                <CardContent className="p-5">
                    <div className="flex flex-col items-center gap-8 w-full">
                        <div className="flex flex-col items-start gap-6 w-full">
                            {formFields.map((field) => (
                                <div
                                    key={field.id}
                                    className="flex flex-col w-full items-start gap-4"
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
                                        <Select>
                                            <SelectTrigger className="w-full px-5 py-4 bg-white rounded-xl">
                                                <SelectValue
                                                    placeholder={field.placeholder}
                                                    className="font-main-text-p1-500 font-[number:var(--main-text-p1-500-font-weight)] text-[#8b8b8b] text-[length:var(--main-text-p1-500-font-size)] tracking-[var(--main-text-p1-500-letter-spacing)] leading-[var(--main-text-p1-500-line-height)] [font-style:var(--main-text-p1-500-font-style)]"
                                                />
                                            </SelectTrigger>
                                        </Select>
                                    ) : (
                                        <Input
                                            placeholder={field.placeholder}
                                            className="w-full px-5 py-4 bg-white rounded-xl font-main-text-p1-500 font-[number:var(--main-text-p1-500-font-weight)] text-[#8b8b8b] text-[length:var(--main-text-p1-500-font-size)] tracking-[var(--main-text-p1-500-letter-spacing)] leading-[var(--main-text-p1-500-line-height)] [font-style:var(--main-text-p1-500-font-style)]"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        <Button className="px-10 py-3 rounded-[40px] bg-green hover:bg-green/90">
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
