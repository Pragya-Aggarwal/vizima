import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

type LocationGroup = {
  lat: number;
  lng: number;
  count: number;
  properties?: Array<{
    title?: string;
    city?: string;
    [key: string]: any;
  }>;
};

interface DynamicMapProps {
  locationGroups: LocationGroup[];
  mapCenter: [number, number];
}

export const DynamicMap: React.FC<DynamicMapProps> = ({ locationGroups, mapCenter }) => {
  useEffect(() => {
    // Fix for default marker icons
    const DefaultIcon = L.Icon.extend({
      options: {
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      }
    });

    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;
    // @ts-ignore
    L.Marker.prototype.options.icon = new DefaultIcon();

    return () => {
      // @ts-ignore
      delete L.Marker.prototype.options.icon;
    };
  }, []);

  return (
    <MapContainer 
      center={mapCenter} 
      zoom={12} 
      style={{ height: '100%', width: '100%' }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locationGroups.map((group, index) => (
        <Marker 
          key={index} 
          position={[group.lat, group.lng]}
        >
          <Popup>
            <div className="text-sm">
              <div className="font-semibold">Properties in this area:</div>
              <div className="text-blue-600 font-medium">{group.count} properties</div>
              {group.properties?.slice(0, 3).map((property, i) => (
                <div key={i} className="mt-1 text-xs">
                  • {property.title || property.city || 'Unnamed Property'}
                </div>
              ))}
              {group.properties && group.properties.length > 3 && (
                <div className="text-xs text-gray-500 mt-1">+ {group.properties.length - 3} more</div>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default DynamicMap;
