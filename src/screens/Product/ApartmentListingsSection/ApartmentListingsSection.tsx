import React, { useEffect, useState, useMemo } from "react";
import { Button } from "../../../components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { accommodationService, Accommodation, Rating } from "../../../api/services/accommodationService";
import { Star, MapPin, Wifi, BedDouble, Bath, Heart, Home, Users, UtensilsCrossed } from "lucide-react";
import { Card } from "../../../components/ui/card";

// Dummy data to show when no accommodations are available
const DUMMY_ACCOMMODATIONS: Accommodation[] = [

{
  id: "dummy-2",
  location: "123 Elm Street, Queens, NY 11373",
  rating: {
    average: 0,
    count: 0
  },
  reviews: 0,
  tags: ["student", "affordable", "queens"],
  title: "Affordable Hostel for Students in Queens",
  description: "Budget accommodation for students with all basic amenities",
  type: "hostel",
  gender: "female",
  bulkAccommodation: true,
  bulkAccommodationType: [
      "students"
  ],
  sharingType: [
      "triple"
  ],
  price: "8000",
  amenities: [
      "wifi",
      "furnished",
      "laundry"
  ],
  images: [
      "https://res.cloudinary.com/da4ucrpxo/image/upload/v1750841978/ptzrg6ushzsujep1dat5_vzntdc.jpg",
      "https://res.cloudinary.com/da4ucrpxo/image/upload/v1750841978/ptzrg6ushzsujep1dat5_vzntdc.jpg"
  ],
  bedrooms: 6,
  bathrooms: 3,
  area: 1800,
  isAvailable: true,
  isFeatured: false,
  owner: "6857de29ab367925f5fcdc4d",
  views: 0,
  rules: [
      "No parties",
      "No loud music"
  ],
    nearbyPlaces: [],
  visitBookings: [],
  scheduleVisits: [],
  createdAt: "2025-06-25T19:31:31.698Z",
  updatedAt: "2025-06-25T19:31:31.698Z",
  __v: 0,
}
]

interface ApartmentListingsSectionProps {
  accommodations?: Accommodation[];
  loading?: boolean;
  error?: string | null;
  onViewDetails?: (id: string) => void;
}

interface AccommodationCardProps {
  apartment: Accommodation;
  onViewDetails: (id: string) => void;
}

const AccommodationCard = ({ apartment, onViewDetails }: AccommodationCardProps) => {
  const navigate = useNavigate();
  const handleClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    // onViewDetails(apartment.id);
    navigate(`/property-details/${id}`);
  };
console.log(apartment);
  return (

    <section className="py-3 sm:py-6 bg-gray-50">
            <div className="max-w-7xl mx-auto px-2 sm:px-4">
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                        <Card       
                            key={apartment.id}
                            className="bg-white overflow-hidden rounded-2xl border-none shadow-sm hover:shadow-md transition-all duration-300 group relative"
                        >
                            {/* Clickable overlay for the entire card */}
                            <div 
                                className="absolute inset-0 z-10 cursor-pointer"
                                onClick={(e) => handleClick(e, apartment.id)}
                                aria-label={`View details for ${apartment.title}`}
                            />
                            
                            <div className="flex flex-col lg:flex-row">
                                {/* Image Section */}
                                <div className="relative w-full lg:w-[300px] h-[140px] sm:h-[160px] lg:h-[180px] overflow-hidden group">
                                    <img
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        alt={`${apartment.title} property`}
                                        src={apartment.images[0]}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                    {/* Tags Overlay */}
                                    <div className="absolute top-2 left-2 flex items-center gap-2 z-20">
                                        {apartment.isNew && (
                                            <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-semibold rounded-full">
                                                New
                                            </span>
                                        )}
                                        <span className="px-2 py-0.5 bg-blue-500 text-white text-xs font-semibold rounded-full">
                                            Featured
                                        </span>
                                    </div>

                                    {/* Wishlist Button - Positioned above the clickable overlay */}
                                    <button 
                                        className="absolute top-2 right-2 p-1.5 bg-green rounded-full hover:bg-white transition-colors z-20"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // Add wishlist functionality here
                                        }}
                                        aria-label="Add to wishlist"
                                    >
                                        <Heart className="w-4 h-4 text-white" />
                                    </button>
                                </div>

                                {/* Content Section */}
                                <div className="flex-1 p-3 sm:p-4">
                                    <div className="flex flex-col h-full">
                                        {/* Header */}
                                        <div className="mb-3">
                                            <div className="flex items-center gap-2 text-gray-500 mb-1">
                                                <MapPin className="w-4 h-4 text-green-600" />
                                                <span className="text-xs font-medium">{apartment.location}</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                                                {apartment.title}
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center gap-1 px-2 py-0.5 bg-yellow-50 rounded-lg">
                                                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                                    <span className="text-xs font-semibold text-gray-900">
                                                        {typeof apartment.rating === 'object' 
                                                          ? (apartment.rating as Rating).average?.toFixed(1) 
                                                          : (apartment.rating || 0).toFixed(1)}
                                                    </span>
                                                </div>
                                                <span className="text-xs text-gray-500">
                                                    ({typeof apartment.rating === 'object' 
                                                      ? (apartment.rating as Rating).count 
                                                      : apartment.reviews} reviews)
                                                </span>
                                            </div>
                                        </div>

                                        {/* Amenities Grid */}
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                                            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                                                <Users className="w-4 h-4 text-gray-600" />
                                                <div>
                                                    <p className="text-xs font-medium text-gray-900">{apartment.bedrooms}</p>
                                                    <p className="text-[10px] text-gray-500">{apartment.sharingType} Sharing</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                                                <Bath className="w-4 h-4 text-gray-600" />
                                                <div>
                                                    <p className="text-xs font-medium text-gray-900">{apartment.bathrooms}</p>
                                                    <p className="text-[10px] text-gray-500">Attached</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                                                <Wifi className="w-4 h-4 text-gray-600" />
                                                <div>
                                                    <p className="text-xs font-medium text-gray-900">{apartment.amenities?.includes("wifi") ? "Yes" : "No"}</p>
                                                    <p className="text-[10px] text-gray-500">High Speed</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                                                <UtensilsCrossed className="w-4 h-4 text-gray-600" />
                                                <div>
                                                    <p className="text-xs font-medium text-gray-900">Food</p>
                                                    <p className="text-[10px] text-gray-500">3 Times</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                                            <div>
                                                <p className="text-xs text-gray-500">Starting from</p>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-xl font-bold text-gray-900">₹{apartment.price}</span>
                                                    <span className="text-sm text-gray-600">/month</span>
                                                </div>
                                            </div>
                                            <Button
                                                onClick={(e) => handleClick(e, apartment.id)}
                                                className="bg-green hover:bg-green text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap"
                                            >
                                                View Details
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                   
                </div>

                
            </div>
        </section>
  );
};

// Move the component logic to a custom hook to manage state
const useAccommodations = (initialAccommodations?: Accommodation[]) => {
  const [loading, setLoading] = useState(!initialAccommodations?.length);
  const [accommodations, setAccommodations] = useState<Accommodation[]>(initialAccommodations || []);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (initialAccommodations?.length) return;
      
      try {
        setLoading(true);
        const data = await accommodationService.getAccommodations();
        setAccommodations(data);
        console.log(data,"data");
      } catch (err) {
        console.error('Failed to fetch accommodations:', err);
        setError('Failed to load accommodations. Showing sample listings.');
        setAccommodations(DUMMY_ACCOMMODATIONS);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [initialAccommodations]);

  return { loading, accommodations, error, setAccommodations };
};

export const ApartmentListingsSection = ({ 
  accommodations: propAccommodations, 
  onViewDetails 
}: ApartmentListingsSectionProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Use the custom hook to manage accommodations state
  const { loading, accommodations, error } = useAccommodations(propAccommodations);
  
  // Default onViewDetails handler if not provided
  const handleViewDetails = useMemo(() => 
    onViewDetails || ((id: string) => {
      navigate(`/property-details/${id}`);
    }), 
    [navigate, onViewDetails]
  );

  // Memoize the filtered accommodations
  const filteredAccommodations = useMemo(() => {
    try {
      const type = searchParams.get('type')?.toLowerCase() || '';
      if (!type) return accommodations;
      
      const searchTerm = type.replace(/-/g, ' ');
      
      return accommodations.filter(acc => {
        const nameMatch = acc.title?.toLowerCase().includes(searchTerm) || false;
        const tagMatch = (acc.tags || []).some(tag => 
          tag?.toLowerCase().includes(searchTerm)
        );
        const locationMatch = acc.location?.toLowerCase().includes(searchTerm) || false;
        
        return nameMatch || tagMatch || locationMatch;
      });
    } catch (error) {
      console.error('Error filtering accommodations:', error);
      return accommodations;
    }
  }, [accommodations, searchParams]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }
  
  // Determine which accommodations to display
  const displayAccommodations = filteredAccommodations.length > 0 
    ? filteredAccommodations 
    : accommodations.length > 0 
      ? accommodations 
      : DUMMY_ACCOMMODATIONS;
      
  // Check if we should show the "no results" message
  const showNoResultsMessage = searchParams.get('type') && filteredAccommodations.length === 0;
  
  // Check if we're showing dummy data
  const showDummyMessage = !searchParams.get('type') && 
    accommodations.length > 0 && 
    accommodations[0]?.id?.startsWith('dummy-');

  if (error && accommodations.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500 mb-4">Error: {error}</p>
        <div className="mb-6">
          <Home className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Showing Sample Listings</h3>
          <p className="text-gray-500 mb-6">We're having trouble loading the latest properties. Here are some sample listings.</p>
        </div>
        <div >
          {DUMMY_ACCOMMODATIONS.map((apartment) => (
            <AccommodationCard 
              key={apartment.id}
              apartment={apartment}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
        <Button 
          onClick={() => window.location.reload()}
          className="mt-8 bg-green-600 hover:bg-green-700"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <section className="py-6 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* No results message when searching */}
        {showNoResultsMessage && (
          <div className="text-center mb-8 p-8 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Home className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-6">We couldn't find any properties matching your search criteria.</p>
            <Button 
              variant="outline"
              onClick={() => {
                // Clear the search and show all properties
                navigate('/product');
              }}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Clear search and show all
            </Button>
          </div>
        )}

        {/* Dummy data message when no properties are available */}
        {showDummyMessage && (
          <div className="text-center mb-8 p-8 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Home className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Welcome to Vizima</h3>
            <p className="text-gray-600 mb-6">Here are some featured properties you might be interested in.</p>
          </div>
        )}

        {/* Search results count */}
        {searchParams.get('type') && filteredAccommodations.length > 0 && (
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredAccommodations.length} {filteredAccommodations.length === 1 ? 'result' : 'results'} for "{searchParams.get('type')?.replace(/-/g, ' ')}"
            </p>
          </div>
        )}

        {/* Accommodations grid */}
        <div >
          {displayAccommodations.map((apartment) => (
            <AccommodationCard 
              key={apartment.id}
              apartment={apartment}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
        </div>
    </section>
  );
};
