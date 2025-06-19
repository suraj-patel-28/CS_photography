const express = require("express");
const router = express.Router();
const { uploadImage } = require("../config/cloudinary");
const { protect } = require("../middleware/auth");
const {
  getAllTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} = require("../controllers/teamController");

// Public routes
router.get("/", getAllTeamMembers);

// Protected routes
router.post("/", protect, uploadImage.single("image"), createTeamMember);
router.put("/:id", protect, uploadImage.single("image"), updateTeamMember);
router.delete("/:id", protect, deleteTeamMember);

module.exports = router;
