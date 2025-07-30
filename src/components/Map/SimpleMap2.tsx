import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

// Import marker icons
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface SimpleMapProps {
  locationGroups: Array<{
    lat: number;
    lng: number;
    count: number;
    number: number;
    properties: Array<{
      title?: string;
      city?: string;
      [key: string]: any;
    }>;
  }>;
  mapCenter: [number, number];
}

const SimpleMap2: React.FC<SimpleMapProps> = ({ locationGroups, mapCenter }) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // Initialize map
  useEffect(() => {
    console.log('Initializing map...');
    
    // Skip if container is not ready
    if (!mapContainer.current) {
      console.error('Map container not ready');
      return;
    }

    // Clean up existing map if it exists
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    // Validate map center coordinates
    const [centerLat, centerLng] = mapCenter;
    console.log('Map center coordinates:', { centerLat, centerLng });
    
    if (isNaN(centerLat) || isNaN(centerLng) || !isFinite(centerLat) || !isFinite(centerLng)) {
      console.error('Invalid map center coordinates:', mapCenter);
      return;
    }

    try {
      // Create map instance with higher zoom level
      const map = L.map(mapContainer.current, {
        center: [centerLat, centerLng],
        zoom: 2, // Increased from 12 to 15 for closer zoom
        zoomControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        dragging: true,
      });

      // Store map reference
      mapRef.current = map;

      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
        detectRetina: true
      }).addTo(map);

      // Add markers for each location
      locationGroups.forEach((location) => {
        const marker = L.marker([location.lat, location.lng]).addTo(map);
        markersRef.current.push(marker);
      });

      // Cleanup function
      return () => {
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }
      };
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }, [mapCenter, locationGroups]);

  return (
    <div 
      ref={mapContainer} 
      style={{ 
        width: '100%', 
        height: '600px',
        backgroundColor: '#f0f0f0',
        
      }}
      className="leaflet-container"
    />
  );
};

export default SimpleMap2;
