export interface Coordinates {
  lat: number;
  lng: number;
}

export const geocodeAddress = async (address: string): Promise<Coordinates> => {
  try {
    // For now, return hardcoded coordinates for the given address
    // In a production environment, you would use a geocoding service like:
    // - OpenStreetMap Nominatim (free)
    // - Google Maps Geocoding API
    // - Mapbox Geocoding API
    
    // Coordinates for "I-110, Raipur Khadar, near Windsor Grand, sector 126, noida"
    return {
      lat: 28.5415,  // Replace with actual coordinates if available
      lng: 77.3322   // Replace with actual coordinates if available
    };
  } catch (error) {
    console.error('Error geocoding address:', error);
    throw error;
  }
};
