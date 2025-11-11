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
};

interface LocationMapSectionProps {
  searchQuery?: string;
  city?: string;
}

export const LocationMapSection = ({ searchQuery, city: propCity }: LocationMapSectionProps): JSX.Element => {
  // State definitions
  const [locationGroups, setLocationGroups] = useState<LocationGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);
  const [zoom, setZoom] = useState<number>(5); // Default zoom level
  const [searchedLocation, setSearchedLocation] = useState<[number, number] | null>(null);
console.log(searchedLocation,searchQuery, "  searchedLocation");
  // Initialize client-side state
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch accommodations data
  useEffect(() => {
    if (!isClient) return;
    
    const fetchAccommodations = async () => {
      try {
        console.log('Fetching accommodations...');
        const accommodations = await accommodationService.getAccommodations();
        console.log('Fetched accommodations:', accommodations);
        
        // Group accommodations by location with more precise grouping
        const groups: Record<string, LocationGroup> = {};
        const locationMap = new Map<string, string>(); // To track exact coordinates for each location
        
        // Create a unique group for each property with a small offset for properties at the same location
        accommodations.forEach((accommodation, index) => {
          const baseLat = accommodation.location?.coordinates?.lat;
          const baseLng = accommodation.location?.coordinates?.lng;
          
          if (baseLat !== undefined && baseLng !== undefined) {
            // Add a tiny offset to each property to prevent exact overlap
            // This ensures each property gets its own marker
            const lat = baseLat + (Math.random() * 0.0001 - 0.00005); // ±0.00005 degrees (~5m)
            const lng = baseLng + (Math.random() * 0.0001 - 0.00005); // ±0.00005 degrees (~5m)
            
            const exactKey = `${accommodation.id}`; // Use a unique key for each property
            
            groups[exactKey] = {
              lat,
              lng,
              count: 1, // Each group has exactly one property
              number: index + 1, // Sequential number for each property
              properties: [accommodation] // Single property per group
            };
            
            locationMap.set(accommodation.id, exactKey);
          } else {
            console.warn('Accommodation missing coordinates:', accommodation.id, accommodation.title);
          }
        });
        
        // Convert groups object to array
        const finalGroups = Object.values(groups);
        
        console.log('Processed location groups:', finalGroups);
        setLocationGroups(finalGroups);
      } catch (error) {
        console.error('Error fetching accommodations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccommodations();
  }, [isClient]);

  // Process location groups to include city in properties and add visual distinction
  const processedLocationGroups = useMemo(() => {
    return locationGroups.map((group, index) => {
      // Add a small offset to prevent perfect alignment in a grid
      const offset = index * 0.00001; // Very small offset for visual distinction
      
      return {
        ...group,
        // Apply minimal offset to the coordinates
        lat: group.lat + (index % 2 === 0 ? offset : -offset),
        lng: group.lng + (index % 3 === 0 ? offset : -offset),
        properties: group.properties.map(property => ({
          ...property,
          // Ensure we have city information for the tooltip
          _city: typeof property.location === 'object' && property.location 
            ? (property.location.city || property.location.address || 'Unknown Location')
            : String(property.location || 'Unknown Location')
        }))
      };
    });
  }, [locationGroups]);

  // Filter accommodations based on search query and update map center/zoom
  const filteredGroups = useMemo(() => {
    if (!searchQuery) {
      // When no search query, check if we have a city from props
      if (propCity) {
        // Check if we have predefined coordinates for this city
        const cityKey = propCity.toLowerCase().trim();
        if (predefinedLocations[cityKey]) {
          setMapCenter(predefinedLocations[cityKey]);
          setZoom(14); // Default zoom for city view
        } else {
          // If no predefined coordinates, try to geocode the city
          geocodeLocation(propCity).then(coords => {
            if (coords) {
              setMapCenter(coords);
              setZoom(14);
            } else {
              // Fallback to default location if geocoding fails
              setMapCenter([28.6139, 77.2090]); // Default to Delhi NCR
              setZoom(10);
            }
          });
        }
      } else {
        // If no city is specified, show default region
        setMapCenter([28.6139, 77.2090]); // Default to Delhi NCR
        setZoom(10);
      }
      
      // If we have location groups, return them
      if (locationGroups.length > 0) {
        return processedLocationGroups;
      }
      
      // If no location groups, return an empty array (will be handled by the map component)
      return [];
    }
    
    // When there's a search query, filter the properties
    const query = searchQuery.toLowerCase();
    const filtered = processedLocationGroups.filter(group => {
      return group.properties.some(property => {
        const title = property.title?.toLowerCase() || '';
        const locationStr = typeof property.location === 'string' 
          ? property.location
          : (property.location && typeof property.location === 'object' && 'address' in property.location)
            ? String(property.location.address || '')
            : '';
            
        const locationStrLower = locationStr.toLowerCase();
        
        return title.includes(query) || locationStrLower.includes(query);
      });
    });

    // If we have matching locations, update map center and zoom
    if (filtered.length > 0) {
      // Calculate center of all matching locations
      const lats = filtered.map(g => g.lat);
      const lngs = filtered.map(g => g.lng);
      
      const centerLat = (Math.min(...lats) + Math.max(...lats)) / 2;
      const centerLng = (Math.min(...lngs) + Math.max(...lngs)) / 2;
      
      setMapCenter([centerLat, centerLng]);
      setZoom(12); // Zoom in more when showing search results
    } else {
      // If no matches, show default view
      setMapCenter([28.6139, 77.2090]);
      setZoom(10);
    }

    return filtered;
  }, [locationGroups, searchQuery, processedLocationGroups]);

  // Predefined locations with verified coordinates for common cities
  const predefinedLocations: { [key: string]: [number, number] } = {
    // Major cities
    'noida': [28.5355, 77.3910], // Noida Sector 18
    'ncr': [28.6139, 77.2090],     // Central Delhi NCR (Connaught Place)
    // Sectors with relative positioning from the main Noida coordinates
    'sector 1 noida': [28.5455, 77.4010],
    'sector 2 noida': [28.5455, 77.3810],
    'sector 12 noida': [28.5355, 77.4010],
    'sector 15 noida': [28.5355, 77.3810],
    'sector 16 noida': [28.5255, 77.3910],
    'sector 18 noida': [28.5355, 77.3910],  // City Center Metro Station (same as main Noida)
    'sector 62 noida': [28.5555, 77.4010],
    'sector 128 noida': [28.5155, 77.3710],
    'sector 137 noida': [28.5255, 77.3810],
    'sector 150 noida': [28.5255, 77.4010],
    'sector 168 noida': [28.5155, 77.3910],
    
    // Major landmarks in Noida (relative to main coordinates)
    'noida city center': [28.5355, 77.3910],  // Same as main Noida
    'noida sector 18 metro': [28.5355, 77.3910],  // Same as main Noida
    'noida golf course': [28.5455, 77.3910],
    'noida stadium': [28.5255, 77.3910],
    'noida sector 16 metro': [28.5255, 77.3910],
    
    // Nearby cities
    'delhi': [28.6139, 77.2090],  // New Delhi city center
    'gurgaon': [28.4595, 77.0266],
    'gurugram': [28.4595, 77.0266],
    'greater noida': [28.4744, 77.5040],
    'ghaziabad': [28.6692, 77.4538],
    'faridabad': [28.4089, 77.3178],
    'noida extension': [28.5606, 77.3824],
    
    // Common misspellings and alternatives
    'noida sector 18': [28.5355, 77.3910],  // Same as main Noida
    'noida sector 62': [28.5555, 77.4010],
    'noida sector 137': [28.5255, 77.3810],
    'noida sector 150': [28.5255, 77.4010],
    'noida sector 168': [28.5155, 77.3910],
    'noida sec 18': [28.5355, 77.3910],  // Same as main Noida
    'noida sec 62': [28.5555, 77.4010],
    'noida sec 16': [28.5255, 77.3910]
  };

  // Geocode any location name to coordinates using Google Maps Geocoding API
  const geocodeLocation = useCallback(async (location: string): Promise<[number, number] | null> => {
    if (!location) return null;
    
    try {
      // Normalize the search query - lowercase and trim
      const normalizedQuery = location.toLowerCase().trim();
      console.log('Geocoding location:', normalizedQuery);
      
      // First check if it's a predefined location (exact match)
      if (predefinedLocations[normalizedQuery]) {
        console.log('Found in predefined locations (exact match):', normalizedQuery);
        return predefinedLocations[normalizedQuery];
      }
      
      // Try partial match for predefined locations
      const matchedLocation = Object.keys(predefinedLocations).find(key => 
        normalizedQuery.includes(key) || key.includes(normalizedQuery)
      );
      
      if (matchedLocation) {
        console.log('Found in predefined locations (partial match):', matchedLocation);
        return predefinedLocations[matchedLocation];
      }

      // Try with Google Maps Geocoding API first (more reliable)
      if (import.meta.env.VITE_GOOGLE_MAPS_API_KEY) {
        try {
          const googleResponse = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
          );
          const googleData = await googleResponse.json();
          
          if (googleData.status === 'OK' && googleData.results.length > 0) {
            const { lat, lng } = googleData.results[0].geometry.location;
            console.log('Geocoding result from Google Maps:', { lat, lng }, 'for location:', location);
            return [lat, lng];
          }
        } catch (googleError) {
          console.warn('Google Geocoding failed, trying fallback:', googleError);
        }
      }

      // Fallback to OpenStreetMap's Nominatim if Google fails
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`,
          {
            headers: {
              'User-Agent': 'Vizima/1.0 (your-email@example.com)' // Required by Nominatim
            }
          }
        );
        
        const data = await response.json();
        
        if (data && data.length > 0) {
          const result = data[0];
          console.log('Geocoding result from Nominatim:', result, 'for location:', location);
          return [parseFloat(result.lat), parseFloat(result.lon)];
        }
      } catch (osmError) {
        console.warn('OpenStreetMap geocoding failed:', osmError);
      }
      
      console.warn('Could not geocode location:', location);
      return null;
    } catch (error) {
      console.error('Error geocoding location:', error);
      return null;
    }
  }, []);

  // Handle search query changes
  useEffect(() => {
    const handleSearch = async () => {
      try {
        // Prefer searchQuery over propCity if both are present
        const query = (searchQuery || propCity || '').trim();
        console.log('Search query changed - searchQuery:', searchQuery, 'propCity:', propCity, 'final query:', query);
        
        if (!query) {
          console.log('No search query, resetting to default view');
          setSearchedLocation(null);
          setMapCenter([28.6139, 77.2090]); // Reset to Delhi NCR
          setZoom(10);
          return;
        }
        
        // Special handling for Noida
        if (query.toLowerCase() === 'noida') {
          console.log('Noida detected, using predefined coordinates');
          const noidaCoords : [number, number] = [28.5355, 77.3910]; // Noida Sector 18 coordinates
          setSearchedLocation(noidaCoords);
          setMapCenter(noidaCoords);
          setZoom(14);
          return;
        }

        const normalizedQuery = query.toLowerCase().trim();
        
        // Check for common variations of Noida
        const noidaVariations = ['noida', 'noida up', 'noida uttar pradesh', 'noida, up', 'noida, uttar pradesh'];
        if (noidaVariations.includes(normalizedQuery)) {
          console.log('Matched Noida variation, using predefined coordinates');
          setSearchedLocation(predefinedLocations['noida']);
          setMapCenter(predefinedLocations['noida']);
          setZoom(14);
          return;
        }
        
        // Try to geocode the location (this will also check predefined locations)
        console.log('Attempting to geocode location:', query);
        const coords = await geocodeLocation(query);
        
        if (coords) {
          console.log('Geocoding successful, setting location:', coords);
          setSearchedLocation(coords);
          setMapCenter(coords);
          setZoom(14); // Zoom in on the searched location
        } else {
          console.warn('Could not find location, falling back to Noida:', query);
          // Fall back to Noida if the location can't be found
          setSearchedLocation(predefinedLocations['noida']);
          setMapCenter(predefinedLocations['noida']);
          setZoom(14);
        }
      } catch (error) {
        console.error('Error handling search:', error);
        // Fall back to default view on error
        setSearchedLocation(null);
        setMapCenter([28.6139, 77.2090]);
        setZoom(10);
      }
    };

    // Don't debounce the initial search when coming from home page
    if (searchQuery || propCity) {
      handleSearch();
    } else {
      // Only use debounce for subsequent searches
      const timeoutId = setTimeout(handleSearch, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery, propCity, geocodeLocation]);


  // Create a combined groups array that includes both processed groups and searched location if needed
  const combinedGroups = useMemo(() => {
    // If we have a searched location but no matching properties, show the searched location
    if (searchedLocation && filteredGroups.length === 0) {
      return [{
        lat: searchedLocation[0],
        lng: searchedLocation[1],
        count: 1,
        number: 1,
        properties: [{
          id: 'searched-location',
          title: 'Searched Location',
          location: {
            address: searchQuery || 'Your searched location',
            coordinates: {
              lat: searchedLocation[0],
              lng: searchedLocation[1]
            }
          },
          _city: searchQuery || 'Searched Location'
        }]
      }];
    }
    return filteredGroups;
  }, [filteredGroups, searchedLocation, searchQuery]);

  // Show loading state while data is being fetched
  if (!isClient || isLoading) {
    return (
      <div className="w-full h-[400px] bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Prepare the fallback marker if we have a searched location but no results
  const fallback = searchedLocation && filteredGroups.length === 0 ? {
    position: searchedLocation as [number, number],
    title: searchQuery ? `No Properties Found in ${searchQuery}` : 'No Properties Found',
    description: searchQuery 
      ? `No properties found matching "${searchQuery}"`
      : 'No properties available in this area'
  } : undefined;

  return (
    <div className="w-full h-full min-h-[400px] lg:min-h-[500px]">
      {isClient ? (
        <Suspense fallback={<MapLoading />}>
          <div className="w-full h-full">
            <GoogleMapComponent
              locationGroups={combinedGroups}
              mapCenter={mapCenter || [28.6139, 77.2090]} // Default to Delhi NCR
              zoom={zoom}
              fallbackMarker={fallback}
              onMarkerClick={(marker) => {
                console.log('Marker clicked:', marker);
              }}
            />
          </div>
        </Suspense>
      ) : (
        <MapLoading />
      )}
    </div>
  );
};

export default LocationMapSection;
