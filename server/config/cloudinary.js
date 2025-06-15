const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer-Cloudinary Storage for Images
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "cs-photography/images",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "gif"],
    transformation: [
      { width: 1920, height: 1920, crop: "limit" },
      { quality: "auto:best" },
      { fetch_format: "auto" },
    ],
  },
});

// Configure Multer-Cloudinary Storage for Videos
const videoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "cs-photography/videos",
    allowed_formats: ["mp4", "avi", "mov", "wmv", "flv", "webm"],
    resource_type: "video",
    transformation: [{ quality: "auto:best" }, { fetch_format: "auto" }],
  },
});

// Image upload middleware (10MB limit)
const uploadImage = multer({
  storage: imageStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

// Video upload middleware (50MB limit)
const uploadVideo = multer({
  storage: videoStorage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
});

module.exports = { cloudinary, uploadImage, uploadVideo };
