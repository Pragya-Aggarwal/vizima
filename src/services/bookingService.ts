import axios from 'axios';

const API_BASE_URL = 'https://api.vizima.in';

export interface Booking {
  id: string;
  propertyId: string;
  propertyName: string;
  checkInDate: string;
  checkOutDate: string;
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED' | 'COMPLETED';
  totalAmount: number;
  currency: string;
  propertyImage?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const getMyBookings = async ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
} = {}): Promise<PaginatedResponse<Booking>> => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_BASE_URL}/api/bookings/my-bookings`, {
      params: {
        page,
        limit,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};
