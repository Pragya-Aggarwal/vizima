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
        <section className="w-full bg-white py-5 md:py-10 lg:py-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center mb-10 md:mb-14 lg:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                        Find answers to common questions about our booking process, amenities, and policies.
                    </p>
                </div>
                
                <div className="max-w-4xl mx-auto">
                    <FAQSection />
                </div>
            </div>
        </section>
    );
};
