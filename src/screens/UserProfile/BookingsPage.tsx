import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, User, Home, FileText, Settings } from 'lucide-react';
import { Button } from '../../components/ui/button';

type Booking = {
  id: string;
  propertyName: string;
  date: string;
  time: string;
  address: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  image: string;
};

export const BookingsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const mockBookings: Booking[] = [
    {
      id: '1',
      propertyName: 'Luxury Apartment',
      date: '2023-06-15',
      time: '14:00',
      address: '123 Main St, New York, NY',
      status: 'confirmed',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: '2',
      propertyName: 'Cozy Studio',
      date: '2023-06-20',
      time: '11:00',
      address: '456 Oak Ave, Brooklyn, NY',
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
                  ? 'border-b-2 border-green-500 text-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'past'
                  ? 'border-b-2 border-green-500 text-green-600'
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
        <div className="space-y-4">
          {mockBookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="md:flex">
                <div className="md:flex-shrink-0 md:w-48">
                  <img 
                    className="h-48 w-full object-cover md:h-full md:w-48" 
                    src={booking.image} 
                    alt={booking.propertyName} 
                  />
                </div>
                <div className="p-6 flex-1">
                  <div className="flex items-start justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">{booking.propertyName}</h2>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      {booking.time}
                    </div>
                    <div className="flex items-start text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-gray-400" />
                      <span>{booking.address}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex space-x-3">
                    <Button variant="outline" className="flex-1">
                      View Details
                    </Button>
                    {booking.status === 'confirmed' && (
                      <Button variant="outline" className="flex-1 border-red-500 text-red-600 hover:bg-red-50">
                        Cancel
                      </Button>
                    )}
                    {booking.status === 'pending' && (
                      <Button className="flex-1 bg-green hover:bg-green-700">
                        Pay Now
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {mockBookings.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No {activeTab} bookings</h3>
              <p className="mt-1 text-sm text-gray-500">
                {activeTab === 'upcoming' 
                  ? "You don't have any upcoming property visits scheduled." 
                  : "Your past property visits will appear here."}
              </p>
              <div className="mt-6">
                <Button onClick={() => navigate('/')}>
                  Browse Properties
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      
    </div>
  );
};
