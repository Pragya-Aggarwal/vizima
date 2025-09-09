import React from 'react';
import {
    Wifi as WifiIcon,
    WashingMachine,
    Zap,
    Camera,
    Users,
    Car as CarIcon,
    Utensils as UtensilsIcon,
    Shield as ShieldIcon,
    BedDouble,
    Dumbbell,
    Ban,
    BathIcon,
    Refrigerator,
    WarehouseIcon,
    Check,
    Dog,
    Tv,
    UtensilsCrossedIcon,
    Microwave,
    Heater,
    AirVent,
    Trees
} from 'lucide-react';
import { FaParking } from 'react-icons/fa';

export interface RoomOption {
    type: string;
    rent: string;
    security: string;
    availableFrom: string;
    acType: string;
    isAvailable: boolean;
    mealsIncluded: boolean;
}

export interface Amenity {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
}

export interface Location {
    coordinates?: {
        lat: number;
        lng: number;
    };
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
}

export interface ExtendedAccommodation {
    _id?: string;
    id: string;
    title: string;
    description?: string;
    type?: string;
    gender?: string;
    bulkAccommodation?: boolean;
    bulkAccommodationType?: string[];
    sharingType?: string[];
    price: number;
    rent?: number;
    amenities?: string[] | { name: string; available: boolean }[];
    images?: string[];
    image?: string;
    bedrooms?: number;
    bathrooms?: number;
    area?: number;
    isAvailable?: boolean;
    isFeatured?: boolean;
    rating?: {
        average: number;
        count: number;
    };
    location?:{
        coordinates?: {
            lat: number;
            lng: number;
        };
        address?: string;
        city?: string;
        state?: string;
        zipCode?: string;
    };
    owner?: {
        _id: string;
        name: string;
        email: string;
        phone: string;
    } | null;
    views?: number;
    rules?: string[];
    nearbyPlaces?: Array<{
        name: string;
        distance: string;
        type: string;
        _id: string;
        id: string;
    }>;
    visitBookings?: any[];
    scheduleVisits?: any[];
    microSiteLink?: string;
    youtubeVideoId?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
    averageRating?: number;
    houseRules?: string[];
    roomOptions?: RoomOption[];
    contact?: {
        phone: string;
        email: string;
    };
    reviews?: number;
    tags?: string[];
    phone?: string;
}

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
    'pool': { label: 'Pool', icon: BathIcon },
    'ac': { label: 'AC', icon: AirVent },
    'tv': { label: 'TV', icon: Tv },
    'balcony': { label: 'Balcony', icon: WarehouseIcon },
    'garden': { label: 'Garden', icon:Trees  },
    'refrigerator':{label:'Refrigerator',icon:Refrigerator},
    'pets':{label:'Pets',icon:Dog},
    'dishwasher':{label:'Dishwasher',icon:UtensilsCrossedIcon},
    "microwave":{label:'Microwave',icon:Microwave},
    "heating":{label:'Heating',icon:Heater}
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

export const transformToExtended = (acc: any): ExtendedAccommodation => {
    const defaultAmenities: Amenity[] = [
        { icon: WifiIcon, label: "Wi-Fi" },
        { icon: WashingMachine, label: "Laundry" },
        { icon: Zap, label: "Power Backup" },
        { icon: Camera, label: "CCTV" },
        { icon: Users, label: "Housekeeping" },
        { icon: CarIcon, label: "Parking" },
        { icon: UtensilsIcon, label: "Kitchen" },
        { icon: ShieldIcon, label: "Security" },
        
    ];

    let processedAmenities: Amenity[] = defaultAmenities;

    if (Array.isArray(acc.amenities) && acc.amenities.length > 0) {
        if (typeof acc.amenities[0] === 'string') {
            processedAmenities = acc.amenities
                .map((name: string) => {
                    const details = amenityDetailsMap[name.toLowerCase()];
                    if (details) {
                        return { label: details.label, icon: details.icon };
                    }
                    return { label: capitalize(name), icon: Ban };
                })
                .filter((a: Amenity | null): a is Amenity => a !== null);
        } else if (typeof acc.amenities[0] === 'object' && acc.amenities[0] !== null) {
            processedAmenities = acc.amenities.map((amenity: any) => {
                const label = amenity.label || 'Unknown';
                const IconComponent = (typeof amenity.icon === 'function')
                    ? amenity.icon
                    : amenityDetailsMap[String(label).toLowerCase()]?.icon || Ban;

                return { label, icon: IconComponent };
            });
        }
    }

    return {
        ...acc,
        id: acc.id || '',
        name: acc.name || 'Unnamed Property',
        amenities: processedAmenities,
        houseRules: Array.isArray(acc.rules)
            ? acc.rules
            : [
                'No smoking',
                'No pets',
                'No parties or events',
                'Not safe or suitable for children (0-12 years)',
                'Check-in is anytime after 2 PM'
            ]
    };
}; 