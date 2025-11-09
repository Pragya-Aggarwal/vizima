'use client';

import React, { useCallback, useEffect, useState, useRef } from 'react';
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
  mapCenter: [number, number];
  zoom?: number;
  fallbackMarker?: {
    position: [number, number];
    title: string;
    description: string;
  };
  onMarkerClick?: (marker: LocationGroup) => void;
  onError?: (error: Error) => void;
}
// Google Maps API key - Make sure to enable 'Maps JavaScript API' in Google Cloud Console
// For production, use environment variables instead of hardcoding the key
const GOOGLE_MAPS_API_KEY = 'AIzaSyA-2pt2V1S0Ik319sDimuDogUt8I8zSDLo';

if (!GOOGLE_MAPS_API_KEY) {
  console.error('Google Maps API key is missing. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your environment variables.');
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({
  locationGroups = [],
  mapCenter,
  zoom = 5,
  fallbackMarker,
  onMarkerClick = () => {},
  onError = () => {}
}) => {
  const [selectedMarker, setSelectedMarker] = useState<LocationGroup | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<Error | null>(null);
  const [loadTimeout, setLoadTimeout] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<Record<string, unknown>>({});
  const mapRef = useRef<HTMLDivElement>(null);

  // Map container style
  const containerStyle = {
    width: '100%',
    height: '100%',
    minHeight: '400px',
    borderRadius: '8px'
  };

  // Handle map load
  const onLoad = useCallback((map: google.maps.Map) => {
    console.log('Google Map instance loaded successfully');
    setMap(map);
    setIsLoaded(true);
  }, []);

  // Handle map load error
  const handleLoadError = useCallback((error: Error) => {
    console.error('Error loading Google Maps:', error);
    setLoadError(error);
    onError(error);
  }, [onError]);

  // Update map bounds when location groups change
  useEffect(() => {
    if (!map || !isLoaded || locationGroups.length === 0) return;

    try {
      const bounds = new window.google.maps.LatLngBounds();
      
      locationGroups.forEach(group => {
        bounds.extend(new window.google.maps.LatLng(group.lat, group.lng));
      });
      
      if (fallbackMarker && locationGroups.length === 0) {
        bounds.extend(new window.google.maps.LatLng(
          fallbackMarker.position[0],
          fallbackMarker.position[1]
        ));
      }

      if (!bounds.isEmpty()) {
        map.fitBounds(bounds, {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50
        });
      }
    } catch (error) {
      console.error('Error updating map bounds:', error);
    }
  }, [map, isLoaded, locationGroups, fallbackMarker]);

  // Handle marker click
  const handleMarkerClick = useCallback((marker: LocationGroup) => {
    setSelectedMarker(marker);
    onMarkerClick(marker);
  }, [onMarkerClick]);

  // Add debug logging
  useEffect(() => {
    console.log('GoogleMapComponent state:', {
      isLoaded,
      loadError,
      locationGroups: locationGroups?.length,
      mapCenter,
      zoom
    });
  }, [isLoaded, loadError, locationGroups, mapCenter, zoom]);

  // Check API key and set up loading timeout
  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY) {
      const error = 'Google Maps API key is missing. Please check your configuration.';
      console.error(error);
      setApiError(error);
      return;
    }

    const debugInfo = {
      hasWindow: typeof window !== 'undefined',
      hasGoogle: typeof window !== 'undefined' && !!window.google,
      hasGoogleMaps: typeof window !== 'undefined' && !!(window.google?.maps),
      apiKeyFirstChars: GOOGLE_MAPS_API_KEY.substring(0, 6) + '...',
      currentUrl: typeof window !== 'undefined' ? window.location.href : '',
      timestamp: new Date().toISOString()
    };
    
    console.log('Google Maps Debug Info:', debugInfo);
    setDebugInfo(debugInfo);

    const timer = setTimeout(() => {
      if (!isLoaded) {
        console.warn('Map loading is taking too long. Showing fallback UI.');
        console.warn('Debug Info:', debugInfo);
        setLoadTimeout(true);
        
        if (!window.google) {
          setApiError('Google Maps API script failed to load. This could be due to:');
        } else if (!window.google.maps) {
          setApiError('Google Maps API is loaded but maps module is not available.');
        } else {
          setApiError('Map failed to initialize. Please check your API key and network connection.');
        }
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [isLoaded]);

  // Loading state
  if (!isLoaded || loadTimeout) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
        <div className="max-w-2xl w-full bg-white p-6 rounded-lg shadow-md">
          {loadTimeout ? (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-4">
                <svg className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Map Loading is Taking Too Long</h2>
              <p className="text-gray-600">Please check your internet connection and try again.</p>
              
              {apiError && (
                <div className="max-w-md mx-auto mt-6 text-left">
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">Error Details</h3>
                        <div className="mt-2 text-sm text-red-700">
                          <p>{apiError}</p>
                          <p className="mt-2">
                            API Key: {debugInfo.apiKeyFirstChars || 'Not found'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                    <h3 className="text-sm font-medium text-blue-800">Troubleshooting Steps:</h3>
                    <ol className="mt-2 text-sm text-blue-700 list-decimal pl-5 space-y-1">
                      <li>Verify API key is enabled for <strong>Maps JavaScript API</strong></li>
                      <li>Check that billing is enabled for your project</li>
                      <li>Ensure your domain is in the API key's allowed referrers</li>
                      <li>Try in an incognito window to rule out extensions</li>
                    </ol>
                  </div>
                </div>
              )}
              
              <button 
                onClick={() => window.location.reload()} 
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center mx-auto"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                Try Again
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <h2 className="text-xl font-bold text-gray-900 mt-4">Loading Map...</h2>
              <p className="text-gray-600">This may take a moment</p>
            </div>
          )}
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
    <div className="w-full h-full relative" ref={mapRef}>
      <LoadScript
        googleMapsApiKey={GOOGLE_MAPS_API_KEY}
        onLoad={() => {
          console.log('Google Maps API script loaded successfully');
          if (window.google?.maps) {
            console.log('google.maps API is available');
            setIsLoaded(true);
          } else {
            const error = new Error('Google Maps API is not available after load');
            console.error(error);
            handleLoadError(error);
          }
        }}
        onError={handleLoadError}
        loadingElement={
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading Google Maps...</p>
              <p className="text-xs text-gray-500 mt-1">Please wait while we load the map</p>
            </div>
          </div>
        }
        libraries={['places']}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat: mapCenter[0], lng: mapCenter[1] }}
          zoom={zoom}
          onLoad={onLoad}
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
