import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TermsOfService = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#064749] to-[#0a7e7a] text-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Terms of Service</h1>
          <p className="text-lg text-white/90 max-w-3xl">Please read these terms carefully before using our services.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <p className="text-gray-700 mb-8">
            By accessing or using the Vizima website and services, you agree to the following terms and conditions. 
            Please read them carefully.
          </p>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Contents</h3>
            <ol className="list-decimal pl-5 space-y-1 text-gray-700">
              <li><a href="#acceptance" className="text-[#064749] hover:underline">Acceptance of Terms</a></li>
              <li><a href="#services" className="text-[#064749] hover:underline">Services Provided</a></li>
              <li><a href="#responsibilities" className="text-[#064749] hover:underline">User Responsibilities</a></li>
              <li><a href="#intellectual-property" className="text-[#064749] hover:underline">Intellectual Property</a></li>
              <li><a href="#liability" className="text-[#064749] hover:underline">Limitation of Liability</a></li>
              <li><a href="#termination" className="text-[#064749] hover:underline">Termination</a></li>
              <li><a href="#modifications" className="text-[#064749] hover:underline">Modifications</a></li>
              <li><a href="#governing-law" className="text-[#064749] hover:underline">Governing Law</a></li>
              <li><a href="#contact" className="text-[#064749] hover:underline">Contact Us</a></li>
              <li><a href="#careers" className="text-[#064749] hover:underline">Career Opportunities</a></li>
            </ol>
          </div>

          <div className="space-y-8">
            <section id="acceptance">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700">
                By using our website, you agree to follow these terms and any future updates posted on our platform. 
                If you do not agree with any part of these terms, please refrain from using the website.
              </p>
            </section>

            <section id="services">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Services Provided</h2>
              <p className="text-gray-700">
                Vizima offers shared living spaces, community services, and lifestyle support designed to enhance modern urban living.
              </p>
            </section>

            <section id="responsibilities">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Responsibilities</h2>
              <p className="text-gray-700 mb-3">You agree to:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Use the website for lawful purposes only</li>
                <li>Provide accurate information when filling out forms</li>
                <li>Keep your login details confidential</li>
              </ul>
            </section>

            <section id="intellectual-property">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Intellectual Property</h2>
              <p className="text-gray-700">
                All content, images, logos, designs, and materials are the property of Vizima or its licensors and are protected by copyright laws. 
                You may not copy, reuse, or redistribute content without our permission.
              </p>
            </section>

            <section id="liability">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Limitation of Liability</h2>
              <p className="text-gray-700">
                Vizima is not responsible for indirect, incidental, or consequential damages arising from the use of the website or services. 
                We strive to ensure accurate information but do not guarantee uninterrupted service.
              </p>
            </section>

            <section id="termination">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Termination</h2>
              <p className="text-gray-700">
                We reserve the right to suspend or terminate user access at our discretion if these terms are violated or in cases of fraudulent activity.
              </p>
            </section>

            <section id="modifications">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Modifications</h2>
              <p className="text-gray-700">
                These terms may be updated from time to time. Continued use of the website implies acceptance of any changes.
              </p>
            </section>

            <section id="governing-law">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Governing Law</h2>
              <p className="text-gray-700">
                These terms are governed by the laws of India. Any disputes arising from the use of this website or services 
                will be subject to the jurisdiction of the courts in India.
              </p>
            </section>

            <section id="contact">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Us</h2>
              <p className="text-gray-700">
                For questions or clarifications regarding these terms, contact us at:
              </p>
              <div className="mt-2">
                <a href="mailto:Stay@vizima.in" className="text-[#064749] hover:underline flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Stay@vizima.in
                </a>
              </div>
            </section>

            <section id="careers">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Career Opportunities</h2>
              <p className="text-gray-700 mb-3">
                Join our growing team! If you're interested in being part of our community, please share your resume with us at:
              </p>
              <div className="mt-2">
                <a href="mailto:Stay@vizima.in" className="text-[#064749] hover:underline flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Stay@vizima.in
                </a>
              </div>
              <p className="text-gray-700 mt-2">
                We will review all applications and contact you if your profile matches our needs.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
