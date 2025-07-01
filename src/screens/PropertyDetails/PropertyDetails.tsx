import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import {
    MapPin,
    Star,
    ChevronLeft,
    ChevronRight,
    Wifi as WifiIcon,
    WashingMachine,
    Zap,
    Camera,
    Users,
    Utensils as UtensilsIcon,
    Shield as ShieldIcon,
    Car as CarIcon,
    Dumbbell,
    BedDouble
} from 'lucide-react';
import { home } from '../../assets';
import { accommodationService } from '../../api/services/accommodationService';
import { ExtendedAccommodation, RoomOption, Amenity, transformToExtended } from '../../lib/types';

const formatPrice = (price: string | number | undefined): string => {
    if (price === undefined || price === null) return "N/A";
    const numericPrice = typeof price === 'string'
        ? parseFloat(price.replace(/[^0-9.]/g, ''))
        : Number(price);

    if (isNaN(numericPrice)) return "N/A";

    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(numericPrice);
};

const amenityDetailsMap: { [key: string]: { label: string; icon: React.ComponentType<{ className?: string }> } } = {
    'wifi': { label: 'Wi-Fi', icon: WifiIcon },
    'laundry': { label: 'Laundry', icon: WashingMachine },
    'kitchen': { label: 'Kitchen', icon: UtensilsIcon },
    'power backup': { label: 'Power Backup', icon: Zap },
    'cctv': { label: 'CCTV', icon: Camera },
    'housekeeping': { label: 'Housekeeping', icon: Users },
    'parking': { label: 'Parking', icon: CarIcon },
    'security': { label: 'Security', icon: ShieldIcon },
    'furnished': { label: 'Furnished', icon: BedDouble },
    'gym': { label: 'Gym', icon: Dumbbell },
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

function PropertyDetails() {
    const { id } = useParams<{ id: string }>();
    const [property, setProperty] = useState<ExtendedAccommodation | null>(null);
    const [relatedProperties, setRelatedProperties] = useState<ExtendedAccommodation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Show 8 items per page
    const navigate = useNavigate();
    
    // Calculate pagination for related properties
    const totalPages = Math.ceil(relatedProperties.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedRelatedProperties = relatedProperties.slice(startIndex, startIndex + itemsPerPage);
    
    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: document.getElementById('related-properties')?.offsetTop, behavior: 'smooth' });
    };

    const images = useMemo(() => {
        if (!property?.images?.length) return [home];
        return property.images;
    }, [property?.images]);

    const totalImages = images.length;

    useEffect(() => {
        const fetchProperty = async () => {
            if (!id) {
                setError("No property ID provided")
                setLoading(false)
                return
            }

            try {
                setLoading(true)
                const data = await accommodationService.getAccommodations()
                const foundProperty = data.find(p => p.id === id)

                if (!foundProperty) {
                    throw new Error("Property not found")
                }

                setProperty(transformToExtended(foundProperty))
                setRelatedProperties(data.filter(p => p.id !== id).map(transformToExtended));
                setError(null)
            } catch (err) {
                console.error('Error fetching property details:', err)
                setError('Failed to load property details. Please try again later.')
            } finally {
                setLoading(false)
            }
        }

        fetchProperty()
    }, [id])
    const nextImage = useCallback(() => {
        setCurrentImageIndex((prev) => (prev + 1) % totalImages);
    }, [totalImages]);

    const prevImage = useCallback(() => {
        setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
    }, [totalImages]);

    const handleBookRoom = useCallback(() => {
        if (!property) return;
        navigate(`/book/${property.id}`);
    }, [navigate, property]);

    const handleScheduleRoom = useCallback(() => {
        if (!property) return;
        navigate(`/book/${property.id}`);
    }, [navigate, property]);

    const handleViewDetails = useCallback((pgId: string) => {
        navigate(`/property-details/${pgId}`);
        window.scrollTo(0, 0);
    }, [navigate]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 mt-16 md:mt-20">
                <div className="container mx-auto px-4 py-4">
                    <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-gray-900 mb-4">
                        <ChevronLeft className="w-5 h-5 mr-1" />
                        <span>Back to results</span>
                    </button>
                    <div className="text-center py-10">
                        <h2 className="text-2xl font-bold text-red-600">Error</h2>
                        <p className="text-gray-700 mt-2">{error}</p>
                    </div>
                </div>
            </div>
        )
    }

    if (!property) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div>Property not found.</div>
            </div>
        )
    }

    const roomOptions: RoomOption[] = property.roomOptions || [
        { type: "Single Room", rent: "₹12,000", security: "₹24,000", availableFrom: "15 Jan 2024", acType: "AC", isAvailable: true, mealsIncluded: true },
        { type: "Double Sharing", rent: "₹8,000", security: "₹16,000", availableFrom: "20 Jan 2024", acType: "Non-AC", isAvailable: true, mealsIncluded: false },
        { type: "Triple Sharing", rent: "₹6,500", security: "₹13,000", availableFrom: "25 Jan 2024", acType: "AC", isAvailable: false, mealsIncluded: true },
    ]

    const amenities: Amenity[] = property.amenities || [];

    const houseRules: string[] = property.houseRules || [
        "No Loud Music after 10 PM",
        "No Smoking inside premises",
        "Entry time till 11 PM",
        "Visitors allowed with prior notice",
        "Keep common areas clean",
    ];

    return (
        <div className="min-h-screen bg-gray-50 mt-16 md:mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 md:py-6">
                <div className="p-4 md:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-600">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    <span>{property.location}</span>
                                </div>
                                <div className="flex items-center gap-1 sm:ml-2">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-medium text-sm md:text-base">
                                        {typeof property.rating === 'object' ? property.rating.average.toFixed(1) : property.rating?.average|| 'N/A'}
                                        &nbsp; (
                                        {typeof property.rating === 'object' ? property.rating.count : (property.reviews || 0)}
                                        &nbsp;Reviews)
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-3 md:gap-5 mt-3">
                                <div className="flex items-center gap-2">
                                    <div className="relative w-5 h-5">
                                        <img className="w-[17px] h-3.5 absolute top-[3px] left-0.5" alt="Bedroom icon" src="https://c.animaapp.com/mbi2us3vKS97yu/img/group.png" />
                                    </div>
                                    <span className="text-sm md:text-base">{property.bedrooms} bedroom</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <img className="w-5 h-5" alt="Bath icon" src="https://c.animaapp.com/mbi2us3vKS97yu/img/fa-solid-bath.svg" />
                                    <span className="text-sm md:text-base">{property.bathrooms} bath</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm md:text-base font-semibold">PG Type:</span>
                                    <span className="text-sm md:text-base">{property.gender || 'Unisex'}</span>
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
                <div className="rounded-lg overflow-hidden p-2 sm:p-4">
                    {images.length <= 4 ? (
                        // Grid layout for 4 or fewer images
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            {images.map((img, index) => (
                                <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                                    <img 
                                        src={img} 
                                        alt={`Image ${index + 1}`} 
                                        className="w-full h-full object-cover" 
                                        onError={(e) => { e.currentTarget.src = home; }} 
                                    />
                                    {images.length > 1 && (
                                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                                            {images.map((_, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setCurrentImageIndex(idx)}
                                                    className={`w-2 h-2 rounded-full transition-all ${index === idx ? 'w-6 bg-white' : 'w-2 bg-white/50'}`}
                                                    aria-label={`Go to image ${idx + 1}`}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        // 1 large + 4 small layout for 5 or more images
                        <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
                            <div className="w-full md:flex-[2] md:min-w-0">
                                <div className="relative aspect-[4/3] md:rounded-lg overflow-hidden">
                                    <img 
                                        src={images[currentImageIndex]} 
                                        alt="Main" 
                                        className="w-full h-full object-cover" 
                                        onError={(e) => { e.currentTarget.src = home; }} 
                                    />
                                    <div className="absolute inset-0 flex items-center justify-between px-2 sm:px-4">
                                        <button 
                                            onClick={prevImage} 
                                            className="bg-black/50 text-white p-1.5 sm:p-2 rounded-full hover:bg-black/70 transition-all"
                                            aria-label="Previous image"
                                        >
                                            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                                        </button>
                                        <button 
                                            onClick={nextImage} 
                                            className="bg-black/50 text-white p-1.5 sm:p-2 rounded-full hover:bg-black/70 transition-all"
                                            aria-label="Next image"
                                        >
                                            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                                        </button>
                                    </div>
                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1">
                                        {images.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setCurrentImageIndex(idx)}
                                                className={`w-2 h-2 rounded-full transition-all ${currentImageIndex === idx ? 'w-6 bg-white' : 'w-2 bg-white/50'}`}
                                                aria-label={`Go to image ${idx + 1}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 w-full md:w-auto md:max-w-[200px] lg:max-w-[260px]">
                                {images.slice(0, 4).map((img, index) => (
                                    <div key={index} className="relative aspect-square">
                                        <img 
                                            src={img} 
                                            alt={`Thumbnail ${index + 1}`} 
                                            onClick={() => setCurrentImageIndex(index)} 
                                            className={`w-full h-full object-cover rounded-lg cursor-pointer transition-opacity ${currentImageIndex === index ? 'ring-2 ring-green' : 'opacity-80 hover:opacity-100'} border border-gray-200`} 
                                            onError={(e) => { e.currentTarget.src = home; }} 
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
                    <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold p-4 sm:p-6">Room Options</h2>
                            <div className="block md:hidden">
                                {roomOptions.map((room, index) => (
                                    <div key={index} className="border-b p-4">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h3 className="font-medium text-base">{room.type}</h3>
                                                <div className="text-green font-semibold text-sm mt-1">{room.rent}/month</div>
                                            </div>
                                            <span className="text-sm bg-gray-100 px-2 py-1 rounded">{room.acType}</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                                            <div className="flex items-center gap-1">
                                                <ShieldIcon className="w-4 h-4" />
                                                <span>Security: {room.security}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <UtensilsIcon className="w-4 h-4" />
                                                <span>Meals: {room.mealsIncluded ? "Included" : "Not Included"}</span>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={handleBookRoom} 
                                            disabled={!room.isAvailable}
                                            className={`w-full py-2 px-4 rounded-full text-sm font-medium ${room.isAvailable 
                                                ? "bg-[#064749] text-white hover:bg-[#053a3c]" 
                                                : "bg-gray-200 text-gray-500 cursor-not-allowed"
                                            }`}
                                        >
                                            {room.isAvailable ? "Book Now" : "Not Available"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-[#E2F1E8] text-gray-700">
                                        <tr className="border-b">
                                            <th className="text-left py-3 px-3 text-sm font-medium">Room Type</th>
                                            <th className="text-left py-3 px-3 text-sm font-medium">Monthly Rent</th>
                                            <th className="text-left py-3 px-3 text-sm font-medium">Security</th>
                                            <th className="text-left py-3 px-3 text-sm font-medium">AC/Non-AC</th>
                                            <th className="text-left py-3 px-3 text-sm font-medium">Meals</th>
                                            <th className="text-left py-3 px-3 text-sm font-medium"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {roomOptions.map((room, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="py-4 px-3 font-medium text-sm">{room.type}</td>
                                                <td className="py-4 px-3 text-green font-semibold text-sm">{room.rent}</td>
                                                <td className="py-4 px-3 text-sm">{room.security}</td>
                                                <td className="py-4 px-3 text-sm">{room.acType}</td>
                                                <td className="py-4 px-3 text-sm">{room.mealsIncluded ? "Yes" : "No"}</td>
                                                <td className="py-4 px-3">
                                                    <button 
                                                        onClick={handleBookRoom} 
                                                        disabled={!room.isAvailable}
                                                        className={`text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-full whitespace-nowrap ${room.isAvailable 
                                                            ? "bg-[#064749] hover:bg-[#053a3c]" 
                                                            : "bg-gray-400 cursor-not-allowed"
                                                        }`}
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

                        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-2">
                            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6">Amenities</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                                {amenities.map((amenity, index) => (
                                    <div 
                                        key={index} 
                                        className="flex items-center gap-2 p-2 sm:p-3 border border-[#E2F1E8] rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <amenity.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#064749] flex-shrink-0" />
                                        <span className="text-xs sm:text-sm font-medium truncate">{amenity.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6 sm:space-y-0">
                        <div className="mb-6 sm:mb-[80px]"></div>
                        <div className="bg-[#E2F1E8] p-4 sm:p-2 rounded-lg shadow-md border border-[#CDEAD5] space-y-4 sm:space-y-2">
                            <h2 className="text-lg font-semibold">Pricing & Facilities</h2>
                            <div className="space-y-4 text-sm">
                                <div className="flex flex-col sm:flex-row justify-between border-b border-[#CDEAD5] pb-2">
                                    <span className="font-medium">Available From</span>
                                    <span>{roomOptions[0]?.availableFrom || 'N/A'}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row justify-between border-b border-[#CDEAD5] pb-2">
                                    <span className="font-medium">Rent Payment Options</span>
                                    <span>Online / UPI / Card</span>
                                </div>
                                <div className="flex flex-col sm:flex-row justify-between border-b border-[#CDEAD5] pb-2">
                                    <span className="font-medium">Cancellation Policy</span>
                                    <span className="text-left sm:text-right">Free till 224 hrs before<br />check-in</span>
                                </div>
                            </div>
                            <div className="flex mt-2">
                                <input type="text" placeholder="Enter Code" className="w-full px-3 py-2 text-sm border border-r-0 border-gray-300 rounded-l-md focus:outline-none" />
                                <button className="bg-[#064749] hover:bg-[#053a3c] text-white px-4 py-2 text-sm whitespace-nowrap rounded-r-md">Apply</button>
                            </div>
                        </div>

                        <div className="bg-white shadow rounded-lg p-4 md:p-5 border">
                            <h2 className="text-xl md:text-2xl font-semibold mb-4">House Rules</h2>
                            <div className="space-y-4 text-sm">
                                {houseRules.map((rule, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <ShieldIcon className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                                        <span className="flex-1">{rule}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {relatedProperties.length > 0 && relatedProperties.length > itemsPerPage && (
                    <div className="mt-8 md:mt-12">
                        <h2 className="text-xl md:text-2xl font-semibold text-center mb-6">Related PGs Nearby</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
                            {paginatedRelatedProperties.map((pg) => {
                                const imageUrl = (pg.images?.[0] || pg?.image || home) as string;
                                const pgTitle = pg?.title || 'Property';
                                
                                return (
                                    <div key={pg.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                                        <div className="relative aspect-video">
                                            <img 
                                                src={imageUrl}
                                                alt={pgTitle}
                                                className="w-full h-full object-cover" 
                                                onError={(e) => { e.currentTarget.src = home; }} 
                                            />
                                        </div>
                                        <div className="p-4 flex-1 flex flex-col">
                                            <h3 className="font-semibold mb-1 text-gray-900">{pgTitle}</h3>
                                            <p className="text-sm text-gray-600 mb-3">{pg.location}</p>
                                            <p className="text-green font-semibold mb-3">{formatPrice(pg.rent || pg.price)}</p>
                                            <div className="flex flex-wrap gap-3 mt-auto">
                                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                                    <div className="relative w-5 h-5">
                                                        <img className="absolute w-[17px] h-3.5 top-[3px] left-0.5" alt="Bedroom icon" src="https://c.animaapp.com/mbi2us3vKS97yu/img/group.png" />
                                                    </div>
                                                    <span>2 beds</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                                    <img className="w-5 h-5" alt="Bath icon" src="https://c.animaapp.com/mbi2us3vKS97yu/img/fa-solid-bath.svg" />
                                                    <span>1 bath</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                                    <div className="relative w-5 h-5">
                                                        <img className="absolute w-[17px] h-[13px] top-[3px] left-0.5" alt="WiFi icon" src="https://c.animaapp.com/mbi2us3vKS97yu/img/group-1.png" />
                                                    </div>
                                                    <span>WiFi</span>
                                                </div>
                                            </div>
                                            <Button 
                                                onClick={() => handleViewDetails(pg.id)} 
                                                size="sm" 
                                                className="w-full bg-[#064749] hover:bg-[#053a3c] rounded-[40px] text-white mt-4"
                                            >
                                                View Details
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        
                        {/* Pagination */}
                        {relatedProperties.length > itemsPerPage && (
                            <div className="flex justify-center mt-8 space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1"
                                >
                                    Previous
                                </Button>
                                
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <Button
                                        key={page}
                                        variant={currentPage === page ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => handlePageChange(page)}
                                        className={`px-3 py-1 ${currentPage === page ? 'bg-green text-white' : ''}`}
                                    >
                                        {page}
                                    </Button>
                                ))}
                                
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1"
                                >
                                    Next
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PropertyDetails;
