import { apiService } from '../apiService';

export interface Testimonial {
  id: number;
  name: string;
  city: string;
  comment: string;
  rating: number;
  picture: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const testimonialService = {
  /**
   * Fetches testimonials from the API
   * @returns Promise with the list of active testimonials
   */
  getTestimonials: async (): Promise<Testimonial[]> => {
    try {
      const response = await apiService.get<{ data: Testimonial[] }>('/testimonials');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      throw error;
    }
  },
};

export default testimonialService;
