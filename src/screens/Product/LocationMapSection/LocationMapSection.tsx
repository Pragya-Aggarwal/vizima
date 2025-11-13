'use client';

import { useEffect, useState, useMemo, useCallback, lazy, Suspense } from 'react';
import { accommodationService, type Accommodation } from '../../../api/services/accommodationService';

// Lazy load the GoogleMapComponent
const GoogleMapComponent = lazy(() => import('../../../components/Map/GoogleMapComponent'));

// Loading component
const MapLoading = () => (
  <div className="w-full h-full flex items-center justify-center bg-gray-50">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

interface LocationGroup {
  lat: number;
  lng: number;
  count: number;
  number: number;
  properties: Accommodation[];
}

interface LocationMapSectionProps {
  searchQuery?: string;
  city?: string;
}

export const LocationMapSection = ({ searchQuery, city: propCity }: LocationMapSectionProps): JSX.Element => {
  const [locationGroups, setLocationGroups] = useState<LocationGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);
  const [zoom, setZoom] = useState<number>(5);
  const [searchedLocation, setSearchedLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch accommodations
  useEffect(() => {
    if (!isClient) return;

    const fetchAccommodations = async () => {
      try {
        const accommodations = await accommodationService.getAccommodations();

        const groups: Record<string, LocationGroup> = {};
        accommodations.forEach((accommodation, index) => {
          const baseLat = accommodation.location?.coordinates?.lat;
          const baseLng = accommodation.location?.coordinates?.lng;

          if (baseLat !== undefined && baseLng !== undefined) {
            const lat = baseLat + (Math.random() * 0.0001 - 0.00005);
            const lng = baseLng + (Math.random() * 0.0001 - 0.00005);

            groups[accommodation.id] = {
              lat,
              lng,
              count: 1,
              number: index + 1,
              properties: [accommodation],
            };
          }
        });

        setLocationGroups(Object.values(groups));
      } catch (error) {
        console.error('Error fetching accommodations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccommodations();
  }, [isClient]);

  const processedLocationGroups = useMemo(() => {
    return locationGroups.map((group, index) => {
      const offset = index * 0.00001;
      return {
        ...group,
        lat: group.lat + (index % 2 === 0 ? offset : -offset),
        lng: group.lng + (index % 3 === 0 ? offset : -offset),
        properties: group.properties.map(property => ({
          ...property,
          _city:
            typeof property.location === 'object' && property.location
              ? property.location.city || property.location.address || 'Unknown Location'
              : String(property.location || 'Unknown Location'),
        })),
      };
    });
  }, [locationGroups]);

  // Simplified geocode (no predefined static lat/lngs)
  const geocodeLocation = useCallback(async (location: string): Promise<[number, number] | null> => {
    if (!location) return null;

    try {
      if (import.meta.env.VITE_GOOGLE_MAPS_API_KEY) {
        const googleResponse = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
        );
        const googleData = await googleResponse.json();

        if (googleData.status === 'OK' && googleData.results.length > 0) {
          const { lat, lng } = googleData.results[0].geometry.location;
          return [lat, lng];
        }
      }

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`,
        { headers: { 'User-Agent': 'Vizima/1.0 (contact@vizima.in)' } }
      );
      const data = await response.json();
      if (data && data.length > 0) {
        return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      }

      return null;
    } catch (error) {
      console.error('Error geocoding location:', error);
      return null;
    }
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      const query = (searchQuery || propCity || '').trim();
      if (!query) {
        // Reset to show all locations
        setSearchedLocation(null);
        setMapCenter([20.5937, 78.9629]); // Center of India
        setZoom(5);
        return;
      }

      const coords = await geocodeLocation(query);
      if (coords) {
        setSearchedLocation(coords);
        setMapCenter(coords);
        setZoom(14);
      } else {
        // If geocoding fails but we have a search query, still show the searched location
        // even if we can't find coordinates, but keep the default view
        setSearchedLocation(null);
        setMapCenter([20.5937, 78.9629]);
        setZoom(5);
      }
    };

    // Handle both cases: when there's a search query and when it's cleared
    if (searchQuery || propCity) {
      handleSearch();
    } else {
      // Reset to show all locations when search is cleared
      setSearchedLocation(null);
      setMapCenter([20.5937, 78.9629]);
      setZoom(5);
    }
  }, [searchQuery, propCity, geocodeLocation]);

  const filteredGroups = useMemo(() => {
    if (!searchQuery) return processedLocationGroups;

    const query = searchQuery.toLowerCase();
    const filtered = processedLocationGroups.filter(group =>
      group.properties.some(property => {
        const title = property.title?.toLowerCase() || '';
        const locationStr =
          typeof property.location === 'string'
            ? property.location
            : (property.location as any)?.address || '';
        return title.includes(query) || locationStr.toLowerCase().includes(query);
      })
    );

    return filtered;
  }, [searchQuery, processedLocationGroups]);

  const combinedGroups = useMemo(() => {
    const groups = [...filteredGroups];
    
    if (searchedLocation) {
      // Add searched location as a special marker
      groups.unshift({
        lat: searchedLocation[0],
        lng: searchedLocation[1],
        count: 1,
        number: 0, // Special number to identify searched location
        properties: [
          {
            id: 'searched-location',
            title: 'Searched Location',
            location: {
              address: searchQuery || 'Your searched location',
              coordinates: { lat: searchedLocation[0], lng: searchedLocation[1] },
            },
            _city: searchQuery || 'Searched Location',
            isSearchedLocation: true, // Add a flag to identify this as the searched location
          },
        ],
      });
    }
    
    return groups;
  }, [filteredGroups, searchedLocation, searchQuery]);

  if (!isClient || isLoading) {
    return (
      <div className="w-full h-[400px] bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const fallback =
    searchedLocation && filteredGroups.length === 0
      ? {
          position: searchedLocation,
          title: searchQuery ? `No Properties Found in ${searchQuery}` : 'No Properties Found',
          description: searchQuery
            ? `No properties found matching "${searchQuery}"`
            : 'No properties available in this area',
        }
      : undefined;

  return (
    <div className="w-full h-full min-h-[400px] lg:min-h-[500px]">
      {isClient ? (
        <Suspense fallback={<MapLoading />}>
          <GoogleMapComponent
            locationGroups={combinedGroups}
            mapCenter={mapCenter || [20.5937, 78.9629]}
            zoom={zoom}
            fallbackMarker={fallback}
            onMarkerClick={marker => console.log('Marker clicked:', marker)}
          />
        </Suspense>
      ) : (
        <MapLoading />
      )}
    </div>
  );
};

export default LocationMapSection;
