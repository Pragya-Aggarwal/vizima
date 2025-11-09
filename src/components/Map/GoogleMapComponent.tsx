'use client';

import React, { useCallback, useState } from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';

// Define types for our location data
interface Property {
  title?: string;
  city?: string;
  price?: number;
  [key: string]: unknown;
}

interface LocationGroup {
  lat: number;
  lng: number;
  count: number;
  number: number;
  properties: Property[];
}

interface GoogleMapComponentProps {
  locationGroups?: LocationGroup[];
  mapCenter?: [number, number];
  zoom?: number;
  fallbackMarker?: {
    position: [number, number];
    title: string;
    description: string;
  };
  onMarkerClick?: (marker: LocationGroup) => void;
  onError?: (error: Error) => void;
  className?: string;
  style?: React.CSSProperties;
}
// Google Maps API key - Load from Vite environment variables
const getGoogleMapsApiKey = (): string => {
  // In Vite, environment variables prefixed with VITE_ are exposed under import.meta.env
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  
  if (import.meta.env.DEV) {
    if (!apiKey) {
      console.error('❌ Google Maps API Key is missing. Please set VITE_GOOGLE_MAPS_API_KEY in your .env file');
    } else if (apiKey.startsWith('YOUR_') || apiKey.includes('example')) {
      console.error('❌ Please replace the placeholder API key in your .env file with a valid Google Maps API key');
    } else {
      console.log('✅ Google Maps API Key loaded successfully');
    }
  }
  
  return apiKey || '';
};

const GOOGLE_MAPS_API_KEY = getGoogleMapsApiKey();

const DEFAULT_CENTER: [number, number] = [20.5937, 78.9629]; // Default to India
const DEFAULT_ZOOM = 5;

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({
  locationGroups = [],
  mapCenter = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  fallbackMarker,
  onMarkerClick = () => {},
  onError = () => {},
  className = '',
  style = {}
}) => {
  const [selectedMarker, setSelectedMarker] = useState<LocationGroup | null>(null);
  const [loadError, setLoadError] = useState<Error | null>(null);

  const containerStyle = {
    width: '100%',
    height: '100%',
    minHeight: '400px',
    borderRadius: '8px',
    ...style
  };

  const handleLoadError = useCallback((error: Error) => {
    console.error('Google Maps API error:', error);
    setLoadError(error);
    onError(error);
  }, [onError]);

  // Handle marker click
  const handleMarkerClick = useCallback((marker: LocationGroup) => {
    setSelectedMarker(marker);
    onMarkerClick(marker);
  }, [onMarkerClick]);

  // Handle missing API key
  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-yellow-50 border border-yellow-200 rounded-md p-6">
        <div className="text-center max-w-md">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mb-4">
            <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-yellow-800">Google Maps API Key Missing</h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>Please set the following environment variable in your <code className="bg-yellow-100 px-1 rounded">.env.local</code> file:</p>
            <pre className="mt-2 p-2 bg-gray-800 text-gray-100 rounded text-left text-xs overflow-x-auto">
              VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
            </pre>
            <p className="mt-2">Make sure to restart your development server after adding the API key.</p>
          </div>
        </div>
      </div>
    );
  }

  // Render error state
  if (loadError) {
    const errorMessage = loadError?.message || 'Failed to load Google Maps.';
    const apiKeyPreview = GOOGLE_MAPS_API_KEY ? `${GOOGLE_MAPS_API_KEY.substring(0, 6)}...` : 'Not found';
    
    return (
      <div className="w-full h-full flex items-center justify-center bg-red-50 p-4">
        <div className="text-center max-w-md">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">Error Loading Map</h3>
          <div className="mt-2 text-sm text-gray-600">
            <p>{errorMessage}</p>
            <p className="mt-2 text-xs">API Key: {apiKeyPreview}</p>
          </div>
          <div className="mt-6">
            <button 
              onClick={() => window.location.reload()} 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="-ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main map render
  return (
    <div className={`w-full h-full relative ${className}`} style={style}>
      <LoadScript
        googleMapsApiKey={GOOGLE_MAPS_API_KEY}
        onLoad={() => {
          console.log('Google Maps API script loaded successfully');
        }}
        onError={handleLoadError}
        loadingElement={
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <div className="text-center p-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-3 text-gray-600 font-medium">Loading Map</p>
              <p className="text-sm text-gray-500 mt-1">Please wait while we load the map</p>
            </div>
          </div>
        }
        libraries={['places']}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter ? { lat: mapCenter[0], lng: mapCenter[1] } : { lat: DEFAULT_CENTER[0], lng: DEFAULT_CENTER[1] }}
          zoom={zoom}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: true,
            zoomControl: true,
            clickableIcons: false,
            styles: [
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }],
              },
              {
                featureType: 'transit',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }],
              },
            ],
          }}
        >
          {/* Render location markers */}
          {locationGroups.map((location, index) => (
            <MarkerF
              key={`${location.lat}-${location.lng}-${index}`}
              position={{ lat: location.lat, lng: location.lng }}
              onClick={() => handleMarkerClick(location)}
              title={location.properties[0]?.title as string || `Location ${index + 1}`}
              options={{
                label: {
                  text: String(location.number || index + 1),
                  color: '#ffffff',
                  fontWeight: 'bold',
                  fontSize: '12px',
                },
              }}
            >
              {selectedMarker?.lat === location.lat && selectedMarker?.lng === location.lng && (
                <InfoWindowF
                  position={{ lat: location.lat, lng: location.lng }}
                  onCloseClick={() => setSelectedMarker(null)}
                >
                  <div className="max-w-xs p-2">
                    <h3 className="font-medium">{location.properties[0]?.title || `Location ${index + 1}`}</h3>
                    {location.properties[0]?.city && (
                      <p className="text-sm text-gray-600">{location.properties[0].city}</p>
                    )}
                    {location.properties[0]?.price && (
                      <p className="text-sm font-medium text-blue-600 mt-1">
                        ${location.properties[0].price.toLocaleString()} / night
                      </p>
                    )}
                  </div>
                </InfoWindowF>
              )}
            </MarkerF>
          ))}

          {/* Fallback marker when no locations are found */}
          {fallbackMarker && locationGroups.length === 0 && (
            <MarkerF
              position={{
                lat: fallbackMarker.position[0],
                lng: fallbackMarker.position[1]
              }}
              title={fallbackMarker.title}
            >
              <InfoWindowF
                position={{
                  lat: fallbackMarker.position[0],
                  lng: fallbackMarker.position[1]
                }}
              >
                <div className="max-w-xs p-2">
                  <h3 className="font-medium">{fallbackMarker.title}</h3>
                  <p className="text-sm text-gray-600">{fallbackMarker.description}</p>
                </div>
              </InfoWindowF>
            </MarkerF>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GoogleMapComponent;
