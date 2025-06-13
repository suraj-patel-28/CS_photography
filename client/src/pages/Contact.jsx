import React from "react";
import { motion } from "framer-motion";
import ContactForm from "../components/contact/ContactForm";
import {
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiClock,
  HiChat,
} from "react-icons/hi";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Contact = () => {
  const contactInfo = [
    {
      icon: <HiPhone className="w-6 h-6" />,
      title: "Phone",
      details: "+1 (234) 567-890",
      action: "tel:+1234567890",
    },
    {
      icon: <HiMail className="w-6 h-6" />,
      title: "Email",
      details: "hello@CSphotography.com",
      action: "mailto:hello@CSphotography.com",
    },
    {
      icon: <HiLocationMarker className="w-6 h-6" />,
      title: "Studio",
      details: "123 Creative Studio, New York, NY 10001",
      action: "#",
    },
    {
      icon: <HiClock className="w-6 h-6" />,
      title: "Working Hours",
      details: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM",
      action: "#",
    },
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, url: "#", label: "Facebook" },
    { icon: <FaInstagram />, url: "#", label: "Instagram" },
    { icon: <FaTwitter />, url: "#", label: "Twitter" },
    { icon: <FaYoutube />, url: "#", label: "YouTube" },
  ];

  return (
    <main className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 to-purple-900/20" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Let's Create <span className="text-primary-400">Together</span>
            </h1>
            <p className="text-xl text-gray-300">
              Ready to turn your vision into reality? Get in touch and let's
              discuss how we can capture your special moments.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
                <HiChat className="text-primary-400" />
                Send us a Message
              </h2>
              <ContactForm />
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-display font-bold mb-6">
                  Get in Touch
                </h2>
                <p className="text-gray-400 mb-8">
                  We're here to help and answer any question you might have. We
                  look forward to hearing from you!
                </p>

                {/* Contact Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={index}
                      href={info.action}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="bg-dark-200/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-primary-500 transition-colors group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-purple-600 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                          {info.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-white mb-1">
                            {info.title}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {info.details}
                          </p>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <h3 className="text-lg font-medium text-white mb-4">
                  Follow Us
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      aria-label={social.label}
                      className="w-12 h-12 bg-dark-300 hover:bg-primary-600 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Map Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="bg-dark-200/50 backdrop-blur-sm rounded-xl p-2 border border-gray-800"
              >
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.8476800944054!2d81.67881569999999!3d21.2079125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28dd6627a85c8b%3A0x62ef9a6379d82f13!2sPatel%20House!5e0!3m2!1sen!2sin!4v1718174400000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Studio Location"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-dark-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Frequently Asked{" "}
              <span className="text-primary-400">Questions</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Find answers to common questions about our services
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "How far in advance should I book?",
                answer:
                  "We recommend booking at least 2-3 months in advance for weddings and large events. For portrait sessions, 2-3 weeks is usually sufficient.",
              },
              {
                question: "What is included in your packages?",
                answer:
                  "Our packages typically include the photography/videography session, professional editing, digital delivery, and an online gallery. Print packages are available separately.",
              },
              {
                question: "Do you travel for destination events?",
                answer:
                  "Yes! We love destination weddings and events. Travel fees apply based on location, and we can provide a custom quote.",
              },
              {
                question: "When will we receive our photos/videos?",
                answer:
                  "Portrait sessions are delivered within 2 weeks. Wedding photos within 4-6 weeks, and wedding videos within 8-12 weeks.",
              },
              {
                question: "What is your cancellation policy?",
                answer:
                  "We require a 50% deposit to secure your date. Cancellations made 30+ days before the event receive a full refund minus a processing fee.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-200/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800"
              >
                <h3 className="text-lg font-medium text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-400">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
