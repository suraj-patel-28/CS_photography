import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  HiPlay,
  HiPhotograph,
  HiX,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import MediaModal from "./MediaModal";
import "react-lazy-load-image-component/src/effects/blur.css";

const GalleryGrid = ({ filter }) => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Sample media data - replace with API call
  const mediaItems = [
    {
      id: 1,
      type: "photo",
      category: "wedding",
      thumbnail:
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
      full: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80",
      title: "Beautiful Wedding Ceremony",
    },
    {
      id: 2,
      type: "photo",
      category: "portrait",
      thumbnail:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
      full: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1920&q=80",
      title: "Professional Portrait",
    },
    {
      id: 3,
      type: "video",
      category: "wedding",
      thumbnail:
        "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      title: "Wedding Highlights",
    },
    {
      id: 4,
      type: "photo",
      category: "event",
      thumbnail:
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80",
      full: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1920&q=80",
      title: "Corporate Event",
    },
    {
      id: 5,
      type: "photo",
      category: "nature",
      thumbnail:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      full: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
      title: "Mountain Landscape",
    },
    {
      id: 6,
      type: "photo",
      category: "portrait",
      thumbnail:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80",
      full: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=1920&q=80",
      title: "Creative Portrait",
    },
    {
      id: 7,
      type: "video",
      category: "event",
      thumbnail:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      title: "Event Highlights",
    },
    {
      id: 8,
      type: "photo",
      category: "wedding",
      thumbnail:
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
      full: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920&q=80",
      title: "Wedding Couple",
    },
  ];

  const filteredMedia =
    filter === "all"
      ? mediaItems
      : mediaItems.filter(
          (item) => item.category === filter || item.type === filter
        );

  const openModal = (media) => {
    setSelectedMedia(media);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedMedia(null), 300);
  };

  const navigateMedia = (direction) => {
    const currentIndex = filteredMedia.findIndex(
      (item) => item.id === selectedMedia.id
    );
    let newIndex;

    if (direction === "next") {
      newIndex =
        currentIndex === filteredMedia.length - 1 ? 0 : currentIndex + 1;
    } else {
      newIndex =
        currentIndex === 0 ? filteredMedia.length - 1 : currentIndex - 1;
    }

    setSelectedMedia(filteredMedia[newIndex]);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredMedia.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square"
              onClick={() => openModal(item)}
            >
              <LazyLoadImage
                src={item.thumbnail}
                alt={item.title}
                effect="blur"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-medium">{item.title}</h3>
                    {item.type === "video" ? (
                      <HiPlay className="text-white text-2xl" />
                    ) : (
                      <HiPhotograph className="text-white text-2xl" />
                    )}
                  </div>
                  <p className="text-gray-300 text-sm mt-1 capitalize">
                    {item.category}
                  </p>
                </div>
              </div>

              {/* Type Badge */}
              {item.type === "video" && (
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm p-2 rounded-full">
                  <HiPlay className="text-white" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Media Modal */}
      <MediaModal
        isOpen={modalOpen}
        onClose={closeModal}
        media={selectedMedia}
        onNavigate={navigateMedia}
      />
    </>
  );
};

export default GalleryGrid;
