import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PrivacyPolicy = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#064749] to-[#0a7e7a] text-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-lg text-white/90 max-w-3xl">Your privacy matters to us. Learn how we protect and handle your information.</p>
           </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <p className="text-gray-700 mb-8">
            At Vizima, we are committed to protecting your privacy and ensuring the security of your personal information. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Contents</h3>
            <ol className="list-decimal pl-5 space-y-1 text-gray-700">
              <li><a href="#information-we-collect" className="text-[#064749] hover:underline">Information We Collect</a></li>
              <li><a href="#how-we-use" className="text-[#064749] hover:underline">How We Use Your Information</a></li>
              <li><a href="#how-we-protect" className="text-[#064749] hover:underline">How We Protect Your Information</a></li>
              <li><a href="#sharing" className="text-[#064749] hover:underline">Sharing of Information</a></li>
              <li><a href="#your-rights" className="text-[#064749] hover:underline">Your Rights</a></li>
              <li><a href="#data-retention" className="text-[#064749] hover:underline">Data Retention</a></li>
              <li><a href="#contact" className="text-[#064749] hover:underline">Contact Information</a></li>
            </ol>
          </div>

          <div className="space-y-8">
            <section id="information-we-collect">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Personal Information</h3>
              <p className="text-gray-700 mb-3">We may collect personal information that you voluntarily provide to us, including:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-6">
                <li>Name and contact information (email address, phone number, mailing address)</li>
                <li>Professional information (job title, company, industry)</li>
                <li>Payment and billing information for our services</li>
                <li>Communication preferences and feedback</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mb-2">Automatically Collected Information</h3>
              <p className="text-gray-700 mb-3">When you visit our website, we automatically collect certain information:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>IP address and location information</li>
                <li>Browser type and version</li>
                <li>Device information and operating system</li>
                <li>Pages visited and time spent on our website</li>
                <li>Referring website and search terms used</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section id="how-we-use">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 mb-3">We use the collected information for various purposes, including:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Providing, maintaining, and improving our services</li>
                <li>Processing transactions and sending related information</li>
                <li>Sending administrative information and service updates</li>
                <li>Responding to your comments, questions, and requests</li>
                <li>Personalizing your experience on our website</li>
                <li>Analyzing usage patterns to improve our offerings</li>
                <li>Sending marketing communications (with your consent)</li>
                <li>Detecting and preventing fraud or unauthorized activities</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            <section id="how-we-protect">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Protect Your Information</h2>
              <p className="text-gray-700 mb-3">We implement appropriate technical and organizational security measures to protect your personal information:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                <li>Encryption of sensitive data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication measures</li>
                <li>Employee training on data protection</li>
                <li>Secure hosting and data backup procedures</li>
              </ul>
              <div className="bg-[#e2f1e8] border-l-4 border-green p-4">
                <p className="text-green">
                  Please note that no method of transmission over the Internet or electronic storage is 100% secure. 
                  While we strive to protect your personal information, we cannot guarantee its absolute security.
                </p>
              </div>
            </section>

            <section id="sharing">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Sharing of Information</h2>
              <p className="text-gray-700 mb-3">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, 
                except in the following circumstances:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>With trusted service providers who assist in operating our website and conducting business</li>
                <li>When required by law or to comply with legal process</li>
                <li>To protect our rights, property, or safety, or that of our users</li>
                <li>In connection with a merger, acquisition, or sale of assets (with prior notice)</li>
              </ul>
            </section>

            <section id="your-rights">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights</h2>
              <p className="text-gray-700 mb-3">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li><span className="font-medium">Access:</span> Request a copy of your personal information we hold</li>
                <li><span className="font-medium">Correction:</span> Request correction of inaccurate or incomplete information</li>
                <li><span className="font-medium">Deletion:</span> Request deletion of your personal information</li>
                <li><span className="font-medium">Restriction:</span> Request restriction of processing in certain circumstances</li>
                <li><span className="font-medium">Portability:</span> Request transfer of your data to another service provider</li>
                <li><span className="font-medium">Objection:</span> Object to processing based on legitimate interests</li>
                <li><span className="font-medium">Consent Withdrawal:</span> Withdraw consent for marketing communications</li>
              </ul>
            </section>

            <section id="data-retention">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Retention</h2>
              <p className="text-gray-700 mb-3">
                We retain your personal information only as long as necessary to fulfill the purposes outlined in this Privacy Policy, 
                unless a longer retention period is required or permitted by law. When determining retention periods, we consider:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>The nature and sensitivity of the personal information</li>
                <li>The purposes for which we collected the information</li>
                <li>Legal requirements and obligations</li>
                <li>The need for the information to provide our services</li>
              </ul>
            </section>

            <section id="contact">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-medium">Email:</span> <a href="mailto:stay@vizima.in" className="text-[#064749] hover:underline">Stay@vizima.in</a></p>
                <p><span className="font-medium">Phone:</span> 09667300983</p>
                </div>
              <p className="mt-4 text-gray-700">
                We aim to respond to all inquiries within 30 days.
              </p>
            </section>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Policy Updates</h3>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
                Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
