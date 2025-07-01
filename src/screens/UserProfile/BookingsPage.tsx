import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Loader2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { getMyBookings, type Booking } from '../../services/bookingService';
import { format } from 'date-fns';

const statusMap = {
  CONFIRMED: { label: 'Confirmed', className: 'bg-green text-green' },
  PENDING: { label: 'Pending', className: 'bg-yellow text-yellow' },
  CANCELLED: { label: 'Cancelled', className: 'bg-red text-red' },
  COMPLETED: { label: 'Completed', className: 'bg-blue text-blue' },
  DEFAULT: { label: 'Unknown', className: 'bg-gray text-gray' },
} as const;

export const BookingsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        const response = await getMyBookings();
        setBookings(response.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
        setError('Failed to load bookings. Please try again later.');
        setBookings([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [activeTab]);

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  const getStatusBadge = (status: Booking['status']) => {
    return statusMap[status] || statusMap.DEFAULT;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm fixed top-14 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="mt-4 flex border-b">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'upcoming'
                  ? 'border-b-2 border-green text-green'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'past'
                  ? 'border-b-2 border-green  text-green'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Past
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 pt-[160px] pb-2 lg:px-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-green" />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-4"
              variant="outline"
            >
              Retry
            </Button>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No {activeTab} bookings found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="md:flex">
                  <div className="md:flex-shrink-0 md:w-48 bg-gray-100 flex items-center justify-center">
                    {booking.propertyImage ? (
                      <img 
                        className="h-48 w-full object-cover md:h-full md:w-48" 
                        src={booking.propertyImage} 
                        alt={booking.propertyName} 
                      />
                    ) : (
                      <div className="text-gray-400">No image</div>
                    )}
                  </div>
                  <div className="p-6 flex-1">
                    <div className="flex items-start justify-between">
                      <h2 className="text-xl font-semibold text-gray-900">{booking.propertyName}</h2>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(booking.status).className}`}>
                        {getStatusBadge(booking.status).label}
                      </span>
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-700">
                          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="font-medium">Check-in:</span>
                          <span className="ml-2">{formatDate(booking.checkInDate)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="font-medium">Check-out:</span>
                          <span className="ml-2">{formatDate(booking.checkOutDate)}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-gray-700">
                          <span className="font-medium">Booking ID:</span>
                          <span className="ml-2 font-mono">{booking.id}</span>
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {booking.currency} {booking.totalAmount.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    {booking.address && (
                      <div className="mt-3 flex items-start text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0 mt-0.5" />
                        <span>{booking.address}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/bookings/${booking.id}`)}
                  >
                    View Details
                  </Button>
                  {booking.status === 'CONFIRMED' && (
                    <Button variant="default" size="sm">
                      Contact Support
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
    </div>
  );
};
