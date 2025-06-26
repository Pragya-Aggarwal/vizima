import { apiService } from '../apiService';

export interface HomeVisitBookingParams {
  date: string;
  timeSlot: string;
  mode: string;
  description?: string;
  propertyId: string;
}

export const homeService = {
  bookVisit: async (data: HomeVisitBookingParams) => {
    try {
      const response = await apiService.post('/home/visit-booking', data);
      return response.data;
    } catch (error) {
      console.error('Error booking home visit:', error);
      throw error;
    }
  }
};

export default homeService;
