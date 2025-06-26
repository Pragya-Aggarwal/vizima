import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { useNavigate } from "react-router-dom";
import { accommodationService, type Accommodation } from "../../../api/services/accommodationService";

interface PropertyCardProps {
  property: Accommodation;
  onViewDetails: (id: string) => void;
}

const PropertyCard = ({ property, onViewDetails }: PropertyCardProps) => (
  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <div className="relative h-48 bg-gray-100">
      <img
        src={property.images[0] || ''}
        alt={property.title}
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = '';
        }}
      />
      <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-medium">
        ₹{property.price}/month
      </div>
    </div>
    <CardContent className="p-4">
      <h3 className="text-lg font-semibold mb-1 line-clamp-1">{property.title}</h3>
      <p className="text-sm text-gray-600 mb-3">{property.location}</p>

      <div className="flex items-center justify-between mt-4">
        <div className="flex space-x-2">
          <div className="flex items-center text-xs text-gray-500">
            <span>⭐ {typeof property.rating === 'object' ? property.rating.average.toFixed(1) : property.rating?.toFixed(1) || 'N/A'}</span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <span>🛏️ {property?.bedrooms || 1}</span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <span>🚿 {property?.bathrooms || 1}</span>
          </div>
        </div>
        <Button
          onClick={() => onViewDetails(property.id)}
          className="bg-green text-white text-sm px-3 py-1"
        >
          View Details
        </Button>
      </div>
    </CardContent>
  </Card>
);

const LoadingSkeleton = () => (
  <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-12 bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="overflow-hidden">
            <div className="h-48 bg-gray-100 animate-pulse"></div>
            <CardContent className="p-4">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="flex justify-between">
                <div className="flex space-x-2">
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="w-24 h-8 bg-gray-200 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </div>
);

export const FeaturedPropertiesSection = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const data = await accommodationService.getAccommodations();
        // Take first 4 properties or all if less than 4
        setProperties(data.slice(0, 4));
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError('Failed to load properties. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleViewDetails = (id: string) => {
    // Navigate to property details page with the property ID
    navigate(`/property-details/${id}`);
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="w-full px-4 py-12 text-center">
        <p className="text-red-500">{error}</p>
        <Button
          onClick={() => window.location.reload()}
          className="mt-4 bg-green hover:bg-green"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <section className="py-4 sm:py-8 md:py-12 px-2 sm:px-4 w-full bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-lg text-gray-600 text-center max-w-2xl">
            Discover our handpicked selection of premium properties
          </p>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No properties found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Button
            onClick={() => navigate('/product')}
            variant="outline"
            className="border-green text-green hover:bg-green hover:text-white px-8 py-2"
          >
            View All Properties
          </Button>
        </div>
      </div>
    </section>
  );
};
