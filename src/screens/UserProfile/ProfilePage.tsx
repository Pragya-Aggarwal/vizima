import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Edit, Save, Lock, LogOut, X, Camera } from 'lucide-react';
import { Button } from '../../components/ui/button';

type ProfileData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  dob: string;
  bio: string;
  occupation: string;
  company: string;
  website: string;
  gender: string;
  maritalStatus: string;
};

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProfileData>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    dob: '1990-01-01',
    bio: 'Experienced professional with a passion for technology and design.',
    occupation: 'Senior Software Engineer',
    company: 'Tech Solutions Inc.',
    website: 'johndoe.dev',
    gender: 'Male',
    maritalStatus: 'Single'
  });

  const [tempData, setTempData] = useState<ProfileData>({ ...formData });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTempData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = () => {
    setFormData({ ...tempData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData({ ...formData });
    setIsEditing(false);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const renderEditableField = (
    label: string, 
    name: keyof ProfileData, 
    type = 'text',
    options?: { value: string; label: string }[]
  ) => {
    return (
      <div className="flex flex-col sm:flex-row sm:items-start py-7">
        <label className="block text-sm font-medium text-gray-700 sm:w-1/4 sm:pt-2">
          {label}
        </label>
        <div className="mt-1 sm:mt-0 sm:w-3/4">
          {isEditing ? (
            type === 'textarea' ? (
              <textarea
                name={name}
                value={tempData[name]}
                onChange={handleInputChange}
                rows={3}
                className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            ) : type === 'select' && options ? (
              <select
                name={name}
                value={tempData[name]}
                onChange={handleInputChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              >
                {options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={type}
                name={name}
                value={tempData[name]}
                onChange={handleInputChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            )
          ) : (
            <p className="text-gray-900">
              {name === 'dob' 
                ? new Date(formData.dob).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                : formData[name] || <span className="text-gray-400">Not specified</span>}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-10 sm:top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate(-1)}
                className="mr-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">My Profile</h1>
            </div>
            {!isEditing ? (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsEditing(true)}
                className="flex items-center"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleCancel}
                  className="flex items-center"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button 
                  onClick={handleSave}
                  className="flex items-center bg-green hover:bg-green-600 mt-2"
                >
                  <Save className="h-4 w-4 mr-2 " />
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 pt-20 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {/* Profile Header */}
          <div className="px-6 py-5 border-b border-gray-200">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4">
                <div className="relative w-32 h-32 mx-auto md:mx-0">
                  <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {profileImage ? (
                      <img 
                        src={profileImage} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="h-16 w-16 text-gray-400" />
                    )}
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-green-500 text-white p-1.5 rounded-full cursor-pointer hover:bg-green-600">
                      <Camera className="h-4 w-4" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  )}
                </div>
              </div>
              <div className="mt-4 md:mt-0 md:ml-8 flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={tempData.name}
                    onChange={handleInputChange}
                    className="text-2xl font-bold text-gray-900 border-b border-gray-300 focus:border-green-500 focus:outline-none w-full"
                  />
                ) : (
                  <h2 className="text-2xl font-bold text-gray-900">{formData.name}</h2>
                )}
                {isEditing ? (
                  <input
                    type="text"
                    name="occupation"
                    value={tempData.occupation}
                    onChange={handleInputChange}
                    className="text-gray-600 mt-1 border-b border-gray-300 focus:border-green-500 focus:outline-none w-full"
                    placeholder="Your occupation"
                  />
                ) : (
                  <p className="text-gray-600 mt-1">{formData.occupation}</p>
                )}
                {isEditing ? (
                  <input
                    type="text"
                    name="company"
                    value={tempData.company}
                    onChange={handleInputChange}
                    className="text-gray-500 text-sm mt-1 border-b border-gray-300 focus:border-green-500 focus:outline-none w-full"
                    placeholder="Your company"
                  />
                ) : (
                  <p className="text-gray-500 text-sm mt-1">{formData.company}</p>
                )}
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="px-6 py-5">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                <div className="space-y-4">
                  {renderEditableField('Full Name', 'name')}
                  {renderEditableField('Email', 'email', 'email')}
                  {renderEditableField('Phone', 'phone', 'tel')}
                  {renderEditableField('Address', 'address')}
                  {renderEditableField('Date of Birth', 'dob', 'date')}
                  {renderEditableField('Gender', 'gender', 'select', [
                    { value: 'Male', label: 'Male' },
                    { value: 'Female', label: 'Female' },
                    { value: 'Other', label: 'Other' },
                    { value: 'Prefer not to say', label: 'Prefer not to say' }
                  ])}
                  {renderEditableField('Marital Status', 'maritalStatus', 'select', [
                    { value: 'Single', label: 'Single' },
                    { value: 'Married', label: 'Married' },
                    { value: 'Divorced', label: 'Divorced' },
                    { value: 'Widowed', label: 'Widowed' }
                  ])}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Professional Information</h3>
                <div className="space-y-4">
                  {renderEditableField('Occupation', 'occupation')}
                  {renderEditableField('Company', 'company')}
                  {renderEditableField('Website', 'website', 'url')}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">About</h3>
                {renderEditableField('Bio', 'bio', 'textarea')}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};