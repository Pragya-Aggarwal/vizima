import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

// Define types for the API response
interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
}

// Create a custom error class for API errors
class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

// Get base URL from environment variables (Vite uses import.meta.env)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://vizima-backend.onrender.com/api/";

// Create axios instance with default config
const httpClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
httpClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // You can add auth token here if needed
    // const token = await getAuthToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling responses and errors
httpClient.interceptors.response.use(
  (response: AxiosResponse) => response,  // Pass through the response
  (error: AxiosError) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const errorMessage = error.response.data?.message || 'An error occurred';
      return Promise.reject(
        new ApiError(
          errorMessage,
          error.response.status,
          error.response.data
        )
      );
    } else if (error.request) {
      // The request was made but no response was received
      return Promise.reject(
        new ApiError('No response received from server', 0, null)
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject(
        new ApiError(`Error: ${error.message}`, 0, null)
      );
    }
  }
);

// Helper function to convert AxiosResponse to ApiResponse
export function toApiResponse<T>(response: AxiosResponse<T>): ApiResponse<T> {
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    config: response.config,
    request: response.request,
  };
}

export { httpClient, ApiError };
export type { ApiResponse };
