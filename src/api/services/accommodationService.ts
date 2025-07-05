import { apiService } from '../apiService';

export interface Rating {
  average: number;
  count: number;
}

export interface Accommodation {
  id: string;
  title: string;
  location: string;
  type: string;
  city: string;
  gender: string;
  bulkAccommodation?: boolean;
  bulkAccommodationType?: string[];
  sharingType?: string[];
  images: string[];
  amenities: string[];
  bedrooms: number;
  bathrooms: number;
  rules: string[];
  rating: {
    average: number;
    count: number;
  };
  reviews: number;
  isAvailable: boolean;
  price: number;
  isFavorite: boolean;
  nearbyPlaces: string[];
  visitBookings: any[];
  scheduleVisits: any[];
  area: number;
  owner: string;
  views: number;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  micrositeLink: string
}

export const accommodationService = {
  getAccommodations: async (): Promise<Accommodation[]> => {
    try {
      const response = await apiService.get<{ data: any[] }>('/home/bulk-accommodation');
      return response.data.data.map((item: any) => ({
        id: item._id,
        title: item.title,
        location: item.location?.address || 'N/A',
        type: item.type || '',
        bulkAccommodation: item.bulkAccommodation || false,
        bulkAccommodationType: item.bulkAccommodationType || [],
        sharingType: item.sharingType || [],
        city: item.location?.city || '',
        gender: item.gender || '',
        images: item.images || [],
        amenities: item.amenities || [],
        bedrooms: item.bedrooms || 0,
        bathrooms: item.bathrooms || 0,
        rules: item.rules || [],
        rating: {
          average: item.rating?.average || 0,
          count: item.rating?.count || 0,
        },
        reviews: item.reviewCount || 0,
        isAvailable: item.isAvailable || false,
        price: item.price || 0,
        isFavorite: item.isFavorite || false,
        nearbyPlaces: item.nearbyPlaces || [],
        visitBookings: item.visitBookings || [],
        scheduleVisits: item.scheduleVisits || [],
        area: item.area || 0,
        owner: item.owner || '',
        views: item.views || 0,
        isFeatured: item.isFeatured || false,
        createdAt: item.createdAt || '',
        updatedAt: item.updatedAt || '',
        __v: item.__v || 0,
        micrositeLink: item.microSiteLink || "",
        description: item.description || 'No description available',
      }));
    } catch (error) {
      console.error('Error fetching accommodations:', error);
      return [];
    }
  }
};
