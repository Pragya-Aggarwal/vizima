import { FacebookIcon, TwitterIcon } from "lucide-react";
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
        <section className="w-full bg-[#e2f1e8] py-8 sm:py-12 min-h-[300px]">
            <footer className="container max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Logo and contact info */}
                    <div className="md:col-span-3">
                        <img
                            className="w-[140px] sm:w-[174px] h-auto sm:h-[58px]"
                            alt="Logo"
                            src="https://c.animaapp.com/mbhqlborYGJdod/img/logo.png"
                        />

                        <div className="mt-4 sm:mt-6 flex flex-col gap-4 sm:gap-5">
                            <p className="font-desktop-text-regular text-text">
                                Contact number: 02033074477
                            </p>

                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 flex items-center justify-center">
                                        <img
                                            className="w-[18px] h-[18px]"
                                            alt="Instagram"
                                            src="https://c.animaapp.com/mbhqlborYGJdod/img/group-3.png"
                                        />
                                    </div>
                                    <FacebookIcon className="w-6 h-6 text-text" />
                                    <TwitterIcon className="w-6 h-6 text-text" />
                                </div>

                                <p className="font-desktop-text-regular text-text">
                                    © Vizima 2025
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer links */}
                    <div className="md:col-span-5">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-[60px]">
                            {footerLinks.map((section, index) => (
                                <div key={index} className="flex flex-col gap-3 sm:gap-4">
                                    <h4 className="font-desktop-subtitle-bold text-text">
                                        {section.title}
                                    </h4>

                                    {section.links.map((link, linkIndex) => (
                                        <a
                                            key={linkIndex}
                                            href="#"
                                            className="font-desktop-subtitle text-text hover:underline text-sm sm:text-base"
                                        >
                                            {link}
                                        </a>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter subscription */}
                    <div className="md:col-span-4">
                        <form onSubmit={handleSubscribe} className="flex flex-col gap-4 sm:gap-5">
                            <div className="flex flex-col gap-2">
                                <h4 className="font-desktop-subtitle-bold text-text">
                                    Stay up to date
                                </h4>
                                <p className="font-desktop-subtitle text-text text-sm sm:text-base">
                                    Be the first to know about our newest apartments
                                </p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Input
                                    className={`bg-bg rounded-xl px-6 sm:px-10 py-2.5 sm:py-3 font-desktop-subtitle text-[#49735a] text-sm sm:text-base ${error ? "border-red-500" : ""}`}
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
                                {error && (
                                    <p className="text-red-500 text-xs sm:text-sm">{error}</p>
                                )}
                                {success && (
                                    <p className="text-green-600 text-xs sm:text-sm">
                                        Successfully subscribed to newsletter!
                                    </p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="w-full sm:w-auto rounded-[40px] px-8 sm:px-10 py-2.5 sm:py-3 bg-green hover:bg-green font-desktop-subtitle-bold text-white text-sm sm:text-base"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Subscribing..." : "Subscribe"}
                            </Button>
                        </form>
                    </div>
                </div>
            </footer>
        </section>
    );
};
