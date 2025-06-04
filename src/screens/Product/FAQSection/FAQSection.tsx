import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../../../components/ui/accordion";

export const FAQSection = (): JSX.Element => {
    // FAQ data for mapping
    const faqItems = [
        {
            question: "Are meals included in the rent?",
            answer:
                "Yes, most PGs offer food packages — some include breakfast, lunch, and dinner.",
            defaultOpen: true,
        },
        {
            question: "Can I book a PG without visiting?",
            answer: "Yes, you can request a video tour or book directly if verified.",
            defaultOpen: true,
        },
        {
            question: "What's the minimum stay period?",
            answer:
                "Most PGs require a minimum stay of 3-6 months, but this varies by property.",
            defaultOpen: false,
        },
        {
            question: "Are there girls-only or boys-only PGs?",
            answer:
                "Yes, many PGs are gender-specific, offering separate accommodations for men and women.",
            defaultOpen: false,
        },
        {
            question: "Do PGs offer attached bathrooms?",
            answer:
                "Many premium PGs offer rooms with attached bathrooms, while others have shared facilities.",
            defaultOpen: false,
        },
    ];

    // Get the value string for defaultOpen items
    const defaultOpenValues = faqItems
        .map((item, index) => (item.defaultOpen ? `item-${index}` : null))
        .filter(Boolean)
        .join(" ");

    return (
        <section className="flex flex-col w-full max-w-[1280px] items-start gap-[60px] mx-auto my-16">
            <Accordion
                type="multiple"
                defaultValue={defaultOpenValues ? defaultOpenValues.split(" ") : []}
                className="w-full"
            >
                {faqItems.map((item, index) => (
                    <AccordionItem
                        key={`item-${index}`}
                        value={`item-${index}`}
                        className="border-b py-5"
                    >
                        <AccordionTrigger className="flex justify-between w-full">
                            <h4 className="text-left font-desktop-h4 font-[number:var(--desktop-h4-font-weight)] text-text text-[length:var(--desktop-h4-font-size)] tracking-[var(--desktop-h4-letter-spacing)] leading-[var(--desktop-h4-line-height)] [font-style:var(--desktop-h4-font-style)]">
                                {item.question}
                            </h4>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="font-desktop-text-regular font-[number:var(--desktop-text-regular-font-weight)] text-text text-[length:var(--desktop-text-regular-font-size)] tracking-[var(--desktop-text-regular-letter-spacing)] leading-[var(--desktop-text-regular-line-height)] [font-style:var(--desktop-text-regular-font-style)]">
                                {item.answer}
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
};
