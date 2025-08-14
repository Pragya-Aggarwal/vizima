import { useEffect, useState, useMemo } from "react";
import { Button } from "../../../components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { accommodationService, Accommodation, Rating } from "../../../api/services/accommodationService";
import { Star, MapPin, Wifi, Bath, Heart, Home, Users } from "lucide-react";
import { Card } from "../../../components/ui/card";
import { RotateCcw } from "lucide-react";

interface ApartmentListingsSectionProps {
  accommodations?: Accommodation[];
  loading?: boolean;
  error?: string | null;
  onViewDetails?: (id: string) => void;
  onClearSearch?: () => void;
}

interface AccommodationCardProps {
  apartment: Accommodation;
  onViewDetails: (id: string) => void;
}

const AccommodationCard = ({ apartment, onViewDetails }: AccommodationCardProps) => {
  const navigate = useNavigate();
  const handleClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onViewDetails(id);
    navigate(`/property-details/${id}`);
  };
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
                      <MapPin className="w-4 h-4 text-green" />
                      <span className="text-xs font-medium">
                        {typeof apartment.location === 'string' 
                          ? apartment.location 
                          : apartment.location?.address || 'Location not specified'}
                      </span>
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
                            : (apartment.rating || 0)}
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
                        <p className="text-[10px] text-gray-500">
                          {Array.isArray(apartment.sharingType) 
                            ? apartment.sharingType.join(', ') + ' Sharing' 
                            : apartment.sharingType + ' Sharing'}
                        </p>
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

// Custom hook to manage accommodations state
const useAccommodations = (propAccommodations?: Accommodation[]) => {
  // Always maintain state for accommodations
  const [loading, setLoading] = useState(true);
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If accommodations are provided via props, use them directly
    if (Array.isArray(propAccommodations) && propAccommodations.length > 0) {
      setLoading(false);
      setAccommodations(propAccommodations);
      setError(null);
      return;
    }

    // Otherwise, fetch accommodations from the API
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await accommodationService.getAccommodations();
        setAccommodations(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch accommodations:', err);
        setError('Failed to load accommodations. Please try again later.');
        setAccommodations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [propAccommodations]);

  return { loading, accommodations, error, setAccommodations };
};

export const ApartmentListingsSection = ({
  accommodations: propAccommodations,
  loading: propLoading = false,
  error: propError = null,
  onViewDetails,
  onClearSearch
}: ApartmentListingsSectionProps) => {
  const [urlSearchParams] = useSearchParams();
  const cityParam = urlSearchParams.get('city')?.toLowerCase();
  const genderParam = urlSearchParams.get('gender')?.toLowerCase();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Show 5 items per page
  const navigate = useNavigate();

  // Always call the hook, but let it know if we have props
  const { loading: hookLoading, accommodations: hookAccommodations, error: hookError } =
    useAccommodations(propAccommodations);

  // Use props if available, otherwise use hook state
  // const hasPropAccommodations = Array.isArray(propAccommodations) && propAccommodations.length > 0;
  const hasPropAccommodations = Array.isArray(propAccommodations);
  const loading = hasPropAccommodations ? propLoading : hookLoading;
  const error = hasPropAccommodations ? propError : hookError;
  const accommodations = hasPropAccommodations ? propAccommodations : (hookAccommodations || []);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [cityParam, genderParam]);

  // Filter accommodations based on search parameters
  const filteredAccommodations = useMemo(() => {
    if (!cityParam && !genderParam) return accommodations;

    return accommodations.filter(accommodation => {
      const matchesCity = !cityParam ||
        (accommodation.city?.toLowerCase().includes(cityParam));
      const matchesGender = !genderParam ||
        (accommodation.gender?.toLowerCase() === genderParam);

      return matchesCity && matchesGender;
    });
  }, [accommodations, cityParam, genderParam]);

  // Show no results message when filters don't match any accommodations
  const showNoResults =
    Array.isArray(propAccommodations) && propAccommodations.length === 0 && !loading;

  // Show no results message when filters don't match any accommodations
  if (showNoResults) {
    return (
      <div className="py-12">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-700">No properties found</h3>
              <p className="text-gray-500 mt-1">
                No accommodations found matching your search criteria. Please try a different search or click the button below to view all properties.
              </p>
            </div>
            <Button
              onClick={() => {
                navigate('/property-listing');
                onClearSearch?.();
              }}
              variant="outline"
              className="mx-auto flex items-center gap-2 border-green text-green hover:bg-green hover:text-white rounded-full px-6 py-2 transition-all duration-200 whitespace-nowrap"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="text-sm font-medium">Show All Properties</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const totalPages = Math.ceil(filteredAccommodations.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Check if we're showing dummy data
  const showDummyMessage = !cityParam && !genderParam &&
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

        <Button
          onClick={() => window.location.reload()}
          className="mt-8 bg-green hover:bg-green"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <section className="py-6 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Results Header */}
        {(cityParam || genderParam) && filteredAccommodations.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="text-gray-700 font-medium">
              Found {filteredAccommodations.length} propert{filteredAccommodations.length === 1 ? 'y' : 'ies'}
              {cityParam ? ` in ${cityParam.charAt(0).toUpperCase() + cityParam.slice(1)}` : ''}
            </div>
            <Button
              onClick={() => navigate('/property-listing')}
              variant="outline"
              className="flex items-center gap-2 border-green text-green hover:bg-green hover:text-white rounded-full px-4 py-2 text-sm whitespace-nowrap"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Show All Results</span>
            </Button>
          </div>
        )}

        {/* No results message when searching */}
        {showNoResults && (
          <div className="text-center mb-8 p-8 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Home className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any properties matching your search. Try adjusting your filters or search terms, or click below to view all available properties.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                // Clear the search and show all properties
                navigate('/property-listing');
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

        {/* Accommodations grid */}
        <div className="space-y-6">
          {filteredAccommodations
            .slice(startIndex, startIndex + itemsPerPage)
            .map((apartment) => (
              <AccommodationCard
                key={apartment.id}
                apartment={apartment}
                onViewDetails={onViewDetails || ((id: string) => navigate(`/property-details/${id}`))}
              />
            ))}
        </div>

        {/* Pagination - Only show if more than 5 items */}
        {filteredAccommodations.length > itemsPerPage && totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1"
            >
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 ${currentPage === page ? 'bg-green text-white' : ''}`}
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
