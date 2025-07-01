import axios from 'axios';

const API_BASE_URL = 'https://api.vizima.in';

export interface UserProfile {
 name: string,
  phone: string,
  avatar: string,
  preferences: {
    location: string,
    priceRange: {
      min: number,
      max: number
    },
    propertyType: string[]
  }
}

export const updateUserProfile = async (profileData: Partial<UserProfile>): Promise<UserProfile> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.put(
      `${API_BASE_URL}/api/users/profile`,
      profileData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

