import { FacebookIcon, TwitterIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

export const BulkAccommodationSection = (): JSX.Element => {
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
        <section className="w-full bg-[#e2f1e8] py-6 h-[300px]">
            <footer className="container max-w-[1300px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Logo and contact info */}
                    <div className="md:col-span-3">
                        <img
                            className="w-[174px] h-[58px]"
                            alt="Logo"
                            src="https://c.animaapp.com/mbhqlborYGJdod/img/logo.png"
                        />

                        <div className="mt-6 flex flex-col gap-5">
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
                        <div className="grid grid-cols-3 gap-[60px]">
                            {footerLinks.map((section, index) => (
                                <div key={index} className="flex flex-col gap-4">
                                    <h4 className="font-desktop-subtitle-bold text-text">
                                        {section.title}
                                    </h4>

                                    {section.links.map((link, linkIndex) => (
                                        <a
                                            key={linkIndex}
                                            href="#"
                                            className="font-desktop-subtitle text-text hover:underline"
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
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <h4 className="font-desktop-subtitle-bold text-text">
                                    Stay up to date
                                </h4>
                                <p className="font-desktop-subtitle text-text">
                                    Be the first to know about our newest apartments
                                </p>
                            </div>

                            <Input
                                className="bg-bg rounded-xl px-10 py-3 font-desktop-subtitle text-[#49735a]"
                                placeholder="Email address"
                            />

                            <Button className="rounded-[40px] px-10 py-3 bg-green hover:bg-green/90 font-desktop-subtitle-bold text-white">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </div>
            </footer>
        </section>
    );
};
