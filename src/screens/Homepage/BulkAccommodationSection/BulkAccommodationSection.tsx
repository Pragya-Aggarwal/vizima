import { FacebookIcon, TwitterIcon, Check, Phone } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

export const BulkAccommodationSection = (): JSX.Element => {
    // State for email input
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // Email validation function
    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // Handle form submission
    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        if (!email) {
            setError("Please enter your email address");
            return;
        }

        if (!isValidEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }

        try {
            setIsSubmitting(true);
            // TODO: Replace with your actual API call
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
            setSuccess(true);
            setEmail("");
        } catch (err) {
            setError("Failed to subscribe. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Footer link data for mapping
    const footerLinks = [
        {
            title: "Company",
            links: ["Home", "About us"],
        },
        {
            title: "Guests",
            links: ["Blog", "FAQ", "Career"],
        },
        {
            title: "Privacy",
            links: ["Terms of Service", "Privacy Policy"],
        },
    ];

    return (
        <section className="w-full bg-[#e2f1e8] py-6 sm:py-8 md:py-5 relative">
            <div className="container max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
                <div className="flex justify-center sm:justify-start">
                    <img
                        className="w-[120px] sm:w-[140px] md:w-[174px] h-auto"
                        alt="Logo"
                        src="https://c.animaapp.com/mbhqlborYGJdod/img/logo.png"
                    />
                </div>
            </div>

            <footer className="container max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-300 pt-8 mt-8 bg-[#e2f1e8]">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
                    {/* Footer links */}
                    <div className="md:col-span-7">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-[60px]">
                            {footerLinks.map((section, index) => (
                                <div key={index} className="flex flex-col gap-2 sm:gap-3 md:gap-4">
                                    <h4 className="font-desktop-subtitle-bold text-text text-sm sm:text-base">
                                        {section.title}
                                    </h4>

                                    {section.links.map((link, linkIndex) => (
                                        <a
                                            key={linkIndex}
                                            href="#" // TODO: Replace with real links
                                            className="font-desktop-subtitle text-text hover:underline focus:underline text-xs sm:text-sm md:text-base transition-colors duration-150"
                                            tabIndex={0}
                                        >
                                            {link}
                                        </a>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter subscription */}
                    <div className="md:col-span-5">
                        <form onSubmit={handleSubscribe} className="flex flex-col gap-3 sm:gap-4 md:gap-5">
                            <div className="flex flex-col gap-2">
                                <h4 className="font-desktop-subtitle-bold text-text text-sm sm:text-base">
                                    Stay up to date
                                </h4>
                                <p className="font-desktop-subtitle text-text text-xs sm:text-sm md:text-base">
                                    Be the first to know about our newest apartments
                                </p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col sm:flex-row gap-2 w-full">
                                    <Input
                                        className={`flex-1 bg-bg rounded-xl px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 font-desktop-subtitle text-[#49735a] text-xs sm:text-sm md:text-base ${error ? "border-red-500" : ""}`}
                                        placeholder="Email address"
                                        type="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setError("");
                                            setSuccess(false);
                                        }}
                                        disabled={isSubmitting}
                                    />
                                    <Button
                                        type="submit"
                                        className="whitespace-nowrap rounded-[40px] px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-green hover:bg-green font-desktop-subtitle-bold text-white text-xs sm:text-sm md:text-base"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "..." : "Subscribe"}
                                    </Button>
                                </div>
                                {error && (
                                    <p className="text-red-500 text-xs sm:text-sm">{error}</p>
                                )}
                                {success && (
                                    <p className="flex items-center gap-2 text-green text-xs sm:text-sm">
                                        <Check className="w-4 h-4" />
                                        Successfully subscribed to newsletter!
                                    </p>
                                )}
                            </div>
                        </form>
                        <div className="mt-3 sm:mt-4 md:mt-6 flex flex-col gap-3 sm:gap-4 md:gap-5">
                            <a
                                href="tel:9667300983"
                                className="font-desktop-text-regular text-text text-xs sm:text-sm md:text-base flex items-center gap-2 hover:underline focus:underline"
                                tabIndex={0}
                                title="Call us"
                            >
                                <Phone className="w-4 h-4 text-green" />
                                9667300983
                            </a>

                            <div className="flex flex-col gap-2 sm:gap-3">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <a
                                        href="https://instagram.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 to-yellow-400 hover:from-pink-600 hover:to-yellow-500 transition-colors duration-200 shadow group"
                                        title="Instagram"
                                    >
                                        <img
                                            className="w-4 h-4 sm:w-5 sm:h-5"
                                            alt="Instagram"
                                            src="https://c.animaapp.com/mbhqlborYGJdod/img/group-3.png"
                                        />
                                    </a>
                                    <a
                                        href="https://facebook.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow group"
                                        title="Facebook"
                                    >
                                        <FacebookIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    </a>
                                    <a
                                        href="https://twitter.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-8 h-8 flex items-center justify-center rounded-full bg-sky-400 hover:bg-sky-500 transition-colors duration-200 shadow group"
                                        title="Twitter"
                                    >
                                        <TwitterIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Copyright text positioned at bottom center */}
            <div className="w-full flex justify-center py-2 mt-4 border-t border-gray-200 bg-[#e2f1e8]">
                <p className="font-desktop-text-regular text-text text-center text-xs sm:text-sm opacity-70">
                    © Vizima 2025. All rights reserved.
                </p>
            </div>
        </section>
    );
};
