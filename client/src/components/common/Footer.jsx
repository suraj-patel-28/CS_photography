import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiMail, HiPhone, HiLocationMarker, HiArrowUp } from "react-icons/hi";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import TermsModal from "./TermsModal";
import PrivacyModal from "./PrivacyModal";

const Footer = () => {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { label: "Wedding Photography", path: "/gallery" },
      { label: "Portrait Sessions", path: "/gallery" },
      { label: "Event Coverage", path: "/gallery" },
      { label: "Videography", path: "/gallery" },
    ],
    company: [
      { label: "About Us", path: "/about" },
      { label: "Our Work", path: "/gallery" },
      { label: "Contact", path: "/contact" },
      // { label: "Blog", path: "#" },
    ],
  };

  const socialLinks = [
    {
      icon: <FaFacebookF />,
      url: "https://www.instagram.com/csphotography_raipur/",
      label: "Facebook",
    },
    {
      icon: <FaInstagram />,
      url: "https://www.instagram.com/csphotography_raipur/",
      label: "Instagram",
    },
    {
      icon: <FaYoutube />,
      url: "https://www.instagram.com/csphotography_raipur/",
      label: "YouTube",
    },
  ];

  return (
    <>
      <footer className="bg-dark-200 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link to="/" className="inline-block mb-4">
                <h3 className="text-2xl font-display font-bold bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
                  CSphotography
                </h3>
              </Link>
              <p className="text-gray-400 mb-6 max-w-sm">
                Capturing life's precious moments with artistic vision and
                professional excellence. Your story, beautifully told through our
                lens.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <a
                  href="mailto:amanpatel3378@gmail.com"
                  className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors"
                >
                  <HiMail className="text-primary-400" />
                  amanpatel3378@gmail.com
                </a>
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors"
                >
                  <HiPhone className="text-primary-400" />
                  9575548611
                </a>
                <div className="flex items-start gap-3 text-gray-400">
                  <HiLocationMarker className="text-primary-400 mt-1" />
                  <span>
                    Mandir Hasuad
                    <br />
                    Raipur , Chhattisgarh
                  </span>
                </div>
              </div>
            </div>

            {/* Services Column */}
            <div>
              <h4 className="text-white font-medium mb-4">Services</h4>
              <ul className="space-y-2">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="text-white font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Column */}
            <div>
              <h4 className="text-white font-medium mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setShowTermsModal(true)}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm text-left"
                  >
                    Terms & Conditions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowPrivacyModal(true)}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="py-6 border-t border-gray-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Copyright */}
              <p className="text-gray-400 text-sm text-center md:text-left">
                © {currentYear} CSphotography. All rights reserved. Made with ❤️
                by CSphotography
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    aria-label={social.label}
                    className="w-10 h-10 bg-dark-300 hover:bg-primary-600 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-primary-600 hover:bg-primary-700 rounded-full flex items-center justify-center text-white shadow-lg transition-colors z-40"
          aria-label="Scroll to top"
        >
          <HiArrowUp className="w-5 h-5" />
        </motion.button>
      </footer>

      {/* Modals */}
      <TermsModal 
        isOpen={showTermsModal} 
        onClose={() => setShowTermsModal(false)} 
      />
      <PrivacyModal 
        isOpen={showPrivacyModal} 
        onClose={() => setShowPrivacyModal(false)} 
      />
    </>
  );
};

export default Footer;