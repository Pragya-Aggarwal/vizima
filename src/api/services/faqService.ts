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
      const response = await apiService.get<{ data: FAQItem[] } | FAQItem[]>('/faqs');
      // Handle both response.data and direct array responses
      const data = Array.isArray(response) ? response : response?.data?.data;
      // Ensure we return an array even if data is undefined or null
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      // Return empty array instead of throwing to prevent component crash
      return [];
    }
  },
};

export default faqService;
