import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Edit, Save, X, Camera, Loader2, MapPin } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { editUserProfile, getUserProfile, type UserProfile } from '../../services/userService';
import { toast } from '../../components/ui/use-toast';


interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
  dob: string;
  gender: string;
  maritalStatus: string;
  occupation: string;
  company: string;
  website: string;
  bio: string;
  tempPhone: string;
  avatar: string;
}

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ProfileData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
    gender: '',
    maritalStatus: '',
    occupation: '',
    company: '',
    website: '',
    bio: '',
    tempPhone: '',
    avatar: ''
  });

  const [tempData, setTempData] = useState<ProfileData>({ ...formData });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        setFormData(response.data);
        setTempData(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        toast({
          title: "Error",
          description: "Failed to load profile data. Please try again.",
          variant: "destructive",
        });
      }
    };
    fetchUserProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setTempData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value
    }));
  };

  const handleSave = async () => {
    try {
      setIsSubmitting(true);
      // Update profile data
      await editUserProfile(tempData);
      // Fetch the latest profile data
      const response = await getUserProfile();
      setFormData(response.data);
      setTempData(response.data);
      toast({
        title: "Success",
        description: "Profile updated successfully.",
        variant: "success",
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
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

  return (
    <div className="mt-10 min-h-screen bg-gradient-to-br from-green-500 via-white to-green-500 flex items-center justify-center py-8 px-2">
      <div className="w-full max-w-2xl">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          {/* Profile Header */}
          <div className="flex flex-col items-center justify-center py-10 px-4 bg-gradient-to-r from-green to-green">
            <div className="relative group mb-4">
              <div className="h-32 w-32 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-4 border-green shadow-lg">
                {formData.avatar ? (
                  <img
                    src={formData.avatar}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User className="h-16 w-16 text-green" />
                )}
              </div>
            </div>
            <div className="text-center">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={tempData.name}
                  onChange={handleInputChange}
                  className="text-2xl font-bold text-white border-b border-green focus:border-white focus:outline-none w-full bg-transparent text-center placeholder-white/70"
                  placeholder="Your name"
                />
              ) : (
                <h2 className="text-2xl font-bold text-white drop-shadow-lg">{formData.name || 'Your Name'}</h2>
              )}
            </div>
            <div className="mt-2 text-green text-sm font-medium">
              {formData.occupation && <span>{formData.occupation}</span>}
              {formData.company && <span> @ {formData.company}</span>}
            </div>
            <div className="mt-4 flex gap-2 justify-center">
              {!isEditing ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setTempData(JSON.parse(JSON.stringify(formData)));
                    setIsEditing(true);
                  }}
                  className="bg-white/90 text-white border-green hover:bg-green hover:text-white shadow"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setTempData(JSON.parse(JSON.stringify(formData)));
                    }}
                    disabled={isSubmitting}
                    className="bg-white/90 text-white border-green hover:bg-green hover:text-white shadow"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="bg-green hover:bg-green text-white flex items-center shadow"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6 sm:p-10">
            <div className="mb-8">
              <h3 className="text-lg sm:text-xl font-semibold text-green mb-1">Personal Information</h3>
              <p className="text-xs text-gray-500 mb-4">Update your personal details below.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Date of Birth */}
                <div>
                  <label className="block text-xs font-medium text-green mb-1">Date of Birth</label>
                  {isEditing ? (
                    <input
                      type="date"
                      name="dob"
                      value={tempData.dob || ''}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 py-2 px-3 text-sm focus:border-green focus:ring-green"
                    />
                  ) : (
                    <div className="text-gray-900 text-sm">{formData.dob || <span className="text-gray-400">Not specified</span>}</div>
                  )}
                </div>
                {/* Gender */}
                <div>
                  <label className="block text-xs font-medium text-green mb-1">Gender</label>
                  {isEditing ? (
                    <select
                      name="gender"
                      value={tempData.gender || ''}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 py-2 px-3 text-sm focus:border-green focus:ring-green"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <div className="text-gray-900 text-sm">{formData.gender || <span className="text-gray-400">Not specified</span>}</div>
                  )}
                </div>
                {/* Marital Status */}
                <div>
                  <label className="block text-xs font-medium text-green mb-1">Marital Status</label>
                  {isEditing ? (
                    <select
                      name="maritalStatus"
                      value={tempData.maritalStatus || ''}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 py-2 px-3 text-sm focus:border-green focus:ring-green"
                    >
                      <option value="">Select Marital Status</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <div className="text-gray-900 text-sm">{formData.maritalStatus || <span className="text-gray-400">Not specified</span>}</div>
                  )}
                </div>
                {/* Bio */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-green mb-1">Bio</label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={tempData.bio || ''}
                      onChange={handleInputChange}
                      placeholder="Bio"
                      className="block w-full rounded-lg border border-gray-300 py-2 px-3 text-sm focus:border-green focus:ring-green min-h-[60px]"
                    />
                  ) : (
                    <div className="text-gray-900 text-sm">{formData.bio || <span className="text-gray-400">Not specified</span>}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-lg sm:text-xl font-semibold text-green mb-1">Contact Information</h3>
              <p className="text-xs text-gray-500 mb-4">Update your contact details below.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-medium text-green mb-1">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={tempData.phone || ''}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                      className="block w-full rounded-lg border border-gray-300 py-2 px-3 text-sm focus:border-green focus:ring-green-200"
                    />
                  ) : (
                    <div className="text-gray-900 text-sm">{formData.phone || <span className="text-gray-400">Not specified</span>}</div>
                  )}
                </div>
                {/* Email */}
                <div>
                  <label className="block text-xs font-medium text-green mb-1">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={tempData.email || ''}
                      onChange={handleInputChange}
                      placeholder="Email"
                      className="block w-full rounded-lg border border-gray-300 py-2 px-3 text-sm focus:border-green focus:ring-green"
                    />
                  ) : (
                    <div className="text-gray-900 text-sm">{formData.email || <span className="text-gray-400">Not specified</span>}</div>
                  )}
                </div>
                {/* Address */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-green mb-1">Address</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={tempData.address || ''}
                      onChange={handleInputChange}
                      placeholder="Address"
                      className="block w-full rounded-lg border border-gray-300 py-2 px-3 text-sm focus:border-green focus:ring-green"
                    />
                  ) : (
                    <div className="text-gray-900 text-sm">{formData.address || <span className="text-gray-400">Not specified</span>}</div>
                  )}
                </div>
                {/* Website */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-green mb-1">Website</label>
                  {isEditing ? (
                    <input
                      type="url"
                      name="website"
                      value={tempData.website || ''}
                      onChange={handleInputChange}
                      placeholder="Website"
                      className="block w-full rounded-lg border border-gray-300 py-2 px-3 text-sm focus:border-green focus:ring-green"
                    />
                  ) : (
                    <div className="text-gray-900 text-sm">{formData.website || <span className="text-gray-400">Not specified</span>}</div>
                  )}
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