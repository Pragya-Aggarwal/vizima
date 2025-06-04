import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../../../components/ui/accordion";
import { FAQSection } from "../../Product/FAQSection";

export const TrustBoostersSection = (): JSX.Element => {
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
                "Yes, many PGs offer rooms with attached bathrooms, though it depends on the property and room type.",
            defaultOpen: false,
        },
    ];

    return (
        <section className="w-full max-w-[1280px] mx-auto py-14">
            <h2 className="font-desktop-h3 text-text text-[length:var(--desktop-h3-font-size)] tracking-[var(--desktop-h3-letter-spacing)] leading-[var(--desktop-h3-line-height)] mb-14">
                Frequently Asked Questions
            </h2>
            <FAQSection />
        </section>
    );
};
