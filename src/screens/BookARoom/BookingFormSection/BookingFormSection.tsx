import { ShieldIcon, XCircleIcon } from "lucide-react";
import React from "react";

// Define the data for the policy items to enable mapping
const policyItems = [
    {
        title: "Cancellation Policy",
        icon: <XCircleIcon className="w-5 h-5" />,
        description: "Free Cancellation up to 24hrs\nbefore checkin",
    },
    {
        title: "Health & Safty",
        icon: <ShieldIcon className="w-5 h-5" />,
        description: "Cleaner in accordance with our\nCOVID safe cleaning policy",
    },
];

export const BookingFormSection = (): JSX.Element => {
    return (
        <section className="w-full flex justify-between py-6 px-20">
            {policyItems.map((item, index) => (
                <div key={index} className="flex flex-col w-[340px] items-start gap-5">
                    <h4 className="font-desktop-h4 font-[number:var(--desktop-h4-font-weight)] text-black text-[length:var(--desktop-h4-font-size)] tracking-[var(--desktop-h4-letter-spacing)] leading-[var(--desktop-h4-line-height)] [font-style:var(--desktop-h4-font-style)]">
                        {item.title}
                    </h4>

                    <div className="flex items-start gap-3 w-full">
                        {item.icon}
                        <p className="flex-1 font-desktop-subtitle font-[number:var(--desktop-subtitle-font-weight)] text-text text-[length:var(--desktop-subtitle-font-size)] tracking-[var(--desktop-subtitle-letter-spacing)] leading-[var(--desktop-subtitle-line-height)] [font-style:var(--desktop-subtitle-font-style)]">
                            {item.description.split("\n").map((line, i) => (
                                <React.Fragment key={i}>
                                    {line}
                                    {i < item.description.split("\n").length - 1 && <br />}
                                </React.Fragment>
                            ))}
                        </p>
                    </div>
                </div>
            ))}
        </section>
    );
};
