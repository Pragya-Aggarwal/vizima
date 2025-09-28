import React, { useState } from 'react';
import { toast } from '../components/ui/use-toast';
import { User, X } from 'lucide-react';

const CustomerDetailButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    pgType: 'male' as 'male' | 'female' | 'unisex' | 'trans'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.vizima.in/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast({
          title: 'Success!',
          description: 'Your details have been submitted successfully.',
          variant: 'success'
        });
        setFormData({
          name: '',
          phone: '',
          location: '',
          pgType: 'male' as const
        });
        setIsOpen(false);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit form. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div
        className="fixed bottom-24 right-6 z-50 cursor-pointer flex items-center gap-3 group"
        onClick={() => setIsOpen(true)}
        aria-label="Customer Details"
      >
        <span className="text-green text-[20px] font-medium bg-white px-4 py-2 rounded-full shadow-md transition-opacity duration-300 whitespace-nowrap">
          Get a Callback
        </span>
        <div className="bg-green hover:bg-green/90 text-white p-3 rounded-full shadow-lg transition-all duration-300 group-hover:scale-105">
          <User className="w-5 h-5" />
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-xl">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close form"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl font-bold mb-6 text-green">Get a Callback</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label htmlFor="pgType" className="block text-sm font-medium text-gray-700 mb-1">
                  PG Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="pgType"
                  name="pgType"
                  value={formData.pgType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent transition-colors"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="unisex">Unisex</option>
                  <option value="trans">Transgender</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green hover:bg-green/90 text-white py-2.5 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-green focus:ring-offset-2 disabled:opacity-50 transition-colors font-medium"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerDetailButton;
