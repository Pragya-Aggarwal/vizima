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
  const [locationGroups, setLocationGroups] = useState<LocationGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);
  const [zoom, setZoom] = useState<number>(5); // Default zoom level

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
        
        // First pass: group by exact coordinates
        accommodations.forEach((accommodation) => {
          const lat = accommodation.location?.coordinates?.lat;
          const lng = accommodation.location?.coordinates?.lng;
          
          if (lat !== undefined && lng !== undefined) {
            // Use exact coordinates for the initial grouping
            const exactKey = `${lat},${lng}`;
            
            if (!groups[exactKey]) {
              groups[exactKey] = {
                lat,
                lng,
                count: 0,
                number: 0, // Will be updated later with sequential numbers
                properties: []
              };
            }
            
            groups[exactKey].count += 1;
            groups[exactKey].properties.push(accommodation);
            locationMap.set(accommodation.id, exactKey);
          } else {
            console.warn('Accommodation missing coordinates:', accommodation.id, accommodation.title);
          }
        });
        
        // Second pass: merge nearby locations
        const finalGroups: Record<string, LocationGroup> = {};
        const processed = new Set<string>();
        
        Object.entries(groups).forEach(([key, group]) => {
          if (processed.has(key)) return;
          
          // Create a new group for this location
          const newGroup = { ...group, properties: [...group.properties] };
          finalGroups[key] = newGroup;
          processed.add(key);
          
          // Find and merge nearby locations
          Object.entries(groups).forEach(([otherKey, otherGroup]) => {
            if (processed.has(otherKey) || key === otherKey) return;
            
            // Calculate distance between points (simple Euclidean distance for small areas)
            const dx = group.lat - otherGroup.lat;
            const dy = group.lng - otherGroup.lng;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // If locations are very close, merge them
            if (distance < 0.002) { // ~200m at the equator
              newGroup.count += otherGroup.count;
              newGroup.properties.push(...otherGroup.properties);
              processed.add(otherKey);
              
              // Update the center point based on weighted average
              const total = newGroup.count + otherGroup.count;
              newGroup.lat = (newGroup.lat * newGroup.count + otherGroup.lat * otherGroup.count) / total;
              newGroup.lng = (newGroup.lng * newGroup.count + otherGroup.lng * otherGroup.count) / total;
            }
          });
        });
        
        const newLocationGroups = Object.values(finalGroups);
        console.log('Processed location groups:', newLocationGroups);
        setLocationGroups(newLocationGroups);
      } catch (error) {
        console.error('Error fetching accommodations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccommodations();
  }, [isClient]);

  // Process location groups to include city in properties
  const processedLocationGroups = useMemo(() => {
    return locationGroups.map(group => ({
      ...group,
      properties: group.properties.map(property => ({
        ...property,
        // Ensure we have city information for the tooltip
        _city: typeof property.location === 'object' && property.location 
          ? (property.location.city || property.location.address || 'Unknown Location')
          : String(property.location || 'Unknown Location')
      }))
    }));
  }, [locationGroups]);

  // Filter accommodations based on search query and update map center/zoom
  const filteredGroups = useMemo(() => {
    if (!searchQuery) {
      // When no search query, show all properties with appropriate zoom
      if (locationGroups.length > 0) {
        // Calculate bounds of all locations
        const allLats = locationGroups.map(g => g.lat);
        const allLngs = locationGroups.map(g => g.lng);
        
        const centerLat = (Math.min(...allLats) + Math.max(...allLats)) / 2;
        const centerLng = (Math.min(...allLngs) + Math.max(...allLngs)) / 2;
        
        setMapCenter([centerLat, centerLng]);
        setZoom(5); // Wider zoom to show all properties
      } else {
        // Default to India if no locations
        setMapCenter([20.5937, 78.9629]);
        setZoom(5);
      }
      return processedLocationGroups;
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
            
        const query = searchQuery?.toLowerCase() || '';
        const locationStrLower = locationStr.toLowerCase();
        
        return title.toLowerCase().includes(query) || locationStrLower.includes(query);
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
      setZoom(10); // Zoom in more when showing search results
    } else {
      // If no matches, show default view
      setMapCenter([20.5937, 78.9629]);
      setZoom(5);
    }

    return filtered;
  }, [locationGroups, searchQuery, processedLocationGroups]);

  // Geocode location name to coordinates
  const geocodeLocation = useCallback(async (location: string): Promise<[number, number] | null> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
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

  // Handle search query changes
  const [searchedLocation, setSearchedLocation] = useState<[number, number] | null>(null);
  
  useEffect(() => {
    const handleSearch = async () => {
      const query = searchQuery || propCity || '';
      if (!query) {
        setSearchedLocation(null);
        return;
      }

      // Check for predefined locations first
      const predefinedLocations: { [key: string]: [number, number] } = {
        'noida': [28.5355, 77.3910],
        'delhi': [28.7041, 77.1025],
        'gurgaon': [28.4595, 77.0266],
        'greater noida': [28.4744, 77.5040],
        'ghaziabad': [28.6692, 77.4538],
        'faridabad': [28.4089, 77.3178]
      };

      const normalizedQuery = query.toLowerCase().trim();
      let foundMatch = false;
      
      // First try exact match
      if (predefinedLocations[normalizedQuery]) {
        setSearchedLocation(predefinedLocations[normalizedQuery]);
        foundMatch = true;
      } 
      // If no exact match, try partial match for Noida
      else if (normalizedQuery.includes('noida')) {
        setSearchedLocation([28.5355, 77.3910]);
        foundMatch = true;
      }
      // Then try geocoding if no match found
      else if (!foundMatch) {
        const coords = await geocodeLocation(query);
        if (coords) {
          setSearchedLocation(coords);
        }
      }
    };

    handleSearch();
  }, [searchQuery, propCity, geocodeLocation]);


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
    <div className="w-full">
      <Suspense fallback={<MapLoading />}>
        <div className="w-full h-[500px] rounded-lg overflow-hidden">
          <GoogleMapComponent
            locationGroups={filteredGroups}
            mapCenter={mapCenter || [20.5937, 78.9629]}
            zoom={zoom}
            fallbackMarker={fallback}
            onMarkerClick={(marker) => {
              console.log('Marker clicked:', marker);
            }}
          />
        </div>
      </Suspense>
    </div>
  );
};

export default LocationMapSection;
