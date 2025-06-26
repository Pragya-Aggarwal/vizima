
import React, { useState, useEffect } from "react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "../../../components/ui/avatar";
import { Card, CardContent } from "../../../components/ui/card";
import { Star } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../../../components/ui/carousel";
import { testimonialService, Testimonial } from '../../../api/services/testimonialService';

export const TestimonialsSection = (): JSX.Element => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const data = await testimonialService.getTestimonials();
                setTestimonials(data);
            } catch (error) {
                console.error('Failed to fetch testimonials:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    if (isLoading) {
        return (
            <section className="w-full max-w-[1400px] mx-auto px-4 py-12">
                <div className="container mx-auto">
                    <div className="flex flex-col items-center gap-4 mb-12">
                        <h2 className="text-2xl sm:text-[length:var(--desktop-h2-font-size)] font-desktop-h2 font-[number:var(--desktop-h2-font-weight)] text-text text-center tracking-[var(--desktop-h2-letter-spacing)] leading-[var(--desktop-h2-line-height)] [font-style:var(--desktop-h2-font-style)]">
                            What our partners think
                        </h2>
                        <p className="font-desktop-subtitle font-[number:var(--desktop-subtitle-font-weight)] text-text text-[length:var(--desktop-subtitle-font-size)] text-center tracking-[var(--desktop-subtitle-letter-spacing)] leading-[var(--desktop-subtitle-line-height)] [font-style:var(--desktop-subtitle-font-style)]">
                            Loading testimonials...
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    if (testimonials.length === 0) {
        return (
            <section className="w-full max-w-[1400px] mx-auto px-4 py-12">
                <div className="container mx-auto">
                    <div className="flex flex-col items-center gap-4 mb-12">
                        <h2 className="text-2xl sm:text-[length:var(--desktop-h2-font-size)] font-desktop-h2 font-[number:var(--desktop-h2-font-weight)] text-text text-center tracking-[var(--desktop-h2-letter-spacing)] leading-[var(--desktop-h2-line-height)] [font-style:var(--desktop-h2-font-style)]">
                            No Testimonials Available
                        </h2>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full max-w-[1400px] mx-auto px-4">
            <div className="container mx-auto">
                <div className="flex flex-col items-center gap-4 mb-12">
                <h2 className="text-2xl sm:text-[length:var(--desktop-h2-font-size)] font-desktop-h2 font-[number:var(--desktop-h2-font-weight)] text-text text-center tracking-[var(--desktop-h2-letter-spacing)] leading-[var(--desktop-h2-line-height)] [font-style:var(--desktop-h2-font-style)]">
                        What our partners think
                    </h2>
                    <p className="font-desktop-subtitle font-[number:var(--desktop-subtitle-font-weight)] text-text text-[length:var(--desktop-subtitle-font-size)] text-center tracking-[var(--desktop-subtitle-letter-spacing)] leading-[var(--desktop-subtitle-line-height)] [font-style:var(--desktop-subtitle-font-style)]">
                        See what our partners say about us
                    </p>
                </div>
            </div>

            {/* Full-width carousel container */}
            <div className="w-full">
                <Carousel className="w-full max-w-none">
                    <CarouselContent className="-ml-4">
                        {testimonials.map((testimonial) => (
                            <CarouselItem
                                key={testimonial.id}
                                className="pl-4 md:basis-1/2 lg:basis-1/3"
                            >
                                <Card className="bg-bg h-full max-w-[600px] mx-auto">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <Avatar className="w-[62px] h-[62px]">
                                                <AvatarImage
                                                    src={testimonial.picture}
                                                    alt={testimonial.name}
                                                />
                                                <AvatarFallback>
                                                    {testimonial.name.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <h4 className="font-desktop-h4 font-[number:var(--desktop-h4-font-weight)] text-text text-[length:var(--desktop-h4-font-size)] leading-[var(--desktop-h4-line-height)] tracking-[var(--desktop-h4-letter-spacing)] [font-style:var(--desktop-h4-font-style)]">
                                                    {testimonial.name}
                                                </h4>
                                                <p className="font-desktop-text-regular font-[number:var(--desktop-text-regular-font-weight)] text-text text-[length:var(--desktop-text-regular-font-size)] tracking-[var(--desktop-text-regular-letter-spacing)] leading-[var(--desktop-text-regular-line-height)] [font-style:var(--desktop-text-regular-font-style)]">
                                                    {testimonial.city}
                                                </p>
                                            </div>
                                            <div className="flex ml-auto">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-5 h-5 ${i < (testimonial.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="mt-4 font-desktop-subtitle font-[number:var(--desktop-subtitle-font-weight)] text-text text-[length:var(--desktop-subtitle-font-size)] tracking-[var(--desktop-subtitle-letter-spacing)] leading-[var(--desktop-subtitle-line-height)] [font-style:var(--desktop-subtitle-font-style)]">
                                            {testimonial.comment}
                                        </p>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <div className="flex justify-center gap-4 mt-8">
                        <CarouselPrevious className="static bg-green rounded-xl p-[18px] hover:bg-green/90 focus:bg-green/90 text-white" />
                        <CarouselNext className="static bg-green rounded-xl p-[18px] hover:bg-green/90 focus:bg-green/90 text-white" />
                    </div>
                </Carousel>
            </div>
        </section>
    );
};