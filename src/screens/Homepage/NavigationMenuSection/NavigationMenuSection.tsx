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
import { LogIn, LogOut, Menu, X, User, FileText, Settings, Calendar } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { logo } from "../../../assets";

export const NavigationMenuSection = (): JSX.Element => {
    const navigate = useNavigate();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        { label: "Find PG/Hostel", href: "/property-listing" },
        // { label: "Book a Visit", href: "/book" },
        { label: "AboutUs", href: "/aboutUs" },
        // { label: "Contact Us", href: "/contact" },
    ];

    const handleAuthAction = () => {
        if (isUserLoggedIn) {
            logout();
            setIsUserLoggedIn(false);
            navigate("/login");
        } else {
            navigate("/login");
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="w-full h-16 bg-white fixed top-0 left-0 z-50 flex items-center justify-center px-4 md:px-[60px] shadow-sm">
            <div className="w-full max-w-[1600px] flex items-center justify-between">


                <a href="/" className="flex items-center h-full">
                    <img
                        className="w-[100px] md:w-[141px] h-auto md:h-[85px] object-contain"
                        alt="Vizima logo"
                        src={logo}
                    />
                </a>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-2">
                    {/* Profile Icon - Mobile Only */}

                    {/* {isUserLoggedIn ? (
                        <Button className="rounded-full px-6 py-2 font-medium flex items-center gap-2 transition-all duration-200 bg-red-500 hover:bg-red-500 text-white shadow-md hover:shadow-lg"
                            onClick={handleAuthAction}
                        >
                            Logout
                        </Button>
                        // <DropdownMenu>
                        //     <DropdownMenuTrigger asChild>
                        //         <Button variant="ghost" className="p-2 rounded-full hover:bg-gray-100">
                        //             <User className="h-5 w-5" />
                        //         </Button>
                        //     </DropdownMenuTrigger>
                        //     <DropdownMenuContent className="w-56" align="end">
                        //         <DropdownMenuItem 
                        //                         className="cursor-pointer flex items-center gap-2"
                        //                         onClick={() => navigate('/booking')}
                        //                     >
                        //                         <Calendar className="h-4 w-4" />
                        //                         <span>View and manage bookings</span>
                        //                     </DropdownMenuItem>
                        //                     <DropdownMenuItem 
                        //                         className="cursor-pointer flex items-center gap-2"
                        //                         onClick={() => navigate('/documents')}
                        //                     >
                        //                         <FileText className="h-4 w-4" />
                        //                         <span>Upload personal documents</span>
                        //                     </DropdownMenuItem> 
                        //         <DropdownMenuItem 
                        //                         className="cursor-pointer flex items-center gap-2"
                        //                         onClick={() => navigate('/profile')}
                        //                     >
                        //                         <Settings className="h-4 w-4" />
                        //                         <span>Profile editing</span>
                        //                     </DropdownMenuItem> 
                        //         <div className="border-t my-1"></div>
                        //         <DropdownMenuItem
                        //             className="cursor-pointer text-red-600 hover:bg-red-50 flex items-center gap-2"
                        //             onClick={handleAuthAction}
                        //         >
                        //             <LogOut className="h-4 w-4" />
                        //             <span>Logout</span>
                        //         </DropdownMenuItem>
                        //     </DropdownMenuContent>
                        // </DropdownMenu>
                    ) : (
                        <Button
                            className="rounded-full px-6 py-2 font-medium flex items-center gap-2 transition-all duration-200 bg-green hover:bg-green text-white shadow-md hover:shadow-lg"
                            onClick={handleAuthAction}
                        >
                            Login
                        </Button>
                    )} */}
<div className="flex flex-col text-sm text-center">
                               <span className="font-semibold">Contact for Support</span>
                               <span>9667300983</span>
                               </div>

                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                    <NavigationMenu>
                        <NavigationMenuList className="flex items-center gap-6">
                            {menuItems.map((item, index) => (
                                <NavigationMenuItem key={index}>
                                    <NavigationMenuLink
                                        href={item.href}
                                        className="font-['Lato',Helvetica] font-semibold text-gray-700 hover:text-green text-base leading-6 transition-colors duration-200"
                                    >
                                        {item.label}
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                            <NavigationMenuItem>
                                {/* {isUserLoggedIn ? (
                                    <Button className="rounded-full px-6 py-2 font-medium flex items-center gap-2 transition-all duration-200 bg-red-500 hover:bg-red-500 text-white shadow-md hover:shadow-lg"
                                        onClick={handleAuthAction}
                                    >
                                        Logout
                                    </Button>
                                    // <DropdownMenu>
                                    //     <DropdownMenuTrigger asChild>
                                    //         <Button variant="ghost" className="p-2 rounded-full hover:bg-gray-100">
                                    //             <User className="h-5 w-5" />
                                    //         </Button>
                                    //     </DropdownMenuTrigger>
                                    //     <DropdownMenuContent className="w-56" align="end">
                                    //          <DropdownMenuItem 
                                    //             className="cursor-pointer flex items-center gap-2"
                                    //             onClick={() => navigate('/booking')}
                                    //         >
                                    //             <Calendar className="h-4 w-4" />
                                    //             <span>View and manage bookings</span>
                                    //         </DropdownMenuItem>
                                    //         <DropdownMenuItem 
                                    //             className="cursor-pointer flex items-center gap-2"
                                    //             onClick={() => navigate('/documents')}
                                    //         >
                                    //             <FileText className="h-4 w-4" />
                                    //             <span>Upload personal documents</span>
                                    //         </DropdownMenuItem> 
                                    //         <DropdownMenuItem 
                                    //             className="cursor-pointer flex items-center gap-2"
                                    //             onClick={() => navigate('/profile')}
                                    //         >
                                    //             <Settings className="h-4 w-4" />
                                    //             <span>Profile editing</span>
                                    //         </DropdownMenuItem>
                                    //         <div className="border-t my-1"></div>
                                    //         <DropdownMenuItem 
                                    //             className="cursor-pointer text-red-600 hover:bg-red-50 flex items-center gap-2"
                                    //             onClick={handleAuthAction}
                                    //         >
                                    //             <LogOut className="h-4 w-4" />
                                    //             <span>Logout</span>
                                    //         </DropdownMenuItem>
                                    //     </DropdownMenuContent>
                                    // </DropdownMenu>
                                ) : (
                                    <Button
                                        className="rounded-full px-6 py-2 font-medium flex items-center gap-2 transition-all duration-200 bg-green hover:bg-green text-white shadow-md hover:shadow-lg"
                                        onClick={handleAuthAction}
                                    >
                                        Login
                                    </Button>
                                )} */}
                               <a 
                                    href="tel:9667300983"
                                    className="group flex flex-col items-center gap-1.5 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-green-50"
                                >
                                    <div className="flex items-center gap-2">
                                        <svg 
                                            className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24" 
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth="2" 
                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            ></path>
                                        </svg>
                                        <span className="font-semibold text-green-700 group-hover:text-green-800">Support</span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 group-hover:text-green-700 transition-colors">
                                        +91 96673 00983
                                    </span>
                                </a>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* Mobile Navigation */}
                {/* Mobile Menu Overlay */}
                <div
                    className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100 z-40' : 'opacity-0 pointer-events-none'
                        }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Mobile Menu Panel */}
                <div
                    className={`fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white shadow-2xl md:hidden transition-all duration-300 ease-in-out z-50 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}
                >
                    <div className="h-full flex flex-col">
                        <div className="flex items-center justify-between p-4 border-b">
                            <img
                                className="w-32"
                                alt="Vizima logo"
                                src={logo}
                            />
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 rounded-full hover:bg-gray-100"
                                aria-label="Close menu"
                            >
                                <X className="w-6 h-6 text-gray-500" />
                            </button>
                        </div>
                        <nav className="flex-1 overflow-y-auto py-4">
                            {menuItems.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.href}
                                    className="block px-6 py-4 text-gray-700 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </a>
                            ))}

                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
};
