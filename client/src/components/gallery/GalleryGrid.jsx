import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { HiPlay, HiPhotograph } from "react-icons/hi";
import MediaModal from "./MediaModal";
import axios from "axios";
import "react-lazy-load-image-component/src/effects/blur.css";

const GalleryGrid = ({ filter }) => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const response = await axios.get("/api/media");
      setMediaItems(response.data.data);
    } catch (error) {
      console.error("Error fetching media:", error);
      // Fallback to demo data if API fails
      setMediaItems(getDemoData());
    } finally {
      setLoading(false);
    }
  };

  const getDemoData = () => [
    {
      id: 1,
      type: "photo",
      category: "wedding",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
      imageUrl:
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80",
      title: "Beautiful Wedding Ceremony",
    },
    {
      id: 2,
      type: "photo",
      category: "portrait",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1920&q=80",
      title: "Professional Portrait",
    },
  ];

  const filteredMedia =
    filter === "all"
      ? mediaItems
      : mediaItems.filter((item) => item.category === filter);

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

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="aspect-square bg-dark-200 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

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
                src={item.thumbnailUrl}
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

      {filteredMedia.length === 0 && (
        <div className="text-center py-12">
          <HiPhotograph className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No items in this category yet.</p>
        </div>
      )}

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
