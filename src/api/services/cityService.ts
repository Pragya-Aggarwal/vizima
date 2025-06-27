import { apiService } from '../apiService';

export interface City {
  id: string;
  name: string;
  imageUrl?: string;
  // Add other city properties from the API response as needed
}

export const cityService = {
  /**
   * Fetches the list of cities from the API
   * @returns Promise with the list of cities
   */
  getCities: async (): Promise<City[]> => {
    try {
      const response = await apiService.get<{ data: City[] }>('/cities');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching cities:', error);
      throw error;
    }
  },

  /**
   * Transforms API city data to include default images if needed
   * @param cities Raw cities from API
   * @returns Transformed cities with default images
   */
  transformCities: (cities: City[]): City[] => {
    const defaultImages = [
      'https://c.animaapp.com/mbhqlborYGJdod/img/unsplash-kzogdvyb-hm.svg',
      'https://c.animaapp.com/mbhqlborYGJdod/img/unsplash-trpi4zxpaqu.svg',
      'https://c.animaapp.com/mbhqlborYGJdod/img/unsplash--7aftbn2jo4.svg',
      'https://c.animaapp.com/mbhqlborYGJdod/img/unsplash-u3gtiojlmpg.svg',
      'https://c.animaapp.com/mbhqlborYGJdod/img/unsplash-19szvauj7ka.svg',
      'https://c.animaapp.com/mbhqlborYGJdod/img/chennai-placeholder.svg',
      'https://c.animaapp.com/mbhqlborYGJdod/img/kolkata-placeholder.svg',
      'https://c.animaapp.com/mbhqlborYGJdod/img/ahmedabad-placeholder.svg',
      'https://c.animaapp.com/mbhqlborYGJdod/img/jaipur-placeholder.svg',
      'https://c.animaapp.com/mbhqlborYGJdod/img/lucknow-placeholder.svg',
    ];

    return cities.map((city, index) => ({
      ...city,
      imageUrl: city.imageUrl || defaultImages[index % defaultImages.length],
    }));
  },
};

export default cityService;
