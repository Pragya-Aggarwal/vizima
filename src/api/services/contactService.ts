import axios from 'axios';

export interface ContactMessageParams {
  fullName: string;
  email: string;
  mobileNumber: string;
  message: string;
}

export const contactService = {
  async sendMessage(params: ContactMessageParams): Promise<void> {
    try {
      const response = await axios.post('https://vizima-backend.onrender.com/api/contact/message', params);
      return response.data;
    } catch (error) {
      console.error('Error sending contact message:', error);
      throw error;
    }
  },
};
