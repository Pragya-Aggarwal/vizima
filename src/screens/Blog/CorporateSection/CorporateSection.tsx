import React, { useRef, useState, ReactNode } from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { ShieldCheck, Home, IndianRupee, MapPin, Users, WashingMachine } from "lucide-react";

type FeatureCard = {
    id: number;
    icon: ReactNode;
    title: string;
    description: string;
    iconType: 'component' | 'img' | 'div';
    iconAlt?: string;
    iconStyle?: React.CSSProperties;
};

export const CorporateSection = (): JSX.Element => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const scroll = (direction: 'left' | 'right') => {
        if (!containerRef.current) return;
        
        const container = containerRef.current;
        const scrollAmount = direction === 'right' ? 300 : -300;
        
        container.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });

        // Update arrow visibility after scroll
        setTimeout(() => {
            if (!containerRef.current) return;
            const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
        }, 300);
    };

    // Initial check for arrow visibility
    const handleContainerScroll = () => {
        if (!containerRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    };

    // Feature card data for mapping
    const featureCards: FeatureCard[] = [
        {
            id: 1,
            icon: <ShieldCheck className="w-10 h-10 md:w-12 md:h-12 text-vizima-primary" />,
            title: "Safe & Secure Environment",
            description: "Your safety is our top priority, with 24/7 CCTV, secure entry, and on-site support staff.",
            iconType: "component"
        },
        {
            id: 2,
            icon: <Home className="w-10 h-10 md:w-12 md:h-12 text-vizima-primary" />,
            title: "Stylish & Comfortable Living",
            description: "Modern rooms, vibrant common areas, and thoughtfully designed spaces make you feel right at home.",
            iconType: "component"
        },
        {
            id: 3,
            icon: <IndianRupee className="w-10 h-10 md:w-12 md:h-12 text-vizima-primary" />,
            title: "Affordable Luxury",
            description: "Enjoy premium amenities at friendly prices—quality doesn't have to be costly.",
            iconType: "component"
        },
        {
            id: 4,
            icon: <MapPin className="w-10 h-10 md:w-12 md:h-12 text-vizima-primary" />,
            title: "Ideal Location",
            description: "Centrally located near top colleges, coaching centers, cafes, and transport links.",
            iconType: "component"
        },
        {
            id: 5,
            icon: <Users className="w-10 h-10 md:w-12 md:h-12 text-vizima-primary" />,
            title: "Lifestyle & Community",
            description: "More than a hostel—it's a lifestyle! Events, social spaces, and like-minded peers make Vizima a place to grow and connect.",
            iconType: "component"
        },
        {
            id: 6,
            icon: <WashingMachine className="w-10 h-10 md:w-12 md:h-12 text-vizima-primary" />,
            title: "Hassle-Free Living",
            description: "High-speed Wi-Fi, daily housekeeping, laundry services, and on-call support—we take care of it all, so you can focus on your goals.",
            iconType: "component"
        }
    ];

    return (
        <section className="flex flex-col items-center gap-[60px] px-3 sm:px-4 md:px-5 py-8 sm:py-12 md:py-16 w-full">
            <div className="max-w-[870px] flex flex-col gap-4 text-center px-4">
                <h2 className="text-2xl sm:text-[length:var(--desktop-h2-font-size)] font-desktop-h2 font-[number:var(--desktop-h2-font-weight)] text-text tracking-[var(--desktop-h2-letter-spacing)] leading-[var(--desktop-h2-line-height)] [font-style:var(--desktop-h2-font-style)]">
                    Why Choose Vizima?
                </h2>

                <p className="font-desktop-subtitle font-[number:var(--desktop-subtitle-font-weight)] text-text text-[length:var(--desktop-subtitle-font-size)] tracking-[var(--desktop-subtitle-letter-spacing)] leading-[var(--desktop-subtitle-line-height)] [font-style:var(--desktop-subtitle-font-style)]">
                    Vizima offers verified PGs with meals, Wi-Fi, secure booking, and
                    roommate options—ensuring a safe, comfortable, and hassle-free stay.
                </p>
            </div>

            <div className="relative w-full max-w-7xl mx-auto">
                <button 
                    onClick={() => scroll('left')}
                    className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-r from-white to-white/90 backdrop-blur-sm rounded-r-full shadow-2xl flex items-center justify-center pl-1 text-gray-700 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl active:scale-95 ${
                        !showLeftArrow 
                            ? 'opacity-0 pointer-events-none' 
                            : 'shadow-[8px_0_20px_-5px_rgba(0,0,0,0.1)] hover:shadow-[10px_0_25px_-5px_rgba(0,0,0,0.15)] hover:text-vizima-primary'
                    }`}
                    disabled={!showLeftArrow}
                    aria-label="Scroll left"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-5 h-5 sm:w-6 sm:h-6">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
                    </svg>
                </button>
                
                <div 
                    ref={containerRef}
                    onScroll={handleContainerScroll}
                    className="flex overflow-x-auto pb-3 px-2 sm:px-4 scrollbar-none"
                    style={{
                        msOverflowStyle: 'none',
                        scrollbarWidth: 'none',
                        WebkitOverflowScrolling: 'touch',
                        scrollBehavior: 'smooth',
                        maskImage: 'linear-gradient(to right, transparent 0%, black 20px, black calc(100% - 20px), transparent 100%)',
                        WebkitMaskImage: '-webkit-linear-gradient(left, transparent 0%, black 20px, black calc(100% - 20px), transparent 100%)'
                    }}
                >
                    <div className="flex gap-2 sm:gap-3 md:gap-4 lg:gap-5 w-max">
                {featureCards.map((card) => (
                    <div key={card.id} className="w-[220px] xs:w-[240px] sm:w-[260px] md:w-[280px] flex-shrink-0">
                        <Card className="flex flex-col w-full h-full min-h-[180px] xs:min-h-[200px] sm:min-h-[220px] md:min-h-[240px] bg-[#e2f1e8] rounded-2xl sm:rounded-3xl border-none shadow-none hover:shadow-md transition-all duration-200">
                        <CardContent className="flex flex-col items-start gap-2 xs:gap-3 sm:gap-4 px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-5 md:py-6 h-full">
                            {card.iconType === "component" ? (
                                card.icon
                            ) : card.iconType === "img" && typeof card.icon === 'string' ? (
                                <img
                                    className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
                                    alt={card.title}
                                    src={card.icon}
                                />
                            ) : typeof card.icon === 'string' ? (
                                <div className="relative w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16">
                                    <img
                                        className="absolute"
                                        style={card.iconStyle}
                                        alt={card.title}
                                        src={card.icon}
                                    />
                                </div>
                            ) : null}

                            <h4 className="self-stretch font-desktop-h4 font-[number:var(--desktop-h4-font-weight)] text-text text-[length:var(--desktop-h4-font-size)] tracking-[var(--desktop-h4-letter-spacing)] leading-[var(--desktop-h4-line-height)] [font-style:var(--desktop-h4-font-style)]">
                                {card.title}
                            </h4>

                            <p className="self-stretch font-desktop-text-regular font-[number:var(--desktop-text-regular-font-weight)] text-text text-[length:var(--desktop-text-regular-font-size)] tracking-[var(--desktop-text-regular-letter-spacing)] leading-[var(--desktop-text-regular-line-height)] [font-style:var(--desktop-text-regular-font-style)]">
                                {card.description}
                            </p>
                            </CardContent>
                        </Card>
                    </div>
                ))}
                    </div>
                </div>

                <button 
                    onClick={() => scroll('right')}
                    className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-l from-white to-white/90 backdrop-blur-sm rounded-l-full shadow-2xl flex items-center justify-center pr-1 text-gray-700 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl active:scale-95 ${
                        !showRightArrow 
                            ? 'opacity-0 pointer-events-none' 
                            : 'shadow-[-8px_0_20px_-5px_rgba(0,0,0,0.1)] hover:shadow-[-10px_0_25px_-5px_rgba(0,0,0,0.15)] hover:text-vizima-primary'
                    }`}
                    disabled={!showRightArrow}
                    aria-label="Scroll right"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-5 h-5 sm:w-6 sm:h-6">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        </section>
    );
};
