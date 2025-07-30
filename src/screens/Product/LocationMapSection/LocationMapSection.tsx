'use client';

import { useEffect, useState, useMemo, lazy, Suspense } from 'react';
import { accommodationService, type Accommodation } from '../../../api/services/accommodationService';

// Create a client-side only wrapper for the map
const SimpleMap = lazy(() => import('../../../components/Map/SimpleMap'));

const MapLoader = () => (
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

export const LocationMapSection = (): JSX.Element => {
  const [locationGroups, setLocationGroups] = useState<LocationGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Initialize client-side state
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch accommodations data
  useEffect(() => {
    if (!isClient) return;
    
    const fetchAccommodations = async () => {
      try {
        const accommodations = await accommodationService.getAccommodations();
        
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
        setLocationGroups(newLocationGroups);
      } catch (error) {
        console.error('Error fetching accommodations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccommodations();
  }, [isClient]);

  // Calculate the center point of all locations for the map
  const mapCenter = useMemo<[number, number]>(() => {
    if (locationGroups.length === 0) return [19.0760, 72.8777]; // Default to Mumbai
    
    const avgLat = locationGroups.reduce((sum, loc) => sum + loc.lat, 0) / locationGroups.length;
    const avgLng = locationGroups.reduce((sum, loc) => sum + loc.lng, 0) / locationGroups.length;
    
    return [avgLat, avgLng];
  }, [locationGroups]);

  // Show loading state while data is being fetched
  if (!isClient || isLoading) {
    return (
      <div className="w-full h-[900px] bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <section className="w-full bg-gray-50 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-3">Find Properties on Map</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our properties across different locations. Click on any marker to see available properties in that area.
          </p>
        </div>
        
        <div className="w-full h-[600px] md:h-[700px] relative overflow-hidden rounded-xl shadow-xl border border-gray-200 bg-white">
          <Suspense fallback={<MapLoader />}>
            <SimpleMap 
              locationGroups={locationGroups}
              mapCenter={mapCenter}
            />
          </Suspense>
          
          {/* Map legend */}
          
        </div>
      </div>
    </section>
  );
};
