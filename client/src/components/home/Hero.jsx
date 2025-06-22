import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiPlay, HiX } from 'react-icons/hi';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Hero = () => {
  const [showVideoModal, setShowVideoModal] = useState(false);
  // const [isLoaded, setIsLoaded] = useState(false);
  
  // useEffect(() => {
  //   setIsLoaded(true);
  // }, []);

  // Auto-close after video duration
  useEffect(() => {
    if (showVideoModal) {
      const timer = setTimeout(() => {
        setShowVideoModal(false);
      }, 30000);
      
      return () => clearTimeout(timer);
    }
  }, [showVideoModal]);

  const textAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-dark-100 to-black">
      {/* Creative Background Pattern */}
      <div className="absolute inset-0 z-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
                            linear-gradient(to right, rgba(168, 85, 247, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Animated Gradient Mesh */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
              ],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute inset-0"
          />
          <motion.div
            animate={{
              background: [
                'radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 20%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)',
              ],
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute inset-0"
          />
        </div>
      </div>

      {/* Floating Camera Icons */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary-400/10"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          >
            <svg
              className="w-12 h-12 sm:w-16 sm:h-16"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600/20 to-purple-600/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 mt-8 sm:mt-0"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500"></span>
              </span>
              <span className="text-primary-400 text-sm font-medium">Trusted by Brands & Loved by Clients</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              variants={textAnimation}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6"
            >
              <span className="block text-white">Capturing</span>
              <span className="block mt-2">
                <span className="relative inline-block">
                  <span className="text-white">Life's </span>
                  <motion.span
                    className="relative inline-block"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="relative z-10 bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Beautiful
                    </span>
                    <motion.svg
                      className="absolute -bottom-2 left-0 w-full"
                      viewBox="0 0 300 20"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 1, duration: 1 }}
                    >
                      <motion.path
                        d="M0,10 Q150,0 300,10"
                        stroke="url(#gradient)"
                        strokeWidth="3"
                        fill="none"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#a855f7" />
                          <stop offset="50%" stopColor="#9333ea" />
                          <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                      </defs>
                    </motion.svg>
                  </motion.span>
                </span>
              </span>
              <span className="block text-white mt-2">Moments</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={textAnimation}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
              className="text-lg sm:text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Transform your special occasions into timeless art with our 
              <span className="text-primary-400 font-medium"> professional photography </span>
              and cinematic videography services
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                to="/gallery"
                className="group relative z-30 overflow-hidden bg-gradient-to-r from-primary-600 to-purple-600 text-white px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <span className="relative z-30">Explore Portfolio</span>
                <HiArrowRight className="relative z-30 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              
              <button 
                onClick={() => setShowVideoModal(true)}
                className="group relative bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-full font-medium transition-all flex items-center justify-center gap-2"
              >
                <HiPlay className="group-hover:scale-110 transition-transform" />
                <span>Watch Showreel</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-8 mt-12 justify-center lg:justify-start"
            >
              {[
                { value: '500+', label: 'Happy Clients' },
                { value: '10K+', label: 'Photos Delivered' },
                { value: '99%', label: 'Satisfaction Rate' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="text-center lg:text-left"
                >
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative lg:block hidden"
          >
            <motion.div animate={floatingAnimation} className="relative">
              {/* Main Image Frame */}
              <div className="relative rounded-2xl overflow-hidden">
                <LazyLoadImage
                  src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80"
                  alt="Professional Photography"
                  effect="blur"
                  className="w-full h-[600px] object-cover"
                  // onLoad={() => setIsLoaded(true)}
                />
                
                {/* Overlay Elements */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                {/* Floating Frame */}
                <motion.div
                  className="absolute -top-4 -right-4 w-32 h-32 border-4 border-primary-400/50 rounded-2xl"
                  animate={{ rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                
                {/* Photo Counter */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                  className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full"
                >
                  <span className="text-white text-sm font-medium">📸 10K+ Shots</span>
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <motion.div
                className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-[500px] h-[500px] border border-primary-400/10 rounded-full" />
                <div className="absolute inset-4 border border-primary-400/20 rounded-full" />
                <div className="absolute inset-8 border border-primary-400/30 rounded-full" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile Visual - Shown only on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 lg:hidden"
        >
          <div className="relative rounded-2xl overflow-hidden max-w-md mx-auto">
            <LazyLoadImage
              src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80"
              alt="Professional Photography"
              effect="blur"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            
            {/* Photo Counter */}
            <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-white text-sm font-medium">📸 10K+ Shots</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
  {showVideoModal && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
    >
      {/* Dark Backdrop — DON'T trap pointer events */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md pointer-events-none" />

      {/* Video Content — SHOULD allow interaction */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="relative pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setShowVideoModal(false)}
          className="absolute -top-12 right-0 z-20 text-white hover:text-primary-400 transition-colors bg-white/10 backdrop-blur-sm rounded-full p-2"
        >
          <HiX className="w-6 h-6" />
        </button>

        {/* Video Container */}
        <div className="relative mx-auto" style={{ width: '280px', maxWidth: '85vw' }}>
          <div className="relative bg-black rounded-2xl p-1.5 shadow-2xl">
            <div
              className="relative bg-black rounded-[1.5rem] overflow-hidden"
              style={{ aspectRatio: '9/16', maxHeight: '75vh' }}
            >
              <iframe
                src="https://www.youtube.com/embed/KOlET7hUBjU?autoplay=1&controls=0&modestbranding=1&loop=0"
                title="CS Photography Showreel"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ border: 'none' }}
              />
            </div>
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