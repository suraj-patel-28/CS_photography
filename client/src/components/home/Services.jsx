import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  HiCamera,
  HiVideoCamera,
  HiColorSwatch,
  HiClock,
  HiSparkles,
  HiPhotograph,
} from "react-icons/hi";

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      icon: <HiCamera className="w-8 h-8" />,
      title: "Wedding Photography",
      description:
        "Capture every precious moment of your special day with our artistic wedding photography services.",
      features: [
        "Full day coverage",
        "Engagement session",
        "Digital gallery",
        "Print packages",
      ],
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <HiVideoCamera className="w-8 h-8" />,
      title: "Videography",
      description:
        "Cinematic wedding films and event videos that tell your unique story beautifully.",
      features: [
        "4K video quality",
        "Drone footage",
        "Highlight reels",
        "Full ceremony edit",
      ],
      gradient: "from-blue-500 to-purple-500",
    },
    {
      icon: <HiPhotograph className="w-8 h-8" />,
      title: "Portrait Sessions",
      description:
        "Professional portraits for individuals, families, and corporate headshots.",
      features: [
        "Studio & outdoor",
        "Professional editing",
        "Multiple outfits",
        "Quick delivery",
      ],
      gradient: "from-pink-500 to-orange-500",
    },
    {
      icon: <HiSparkles className="w-8 h-8" />,
      title: "Event Coverage",
      description:
        "Comprehensive photography services for corporate events, parties, and celebrations.",
      features: [
        "Event planning",
        "Team coverage",
        "Same-day previews",
        "Online galleries",
      ],
      gradient: "from-green-500 to-blue-500",
    },
    {
      icon: <HiColorSwatch className="w-8 h-8" />,
      title: "Product Photography",
      description:
        "High-quality product images for e-commerce, marketing, and advertising.",
      features: [
        "White background",
        "Lifestyle shots",
        "Image optimization",
        "Bulk pricing",
      ],
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: <HiClock className="w-8 h-8" />,
      title: "Quick Turnaround",
      description:
        "Fast delivery options for urgent projects without compromising quality.",
      features: [
        "24-hour delivery",
        "Rush editing",
        "Priority booking",
        "Express service",
      ],
      gradient: "from-indigo-500 to-purple-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-20 bg-dark-100" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Our <span className="text-primary-400">Services</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Professional photography and videography services tailored to
            capture your unique story
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative bg-dark-200/50 backdrop-blur-sm rounded-2xl p-8 hover:bg-dark-200 transition-all duration-300 border border-gray-800 hover:border-gray-700"
            >
              {/* Icon */}
              <div
                className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${service.gradient} text-white mb-6`}
              >
                {service.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-display font-bold text-white mb-3">
                {service.title}
              </h3>
              <p className="text-gray-400 mb-6">{service.description}</p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center text-gray-300 text-sm"
                  >
                    <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Hover Effect */}
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                  "--tw-gradient-from": service.gradient.split(" ")[1],
                  "--tw-gradient-to": service.gradient.split(" ")[3],
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">
            Not sure which service is right for you?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-full font-medium transition-all transform hover:scale-105"
          >
            Get a Free Consultation
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
