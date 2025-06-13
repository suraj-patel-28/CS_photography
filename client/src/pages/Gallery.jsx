import React, { useState } from "react";
import { motion } from "framer-motion";
import GalleryGrid from "../components/gallery/GalleryGrid";
import GalleryFilter from "../components/gallery/GalleryFilter";

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <main className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Our <span className="text-primary-400">Portfolio</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore our collection of stunning photographs and videos that
            capture life's most precious moments
          </p>
        </motion.div>

        {/* Filter */}
        <GalleryFilter
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Gallery Grid */}
        <GalleryGrid filter={activeFilter} />
      </div>
    </main>
  );
};

export default Gallery;
