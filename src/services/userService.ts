import axios from 'axios';

const API_BASE_URL = 'https://api.vizima.in';

export interface UserProfile {
  name: string,
  phone: string,
  avatar: string,
  email: string,
  address: string,
  dob: string,
  gender: string,
  maritalStatus: string,
  occupation: string,
  company: string,
}



export const sendPhoneOtp = async (phone: string): Promise<any> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/send-phone-otp`,
      { phone },

    );
    return response.data;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
};

export const verifyPhoneOtp = async (phone: string, otp: string): Promise<any> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/verify-phone-otp`,
      { phone, otp }
    );
    return response.data;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};

export const editUserProfile = async (profileData: any): Promise<any> => {
  try {
    const token = sessionStorage.getItem('token')
    if (!token) {
      throw new Error('No authentication token found');
    }
    const response = await axios.put(
      `${API_BASE_URL}/api/users/edit-profile`,
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
    console.error('Error editing user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (): Promise<any> => {
  try {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    const response = await axios.get(
      `${API_BASE_URL}/api/users/profile`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

