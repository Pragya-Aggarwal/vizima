import { FAQSection } from "../../Product/FAQSection";

export const TrustBoostersSection = (): JSX.Element => {
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
                
                <div className="mx-auto">
                    <FAQSection maxItems={5} defaultOpenCount={2} />
                </div>
            </div>
        </section>
    );
};
