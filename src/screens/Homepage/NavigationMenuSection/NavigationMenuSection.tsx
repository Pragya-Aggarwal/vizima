import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "../../../components/ui/navigation-menu";
import { isLoggedIn, logout } from "../../../utils/auth";
import { LogIn, LogOut } from "lucide-react";

export const NavigationMenuSection = (): JSX.Element => {
    const navigate = useNavigate();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    // Check login status on mount and when localStorage changes
    useEffect(() => {
        const checkLoginStatus = () => {
            setIsUserLoggedIn(isLoggedIn());
        };

        // Check initial status
        checkLoginStatus();

        // Listen for storage changes
        window.addEventListener('storage', checkLoginStatus);

        // Custom event listener for login status changes
        window.addEventListener('loginStatusChanged', checkLoginStatus);

        return () => {
            window.removeEventListener('storage', checkLoginStatus);
            window.removeEventListener('loginStatusChanged', checkLoginStatus);
        };
    }, []);

    // Navigation menu items data
    const menuItems = [
        { label: "Home", href: "/" },
        { label: "Find PG/Hostel", href: "/product" },
        { label: "Book a Visit", href: "/book" },
        { label: "AboutUs", href: "/aboutUs" },
        { label: "Contact Us", href: "/contact" },
    ];

    const handleAuthAction = () => {
        if (isUserLoggedIn) {
            logout();
            setIsUserLoggedIn(false);
            navigate("/login");
        } else {
            navigate("/login");
        }
    };

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
                            <Button
                                className={`rounded-[40px] px-10 py-3 font-desktop-subtitle-bold flex items-center gap-2 transition-colors ${isUserLoggedIn
                                    ? 'bg-red-500 hover:bg-red-600 text-white'
                                    : 'bg-green hover:bg-green-700 text-white'
                                    }`}
                                onClick={handleAuthAction}
                            >
                                {isUserLoggedIn ? (
                                    <>
                                        <LogOut className="w-5 h-5" />
                                        Logout
                                    </>
                                ) : (
                                    <>
                                        <LogIn className="w-5 h-5" />
                                        Login
                                    </>
                                )}
                            </Button>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </header>
    );
};
