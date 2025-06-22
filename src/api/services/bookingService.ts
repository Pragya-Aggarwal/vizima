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
    return apiService.post<{ booking: Booking }>('/bookings', bookingData);
  },

  // Get booking by ID
  getBooking: async (bookingId: string) => {
    return apiService.get<{ booking: Booking }>(`/bookings/${bookingId}`);
  },

  // Update booking
  updateBooking: async (bookingId: string, updates: Partial<Booking>) => {
    return apiService.put<{ booking: Booking }>(`/bookings/${bookingId}`, updates);
  },

  // Cancel booking
  cancelBooking: async (bookingId: string) => {
    return apiService.patch<{ booking: Booking }>(`/bookings/${bookingId}/cancel`, {});
  },

  // Get user's bookings
  getUserBookings: async (userId: string) => {
    return apiService.get<{ bookings: Booking[] }>(`/users/${userId}/bookings`);
  },
};

export default bookingService;
