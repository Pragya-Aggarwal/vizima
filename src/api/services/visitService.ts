import { apiService } from '../apiService';

export interface VisitBookingParams {
  date: string;
  propertyId: string;
  timeSlot: string;
  mode: string;
  description?: string;
}

export const visitService = {
  bookVisit: async (data: VisitBookingParams) => {
    try {
      const response = await apiService.post('/home/visit-booking', data);
      return response.data;
    } catch (error) {
      console.error('Error booking visit:', error);
      throw error;
    }
  }
};

export default visitService;
