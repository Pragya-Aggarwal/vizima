import React from "react";
import { Button } from "../../../components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "../../../components/ui/navigation-menu";

export const NavigationMenuSection = (): JSX.Element => {
    // Navigation menu items data
    const menuItems = [
        { label: "Home", href: "/" },
        { label: "Find PG/Hostel", href: "/product" },
        { label: "Book a Visit", href: "/book" },
        { label: "Blog", href: "/blog" },
        { label: "Contact Us", href: "/contact" },
    ];

    return (
        <header className="w-full h-[83px] bg-white fixed top-0 left-0 z-50 flex items-center justify-center px-[60px]">
            <div className="w-full max-w-[1600px] flex items-center justify-between">
                <img
                    className="w-[141px] h-[47px]"
                    alt="Vizima logo"
                    src="https://c.animaapp.com/mbi2us3vKS97yu/img/vizima--logo-01--1--1.png"
                />

                <NavigationMenu>
                    <NavigationMenuList className="flex items-center gap-10">
                        {menuItems.map((item, index) => (
                            <NavigationMenuItem key={index}>
                                <NavigationMenuLink
                                    href={item.href}
                                    className="font-['Lato',Helvetica] font-semibold text-text text-lg leading-6"
                                >
                                    {item.label}
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                        <NavigationMenuItem>
                            <Button className="bg-green rounded-[40px] px-10 py-3 text-white font-desktop-subtitle-bold">
                                Login
                            </Button>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </header>
    );
};
