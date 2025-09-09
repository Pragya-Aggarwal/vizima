import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Users, Briefcase, CheckCircle, Heart } from 'lucide-react';

const Career = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const benefits = [
    'Competitive salary and benefits package',
    'Health insurance and wellness programs',
    'Opportunities for professional growth',
    'Vibrant and inclusive work environment',
    'Employee discounts on accommodations',
    'Team building activities and events'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#064749] to-[#0a7e7a] text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Be part of a team that's redefining urban living through innovative co-living spaces.
          </p>
        </div>
      </div>

      {/* Current Openings */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Want to Be Part of Our Journey?</h2>
          <div className="w-20 h-1 bg-[#064749] mx-auto"></div>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Even though we don't have any open positions right now, we're always excited to connect with passionate individuals who share our vision.
          </p>
          <div className="mt-8">
            <a 
              href="mailto:Stay@vizima.in?subject=Career Opportunity - [Your Name]"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#064749] hover:bg-[#0a7e7a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#064749] transition-colors"
            >
              <Mail className="w-5 h-5 mr-2" />
              Send Us Your Details
            </a>
          </div>
        </div>
      </div>

      {/* Why Join Us */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Why Join Vizima?</h2>
            <div className="w-20 h-1 bg-[#064749] mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              At Vizima, we're building more than just living spaces - we're creating communities. 
              Join us in our mission to redefine urban living.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-[#e2f1e8] rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-[#064749]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Inclusive Culture</h3>
              <p className="text-gray-600">
                We celebrate diversity and believe in creating an inclusive environment where everyone can thrive.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-[#e2f1e8] rounded-full flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-[#064749]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Growth Opportunities</h3>
              <p className="text-gray-600">
                We invest in our team's development with training programs and career advancement opportunities.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-[#e2f1e8] rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-[#064749]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Work-Life Balance</h3>
              <p className="text-gray-600">
                We understand the importance of balancing work and personal life for overall well-being.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Employee Benefits</h2>
            <div className="w-20 h-1 bg-[#064749] mx-auto mb-8"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default Career;
