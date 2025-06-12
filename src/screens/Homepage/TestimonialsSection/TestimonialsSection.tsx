
import React from "react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "../../../components/ui/avatar";
import { Card, CardContent } from "../../../components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../../../components/ui/carousel";

export const TestimonialsSection = (): JSX.Element => {
    const testimonials = [
        {
            id: 1,
            name: "Annie",
            city: "Noida",
            text: "Nascetur urna, fusce consectetur massa nulla viverra aenean semper. Dignissim nibh sed condimentum eget ac suspendisse eget amet integer. Mattis etiam",
            stars: 5,
            image: "https://c.animaapp.com/mbhqlborYGJdod/img/ellipse-7-3.png",
        },
        {
            id: 2,
            name: "Annie",
            city: "Noida",
            text: "Nascetur urna, fusce consectetur massa nulla viverra aenean semper. Dignissim nibh sed condimentum eget ac suspendisse eget amet integer. Mattis etiam",
            stars: 4,
            image: "https://c.animaapp.com/mbhqlborYGJdod/img/ellipse-7-3.png",
        },
        {
            id: 3,
            name: "Annie",
            city: "Noida",
            text: "Nascetur urna, fusce consectetur massa nulla viverra aenean semper. Dignissim nibh sed condimentum eget ac suspendisse eget amet integer. Mattis etiam",
            stars: 5,
            image: "https://c.animaapp.com/mbhqlborYGJdod/img/ellipse-7-3.png",
        },
        {
            id: 4,
            name: "Annie",
            city: "Noida",
            text: "Nascetur urna, fusce consectetur massa nulla viverra aenean semper. Dignissim nibh sed condimentum eget ac suspendisse eget amet integer. Mattis etiam",
            stars: 5,
            image: "https://c.animaapp.com/mbhqlborYGJdod/img/ellipse-7-3.png",
        },
    ];

    return (
        <section className="w-full py-16 max-w-[1400px] mx-auto px-4">
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
                                                    src={testimonial.image}
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
                                                    City: {testimonial.city}
                                                </p>
                                            </div>
                                            <div className="flex ml-auto">
                                                {[...Array(testimonial.stars)].map((_, i) => (
                                                    <img
                                                        key={i}
                                                        className="w-5 h-5"
                                                        alt="Star"
                                                        src="https://c.animaapp.com/mbhqlborYGJdod/img/star-1.svg"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="mt-4 font-desktop-subtitle font-[number:var(--desktop-subtitle-font-weight)] text-text text-[length:var(--desktop-subtitle-font-size)] tracking-[var(--desktop-subtitle-letter-spacing)] leading-[var(--desktop-subtitle-line-height)] [font-style:var(--desktop-subtitle-font-style)]">
                                            {testimonial.text}
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