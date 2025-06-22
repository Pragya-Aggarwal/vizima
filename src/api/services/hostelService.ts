import { apiService } from '../apiService';

export interface Hostel {
  id: string;
  name: string;
  location: string;
  city: string;
  gender: 'male' | 'female' | 'unisex';
  price: number;
  rating: number;
  image: string;
  amenities: string[];
  distanceFromCollege: string;
}

export interface SearchHostelParams {
  city?: string;
  gender?: string;
  page?: number;
  limit?: number;
}

export const hostelService = {
  searchHostels: async (params: SearchHostelParams) => {
    try {
      const { city, gender, page = 1, limit = 10 } = params;
      const queryParams = new URLSearchParams();
      
      // Add required parameters
      queryParams.append('page', page.toString());
      queryParams.append('limit', limit.toString());
      
      // Add optional parameters only if they exist
      if (city) queryParams.append('search', city);
      if (gender) queryParams.append('gender', gender);
      
      const url = `/home/pg-hostel?${queryParams.toString()}`;
      const response = await apiService.get<{ data: Hostel[]; total: number }>(url);
      return response;
    } catch (error) {
      console.error('Error searching hostels:', error);
      throw error;
    }
  },
};

export default hostelService;
