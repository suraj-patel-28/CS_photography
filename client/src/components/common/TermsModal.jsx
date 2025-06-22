import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';

const TermsModal = ({ isOpen, onClose }) => {
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
              Terms & Conditions
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
                  Welcome to CSphotography. These Terms and Conditions ("Terms") govern your use of our website and services. By accessing or using our services, you agree to be bound by these Terms.
                </p>
              </div>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">1. Photography Services</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>All photography sessions require advance booking and deposit payment</li>
                  <li>Session times and locations must be confirmed 48 hours in advance</li>
                  <li>Weather conditions may affect outdoor sessions - alternative arrangements will be made</li>
                  <li>Client is responsible for obtaining necessary permits for special locations</li>
                </ul>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">2. Payment Terms</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>50% deposit required to secure booking, remaining balance due on session day</li>
                  <li>All payments are non-refundable unless cancelled by CSphotography</li>
                  <li>Late payment fees may apply for overdue invoices</li>
                  <li>Prices are subject to change with 30 days notice</li>
                </ul>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">3. Image Rights and Usage</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>CSphotography retains copyright to all images taken during sessions</li>
                  <li>Clients receive usage rights for personal, non-commercial use</li>
                  <li>CSphotography may use images for portfolio, marketing, and promotional purposes</li>
                  <li>Commercial usage requires separate licensing agreement</li>
                  <li>Images may not be altered without written permission</li>
                </ul>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">4. Delivery and Timeline</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Edited images delivered within 2-4 weeks of session completion</li>
                  <li>Rush delivery available for additional fee</li>
                  <li>All images delivered via secure online gallery</li>
                  <li>Gallery access expires after 1 year unless extended</li>
                </ul>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">5. Cancellation Policy</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Cancellations made 7+ days before session: full refund minus processing fee</li>
                  <li>Cancellations made 3-7 days before: 50% refund</li>
                  <li>Cancellations made less than 3 days: no refund</li>
                  <li>Weather-related cancellations will be rescheduled at no charge</li>
                </ul>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">6. Liability and Insurance</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>CSphotography carries professional liability insurance</li>
                  <li>Not responsible for injury to clients during sessions</li>
                  <li>Equipment failure backup plans in place for all sessions</li>
                  <li>Force majeure events may void contracts without penalty</li>
                </ul>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">7. Client Responsibilities</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Arrive on time for scheduled sessions</li>
                  <li>Provide accurate contact information and session details</li>
                  <li>Ensure all participants are aware of session terms</li>
                  <li>Respect photographer's creative direction and expertise</li>
                </ul>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">8. Dispute Resolution</h3>
                <p className="mb-2">
                  Any disputes arising from these terms will be resolved through:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Good faith negotiation between parties</li>
                  <li>Mediation if direct negotiation fails</li>
                  <li>Arbitration as final resort</li>
                  <li>Governing law: State of Chhattisgarh, India</li>
                </ul>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">9. Privacy and Data Protection</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Client information kept confidential and secure</li>
                  <li>No sharing of personal data with third parties without consent</li>
                  <li>Right to request data deletion upon contract completion</li>
                  <li>Cookies used only for website functionality improvement</li>
                </ul>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">10. Modifications</h3>
                <p>
                  CSphotography reserves the right to modify these terms at any time. 
                  Clients will be notified of significant changes via email. 
                  Continued use of services constitutes acceptance of modified terms.
                </p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">Contact Information</h3>
                <p>
                  For questions about these Terms & Conditions, please contact us at:
                </p>
                <ul className="list-none mt-2 space-y-1">
                  <li>Email: amanpatel3378@gmail.com</li>
                  <li>Phone: 9575548611</li>
                  <li>Address: Mandir Hasuad, Raipur, Chhattisgarh</li>
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

export default TermsModal;