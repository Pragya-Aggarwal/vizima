
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
            <section className="w-full px-4 py-12 sm:py-16 lg:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        What our partners think
                    </h2>
                    <p className="text-lg text-gray-600">
                        Loading testimonials...
                    </p>
                </div>
            </section>
        );
    }

    if (testimonials.length === 0) {
        return (
            <section className="w-full px-4 py-12 sm:py-16 lg:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        No Testimonials Available
                    </h2>
                    <p className="text-lg text-gray-600">
                        Check back later for new testimonials.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full px-4 py-12 sm:py-16 lg:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                        What our partners think
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                        See what our partners say about us
                    </p>
                </div>

                <div className="max-w-7xl mx-auto">
                    <Carousel 
                        opts={{
                            align: 'start',
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4">
                            {testimonials.map((testimonial, index) => (
                                <CarouselItem
                                    key={index}
                                    className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                                >
                                    <Card className="bg-white h-full border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                                        <CardContent className="p-6 h-full flex flex-col">
                                            <div className="flex items-start gap-4">
                                                <Avatar className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0">
                                                    <AvatarImage
                                                        src={testimonial.picture}
                                                        alt={testimonial.name}
                                                        className="object-cover"
                                                    />
                                                    <AvatarFallback className="bg-gray-100 text-gray-600">
                                                        {testimonial.name.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-lg font-semibold text-gray-900 truncate">
                                                        {testimonial.name}
                                                    </h4>
                                                    <p className="text-sm text-gray-500">
                                                        {testimonial.city}
                                                    </p>
                                                </div>
                                                <div className="flex items-center ml-2">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-4 h-4 sm:w-5 sm:h-5 ${i < (testimonial.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed flex-grow">
                                                {testimonial.comment}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        <div className="flex justify-center gap-4 mt-8 sm:mt-12">
                            <CarouselPrevious className="static bg-green hover:bg-green/90 text-white rounded-full w-12 h-12 flex items-center justify-center border-0 shadow-md hover:shadow-lg transition-all" />
                            <CarouselNext className="static bg-green hover:bg-green/90 text-white rounded-full w-12 h-12 flex items-center justify-center border-0 shadow-md hover:shadow-lg transition-all" />
                        </div>
                    </Carousel>
                </div>
            </div>
        </section>
    );
};