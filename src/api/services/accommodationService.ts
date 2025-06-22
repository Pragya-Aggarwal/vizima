import axios from 'axios';

export interface Rating {
  average: number;
  count: number;
}

export interface Accommodation {
  id: string;
  name: string;
  location: string;
  image: string;
  amenities: {
    bedroom: number;
    bath: number;
    wifi: boolean;
  };
  tags: string[];
  rent: string;
  rating: number | Rating;
  reviews: number;
  isNew?: boolean;
}

export const accommodationService = {
  getAccommodations: async (): Promise<Accommodation[]> => {
    try {
      const response = await axios.get('https://vizima-backend.onrender.com/api/home/bulk-accommodation');
      return response.data.data.map((item: any) => ({
        id: item._id,
        name: item.title,
        location: item.address?.city || 'N/A',
        image: item.images?.[0] || '',
        amenities: {
          bedroom: item?.bedrooms || 1,
          bath: item?.bathrooms || 1,
          wifi: item?.amenities?.includes('wifi') || false,
        },
        tags: item.rules || [],
        rent: item.pricing?.monthlyRent?.toString() || '0',
        rating: item.rating?.average || 0,
        reviews: item.reviewCount || 0,
        isAvailable: item.isAvailable || false
      }));
    } catch (error) {
      console.error('Error fetching accommodations:', error);
      return [];
    }
  }
};
