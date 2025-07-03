import { apiService } from '../apiService';

export interface ContactMessageParams {
  fullName: string;
  email: string;
  mobileNumber: string;
  message: string;
}

export const contactService = {
  async sendMessage(params: ContactMessageParams): Promise<any> {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await apiService.post('/contact/message', params, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      return response.data;
    } catch (error) {
      console.error('Error sending contact message:', error);
      throw error;
    }
  },
};
