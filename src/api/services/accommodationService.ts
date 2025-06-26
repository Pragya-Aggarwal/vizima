import axios from 'axios';

export interface Rating {
  average: number;
  count: number;
}

export interface Accommodation {
  id: string;
  title: string;
  location: string;
  type:string;
  bulkAccommodation?:boolean;
  bulkAccommodationType?:string[];
  sharingType?:string[];
  city?: string;
  gender?: string;
  images: string[];
  amenities: string[];
  bedrooms: number;
  bathrooms: number;
  rules: string[];
  tags: string[];
  price: string;
  description: string;
  isAvailable: boolean;
  rating: number | Rating;
  reviews: number;
  isNew?: boolean;
  nearbyPlaces: string[],
  visitBookings: string[],
  scheduleVisits: string[],
  area: number,
    owner:string,
    views:number,
    isFeatured:boolean, 
    createdAt:string,
    updatedAt:string,
    __v:number
}

export const accommodationService = {
  getAccommodations: async (): Promise<Accommodation[]> => {
    try {
      const response = await axios.get('https://vizima-backend.onrender.com/api/home/bulk-accommodation');
      return response.data.data.map((item: any) => ({
        id: item._id,
        title: item.title,
        location: item.location?.address || 'N/A',
        type:item.type,
        bulkAccommodation:item.bulkAccommodation,
        bulkAccommodationType:item.bulkAccommodationType,
        sharingType:item.sharingType,
        city:item.city,
        gender:item.gender,
        images:item.images,
        amenities:item.amenities,
        bedrooms:item.bedrooms,
        bathrooms:item.bathrooms,
        rules:item.rules,
        tags: item.rules || [],
        rating: item.rating?.average || 0,
        reviews: item.reviewCount || 0,
        isAvailable: item.isAvailable || false,
        price: item.price,
        description: item.description || 'No description available',
        area: item.area,
        owner:item.owner,
        views:item.views,
        isFeatured:item.isFeatured,
        createdAt:item.createdAt,
        updatedAt:item.updatedAt,
        __v:item.__v,
      }));
    } catch (error) {
      console.error('Error fetching accommodations:', error);
      return [];
    }
  }
};
