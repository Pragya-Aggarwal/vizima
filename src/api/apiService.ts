import { httpClient, ApiResponse } from './httpClient';

// Example API service functions
export const apiService = {
  // Example GET request
  get: async <T>(url: string, config = {}): Promise<ApiResponse<T>> => {
    return httpClient.get<T>(url, config);
  },

  // Example POST request
  post: async <T>(
    url: string,
    data?: any,
    config = {}
  ): Promise<ApiResponse<T>> => {
    return httpClient.post<T>(url, data, config);
  },

  // Example PUT request
  put: async <T>(
    url: string,
    data?: any,
    config = {}
  ): Promise<ApiResponse<T>> => {
    return httpClient.put<T>(url, data, config);
  },

  // Example DELETE request
  delete: async <T>(url: string, config = {}): Promise<ApiResponse<T>> => {
    return httpClient.delete<T>(url, config);
  },

  // Example PATCH request
  patch: async <T>(
    url: string,
    data?: any,
    config = {}
  ): Promise<ApiResponse<T>> => {
    return httpClient.patch<T>(url, data, config);
  },
};

export default apiService;
