"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
// import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import {
    Star,
    MapPin,
    Wifi,
    Car,
    Shield,
    Zap,
    Users,
    Utensils,
    WashingMachineIcon as Washing,
    Camera,
    Phone,
    ChevronLeft,
    ChevronRight,
    X,
    Volume2,
    Cigarette,
    Clock,
    UserCheck,
    Home,
    Calendar,
} from "lucide-react"
import { home } from "../../assets"
import { TestimonialsSection } from "../Homepage/TestimonialsSection"
import { useNavigate } from "react-router-dom"

export default function PropertyDetails() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [selectedSharing, setSelectedSharing] = useState("single")
    const navigate = useNavigate()
    const images = [
        home,
        home,
        home,
        home,
        home,
    ]

    const roomOptions = [
        {
            type: "Single Room",
            rent: "₹12,000",
            security: "₹24,000",
            availableFrom: "15 Jan 2024",
            acType: "AC",
            isAvailable: true,
            mealsIncluded: true
        },
        {
            type: "Double Sharing",
            rent: "₹8,000",
            security: "₹16,000",
            availableFrom: "20 Jan 2024",
            acType: "Non-AC",
            isAvailable: true,
            mealsIncluded: false
        },
        {
            type: "Triple Sharing",
            rent: "₹6,500",
            security: "₹13,000",
            availableFrom: "25 Jan 2024",
            acType: "AC",
            isAvailable: false,
            mealsIncluded: true
        },
    ]

    const amenities = [
        { icon: Wifi, label: "Wi-Fi" },
        { icon: Washing, label: "Laundry" },
        { icon: Zap, label: "Power Backup" },
        { icon: Camera, label: "CCTV" },
        { icon: Users, label: "Housekeeping" },
        { icon: Car, label: "Parking" },
        { icon: Utensils, label: "Kitchen" },
        { icon: Shield, label: "Security" },
    ]

    const houseRules = [
        { icon: Volume2, text: "No Loud Music after 10 PM", crossed: true },
        { icon: Cigarette, text: "No Smoking inside premises", crossed: true },
        { icon: Clock, text: "Entry time till 11 PM" },
        { icon: UserCheck, text: "Visitors allowed with prior notice" },
        { icon: Home, text: "Keep common areas clean" },
    ]

    const reviews = [
        {
            name: "Priya Sharma",
            rating: 5,
            comment: "Excellent PG with all amenities. Very clean and well-maintained. The owner is very cooperative.",
            avatar: home,
        },
        {
            name: "Rahul Kumar",
            rating: 4,
            comment: "Good location and facilities. Food quality is decent. Would recommend to others.",
            avatar: home,
        },
        {
            name: "Anjali Gupta",
            rating: 5,
            comment: "Safe and secure place for girls. All basic amenities available. Great experience overall.",
            avatar: home,
        },
    ]

    const relatedPGs = [
        {
            title: "Green Valley PG",
            image: home,
            price: "₹8,500/month",
            location: "Karol Bagh",
        },
        {
            title: "Comfort Zone PG",
            image: home,
            price: "₹9,000/month",
            location: "Rajouri Garden",
        },
        {
            title: "Royal Stay PG",
            image: home,
            price: "₹7,500/month",
            location: "Patel Nagar",
        },
        {
            title: "Modern Living PG",
            image: home,
            price: "₹10,000/month",
            location: "Karol Bagh",
        },
    ]

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    const handleBookRoom = () => {
        navigate("/book")
    }
    const handleScheduleRoom = () => {
        navigate("/book")
    }
    const handleContact = () => {
        navigate("/contact")
    }
    const handleViewDetails = () => {
        navigate("/property-details")
    }


    return (
        <div className="min-h-screen bg-gray-50 mt-16 md:mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 md:py-6">
                {/* Header Section */}
                <div className="p-4 md:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Comfort Stay PG – Karol Bagh</h1>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-600">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    <span>Karol Bagh, New Delhi</span>
                                </div>
                                <div className="flex items-center gap-1 sm:ml-2">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-medium text-sm md:text-base">4.5 & total reviews (120 Reviews)</span>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-3 md:gap-5 mt-3">
                                {/* Room details with responsive spacing */}
                                <div className="flex items-center gap-2">
                                    <div className="relative w-5 h-5">
                                        <img
                                            className="w-[17px] h-3.5 absolute top-[3px] left-0.5"
                                            alt="Bedroom icon"
                                            src="https://c.animaapp.com/mbi2us3vKS97yu/img/group.png"
                                        />
                                    </div>
                                    <span className="text-sm md:text-base">2 bedroom</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <img
                                        className="w-5 h-5"
                                        alt="Bath icon"
                                        src="https://c.animaapp.com/mbi2us3vKS97yu/img/fa-solid-bath.svg"
                                    />
                                    <span className="text-sm md:text-base">2 bath</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm md:text-base font-semibold">PG Type:</span>
                                    <span className="text-sm md:text-base">[For Boys/Girls/Unisex]</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                            <Button onClick={handleBookRoom} className="w-full sm:w-auto py-3 md:py-5 bg-green hover:bg-green flex rounded-[40px] items-center px-6 md:px-9 justify-center gap-2 text-sm md:text-base">
                                Book This Room
                            </Button>
                            <Button onClick={handleScheduleRoom} className="w-full sm:w-auto py-3 md:py-5 bg-green hover:bg-green flex rounded-[40px] items-center px-6 md:px-9 justify-center gap-2 text-sm md:text-base">
                                Schedule Visit
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Image Gallery Section - Make it responsive */}
                <div className="flex flex-col md:flex-row gap-4 rounded-lg overflow-hidden p-2 md:p-4">
                    {/* Large Image */}
                    <div className="md:flex-[2] w-full md:w-[700px]">
                        <div className="relative aspect-[4/3]">
                            <img
                                src={images[currentImageIndex]}
                                alt="Main"
                                className="w-full h-full object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 flex items-center justify-between px-4">
                                <button onClick={prevImage} className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70">
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button onClick={nextImage} className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70">
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Thumbnail Grid */}
                    <div className="grid grid-cols-2 md:w-[510px] gap-2">
                        {images.slice(1, 5).map((img, index) => (
                            <div key={index} className="relative aspect-square">
                                <img
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    onClick={() => setCurrentImageIndex(index + 1)}
                                    className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-80 border border-gray-300"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-3 gap-6 mt-6">
                    {/* Left Side – Room Options & Amenities */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Room Options Section */}
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <h2 className="text-xl md:text-2xl font-semibold p-4 md:p-6">Room Options</h2>
                            {/* Mobile view - Card layout */}
                            <div className="block md:hidden px-4 pb-4">
                                {roomOptions.map((room, index) => (
                                    <div key={index} className="border rounded-lg p-4 mb-4">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h3 className="font-medium text-gray-900">{room.type}</h3>
                                                <div className="flex items-center mt-1 text-sm text-gray-500">
                                                    <span>{room.acType}</span>
                                                    <span className="mx-2">•</span>
                                                    <span>Meals: {room.mealsIncluded ? "Included" : "Not Included"}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-green-600 font-semibold">{room.rent}</div>
                                                <div className="text-xs text-gray-500">+ {room.security} deposit</div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleBookRoom}
                                            disabled={!room.isAvailable}
                                            className={`w-full py-2 px-4 rounded-full text-sm font-medium transition-colors ${
                                                room.isAvailable
                                                    ? "bg-[#064749] hover:bg-[#053a3c] text-white"
                                                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                            }`}
                                        >
                                            {room.isAvailable ? "Book Now" : "Not Available"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                            {/* Desktop view - Table layout */}
                            {/* Desktop view - Table layout */}
                            <div className="hidden md:block">
                                <table className="w-full">
                                    <thead className="bg-[#E2F1E8] text-gray-700">
                                        <tr className="border-b">
                                            <th className="text-left py-3 px-2">Room Type</th>
                                            <th className="text-left py-3 px-2">Monthly Rent</th>
                                            <th className="text-left py-3 px-2">Security Deposit</th>
                                            <th className="text-left py-3 px-2">AC/Non-AC</th>
                                            <th className="text-left py-3 px-2">Meals Included</th>
                                            <th className="text-left py-3 px-4">CTA</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {roomOptions.map((room, index) => (
                                            <tr key={index} className="border-b">
                                                <td className="py-4 px-4 font-medium">{room.type}</td>
                                                <td className="py-4 px-4 text-green-600 font-semibold">{room.rent}</td>
                                                <td className="py-4 px-4">{room.security}</td>
                                                <td className="py-4 px-4">{room.acType}</td>
                                                <td className="py-4 px-4">{room.mealsIncluded ? "Yes" : "No"}</td>
                                                <td className="py-4 px-4">
                                                    <button
                                                        onClick={handleBookRoom}
                                                        className={`text-white text-sm px-4 py-1.5 rounded-full ${room.isAvailable
                                                                ? "bg-[#064749] hover:bg-[#053a3c]"
                                                                : "bg-gray-400 cursor-not-allowed"
                                                            }`}
                                                        disabled={!room.isAvailable}
                                                    >
                                                        {room.isAvailable ? "Book Now" : "Not Available"}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Amenities */}
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <h2 className="text-xl md:text-2xl font-semibold p-4 md:p-6 pb-2 md:pb-4">Amenities</h2>
                            <div className="px-4 pb-4">
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {amenities.map((amenity, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                                        >
                                            <div className="bg-white p-1.5 rounded-full">
                                                <amenity.icon className="w-4 h-4 text-[#064749]" />
                                            </div>
                                            <span className="text-sm font-medium text-gray-700 truncate">
                                                {amenity.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-4 text-sm font-medium text-[#064749] border border-[#064749] rounded-lg py-2 hover:bg-gray-50 transition-colors md:hidden">
                                    Show all amenities
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Pricing & House Rules */}
                    <div className="space-y-6">
                        <div className="mb-[80px] hidden md:block"></div>
                        {/* Pricing & Facilities */}
                        <div className="bg-[#E2F1E8] p-2 rounded-lg shadow-md border border-[#CDEAD5] space-y-4">
                            <h2 className="text-lg font-semibold">Pricing & Facilities</h2>
                            <div className="space-y-4 text-sm">
                                <div className="flex flex-col sm:flex-row justify-between border-b border-[#CDEAD5] pb-1">
                                    <span className="font-medium">Available From</span>
                                    <span>30.06.2025</span>
                                </div>
                                <div className="flex flex-col sm:flex-row justify-between border-b border-[#CDEAD5] pb-1">
                                    <span className="font-medium">Rent Payment Options</span>
                                    <span>Online / UPI / Card</span>
                                </div>
                                <div className="flex flex-col sm:flex-row justify-between border-b border-[#CDEAD5] pb-1">
                                    <span className="font-medium">Cancellation Policy</span>
                                    <span className="text-right">Free till 224 hrs before<br />check-in</span>
                                </div>
                            </div>
                            <div className="flex mt-2">
                                <input
                                    type="text"
                                    placeholder="Enter Code"
                                    className="w-full px-3 py-1 text-sm border border-r-0 border-gray-300 rounded-l-md focus:outline-none"
                                />
                                <button className="bg-[#064749] hover:bg-[#053a3c] text-white px-4 py-2 text-sm whitespace-nowrap rounded-r-md">
                                    Apply
                                </button>
                            </div>
                        </div>

                        {/* House Rules */}
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold p-3 sm:p-4 md:px-4 md:pb-2 md:pt-4">House Rules</h2>
                            <div className="px-3 sm:px-4 pb-4">
                                <div className="space-y-3 sm:space-y-4 text-sm">
                                    {houseRules.map((rule, index) => (
                                        <div key={index} className="flex items-start gap-3 p-2 sm:p-0 bg-gray-50 sm:bg-transparent rounded-lg">
                                            <div className="relative mt-0.5 flex-shrink-0">
                                                <rule.icon className="w-5 h-5 text-gray-600" />
                                                {rule.crossed && (
                                                    <X className="w-3 h-3 text-red-500 absolute -top-1 -right-1" />
                                                )}
                                            </div>
                                            <span className="text-gray-700">{rule.text}</span>
                                        </div>
                                    ))}
                                </div>
                                {/* Show more button for mobile */}
                                <button className="w-full mt-3 md:hidden text-green-600 text-sm font-medium py-2 px-4 border border-green-100 rounded-lg hover:bg-green-50">
                                    View all house rules
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related PGs Section */}
                <div className="mt-8 md:mt-12">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-center mb-6">Related PGs Nearby</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {relatedPGs.map((pg, index) => (
                            <div key={index} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                                <div className="relative aspect-video">
                                    <img
                                        src={pg.image || "/placeholder.svg"}
                                        alt={pg.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold mb-1">{pg.title}</h3>
                                    <p className="text-sm text-gray-600 mb-2">{pg.location}</p>
                                    <p className="text-green-600 font-semibold mb-3">{pg.price}</p>
                                    <div className="flex gap-5 self-stretch w-full items-start">
                                        <div className="flex items-start gap-2 mb-2">
                                            <div className="relative w-5 h-5">
                                                <img
                                                    className="absolute w-[17px] h-3.5 top-[3px] left-0.5"
                                                    alt="Bedroom icon"
                                                    src="https://c.animaapp.com/mbi2us3vKS97yu/img/group.png"
                                                />
                                            </div>
                                            <span className="font-desktop-description font-[number:var(--desktop-description-font-weight)] text-text text-[length:var(--desktop-description-font-size)] tracking-[var(--desktop-description-letter-spacing)] leading-[var(--desktop-description-line-height)] whitespace-nowrap">
                                                2 bedroom
                                            </span>
                                        </div>

                                        <div className="flex items-start gap-2">
                                            <img
                                                className="w-5 h-5"
                                                alt="Bath icon"
                                                src="https://c.animaapp.com/mbi2us3vKS97yu/img/fa-solid-bath.svg"
                                            />
                                            <span className="font-desktop-description font-[number:var(--desktop-description-font-weight)] text-text text-[length:var(--desktop-description-font-size)] tracking-[var(--desktop-description-letter-spacing)] leading-[var(--desktop-description-line-height)] whitespace-nowrap">
                                                1 bath
                                            </span>
                                        </div>

                                        <div className="flex items-start gap-2">
                                            <div className="relative w-5 h-5">
                                                <img
                                                    className="absolute w-[17px] h-[13px] top-[3px] left-0.5"
                                                    alt="WiFi icon"
                                                    src="https://c.animaapp.com/mbi2us3vKS97yu/img/group-1.png"
                                                />
                                            </div>
                                            <span className="font-desktop-description font-[number:var(--desktop-description-font-weight)] text-text text-[length:var(--desktop-description-font-size)] tracking-[var(--desktop-description-letter-spacing)] leading-[var(--desktop-description-line-height)] whitespace-nowrap">
                                                WiFi
                                            </span>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={handleViewDetails}
                                        size="sm"
                                        className="w-full bg-[#064749] rounded-[40px] text-[white] hover:bg-[#064749] hover:text-white"
                                    >
                                        View Details
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
