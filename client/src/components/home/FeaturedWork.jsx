import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { HiArrowRight } from "react-icons/hi";
import { useInView } from "react-intersection-observer";
import "react-lazy-load-image-component/src/effects/blur.css";

const FeaturedWork = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const featuredProjects = [
    {
      id: 1,
      title: "Sarah & John Wedding",
      category: "Wedding Photography",
      image:
        "https://images.unsplash.com/photo-1597157639073-69284dc0fdaf?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "A magical sunset ceremony at the countryside estate",
    },
    {
      id: 2,
      title: "Corporate Headshots",
      category: "Portrait Session",
      image:
        "https://images.unsplash.com/photo-1641260774125-04d527b376a5?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Professional portraits for tech startup team",
    },
    {
      id: 3,
      title: "Mountain Adventure",
      category: "Nature Photography",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      description: "Capturing the raw beauty of the Alpine peaks",
    },
    {
      id: 4,
      title: "Fashion Editorial",
      category: "Portrait Session",
      image:
        "https://images.unsplash.com/photo-1654764745388-978ac6cb8f82?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Urban fashion shoot in downtown streets",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 bg-black" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Featured <span className="text-primary-400">Work</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore our recent projects and see how we transform moments into
            masterpieces
          </p>
        </motion.div>

        {/* Featured Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        >
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className={`group relative overflow-hidden rounded-2xl ${
                index === 0 ? "md:col-span-2 md:h-[500px]" : "h-[400px]"
              }`}
            >
              {/* Image */}
              <LazyLoadImage
                src={project.image}
                alt={project.title}
                effect="blur"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-primary-400 text-sm font-medium mb-2">
                  {project.category}
                </p>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {project.description}
                </p>
                <Link
                  to="/gallery"
                  className="inline-flex items-center gap-2 text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200 hover:text-primary-400"
                >
                  View Project
                  <HiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-primary-400/0 group-hover:border-primary-400/50 rounded-2xl transition-colors duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-full font-medium transition-all transform hover:scale-105"
          >
            View All Projects
            <HiArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedWork;
