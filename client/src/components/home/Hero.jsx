import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowRight, HiPlay, HiX } from "react-icons/hi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Hero = () => {
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Auto-close after video duration (adjust this to match your video length in milliseconds)
  useEffect(() => {
    if (showVideoModal) {
      // Set timeout for your video duration (e.g., 30 seconds = 30000ms)
      const timer = setTimeout(() => {
        setShowVideoModal(false);
      }, 30000); // Adjust this to your video length

      return () => clearTimeout(timer);
    }
  }, [showVideoModal]);

  const heroImages = [
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&q=80",
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920&q=80",
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <LazyLoadImage
            src={heroImages[0]}
            alt="Hero background"
            effect="blur"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float animation-delay-2000" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-primary-400 font-medium tracking-wider uppercase"
          >
            Professional Photography Studio
          </motion.p>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-5xl md:text-7xl font-display font-bold leading-tight"
          >
            Capturing Life's
            <span className="block bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
              Beautiful Moments
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Transform your special moments into timeless memories with our
            professional photography and videography services
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/gallery"
              className="group bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105 flex items-center gap-2"
            >
              View Our Work
              <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={() => setShowVideoModal(true)}
              className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-full font-medium transition-all flex items-center gap-2"
            >
              <HiPlay className="group-hover:scale-110 transition-transform" />
              Watch Showreel
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="grid grid-cols-3 gap-8 md:gap-16 max-w-2xl mx-auto mt-16"
          >
            {[
              { number: "500+", label: "Happy Clients" },
              { number: "1000+", label: "Photos Taken" },
              { number: "10+", label: "Years Experience" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-400">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-gray-400 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        ></motion.div>
      </div>

      {/* Video Modal - Instagram Reel Style */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            onClick={() => setShowVideoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button - Always Visible */}
              <button
                onClick={() => setShowVideoModal(false)}
                className="absolute -top-10 right-0 md:-top-2 md:-right-12 z-20 text-white hover:text-primary-400 transition-colors bg-black/50 backdrop-blur-sm rounded-full p-2"
              >
                <HiX className="w-6 h-6" />
              </button>

              {/* Phone Frame Container - Smaller Size */}
              <div
                className="relative mx-auto"
                style={{ width: "280px", maxWidth: "85vw" }}
              >
                {/* Phone Frame */}
                <div className="relative bg-black rounded-[2rem] p-1.5 shadow-2xl">
                  {/* Phone Screen */}
                  <div
                    className="relative bg-black rounded-[1.75rem] overflow-hidden"
                    style={{ aspectRatio: "9/16", maxHeight: "70vh" }}
                  >
                    {/* Video */}
                    <iframe
                      src="https://www.youtube.com/embed/KOlET7hUBjU?autoplay=1&controls=0&modestbranding=1&loop=1&playlist=KOlET7hUBjU"
                      title="CS Photography Showreel"
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ border: "none" }}
                      onEnded={() => setShowVideoModal(false)}
                    />

                    {/* Instagram-style UI Overlay */}
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Top gradient */}
                      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/30 to-transparent" />

                      {/* Bottom gradient */}
                      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/60 to-transparent" />

                      {/* Reel Info */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                        <div className="flex items-end justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-1.5 mb-1">
                              <div className="w-6 h-6 bg-gradient-to-r from-primary-400 to-purple-400 rounded-full"></div>
                              <span className="font-medium text-xs">
                                csphotography
                              </span>
                              <button className="text-xs border border-white/50 px-1.5 py-0.5 rounded text-[10px]">
                                Follow
                              </button>
                            </div>
                            <p className="text-xs mb-1 line-clamp-2">
                              Professional Photography ✨📸
                            </p>
                            <p className="text-[10px] opacity-80">
                              🎵 Original Audio
                            </p>
                          </div>

                          {/* Action buttons */}
                          <div className="flex flex-col gap-3 items-center">
                            <div className="text-center">
                              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-0.5">
                                <svg
                                  className="w-5 h-5"
                                  fill="white"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                              </div>
                              <span className="text-[10px]">24.5K</span>
                            </div>
                            <div className="text-center">
                              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-0.5">
                                <svg
                                  className="w-5 h-5"
                                  fill="white"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                                </svg>
                              </div>
                              <span className="text-[10px]">Share</span>
                            </div>
                            <div className="w-8 h-8 rounded-md bg-gradient-to-r from-primary-400 to-purple-400 animate-spin-slow"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtle Glow Effect */}
                <div className="absolute inset-0 -z-10 blur-2xl opacity-20">
                  <div className="absolute top-1/3 left-1/3 w-48 h-48 bg-primary-500 rounded-full"></div>
                  <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-purple-500 rounded-full"></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
