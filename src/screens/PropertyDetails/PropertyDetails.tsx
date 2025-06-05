

"use client"

import { useState } from "react"
import { MapPin } from "lucide-react";
import {
    Star,
    Wifi,
    Car,
    Coffee,
    Tv,
    Wind,
    Shield,
    Users,
    Clock,
    Phone,
    Mail,
    Calendar,
    ChevronLeft,
    ChevronRight,
} from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { home } from "../../assets"
import { useNavigate } from "react-router-dom";

const images = Array(8).fill(home)

const roomOptions = [
    { type: "Single Room", price: "₹8,000", period: "/month", available: "Available", beds: 1 },
    { type: "Double Room", price: "₹12,000", period: "/month", available: "Available", beds: 2 },
    { type: "Triple Room", price: "₹15,000", period: "/month", available: "Available", beds: 3 },
    { type: "Quad Room", price: "₹18,000", period: "/month", available: "2 Left", beds: 4 },
]

const amenities = [
    { icon: Wifi, name: "Wi-Fi" },
    { icon: Car, name: "Parking" },
    { icon: Coffee, name: "Kitchen" },
    { icon: Tv, name: "TV" },
    { icon: Wind, name: "AC" },
    { icon: Shield, name: "Security" },
]

const houseRules = [
    "No smoking inside",
    "No pets allowed",
    "No parties or events",
    "Check-in: 2:00 PM - 10:00 PM",
    "Check-out: 11:00 AM",
    "Quiet hours: 10:00 PM - 8:00 AM",
]

const reviews = [
    {
        name: "Priya",
        rating: 5,
        comment: "Great place to stay! Very clean and comfortable. The owner is very helpful and responsive.",
        avatar: home,
    },
    {
        name: "Rahul",
        rating: 4,
        comment: "Good location and amenities. Would definitely recommend to others looking for PG accommodation.",
        avatar: home,
    },
    {
        name: "Sneha",
        rating: 5,
        comment: "Excellent service and very well maintained property. Felt like home during my stay.",
        avatar: home,
    },
]

const relatedProperties = [
    { name: "Comfort Stay PG - CP", price: "₹9,000", rating: 4.5, image: home },
    { name: "Luxury PG - Karol Bagh", price: "₹12,000", rating: 4.8, image: home },
    { name: "Budget Stay - Rajouri", price: "₹6,500", rating: 4.2, image: home },
    { name: "Premium PG - Lajpat", price: "₹15,000", rating: 4.9, image: home },
]

// -- Components ---

function ImageGallery({ images }: { images: string[] }) {
    const [selectedImage, setSelectedImage] = useState(0)

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative">
                <img
                    src={images[selectedImage]}
                    alt={`Property image ${selectedImage + 1}`}
                    className="w-full h-96 object-cover"
                />
                <button
                    onClick={() => setSelectedImage((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2"
                    aria-label="Previous Image"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                    onClick={() => setSelectedImage((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2"
                    aria-label="Next Image"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>
            </div>
            <div className="p-4">
                <div className="grid grid-cols-6 gap-2">
                    {images.map((image, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedImage(idx)}
                            className={`rounded-lg overflow-hidden ring-2 ${selectedImage === idx ? "ring-teal-500" : "ring-transparent"} transition`}
                            aria-label={`Select image ${idx + 1}`}
                        >
                            <img src={image} alt={`Thumbnail ${idx + 1}`} className="w-full h-16 object-cover" />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

function RoomOptions({ rooms }: { rooms: typeof roomOptions }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Room Options</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {rooms.map((room, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <Users className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm text-gray-500">{room.beds} bed{room.beds > 1 ? "s" : ""}</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold">{room.type}</h3>
                                    <span
                                        className={`inline-block px-2 py-0.5 text-xs rounded-full font-medium ${room.available === "Available" ? "bg-green-100 text-green-800" : "bg-gray-300 text-gray-600"
                                            }`}
                                    >
                                        {room.available}
                                    </span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-green-600">{room.price}</div>
                                <div className="text-sm text-gray-500">{room.period}</div>
                                <Button size="sm" className="mt-2 bg-green-600 hover:bg-green-700">
                                    Book Now
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

function Amenities({ items }: { items: typeof amenities }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Amenities</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {items.map((amenity, idx) => {
                        const Icon = amenity.icon
                        return (
                            <div key={idx} className="flex items-center space-x-3">
                                <Icon className="h-5 w-5 text-green-600" />
                                <span>{amenity.name}</span>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}

function HouseRules({ rules }: { rules: string[] }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>House Rules</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2 list-none">
                    {rules.map((rule, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{rule}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}


function LocationInfo() {
    return (
        <Card className="rounded-xl shadow-md overflow-hidden">
            <CardHeader className="bg-gray-50 px-6 py-4 border-b">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <MapPinIcon className="w-5 h-5 text-green-600" />
                    Location
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                {/* Google Maps Embed with loading state */}
                <div className="relative h-80 w-full">
                    <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center">
                        <div className="text-center p-4">
                            <LoaderIcon className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-3" />
                            <p className="text-gray-500">Loading map...</p>
                        </div>
                    </div>

                    <iframe
                        title="Google Map - India"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        style={{ border: 0 }}
                        src="https://www.google.com/maps?q=India&output=embed"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>

                {/* Nearby info with icons */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                        <TrainIcon className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                            <strong className="block text-sm font-medium text-gray-700">Nearby Metro</strong>
                            <span className="text-gray-600">Karol Bagh Metro (0.5 km)</span>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <PlaneIcon className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                            <strong className="block text-sm font-medium text-gray-700">Airport</strong>
                            <span className="text-gray-600">IGI Airport (12 km)</span>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <RailSymbolIcon className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                            <strong className="block text-sm font-medium text-gray-700">Railway Station</strong>
                            <span className="text-gray-600">New Delhi Railway Station (3 km)</span>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <BusIcon className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                            <strong className="block text-sm font-medium text-gray-700">Bus Stand</strong>
                            <span className="text-gray-600">Karol Bagh Bus Stand (0.3 km)</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

// Icon components - you can replace these with your actual icon imports
function MapPinIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    );
}

function LoaderIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
    );
}

function TrainIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
    );
}

function PlaneIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
    );
}

function RailSymbolIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4V2m0 18v-2M6 12H4m16 0h-2M7.757 7.757l-1.414-1.414m12.728 12.728l-1.414-1.414M7.757 16.243l-1.414 1.414M16.243 7.757l1.414-1.414" />
        </svg>
    );
}

function BusIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16v-4m8 4v-4m-9 4h10a2 2 0 002-2v-4a2 2 0 00-2-2H7a2 2 0 00-2 2v4a2 2 0 002 2zm6-12h4a1 1 0 011 1v3a1 1 0 01-1 1h-4V8z" />
        </svg>
    );
}

// function LocationInfo() {
//     return (
//         <Card>
//             <CardHeader>
//                 <CardTitle>Location</CardTitle>
//             </CardHeader>
//             <CardContent>
//                 {/* Google Maps Embed */}
//                 <div className="rounded-lg overflow-hidden h-64">
//                     <iframe
//                         title="Google Map - Karol Bagh"
//                         width="100%"
//                         height="100%"
//                         frameBorder="0"
//                         style={{ border: 0 }}
//                         src="https://www.google.com/maps/embed/v1/place?q=Karol+Bagh,+New+Delhi&key=YOUR_GOOGLE_MAPS_API_KEY"
//                         allowFullScreen
//                     ></iframe>
//                 </div>

//                 {/* Nearby info */}
//                 <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
//                     <div>
//                         <strong>Nearby Metro:</strong> Karol Bagh Metro (0.5 km)
//                     </div>
//                     <div>
//                         <strong>Airport:</strong> IGI Airport (12 km)
//                     </div>
//                     <div>
//                         <strong>Railway Station:</strong> New Delhi Railway Station (3 km)
//                     </div>
//                     <div>
//                         <strong>Bus Stand:</strong> Karol Bagh Bus Stand (0.3 km)
//                     </div>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// }


function OwnerInfo() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>About the Property Owner / Warden</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-start space-x-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src="/placeholder.svg?height=64&width=64" />
                        <AvatarFallback>RK</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <h3 className="font-semibold text-lg">Rajesh Kumar</h3>
                        <p className="text-gray-600 mb-3">
                            Experienced property manager with over 10 years in hospitality. Committed to providing comfortable
                            and safe accommodation for students and working professionals.
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                                <Phone className="h-4 w-4 mr-1" />
                                <span>+91 98765 43210</span>
                            </div>
                            <div className="flex items-center">
                                <Mail className="h-4 w-4 mr-1" />
                                <span>rajesh@vrento.com</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

function UserReviews({ reviews }: { reviews: typeof reviews }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>What our users think</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {reviews.map((review, idx) => (
                        <div key={idx} className="border-b pb-4 last:border-b-0">
                            <div className="flex items-start space-x-3">
                                <Avatar>
                                    <AvatarImage src={review.avatar} />
                                    <AvatarFallback>{review.name[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <h4 className="font-semibold">{review.name}</h4>
                                        <div className="flex">
                                            {[...Array(review.rating)].map((_, i) => (
                                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-700">{review.comment}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

function RelatedProperties({ properties }: { properties: typeof relatedProperties }) {

    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate("/property-details");
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle>Related PGs Nearby Section</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {properties.map((property, idx) => (
                        <div
                            key={idx}
                            className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                            tabIndex={0}
                            role="button"
                            aria-pressed="false"
                        >
                            <img src={property.image} alt={property.name} className="w-full h-32 object-cover" />
                            <div className="p-3">
                                <h3 className="font-semibold mb-1">{property.name}</h3>
                                <div className="flex items-center justify-between">
                                    <span className="text-green-600 font-bold">{property.price}/month</span>
                                    <div className="flex items-center">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                                        <span className="text-sm">{property.rating}</span>
                                    </div>
                                </div>
                                <Button size="sm" className="w-full mt-2 bg-green-600 hover:bg-green-700" onClick={handleViewDetails}>
                                    View Details
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

function PricingBooking() {
    return (
        <Card className="sticky top-8">
            <CardHeader>
                <CardTitle>Pricing & Facilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">₹8,000</div>
                    <div className="text-gray-500">per month</div>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span>Security Deposit:</span>
                        <span>₹5,000</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Maintenance:</span>
                        <span>₹500/month</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Electricity:</span>
                        <span>As per usage</span>
                    </div>
                </div>

                <hr />

                <div className="space-y-3">
                    <h4 className="font-semibold">Included Facilities:</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                        <li>Free Wi-Fi</li>
                        <li>Daily Housekeeping</li>
                        <li>24/7 Security</li>
                        <li>Power Backup</li>
                        <li>Laundry Service</li>
                        <li>Common Kitchen</li>
                    </ul>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Book Now
                </Button>

                <Button variant="outline" className="w-full text-green border-green hover:bg-green/10">
                    <Phone className="h-4 w-4" />
                    Contact Owner
                </Button>

                <div className="text-center text-sm text-green">
                    <Clock className="h-4 w-4 inline mr-1" />
                    Instant booking available
                </div>
            </CardContent>
        </Card>
    )
}

// --- Main Component ---

export default function PropertyDetails() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-28">
                <header className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Comfort Stay PG - Karol Bagh</h1>
                    <div className="flex items-center space-x-4 text-gray-600">
                        <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>Karol Bagh, New Delhi</span>
                        </div>
                        <div className="flex items-center">
                            <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                            <span>4.8 (124 reviews)</span>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <ImageGallery images={images} />
                        <RoomOptions rooms={roomOptions} />
                        <Amenities items={amenities} />
                        <HouseRules rules={houseRules} />
                        <LocationInfo />
                        <OwnerInfo />
                        <UserReviews reviews={reviews} />
                        <RelatedProperties properties={relatedProperties} />
                    </div>

                    <div className="lg:col-span-1">
                        <PricingBooking />
                    </div>
                </div>
            </div>
        </div>
    )
}
