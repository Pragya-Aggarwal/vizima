import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

// Import marker icons
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-shadow.png';

// Fix for default marker icons in React
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

// Import marker icons using Vite's import syntax
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

type LocationGroup = {
  lat: number;
  lng: number;
  count: number;
  number: number;
  properties: Array<{
    title?: string;
    city?: string;
    [key: string]: any;
  }>;
};

interface SimpleMapProps {
  locationGroups: LocationGroup[];
  mapCenter: [number, number];
}

const SimpleMap: React.FC<SimpleMapProps> = ({ locationGroups, mapCenter }) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [mapInitialized, setMapInitialized] = useState(false);

  // Markers are now created with sequential numbers and consistent styling

  // Initialize map
  useEffect(() => {
    console.log('Initializing map...');
    // Skip if container is not ready
    if (!mapContainer.current) {
      console.error('Map container not ready');
      return;
    }
    
    let resizeObserver: ResizeObserver | null = null;

      // Store the current container reference
    const currentContainer = containerRef.current;
    
    // Cleanup function to be called on unmount or before reinitialization
    const cleanup = () => {
      if (mapRef.current) {
        try {
          // Remove all event listeners first
          mapRef.current.off();
          
          // Remove all map layers
          mapRef.current.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
              mapRef.current?.removeLayer(layer);
            }
          });
          
          // Remove the map instance
          mapRef.current.remove();
          
          // Create a new container to replace the old one
          if (currentContainer?.parentNode) {
            const parent = currentContainer.parentNode;
            const newContainer = document.createElement('div');
            newContainer.className = currentContainer.className;
            newContainer.style.cssText = currentContainer.style.cssText;
            parent.replaceChild(newContainer, currentContainer);
            containerRef.current = newContainer;
            
            // Update the map container reference if it matches the old container
            if (mapContainer.current === currentContainer) {
              mapContainer.current = newContainer;
            }
          }
        } catch (error) {
          console.warn('Error during map cleanup:', error);
        } finally {
          mapRef.current = null;
          markersRef.current = [];
        }
      }
    };
    
    // Clean up existing map if it exists
    cleanup();

    // Validate map center coordinates
    const [centerLat, centerLng] = mapCenter;
    console.log('Map center coordinates:', { centerLat, centerLng });
    
    if (isNaN(centerLat) || isNaN(centerLng) || !isFinite(centerLat) || !isFinite(centerLng)) {
      console.error('Invalid map center coordinates:', mapCenter);
      return;
    }
    
    try {
      // Create map instance with zoom enabled but other interactions disabled
      const map = L.map(mapContainer.current, {
        center: [centerLat, centerLng],
        zoom: 12,
        zoomControl: true,  // Show zoom controls
        scrollWheelZoom: true,  // Enable zoom with mouse wheel
        zoomAnimation: true,
        fadeAnimation: true,
        markerZoomAnimation: true,
        doubleClickZoom: true,  // Enable zoom on double click
        boxZoom: false,  // Keep box zoom disabled
        dragging: true,  // Enable dragging to move around
        keyboard: false,  // Keep keyboard navigation disabled
        closePopupOnClick: true,
        tap: false  // Disable tap on touch devices
      } as L.MapOptions);
      
      // Disable specific interactions we don't want
      map.boxZoom.disable();
      map.keyboard.disable();
      
      // Add CSS to ensure zoom controls are clickable
      if (mapContainer.current) {
        mapContainer.current.style.pointerEvents = 'auto';
        
        // Make sure the zoom controls are always clickable
        const zoomControls = mapContainer.current.querySelector('.leaflet-control-zoom');
        if (zoomControls) {
          (zoomControls as HTMLElement).style.pointerEvents = 'auto';
        }
      }
      
      // Handle map click events to prevent unwanted behaviors
      map.on('click', (e) => {
        // Allow default behavior for zoom controls
        const target = e.originalEvent?.target as HTMLElement;
        if (target?.closest('.leaflet-control-zoom')) {
          return;
        }
        // Prevent other click behaviors
        L.DomEvent.stop(e);
      });
      
      // Store map reference
      mapRef.current = map;
      
      try {
        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
          detectRetina: true
        }).addTo(map);
        
        // Set map initialized flag
        setMapInitialized(true);
        
        // Set up resize observer to handle container size changes
        const handleResize = () => {
          if (mapRef.current) {
            mapRef.current.invalidateSize();
          }
        };
        
        // Add a small delay to ensure the container is properly sized
        const resizeTimer = setTimeout(handleResize, 100);
        
        // Set up a ResizeObserver to handle dynamic size changes
        if (window.ResizeObserver) {
          resizeObserver = new ResizeObserver(() => {
            handleResize();
          });
          
          if (mapContainer.current) {
            resizeObserver.observe(mapContainer.current);
          }
        }
        
        // Also listen for window resize events as a fallback
        window.addEventListener('resize', handleResize);
        
        // Store the cleanup function to be called on unmount
        const cleanupMap = () => {
          clearTimeout(resizeTimer);
          window.removeEventListener('resize', handleResize);
          if (resizeObserver) {
            resizeObserver.disconnect();
          }
          cleanup();
        };
        
        return cleanupMap;
      } catch (error) {
        console.error('Error initializing map:', error);
        cleanup();
      }
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }, [mapCenter]);

  // Group locations by exact coordinates first, then assign sequential numbers
  const groupedLocations = React.useMemo(() => {
    const groups: { [key: string]: LocationGroup } = {};
    
    // First pass: Group by exact coordinates
    locationGroups.forEach((group) => {
      const { lat, lng } = group;
      const key = `${lat},${lng}`;
      
      if (!groups[key]) {
        groups[key] = {
          lat,
          lng,
          count: 0,
          number: 0, // Will be set later
          properties: []
        };
      }
      
      groups[key].count += group.properties?.length || 0;
      if (group.properties) {
        groups[key].properties.push(...group.properties);
      }
    });
    
    // Convert to array and sort by count (descending)
    const sortedGroups = Object.values(groups).sort((a, b) => b.count - a.count);
    
    // Assign sequential numbers based on the sorted order
    return sortedGroups.map((group, index) => ({
      ...group,
      number: index + 1
    }));
  }, [locationGroups]);

  // Update markers when location groups change
  useEffect(() => {
    if (!mapRef.current || !mapInitialized) return;
    
    const map = mapRef.current;
    const markers: L.Marker[] = [];
    
    // Clear existing markers
    markersRef.current.forEach(marker => map.removeLayer(marker));
    markersRef.current = [];
    
    // Filter out invalid location groups
    const validGroups = groupedLocations.filter(group => 
      group && 
      !isNaN(group.lat) && 
      !isNaN(group.lng) && 
      isFinite(group.lat) && 
      isFinite(group.lng) &&
      Math.abs(group.lat) <= 90 && 
      Math.abs(group.lng) <= 180
    );

    // Create markers for valid location groups
    validGroups.forEach((group) => {
      try {
        const { lat, lng, count, properties = [], number } = group;
        
        // Determine marker color based on count
        let color = '#3388ff'; // Default blue
        if (count > 5) color = '#ff4444'; // Red for >5
        else if (count > 2) color = '#ffaa44'; // Orange for 3-5
        
        // Create a custom marker with sequential number
        const marker = L.marker([lat, lng], {
          icon: L.divIcon({
            html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px; border: 2px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.3);">${number}</div>`,
            className: '',
            iconSize: [30, 30],
            iconAnchor: [15, 15],
            popupAnchor: [0, -15]
          })
        });

        // Create popup content with better styling
        let popupContent = `
          <div class="w-48">
            <div class="bg-white rounded-lg overflow-hidden shadow-lg">
              <div class="bg-blue-600 text-white px-3 py-2">
                <div class="font-bold text-sm">${count} propert${count === 1 ? 'y' : 'ies'}</div>
              </div>
              <div class="p-2 max-h-40 overflow-y-auto">
        `;
        
        if (properties.length) {
          popupContent += '<ul class="space-y-1">';
          properties.slice(0, 5).forEach(property => {
            const propertyTitle = property.title || 'Unnamed Property';
            const title = propertyTitle.length > 30 ? 
              `${propertyTitle.substring(0, 30)}...` : propertyTitle;
            popupContent += `
              <li class="text-xs border-b border-gray-100 pb-1">
                <div class="font-medium text-gray-800">${title}</div>
                ${property.location?.city ? 
                  `<div class="text-xs text-gray-500 flex items-center">
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    ${property.location.city}
                  </div>` : ''}
              </li>`;
          });
          
          if (properties.length > 5) {
            popupContent += `
              <li class="text-xs text-center text-blue-600 pt-1">
                +${properties.length - 5} more propert${properties.length - 5 === 1 ? 'y' : 'ies'}
              </li>`;
          }
          
          popupContent += '</ul>';
        } else {
          popupContent += '<div class="text-sm text-gray-500 py-2">No property details available</div>';
        }
        
        popupContent += `
              </div>
            </div>
          </div>
        `;
        
        // Bind popup to marker
        marker.bindPopup(popupContent, {
          maxWidth: 300,
          className: 'custom-popup',
          closeButton: true
        });
        
        // Add marker to map and store reference
        marker.addTo(map);
        markers.push(marker);
      } catch (error) {
        console.error('Error creating marker:', error, group);
      }
    });
    
    // Store markers for cleanup
    markersRef.current = markers;
    
    // Fit map bounds to show all markers if there are any
    if (markers.length > 0) {
      try {
        const group = L.featureGroup(markers);
        const bounds = group.getBounds();
        if (bounds.isValid()) {
          // Add padding to prevent markers from being too close to the edges
          map.fitBounds(bounds.pad(0.2), {
            paddingTopLeft: [0, 50],  // Add top padding to account for header
            paddingBottomRight: [0, 0]
          });
        }
      } catch (error) {
        console.error('Error fitting bounds:', error);
      }
    }
  }, [locationGroups, mapInitialized]);

  // Ensure the container has explicit dimensions
  return (
    <div className="relative w-full" style={{ height: '600px' }}>
      <div 
        ref={(el) => {
          if (el) {
            mapContainer.current = el;
            containerRef.current = el;
            console.log('Map container ref set:', el);
          }
        }}
        style={{ 
          width: '100%',
          height: '600px',
          backgroundColor: '#f8f9fa',
          position: 'relative',
          zIndex: 0,
          borderRadius: '0.75rem',
          overflow: 'hidden',
          border: '1px solid #e5e7eb',
          minHeight: '600px' // Ensure minimum height
        }}
        className="leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom"
      >
        {!mapInitialized && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-80 z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading map...</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Debug info - only shown in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-2 text-xs text-gray-500">
          Map Center: {JSON.stringify(mapCenter)} | 
          Locations: {locationGroups.length} | 
          Initialized: {mapInitialized ? 'Yes' : 'No'}
        </div>
      )}
    </div>
  );
};

export default SimpleMap;
