import { apiService } from '../apiService';

// Define types for our booking data
export interface Booking {
  id?: string;
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  guestName: string;
  guestEmail: string;
  status?: 'pending' | 'confirmed' | 'cancelled';
}

// Example API service functions for bookings
export const bookingService = {
  // Create a new booking
  createBooking: async (bookingData: Omit<Booking, 'id' | 'status'>) => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    return apiService.post<{ booking: Booking }>('/bookings', bookingData, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    });
  },

  // Get booking by ID
  getBooking: async (bookingId: string) => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    return apiService.get<{ booking: Booking }>(`/bookings/${bookingId}`, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    });
  },

  // Update booking
  updateBooking: async (bookingId: string, updates: Partial<Booking>) => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    return apiService.put<{ booking: Booking }>(`/bookings/${bookingId}`, updates, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    });
  },

  // Cancel booking
  cancelBooking: async (bookingId: string) => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    return apiService.patch<{ booking: Booking }>(`/bookings/${bookingId}/cancel`, {}, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    });
  },

  // Get user's bookings
  getUserBookings: async (userId: string) => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    return apiService.get<{ bookings: Booking[] }>(`/users/${userId}/bookings`, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    });
  },
};

export default bookingService;
