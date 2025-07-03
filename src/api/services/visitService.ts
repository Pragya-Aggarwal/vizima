import { apiService } from '../apiService';

export interface ScheduleVisitParams {
  fullName: string;
  phoneNumber: string;
  email: string;
  mode: string;
  gender: string;
  sharing: string;
  propertyId: string;
}

export const visitService = {
  scheduleVisit: async (data: ScheduleVisitParams) => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await apiService.post('/schedule-visits', data, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      return response.data;
    } catch (error) {
      console.error('Error scheduling visit:', error);
      throw error;
    }
  }
};

export default visitService;
