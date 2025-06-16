import React from "react";
import { motion } from "framer-motion";

const GalleryFilter = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: "all", label: "All" },
    { id: "wedding", label: "Weddings" },
    { id: "portrait", label: "Portraits" },
    { id: "event", label: "Events" },
    { id: "nature", label: "Nature" },
    { id: "other", label: "Others" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex flex-wrap justify-center gap-4 mb-12"
    >
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`relative px-6 py-2 rounded-full font-medium transition-all duration-300 ${
            activeFilter === filter.id
              ? "text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          {activeFilter === filter.id && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-gradient-to-r from-primary-600 to-purple-600 rounded-full"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10">{filter.label}</span>
        </button>
      ))}
    </motion.div>
  );
};

export default GalleryFilter;
