import { apiService } from '../apiService';

export interface Banner {
  id: string;
  image: string;
  title?: string;
  subtitle?: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export const bannerService = {
  /**
   * Fetches active banners from the API
   * @returns Promise with the list of active banners
   */
  getBanners: async (): Promise<Banner[]> => {
    try {
      const response = await apiService.get<{ data: Banner[] }>('/banners', {
        params: {
          isActive: true,
          $sort: {
            order: 1
          }
        }
      });
      return response?.data?.data || [];
    } catch (error) {
      console.error('Error fetching banners:', error);
      return [];
    }
  },
};

export default bannerService;
