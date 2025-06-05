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
        },
        {
            type: "Double Sharing",
            rent: "₹8,000",
            security: "₹16,000",
            availableFrom: "20 Jan 2024",
            acType: "Non-AC",
            isAvailable: true,
        },
        {
            type: "Triple Sharing",
            rent: "₹6,500",
            security: "₹13,000",
            availableFrom: "25 Jan 2024",
            acType: "AC",
            isAvailable: false,
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
        <div className="min-h-screen bg-gray-50 mt-20">
            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Header Section */}
                <div className=" p-6 ">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Comfort Stay PG – Karol Bagh</h1>
                            <div className="flex items-center gap-2 text-gray-600">
                                <MapPin className="w-4 h-4" />
                                <span>Karol Bagh, New Delhi</span>

                            </div>
                            <div>
                                <div className="flex items-center gap-1 ml-2">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-medium"> 4.5 & total reviews (120 Reviews)</span>
                                </div>
                            </div>
                            <div className="flex gap-5 self-stretch w-full items-start my-1">
                                <div className="flex items-start gap-2">
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
                                        2 bath
                                    </span>
                                </div>

                                <div className="flex items-start gap-2">


                                    <span className="font-desktop font-semibold description font-[number:var(--desktop-description-font-weight)] text-text text-[length:var(--desktop-description-font-size)] tracking-[var(--desktop-description-letter-spacing)] leading-[var(--desktop-description-line-height)] whitespace-nowrap">
                                        PG Type:
                                    </span>
                                    <span className="font-desktop-description font-[number:var(--desktop-description-font-weight)] text-text text-[length:var(--desktop-description-font-size)] tracking-[var(--desktop-description-letter-spacing)] leading-[var(--desktop-description-line-height)] whitespace-nowrap">
                                        [For Boys/Girls/Unisex]
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button onClick={handleBookRoom} className="w-full py-5 bg-green hover:bg-green flex rounded-[40px] items-center px-9 justify-center gap-2">

                                Book This Room
                            </Button>
                            <Button onClick={handleScheduleRoom} className="w-full py-5 bg-green hover:bg-green flex rounded-[40px] items-center px-9 justify-center gap-2">

                                Schedule Visit
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 rounded-lg overflow-hidden p-4">
                    {/* Large Image */}
                    <div className="flex-2 w-[1500px]">
                        <img
                            src={images[currentImageIndex]}
                            alt="Main"
                            className="w-full h-full object-cover aspect-[4/3] rounded-lg"
                        />
                    </div>

                    {/* 2x2 Thumbnail Grid */}
                    <div className="w-full md:w-[450px] grid grid-cols-2 gap-2">
                        {images.slice(1, 5).map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                onClick={() => setCurrentImageIndex(index + 1)}
                                className="w-full aspect-square object-cover rounded-lg cursor-pointer hover:opacity-80 border border-gray-300"
                            />
                        ))}
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Left Side – Room Options & Amenities */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Room Options */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h1 className="text-3xl font-semibold flex items-center">Room Options</h1>
                            </div>
                            <div className="bg-white shadow rounded-lg overflow-hidden border">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead className="bg-[#E2F1E8] text-gray-700">
                                            <tr className="border-b">
                                                <th className="text-left py-3 px-4">Room Type</th>
                                                <th className="text-left py-3 px-4">Monthly Rent</th>
                                                <th className="text-left py-3 px-4">Security Deposit</th>
                                                <th className="text-left py-3 px-4">AC/Non-AC</th>
                                                <th className="text-left py-3 px-4">Meals Included</th>
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
                                                        <button onClick={handleBookRoom}
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
                        </div>

                        {/* Amenities */}
                        <div className="border-2 border-400 rounded-xl p-4">
                            <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {amenities.map((amenity, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
                                    >
                                        <amenity.icon className="w-5 h-5 text-[#064749]" />
                                        <span className="text-sm font-medium">{amenity.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side – Pricing & House Rules */}
                    <div className="space-y-6">
                        <div className="mb-12"></div>
                        {/* Pricing & Facilities */}
                        <div className="bg-[#E2F1E8] p-4 rounded-lg shadow-md border border-[#CDEAD5] space-y-4 text-sm text-gray-800">
                            <h2 className="text-lg font-semibold">Pricing & Facilities</h2>
                            <div className="flex justify-between">
                                <span className="font-medium">Available From</span>
                                <span>30.06.2025</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Rent Payment Options</span>
                                <span>Online / UPI / Card</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Cancellation Policy</span>
                                <span className="text-right">Free till 224 hrs before<br />check-in</span>
                            </div>
                            <div className="flex border border-gray-300 rounded-md overflow-hidden mt-2">
                                <input
                                    type="text"
                                    placeholder="Enter Code"
                                    className="w-full px-3 py-2 text-sm focus:outline-none"
                                />
                                <button className="bg-[#064749] hover:bg-[#053a3c] text-white px-4 text-sm">
                                    Apply
                                </button>
                            </div>
                        </div>

                        {/* House Rules */}
                        <div className="bg-white shadow rounded-lg p-4 border">
                            <h2 className="text-2xl font-semibold mb-4">House Rules</h2>
                            <div className="space-y-3 text-sm">
                                {houseRules.map((rule, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="relative">
                                            <rule.icon className="w-5 h-5 text-gray-600" />
                                            {rule.crossed && (
                                                <X className="w-3 h-3 text-red-500 absolute -top-1 -right-1" />
                                            )}
                                        </div>
                                        <span>{rule.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>



                <div className="mt-6 ">
                    {/* Location */}


                    {/* About Property Owner */}

                    <div className="mb-6 mt-10">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-3xl font-semibold flex items-center">About the Property Owner / Warden</h1>
                        </div>

                        <div className="border rounded-lg shadow-sm p-6 bg-white">
                            <div className="flex items-start gap-4">
                                <Avatar className="w-16 h-16">
                                    <AvatarImage src="/placeholder.svg?height=64&width=64" />
                                    <AvatarFallback>RS</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg">Rajesh Sharma</h3>
                                    <p className="text-gray-600 text-sm mb-3">
                                        Experience, how they manage PG -
                                        In nullam eget urna suspendisse odio nunc. Eu sodales vestibulum, donec rutrum justo, amet porttitor vitae et. Interdum consectetur dictum mattis gravida sed vulputate. Tempus sagittis cras sagittis viverra erat proin duis enim.
                                        <br />Phone Number: +91- xxxxx xxxxx
                                    </p>
                                    <Button
                                        onClick={handleContact}
                                        className="border-[#064749] text-white rounded-[40px] hover:bg-[#064749] hover:text-white"
                                    >
                                        <Phone className="w-4 h-4 mr-2" />
                                        Contact Owner
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="py-12">
                        <div className=" mx-auto px-4">

                            <h2 className=" mb-10 font-desktop-h3 font-[number:var(--desktop-h3-font-weight)] text-text text-[length:var(--desktop-h3-font-size)] text-center tracking-[var(--desktop-h3-letter-spacing)] leading-[var(--desktop-h3-line-height)] [font-style:var(--desktop-h3-font-style)]">
                                Our Location</h2>


                            <div className="max-w-10xl mx-auto">
                                <div className="rounded-lg overflow-hidden h-96 shadow-lg">
                                    <iframe
                                        src="https://maps.google.com/maps?q=40.757985,-73.987844&z=15&output=embed"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Business Location"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* User Reviews */}
                    {/* <TestimonialsSection /> */}
                    <h2 className=" mb-10 font-desktop-h3 font-[number:var(--desktop-h3-font-weight)] text-text text-[length:var(--desktop-h3-font-size)] text-center tracking-[var(--desktop-h3-letter-spacing)] leading-[var(--desktop-h3-line-height)] [font-style:var(--desktop-h3-font-style)]">
                        Related PGs Nearby Section
                    </h2>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedPGs.map((pg, index) => (
                                <div key={index} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="aspect-video relative">
                                        <img src={pg.image || "/placeholder.svg"} alt={pg.title} fill className="object-cover" />
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
                    </CardContent>
                </div >
            </div >
        </div >
    )
}
