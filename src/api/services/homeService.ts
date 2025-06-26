import { apiService } from '../apiService';

export interface HomeVisitBookingParams {
  date: string;
  timeSlot: string;
  mode: string;
  description?: string;
  name: string;
  phone: string;
}

export const homeService = {
  bookVisit: async (data: HomeVisitBookingParams) => {
    try {
      const response = await apiService.post('/visit-bookings', data);
      return response.data;
    } catch (error) {
      console.error('Error booking home visit:', error);
      throw error;
    }
  }
};

export default homeService;
