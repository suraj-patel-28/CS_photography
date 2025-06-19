const express = require("express");
const router = express.Router();
const { uploadImage } = require("../config/cloudinary");
const { protect } = require("../middleware/auth");
const {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonialController");

// Public routes
router.get("/", getAllTestimonials);

// Protected routes
router.post("/", protect, uploadImage.single("image"), createTestimonial);
router.put("/:id", protect, uploadImage.single("image"), updateTestimonial);
router.delete("/:id", protect, deleteTestimonial);

module.exports = router;
