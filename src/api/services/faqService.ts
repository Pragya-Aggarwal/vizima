import { apiService } from '../apiService';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const faqService = {
  /**
   * Fetches FAQs from the API
   * @returns Promise with the list of FAQs
   */
  getFAQs: async (): Promise<FAQItem[]> => {
    try {
      const response = await apiService.get<{ data: FAQItem[] }>('/faqs');
      return response?.data || [];
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      throw error;
    }
  },
};

export default faqService;
