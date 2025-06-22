import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';

const PrivacyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative bg-dark-200 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <h2 className="text-2xl font-display font-bold text-white">
              Privacy Policy
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2"
            >
              <HiX className="w-6 h-6" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto h-[calc(80vh-200px)] p-6">
            <div className="prose prose-invert max-w-none text-gray-300">
              
              <div className="mb-6">
                <p className="text-sm text-gray-400 mb-4">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
                <p className="mb-4">
                  At CSphotography, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website and services.
                </p>
              </div>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h3>
                
                <h4 className="text-lg font-medium text-white mb-2">Personal Information</h4>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Name, email address, and phone number</li>
                  <li>Mailing address for contract and delivery purposes</li>
                  <li>Event details and photography preferences</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                </ul>

                <h4 className="text-lg font-medium text-white mb-2">Technical Information</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>IP address and browser information</li>
                  <li>Website usage patterns and preferences</li>
                  <li>Device information and operating system</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">2. How We Use Your Information</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Providing photography and videography services</li>
                  <li>Communicating about bookings, schedules, and deliverables</li>
                  <li>Processing payments and managing contracts</li>
                  <li>Improving our website and service quality</li>
                  <li>Sending promotional materials (with your consent)</li>
                  <li>Complying with legal obligations</li>
                </ul>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">3. Information Sharing and Disclosure</h3>
                <p className="mb-3">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Service Providers:</strong> Trusted third parties who assist in our operations (payment processing, email services)</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                  <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
                  <li><strong>With Consent:</strong> When you explicitly agree to information sharing</li>
                </ul>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">4. Image and Video Privacy</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>All captured images and videos remain confidential unless you provide consent for promotional use</li>
                  <li>We may request permission to use select images for portfolio and marketing purposes</li>
                  <li>You can opt-out of promotional use at any time</li>
                  <li>Images used for promotion will not include identifying personal information without consent</li>
                  <li>Raw footage and unedited images are kept secure and not shared</li>
                </ul>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">5. Data Storage and Security</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>We implement industry-standard security measures to protect your data</li>
                  <li>All data is stored on secure, encrypted servers</li>
                  <li>Access to personal information is limited to authorized personnel only</li>
                  <li>Regular security audits and updates are performed</li>
                  <li>Data backups are encrypted and stored securely</li>
                </ul>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">6. Cookies and Tracking Technologies</h3>
                <p className="mb-3">Our website uses cookies to enhance your experience:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Essential Cookies:</strong> Required for website functionality</li>
                  <li><strong>Performance Cookies:</strong> Help us understand how visitors use our site</li>
                  <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                  <li><strong>Analytics Cookies:</strong> Provide insights for improving our services</li>
                </ul>
                <p className="mt-3">You can control cookie preferences through your browser settings.</p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">7. Your Rights and Choices</h3>
                <p className="mb-3">You have the following rights regarding your personal information:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Access:</strong> Request copies of your personal data</li>
                  <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                  <li><strong>Deletion:</strong> Request removal of your personal data</li>
                  <li><strong>Portability:</strong> Receive your data in a structured format</li>
                  <li><strong>Opt-out:</strong> Unsubscribe from promotional communications</li>
                  <li><strong>Restrict Processing:</strong> Limit how we use your information</li>
                </ul>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">8. Data Retention</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Personal information is retained for as long as necessary to provide services</li>
                  <li>Contract and payment information kept for 7 years for legal compliance</li>
                  <li>Marketing data retained until you unsubscribe</li>
                  <li>Website analytics data aggregated and anonymized after 26 months</li>
                  <li>Inactive accounts may be deleted after 3 years of inactivity</li>
                </ul>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">9. Third-Party Links</h3>
                <p>
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing personal information.
                </p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">10. Children's Privacy</h3>
                <p>
                  Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If we become aware of such collection, we will take steps to delete the information promptly.
                </p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">11. International Data Transfers</h3>
                <p>
                  Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data during international transfers.
                </p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">12. Changes to This Policy</h3>
                <p>
                  We may update this Privacy Policy periodically. We will notify you of significant changes via email or website notice. Your continued use of our services after changes constitute acceptance of the updated policy.
                </p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">Contact Us</h3>
                <p className="mb-3">
                  If you have questions about this Privacy Policy or want to exercise your rights, contact us:
                </p>
                <ul className="list-none space-y-1">
                  <li><strong>Email:</strong> amanpatel3378@gmail.com</li>S
                  <li><strong>Phone:</strong> 9575548611</li>
                  <li><strong>Address:</strong> Mandir Hasuad, Raipur, Chhattisgarh</li>
                  <li><strong>Data Protection Officer:</strong> privacy@CSphotography.com</li>
                </ul>
              </section>

            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-700 bg-dark-300">
            <button
              onClick={onClose}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              I Understand
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PrivacyModal;