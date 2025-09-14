import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ArrowUpRight, 
  Utensils,
  Star,
  ChevronLeft,
  ChevronRight,
  Bed,
  Shield,
  MessageCircle,
  Check,
  Users,
  Wifi,
  Battery,
  Video,
  Car,
  Sofa,
  Dumbbell,
  Bath,
  Building2,
  BathIcon,
  ShieldIcon,
  WarehouseIcon,
  UtensilsIcon,
  UsersIcon,
  CarIcon,
  WifiIcon
} from 'lucide-react';
import { home } from '../../assets';
import { accommodationService } from '../../api/services/accommodationService';
import { ExtendedAccommodation, transformToExtended, Location, Amenity } from '../../lib/types';
import { toast } from '../../components/ui/use-toast';
import { Button } from '../../components/ui/button';
import SimpleMap2 from '../../components/Map/SimpleMap2';
import { FaTransgender } from 'react-icons/fa';


interface RoomOption {
    type: string;
    rent: string;
    isAvailable: boolean;
    mealsIncluded: boolean;
    acType?: string;
    security?: string;
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
        'pool': { label: 'Pool', icon:  BathIcon},
        'Ac': { label: 'AC', icon: Check },
        'tv': { label: 'TV', icon: Check },
        'Balcony': { label: 'Balcony', icon: WarehouseIcon },
        // 'garden': { label: 'Garden', icon: park },
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
    const [showVideo, setShowVideo] = useState(false);
    const [property, setProperty] = useState<ExtendedAccommodation | null>(null);
    const [relatedProperties, setRelatedProperties] = useState<ExtendedAccommodation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate();

    // Debug log to check property location data
    useEffect(() => {
        if (property?.location) {
            console.log('Property location data:', JSON.stringify(property.location, null, 2));
            if (property.location.coordinates) {
                console.log('Coordinates:', property.location.coordinates);
                console.log('Coordinates type:', typeof property.location.coordinates);
            }
        }
    }, [property]);

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
                    console.log('Property found:', foundProperty);
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
                const allAccommodations = await accommodationService.getAccommodations();

                // More lenient filtering - just exclude the current property
                const similar = allAccommodations
                    .filter(acc => acc.id !== property.id)
                    .slice(0, 4); // Limit to 4 similar properties

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
        if (property) {
            const propertyWithMicroSite = property?.microSiteLink;
            console.log(propertyWithMicroSite);
            if (propertyWithMicroSite) {
                window.location.href = propertyWithMicroSite;
            } 
        } else {
            toast({
                title: "Property Not Found",
                description: "There is an issue with this property",
                variant: "destructive",
            });
        }
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

    const roomOptions: RoomOption[] = [];
    
    if (Array.isArray(property.sharingType)) {
        property.sharingType.forEach(room => {
            if (room && typeof room === 'object' && 'type' in room) {
                // Ensure type is a string
                let roomType = 'Room';
                if (room.type) {
                    if (typeof room.type === 'string') {
                        roomType = `${room.type.charAt(0).toUpperCase()}${room.type.slice(1)} Sharing`;
                    } else if (typeof room.type === 'number') {
                        roomType = `${room.type} Sharing`;
                    }
                }
                
                // Ensure price is properly formatted
                let price = 'Price on request';
                if (room && 'price' in room) {
                    const priceValue = Number(room.price);
                    if (!isNaN(priceValue)) {
                        price = `₹${priceValue.toLocaleString('en-IN')}`;
                    }
                }
                
                // Ensure security is properly formatted
                
                const hasAC = Array.isArray(property.amenities) && 
                    property.amenities.some(a => 
                        (typeof a === 'string' && a === 'ac') || 
                        (typeof a === 'object' && a !== null && 'name' in a && a.name === 'ac')
                    );
                
                roomOptions.push({
                    type: roomType,
                    rent: price,
                    isAvailable: true,
                    mealsIncluded: true,
                    acType: hasAC ? 'AC' : 'Non-AC',
                    security: "0",
                });
            }
        });
    }

    const amenities: (string | Amenity)[] = [];
    if (Array.isArray(property.amenities)) {
        property.amenities.forEach(amenity => {
            if (typeof amenity === 'string') {
                amenities.push(amenity);
            } else if (amenity && typeof amenity === 'object') {
                if ('icon' in amenity && 'label' in amenity) {
                    amenities.push(amenity as Amenity);
                } else if ('name' in amenity) {
                    const details = getAmenityDetails(amenity.name);
                    amenities.push({
                        icon: details.icon,
                        label: details.label
                    });
                }
            }
        });
    }

    const getYoutubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const getEmbedUrl = (url: string) => {
        // If it's already an embed URL, return as is
        if (url.includes('youtube.com/embed/')) {
            return url;
        }
        
        // Extract video ID from watch URL
        const videoId = getYoutubeId(url);
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        }
        
        // Default fallback
        return 'https://www.youtube.com/embed/mxj7BqI2VPk?autoplay=1';
    };

    const VideoModal = () => {
        if (!property?.youtubeLink) return null;
        
        const embedUrl = getEmbedUrl(property.youtubeLink);
        
        return (
            <div 
                className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                onClick={() => setShowVideo(false)}
            >
                <div className="relative w-full max-w-4xl" onClick={e => e.stopPropagation()}>
                    <button 
                        className="absolute -top-12 right-0 text-white hover:text-gray-300 focus:outline-none z-10"
                        onClick={() => setShowVideo(false)}
                        aria-label="Close video"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                    <div className="aspect-w-16 aspect-h-9 w-full">
                        <iframe 
                            className="w-full h-[60vh] rounded-lg"
                            src={embedUrl}
                            title="Property Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
        );
    };

// ... (rest of the code remains the same)
    return (
        <div className="min-h-screen bg-gray-50 mt-16 md:mt-20">
            {showVideo && <VideoModal />}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 md:py-6">
                <div className="p-4 md:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-600">
                                <a 
                                    href="#property-map" 
                                    className="flex items-center gap-2 hover:text-green-700 transition-colors cursor-pointer"
                                >
                                    <MapPin className="w-4 h-4" />
                                    <span>{getLocationString(property.location)}</span>
                                </a>
                            </div>
                            {property.youtubeLink && <div className="flex flex-wrap gap-3 md:gap-5 mt-3">
                                <div 
                                    className="flex items-center gap-2 cursor-pointer group"
                                    onClick={() => setShowVideo(true)}
                                >
                                    <div className="relative w-10 h-10 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-700 transition-colors">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm md:text-base font-medium text-gray-800 group-hover:text-red-600 transition-colors">
                                        Watch Property Video
                                    </span>
                                </div>
                            </div>}
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
                            <div className="grid grid-cols-2 gap-2 w-full md:w-auto md:max-w-[500px] lg:max-w-[500px]">
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
                    <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6 border border-gray-100">
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="text-xl font-bold text-gray-900">Amenities</h2>
                                <span className="text-sm text-gray-500">{amenities.length} amenities</span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                                {amenities.map((amenity, index) => {
                                    // Handle different amenity types
                                    if (typeof amenity === 'string') {
                                        const details = getAmenityDetails(amenity);
                                        const Icon = details.icon;
                                        return (
                                            <div
                                                key={index}
                                            className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                                                true 
                                                    ? 'bg-gray-50 hover:bg-gray-100' 
                                                    : 'bg-gray-50 opacity-60'
                                            }`}
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
                        {roomOptions.length > 0 && (
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
                                            <span className="text-sm bg-gray-100 px-2 py-1 rounded">{room.acType || 'N/A'}</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                                           
                                            <div className="flex items-center gap-1">
                                                <Utensils className="w-4 h-4" />
                                                <span>Meals: {room.mealsIncluded ? "Included" : "Not Included"}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleBookRoom}
                                            disabled={!room.isAvailable}
                                            className={`w-full py-2 px-4 rounded-full text-sm font-medium ${
                                                room.isAvailable 
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
                                            <th className="text-left py-3 px-3 text-sm font-medium">Meals</th>
                                            <th className="text-left py-3 px-3 text-sm font-medium"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {roomOptions.map((room, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="py-4 px-3 font-medium text-sm">{room.type}</td>
                                                <td className="py-4 px-3 text-green font-semibold text-sm">{room.rent}</td>
                                                <td className="py-4 px-3 text-sm">{room.mealsIncluded ? "Yes" : "No"}</td>
                                                <td className="py-4 px-3">
                                                    <button
                                                        onClick={handleBookRoom}
                                                        disabled={!room.isAvailable}
                                                        className={`text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-full whitespace-nowrap ${true
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
                        )}
                    </div>
                    <div className="space-y-6 sm:space-y-0">
                        <div className="bg-gradient-to-br mb-4 sm:mb-4 from-[#064749] to-[#0a6c6f] p-6 rounded-xl shadow-lg text-white overflow-hidden relative">
                            {/* Decorative elements */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16"></div>
                            
                            <div className="relative z-10">
                                <h2 className="text-xl font-bold mb-2">Need help with your booking?</h2>
                                <p className="text-white/80 text-sm mb-6 max-w-[85%]">Our dedicated support team is available 24/7 to assist you with any questions or concerns</p>
                                
                                <div className="space-y-5">
                                    <div className="flex items-start">
                                        <div className="bg-white/10 p-2.5 rounded-lg mr-4 flex-shrink-0">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-white/80 mb-1">Call us anytime</h3>
                                            <a 
                                                href="tel:+919667300983" 
                                                className="text-lg font-semibold hover:text-white transition-colors flex items-center group"
                                            >
                                                {property?.phone || +919667300983}
                                                <ArrowUpRight className="w-4 h-4 ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </a>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start">
                                        <div className="bg-white/10 p-2.5 rounded-lg mr-4 flex-shrink-0">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-white/80 mb-1">Email us</h3>
                                            <a 
                                                href="mailto:Stay@vizima.in" 
                                                className="text-base font-medium hover:text-white transition-colors inline-flex items-center group"
                                            >
                                                Stay@vizima.in
                                                <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </a>
                                        </div>
                                    </div>
                                    
                                    <div className="pt-4 mt-4 border-t border-white/10">
                                        <div className="flex items-center">
                                            <div className="bg-white/10 p-2 rounded-lg mr-3">
                                                <MessageCircle className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-white/70">Prefer to chat?</p>
                                                <a href="#" className="text-sm font-medium hover:underline">Start a live chat</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="bg-gradient-to-r from-[#064749] to-[#0a6c6f] px-6 py-4">
                                <h2 className="text-xl font-bold text-white flex items-center">
                                    <ShieldIcon className="w-5 h-5 mr-2" />
                                    House Rules
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="space-y-3">
                                    {houseRules.map((rule, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <ShieldCheck className="w-5 h-5 text-[#064749] mt-0.5 flex-shrink-0" />
                                            <p className="text-gray-700">
                                                {rule}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 pt-5 border-t border-gray-100">
                                    <p className="text-sm text-gray-500 flex items-center">
                                        <Info className="w-4 h-4 mr-2 text-[#064749]" />
                                        Please respect these rules for a comfortable stay
                                    </p>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
                {/* Map Section */}
                <div id="property-map" className="mt-12 bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Location</h2>
                    {property?.location?.coordinates?.lat && property?.location?.coordinates?.lng ? (
                        <div className="w-full rounded-lg overflow-hidden" style={{ height: '400px' }}>
                            <SimpleMap2 
                                locationGroups={[{
                                    lat: property.location.coordinates.lat,
                                    lng: property.location.coordinates.lng,
                                    count: 1,
                                    number: 1,
                                    properties: [{
                                        title: property.title || 'Property',
                                        city: property.location.city || ''
                                    }]
                                }]}
                                mapCenter={[
                                    property.location.coordinates.lat, 
                                    property.location.coordinates.lng
                                ]}
                            />
                        </div>
                    ) : (
                        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                            Location map not available
                        </div>
                    )}
                </div>

                {/* Similar Properties Section */}
                {relatedProperties.length > 0 ? (
                    <div className="bg-gray-50 mt-12">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-gray-900 mb-3">Similar Properties Nearby</h2>
                                <div className="w-20 h-1 bg-[#064749] mx-auto"></div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {relatedProperties.map((property) => {
                                    const imageUrl = (property.images?.[0] || home) as string;
                                    const propertyTitle = property?.title || 'Property';
                                    const location = getLocationString(property.location);
                                    return (
                                        <div
                                            key={getPropertyId(property)}
                                            className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-2"
                                        >
                                            <div className="relative aspect-video overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                                                {/* <div className="absolute top-4 right-4 z-20">
                                                    <button className="bg-white/90 hover:bg-white rounded-full p-2 shadow-md transition-all hover:scale-110">
                                                        <Heart className="w-4 h-4 text-gray-700" />
                                                    </button>
                                                </div> */}
                                                <img
                                                    src={imageUrl}
                                                    alt={propertyTitle}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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

                                            <div className="p-5 pt-4">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-semibold text-gray-900 text-lg line-clamp-1">{propertyTitle}</h3>
                                                    <div className="flex items-center bg-green-50 text-green-700 text-xs font-medium px-2 py-1 rounded">
                                                        <Star className="w-3.5 h-3.5 mr-1 fill-current" />
                                                        {typeof property.rating === 'number' ? property.rating.toFixed(1) : property.rating?.average?.toFixed(1) || 'New'}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-gray-500 flex items-center mb-3">
                                                    <MapPin className="w-3.5 h-3.5 mr-1.5 text-gray-400 flex-shrink-0" />
                                                    <span className="line-clamp-1">{location}</span>
                                                </p>

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
                                                    
                                                        <FaTransgender className="w-5 h-5 text-gray-500 mb-1" />
                                                        <span className="text-xs text-gray-600">
                                                            {property.gender ? property.gender : 'N/A'}
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
