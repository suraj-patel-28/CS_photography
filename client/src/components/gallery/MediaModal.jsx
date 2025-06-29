import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiChevronLeft, HiChevronRight } from "react-icons/hi";

const MediaModal = ({ isOpen, onClose, media, onNavigate }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          onNavigate("prev");
          break;
        case "ArrowRight":
          onNavigate("next");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onNavigate]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!media) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative z-10 w-full max-w-7xl mx-auto px-4"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 md:top-4 md:right-4 z-20 w-10 h-10 md:w-12 md:h-12 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="Close modal"
            >
              <HiX className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => onNavigate("prev")}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="Previous image"
            >
              <HiChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={() => onNavigate("next")}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="Next image"
            >
              <HiChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Media Content */}
            <div className="relative max-w-full">
              {media.type === "photo" ? (
                <motion.img
                  key={media.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  src={media.imageUrl || media.full || media.thumbnailUrl}
                  alt={media.title}
                  className="w-full h-auto max-h-[85vh] md:max-h-[90vh] object-contain rounded-lg"
                />
              ) : (
                <div
                  className="relative w-full"
                  style={{ maxWidth: "100%", maxHeight: "85vh" }}
                >
                  {media.videoUrl ? (
                    <div className="relative aspect-video w-full">
                      <iframe
                        src={media.videoUrl}
                        title={media.title}
                        className="absolute inset-0 w-full h-full rounded-lg"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <video
                      src={media.imageUrl}
                      title={media.title}
                      className="w-full h-full max-h-[85vh] rounded-lg"
                      controls
                      autoPlay
                      playsInline
                      poster={media.thumbnailUrl}
                      style={{ maxWidth: "100%", height: "auto" }}
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              )}

              {/* Media Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-center"
              >
                <h3 className="text-xl font-medium text-white mb-2">
                  {media.title}
                </h3>
                <p className="text-gray-400 capitalize">{media.category}</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MediaModal;
