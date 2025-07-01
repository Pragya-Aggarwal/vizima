import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Edit, Save, X, Camera, Loader2, MapPin } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { updateUserProfile, type UserProfile } from '../../services/userService';
import { toast } from '../../components/ui/use-toast';

interface Preferences {
  location: string;
  priceRange: {
    min: number;
    max: number;
  };
  propertyType: string[];
}

interface ProfileData extends UserProfile {
  preferences: Preferences;
}

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ProfileData>({
    name: '',
    phone: '',
    avatar: '',
    preferences: {
      location: '',
      priceRange: {
        min: 0,
        max: 0
      },
      propertyType: []
    }
  });

  const [tempData, setTempData] = useState<ProfileData>({ ...formData });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // TODO: Replace with actual API call to fetch user profile
        // const response = await getUserProfile();
        // setFormData(response.data);
        // setTempData(response.data);
        // if (response.data.profileImage) {
        //   setProfileImage(response.data.profileImage);
        // }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        toast(
          {
            title: "Error",
            description: "Failed to load profile data. Please try again.",
            variant: "destructive",
          }
        );
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name.includes('preferences.')) {
      const [_, child] = name.split('.');
      if (child === 'location' || child === 'propertyType') {
        setTempData(prev => ({
          ...prev,
          preferences: {
            ...prev.preferences,
            [child]: value
          }
        }));
      } else if (child.startsWith('priceRange.')) {
        const priceField = child.split('.')[1];
        if (priceField === 'min' || priceField === 'max') {
          setTempData(prev => ({
            ...prev,
            preferences: {
              ...prev.preferences,
              priceRange: {
                ...prev.preferences.priceRange,
                [priceField]: value === '' ? '' : Number(value)
              }
            }
          }));
        }
      }
    } else {
      setTempData(prev => ({
        ...prev,
        [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value
      }));
    }
  };

 

  const handleSave = async () => {
    try {
      setIsSubmitting(true);
      
      // Update profile data
      const updatedProfile = await updateUserProfile(tempData);
      
      setFormData(updatedProfile);
      
      toast(
        {
          title: "Success",
          description: "Profile updated successfully.",
          variant: "success",
        }
      );
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast(
        {
          title: "Error",
          description: "Failed to update profile. Please try again.",
          variant: "destructive",
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsSubmitting(true);
      // TODO: Implement image upload logic
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderPhoneField = () => {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center py-2 sm:py-3">
        <div className="w-full sm:w-1/3 font-medium text-gray-900 text-sm sm:text-base mb-1 sm:mb-0">Phone Number</div>
        <div className="w-full sm:w-2/3">
          {isEditing ? (
            <div className="relative">
              <input
                type="tel"
                name="phone"
                value={tempData.phone || ''}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-sm focus:border-green focus:ring-green"
              />
            </div>
          ) : (
            <p className="text-gray-900 text-sm sm:text-base">
              {formData.phone || <span className="text-gray-400">Not specified</span>}
            </p>
          )}
        </div>
      </div>
    );
  };

  const renderPriceRangeField = () => {
    return (
      <div className="space-y-2 sm:space-y-4">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Min (₹)</label>
            <div className="relative">
              <input
                type="number"
                name="preferences.priceRange.min"
                min="0"
                value={tempData.preferences.priceRange?.min || ''}
                onChange={handleInputChange}
                className="focus:ring-green focus:border-green block w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md"
                placeholder="0"
                disabled={!isEditing}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Max (₹)</label>
            <div className="relative">
              <input
                type="number"
                name="preferences.priceRange.max"
                min={tempData.preferences.priceRange?.min || 0}
                value={tempData.preferences.priceRange?.max || ''}
                onChange={handleInputChange}
                className="focus:ring-green focus:border-green block w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md"
                placeholder="0"
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPropertyTypeField = () => {
    const propertyTypes = ['Apartment', 'Villa', 'House', 'Plot', 'Commercial'];

    const handlePropertyTypeToggle = (type: string) => {
      setTempData(prev => {
        const types = prev.preferences.propertyType || [];
        const newTypes = types.includes(type)
          ? types.filter(t => t !== type)
          : [...types, type];
        return {
          ...prev,
          preferences: {
            ...prev.preferences,
            propertyType: newTypes,
          },
        };
      });
    };

    return (
      <div className="flex flex-wrap gap-2">
        {propertyTypes.map(type => (
          <button
            key={type}
            type="button"
            onClick={() => handlePropertyTypeToggle(type)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              tempData.preferences.propertyType?.includes(type)
                ? 'bg-green text-white border border-green hover:bg-green'
                : 'bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200'
            } ${!isEditing ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={!isEditing}
          >
            {type}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-6 sm:mb-8">
          <Button
            variant="ghost"
            size="icon"
            className="mr-3 sm:mr-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">My Profile</h1>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="px-4 sm:px-6 py-6 sm:py-8 bg-gradient-to-r from-green to-blue">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0">
              <div className="relative group">
                <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
                  {formData.avatar ? (
                    <img
                      src={formData.avatar}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400" />
                  )}
                </div>
                
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-6 lg:ml-8 flex-1 w-full">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-4 sm:space-y-0">
                  <div className="flex-1 w-full">
                    <div className="flex flex-col space-y-2">
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={tempData.name}
                          onChange={handleInputChange}
                          className="text-xl sm:text-2xl font-bold text-gray-900 border-b border-gray-300 focus:border-green focus:outline-none w-full bg-transparent"
                          placeholder="Your name"
                        />
                      ) : (
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{formData.name || 'Your Name'}</h2>
                      )}
                      <div className="flex items-center text-gray-700">
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                          {isEditing ? (
                            <input
                              type="text"
                              name="preferences.location"
                              value={tempData.preferences.location}
                              onChange={handleInputChange}
                              className="border-b border-gray-300 focus:border-green focus:outline-none ml-1 bg-transparent w-full max-w-xs"
                              placeholder="Add location"
                            />
                          ) : (
                            <span className="text-sm sm:text-base">{formData.preferences.location || 'Location not set'}</span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full sm:w-auto flex justify-end">
                    {!isEditing ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setTempData(JSON.parse(JSON.stringify(formData)));
                          setIsEditing(true);
                        }}
                        className="w-full sm:w-auto"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    ) : (
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsEditing(false);
                            setTempData(JSON.parse(JSON.stringify(formData)));
                          }}
                          disabled={isSubmitting}
                          className="w-full sm:w-auto"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                        <Button 
                          onClick={handleSave}
                          className="w-full sm:w-auto bg-green hover:bg-green flex items-center"
                          disabled={isSubmitting}
                        >
                        {isSubmitting ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Save className="h-4 w-4 mr-2" />
                        )}
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="px-4 sm:px-6 py-6 sm:py-8">
            <div className="border-b border-gray-200 pb-4 sm:pb-6">
              <h3 className="text-lg sm:text-xl font-medium text-gray-900">Contact Information</h3>
              <p className="mt-1 text-sm text-gray-500">Update your contact details.</p>
            </div>

            <div className="mt-6 sm:mt-8">
              <div className="space-y-8 sm:space-y-10">
                {/* Phone Number */}
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-2 sm:mb-3">Phone Number</h3>
                  <div className="py-1">
                    {renderPhoneField()}
                  </div>
                </div>

                {/* Price Range */}
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-2 sm:mb-3">Price Range</h3>
                  <div>
                    {renderPriceRangeField()}
                  </div>
                </div>

                {/* Property Preferences */}
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-2 sm:mb-3">Property Preferences</h3>
                  <div className="mt-2">
                    {renderPropertyTypeField()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;