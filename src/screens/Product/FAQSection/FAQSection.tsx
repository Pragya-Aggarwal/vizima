import React, { useState, useEffect } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../../../components/ui/accordion";
import { faqService, FAQItem } from "../../../api/services/faqService";
import { Skeleton } from "../../../components/ui/skeleton";

interface FAQSectionProps {
    maxItems?: number;
    defaultOpenCount?: number;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ 
    maxItems,
    defaultOpenCount = 2 
}) => {
    const [faqs, setFaqs] = useState<FAQItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFAQs = async () => {
            try {
                setIsLoading(true);
                let data = await faqService.getFAQs();
                
                // Apply maxItems if provided
                if (maxItems) {
                    data = data.slice(0, maxItems);
                }
                
                setFaqs(data);
            } catch (err) {
                console.error('Failed to fetch FAQs:', err);
                setError('Failed to load FAQs. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchFAQs();
    }, []);
console.log(faqs);
    // Loading state
    if (isLoading) {
        return (
            <div className="w-full space-y-4">
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="space-y-2">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>
                ))}
            </div>
        );
    }


    // Error state
    if (error) {
        return (
            <div className="text-center py-8">
                <p className="text-red-500 mb-4">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                    Retry
                </button>
            </div>
        );
    }

    // Empty state
    if (faqs.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">No FAQs available at the moment.</p>
            </div>
        );
    }

    // Default open FAQs based on defaultOpenCount
    const defaultOpenValues = faqs
        .slice(0, defaultOpenCount)
        .map((_, index) => `item-${index}`);

    return (
        <section className="flex flex-col w-full max-w-[1280px] items-start gap-[20px] mx-auto my-6">
            <Accordion
                type="multiple"
                defaultValue={defaultOpenValues}
                className="w-full"
            >
                {faqs.map((item, index) => (
                    <AccordionItem
                        key={item.id}
                        value={`item-${index}`}
                        className="border-b py-5"
                    >
                        <AccordionTrigger className="flex justify-between w-full">
                            <h4 className="text-left font-desktop-h4 font-[number:var(--desktop-h4-font-weight)] text-text text-[length:var(--desktop-h4-font-size)] tracking-[var(--desktop-h4-letter-spacing)] leading-[var(--desktop-h4-line-height)] [font-style:var(--desktop-h4-font-style)]">
                                {item.question}
                            </h4>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div 
                                className="font-desktop-text-regular font-[number:var(--desktop-text-regular-font-weight)] text-text text-[length:var(--desktop-text-regular-font-size)] tracking-[var(--desktop-text-regular-letter-spacing)] leading-[var(--desktop-text-regular-line-height)] [font-style:var(--desktop-text-regular-font-style)]"
                                dangerouslySetInnerHTML={{ __html: item.answer }}
                            />
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
};
