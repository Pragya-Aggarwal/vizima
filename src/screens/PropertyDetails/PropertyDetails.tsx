import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import {
    MapPin,
    Star,
    ChevronLeft,
    ChevronRight,
    Bed,
    Bath,
    Ruler,
    Shield as ShieldIcon,
    Wifi as WifiIcon,
    Utensils as UtensilsIcon,
    Car as CarIcon,
    Users as UsersIcon,
    Battery,
    Video,
    Sofa,
    Dumbbell,
    Check,
    Phone,
    Mail,
    Share2,
    Heart,
    MessageSquare,
    Map as MapIcon,
    Building2,
    Landmark,
    School,
    Train,
    Clock,
    Calendar,
    User,
    Lock,
    Eye,
    EyeOff
} from 'lucide-react';
import { home } from '../../assets';
import { accommodationService } from '../../api/services/accommodationService';
import { ExtendedAccommodation, transformToExtended, Location, Amenity } from '../../lib/types';

interface RoomOption {
    type: string;
    rent: string;
    security: string;
    availableFrom: string;
    acType: string;
    isAvailable: boolean;
    mealsIncluded: boolean;
}



// Helper function to get amenity details
const getAmenityDetails = (amenity: string | { name: string; available: boolean } | Amenity) => {
    let amenityName: string;
    let isAvailable: boolean;

    if (typeof amenity === 'string') {
        amenityName = amenity;
        isAvailable = true;
    } else if ('name' in amenity) {
        amenityName = amenity.name;
        isAvailable = 'available' in amenity ? !!amenity.available : true;
    } else {
        // Handle Amenity type
        return {
            label: amenity.label,
            icon: amenity.icon,
            available: true
        };
    }

    const amenityDetailsMap: { [key: string]: { label: string; icon: React.ComponentType<{ className?: string }> } } = {
        'wifi': { label: 'Wi-Fi', icon: WifiIcon },
        'laundry': { label: 'Laundry', icon: UsersIcon },
        'kitchen': { label: 'Kitchen', icon: UtensilsIcon },
        'power backup': { label: 'Power Backup', icon: Battery },
        'cctv': { label: 'CCTV', icon: Video },
        'housekeeping': { label: 'Housekeeping', icon: UsersIcon },
        'parking': { label: 'Parking', icon: CarIcon },
        'security': { label: 'Security', icon: ShieldIcon },
        'furnished': { label: 'Furnished', icon: Sofa },
        'gym': { label: 'Gym', icon: Dumbbell },
    };

    const details = amenityDetailsMap[amenityName.toLowerCase()] || { label: amenityName, icon: Check };

    return {
        label: details.label,
        icon: details.icon,
        available: isAvailable
    };
};



const getLocationString = (location?: string | Location | null): string => {
    if (!location) return 'Location not specified';
    if (typeof location === 'string') return location;
    return [location.address, location.city].filter(Boolean).join(', ');
};

function PropertyDetails() {
    const { id } = useParams<{ id: string }>();
    const [property, setProperty] = useState<ExtendedAccommodation | null>(null);
    const [relatedProperties, setRelatedProperties] = useState<ExtendedAccommodation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProperty = async () => {
            if (!id) return;

            try {
                setLoading(true);
                // First try to find the property in the existing accommodations
                const allAccommodations = await accommodationService.getAccommodations();
                const foundProperty = allAccommodations.find(acc => acc.id === id);

                if (foundProperty) {
                    setProperty(transformToExtended(foundProperty));
                    setError(null);
                } else {
                    throw new Error('Property not found');
                }
            } catch (err) {
                console.error('Error fetching property:', err);
                setError('Failed to load property details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

    useEffect(() => {
        if (!property) return;

        const fetchSimilarProperties = async () => {
            try {
                console.log('Fetching similar properties...');
                const allAccommodations = await accommodationService.getAccommodations();
                console.log('All accommodations:', allAccommodations);

                // More lenient filtering - just exclude the current property
                const similar = allAccommodations
                    .filter(acc => acc.id !== property.id)
                    .slice(0, 4); // Limit to 4 similar properties

                console.log('Found similar properties:', similar);
                setRelatedProperties(similar.map(transformToExtended));
            } catch (err) {
                console.error('Error fetching similar properties:', err);
                setRelatedProperties([]);
            }
        };

        fetchSimilarProperties();
    }, [property]);

    const images = useMemo(() => {
        if (!property?.images?.length) return [home];
        return property.images;
    }, [property?.images]);

    const totalImages = images.length;

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
        navigate(`/book/${property.id}?tab=schedule`);
    }, [navigate, property]);

    const handleViewDetails = (propertyId: string) => {
        navigate(`/property-details/${propertyId}`);
        window.scrollTo(0, 0);
    };

    const getPropertyId = (property: ExtendedAccommodation): string => {
        return property._id || property.id;
    };

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

    const roomOptions: RoomOption[] = property.roomOptions?.length ? property.roomOptions : [
        { type: "Single Sharing", rent: "₹8,500", security: "₹17,000", availableFrom: "15 Jan 2024", acType: "Non-AC", isAvailable: true, mealsIncluded: true },
        { type: "Double Sharing", rent: "₹7,500", security: "₹15,000", availableFrom: "20 Jan 2024", acType: "AC", isAvailable: true, mealsIncluded: false },
        { type: "Triple Sharing", rent: "₹6,500", security: "₹13,000", availableFrom: "25 Jan 2024", acType: "AC", isAvailable: false, mealsIncluded: true }
    ];

    // Get amenities and house rules with proper type checking
    const amenities: (string | Amenity)[] = Array.isArray(property.amenities)
        ? property.amenities.map(amenity => {
            if (typeof amenity === 'string') return amenity;
            if (amenity && typeof amenity === 'object') {
                if ('icon' in amenity && 'label' in amenity) {
                    return amenity as Amenity;
                }
                if ('name' in amenity) {
                    // Convert to proper Amenity type
                    const details = getAmenityDetails(amenity);
                    return {
                        icon: details.icon,
                        label: details.label
                    };
                }
            }
            return '';
        }).filter(Boolean)
        : [];
    const houseRules = Array.isArray(property.houseRules) ? property.houseRules : [
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
                                    <span>{getLocationString(property.location)}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500 mb-2">
                                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                    <span className="font-medium text-gray-700">
                                        {property.rating?.average?.toFixed(1) || property.averageRating?.toFixed(1) || 'N/A'}
                                    </span>
                                    <span className="mx-1">•</span>
                                    <span>{property.rating?.count || property.reviews || 0} reviews</span>
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

                        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6">Amenities</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                                {amenities.map((amenity, index) => {
                                    // Handle different amenity types
                                    if (typeof amenity === 'string') {
                                        const details = getAmenityDetails(amenity);
                                        const Icon = details.icon;
                                        return (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 p-2 sm:p-3 border border-[#E2F1E8] rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#064749] flex-shrink-0" />
                                                <span className="text-xs sm:text-sm font-medium truncate">
                                                    {details.label}
                                                </span>
                                            </div>
                                        );
                                    } else if ('label' in amenity && 'icon' in amenity) {
                                        // Handle Amenity type
                                        const Icon = amenity.icon;
                                        return (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 p-2 sm:p-3 border border-[#E2F1E8] rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#064749] flex-shrink-0" />
                                                <span className="text-xs sm:text-sm font-medium truncate">
                                                    {amenity.label}
                                                </span>
                                            </div>
                                        );
                                    } else if (amenity && typeof amenity === 'object' && 'name' in amenity) {
                                        // Handle object with name property
                                        const amenityObj = amenity as { name: string; available?: boolean };
                                        const details = getAmenityDetails(amenityObj.name);
                                        const Icon = details.icon;
                                        const isAvailable = 'available' in amenityObj ? amenityObj.available : true;

                                        return (
                                            <div
                                                key={index}
                                                className={`flex items-center gap-2 p-2 sm:p-3 border ${isAvailable ? 'border-[#E2F1E8]' : 'border-gray-200 opacity-50'} rounded-lg hover:bg-gray-50 transition-colors`}
                                            >
                                                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#064749] flex-shrink-0" />
                                                <span className="text-xs sm:text-sm font-medium truncate">
                                                    {details.label}
                                                    {!isAvailable && ' (Not Available)'}
                                                </span>
                                            </div>
                                        );
                                    }

                                    return null;
                                })}
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
                {relatedProperties.length > 0 ? (
                    <div className="mt-12 mb-8">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Similar Properties Nearby</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {relatedProperties.map((property) => {
                                    const imageUrl = (property.images?.[0] || home) as string;
                                    const propertyTitle = property?.title || 'Property';
                                    const location = getLocationString(property.location);

                                    return (
                                        <div
                                            key={getPropertyId(property)}
                                            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                                        >
                                            <div className="relative aspect-video">
                                                <img
                                                    src={imageUrl}
                                                    alt={propertyTitle}
                                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = home;
                                                    }}
                                                />
                                                {property.isFeatured && (
                                                    <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                                                        Featured
                                                    </div>
                                                )}
                                            </div>

                                            <div className="p-4 flex-1 flex flex-col">
                                                <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-1">
                                                    {propertyTitle}
                                                </h3>
                                                <div className="flex items-center text-sm text-gray-600 mb-3">
                                                    <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                                                    <span className="line-clamp-1">{location}</span>
                                                </div>

                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center bg-blue-50 px-2 py-1 rounded-full">
                                                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                                                        <span className="text-sm font-medium text-blue-700">
                                                            {property.rating?.average?.toFixed(1) || property.averageRating?.toFixed(1) || 'N/A'}
                                                        </span>
                                                        <span className="text-xs text-blue-600 ml-1">
                                                            ({property.rating?.count || property.reviews || 0})
                                                        </span>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-lg font-bold text-gray-900">
                                                            ₹{(property.price || property.rent)?.toLocaleString() || 'N/A'}
                                                        </span>
                                                        <span className="text-sm text-gray-500">/month</span>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-gray-100">
                                                    <div className="flex flex-col items-center text-center">
                                                        <Bed className="w-5 h-5 text-gray-500 mb-1" />
                                                        <span className="text-xs text-gray-600">
                                                            {property.bedrooms || 'N/A'} Beds
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col items-center text-center">
                                                        <Bath className="w-5 h-5 text-gray-500 mb-1" />
                                                        <span className="text-xs text-gray-600">
                                                            {property.bathrooms || 'N/A'} Baths
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col items-center text-center">
                                                        <Ruler className="w-5 h-5 text-gray-500 mb-1" />
                                                        <span className="text-xs text-gray-600">
                                                            {property.area ? `${property.area} sq.ft` : 'N/A'}
                                                        </span>
                                                    </div>
                                                </div>

                                                <Button
                                                    onClick={() => handleViewDetails(getPropertyId(property))}
                                                    className="mt-4 w-full bg-[#064749] hover:bg-[#053a3c] text-white py-2 px-4 rounded-md transition-colors duration-200"
                                                >
                                                    View Details
                                                </Button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="mt-12 mb-8 text-center">
                        <p className="text-gray-500">No similar properties found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PropertyDetails;
