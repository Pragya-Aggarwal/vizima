import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface LocationGroup {
  lat: number;
  lng: number;
  count: number;
  number: number;
  properties: Array<{
    title?: string;
    city?: string;
    price?: number;
    [key: string]: any;
  }>;
}

interface FallbackMarker {
  position: [number, number];
  title: string;
  description: string;
}

interface SimpleMapProps {
  locationGroups: LocationGroup[];
  mapCenter: [number, number];
  zoom?: number;
  fallbackMarker?: FallbackMarker;
}

const SimpleMap: React.FC<SimpleMapProps> = ({ 
  locationGroups = [], 
  mapCenter, 
  zoom = 5, 
  fallbackMarker 
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Create map instance
    const map = L.map(mapContainerRef.current, {
      center: mapCenter,
      zoom: zoom,
      zoomControl: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      touchZoom: true
    });

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);

    // Store map reference
    mapRef.current = map;

    // Handle window resize
    const handleResize = () => {
      map.invalidateSize();
    };
    
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update map center and zoom
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(mapCenter, zoom);
    }
  }, [mapCenter, zoom]);

  // Update markers
  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => {
      if (mapRef.current) {
        mapRef.current.removeLayer(marker);
      }
    });
    markersRef.current = [];

    const map = mapRef.current;
    const markers: L.Marker[] = [];

    // Add location group markers
    locationGroups.forEach(group => {
      if (group.lat && group.lng) {
        const popupContent = group.properties.map(property => {
          const title = property.title || 'Untitled Property';
          const city = property.city || 'Unknown Location';
          const price = property.price ? `₹${property.price.toLocaleString()}` : 'Price on request';
          
          return `
            <div class="mb-2 pb-2 border-b border-gray-100 last:border-0">
              <div class="font-medium">${title}</div>
              <div class="text-sm text-gray-500">${city}</div>
              <div class="text-sm font-medium text-blue-600">${price}</div>
            </div>
          `;
        }).join('');

        const marker = L.marker([group.lat, group.lng])
          .addTo(map)
          .bindPopup(`<div class="max-w-xs">${popupContent || 'No details available'}</div>`);
          
        markers.push(marker);
      }
    });
    
    // Add fallback marker if no locations and fallback is provided
    if (markers.length === 0 && fallbackMarker) {
      const { position, title } = fallbackMarker;
      const marker = L.marker([position[0], position[1]])
        .addTo(map)
        .bindPopup(`<div>${title}</div>`);
      markers.push(marker);
    }
    
    markersRef.current = markers;

    // Fit bounds if we have markers
    if (markers.length > 0) {
      const group = L.featureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.1));
    }
  }, [locationGroups, fallbackMarker]);

  useEffect(() => {
    if (mapRef.current && mapCenter) {
      mapRef.current.setView(mapCenter, zoom, {
        animate: true,
        duration: 0.5
      });
    }
  }, [mapCenter, zoom]);

  return (
    <div 
      ref={mapContainerRef} 
      className="w-full h-full min-h-[300px] bg-gray-100"
      style={{ minHeight: '300px' }}
    />
  );
};

export { SimpleMap as default };