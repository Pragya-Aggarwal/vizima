import React, { useEffect, useState } from 'react';
import { accommodationService, type Accommodation } from '../../../api/services/accommodationService';

type LocationGroup = {
  lat: number;
  lng: number;
  count: number;
  properties: Accommodation[];
};

export const LocationMapSection = (): JSX.Element => {
  const [locationGroups, setLocationGroups] = useState<LocationGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const accommodations = await accommodationService.getAccommodations();

        // Group accommodations by approximate location (in a real app, you'd use actual coordinates)
        const groups: Record<string, LocationGroup> = {};

        accommodations.forEach(property => {
          // For demo, we'll use a simplified grouping by city/area
          // In a real app, you'd use actual coordinates
          const locationKey = property.city || 'default';

          if (!groups[locationKey]) {
            // Generate random coordinates within a reasonable range for demo
            groups[locationKey] = {
              lat: 19.0760 + (Math.random() * 0.2 - 0.1), // Mumbai coordinates ±0.1
              lng: 72.8777 + (Math.random() * 0.2 - 0.1), // Mumbai coordinates ±0.1
              count: 0,
            } as LocationGroup;
          }

          groups[locationKey].count += 1;
          if (!groups[locationKey].properties) {
            groups[locationKey].properties = [];
          }
          groups[locationKey].properties?.push(property);
        });

        setLocationGroups(Object.values(groups));
      } catch (error) {
        console.error('Error fetching accommodations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccommodations();
  }, []);

  // Get the center point of all locations for the map
  const getMapCenter = () => {
    if (locationGroups.length === 0) return '19.0760,72.8777'; // Default to Mumbai

    const avgLat = locationGroups.reduce((sum, loc) => sum + loc.lat, 0) / locationGroups.length;
    const avgLng = locationGroups.reduce((sum, loc) => sum + loc.lng, 0) / locationGroups.length;

    return `${avgLat},${avgLng}`;
  };

  // Get a static map URL for the first location group or default to Mumbai
  const getStaticMapUrl = () => {
    if (locationGroups.length > 0) {
      const group = locationGroups[0];
      return `https://maps.google.com/maps?q=${group.lat},${group.lng}&z=12&output=embed`;
    }
    return 'https://maps.google.com/maps?q=19.0760,72.8777&z=12&output=embed';
  };

  if (isLoading) {
    return (
      <div className="w-full h-[500px] bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-4 mt-4">Find Properties on Map</h2>
      <div className="w-full h-[900px] relative  overflow-hidden border border-gray-300">

        {/* Google Maps iframe */}
        <iframe
          className="w-full h-full border-0  h-900"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={getStaticMapUrl()}
          title="Properties Location Map"
        ></iframe>

        {/* Custom markers overlay */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-lg">
          {locationGroups.map((group, index) => {
            // Calculate position as percentage of container
            const left = ((group.lng - 72.8) / 0.4) * 100; // Adjust these values based on your map's bounds
            const top = ((19.2 - group.lat) / 0.4) * 100; // Invert Y axis for CSS

            // Determine marker size based on count
            let sizeClass = 'w-8 h-8 text-xs';
            if (group.count > 10) sizeClass = 'w-12 h-12 text-sm';
            else if (group.count > 5) sizeClass = 'w-10 h-10 text-xs';

            return (
              <div
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                style={{ left: `${left}%`, top: `${top}%` }}
              >
                <div className={`${sizeClass} rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-white font-bold shadow-lg`}>
                  {group.count}
                </div>
                <div className="w-0 h-0 border-l-2 border-r-2 border-t-4 border-l-transparent border-r-transparent border-t-blue-600 -mt-1"></div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
