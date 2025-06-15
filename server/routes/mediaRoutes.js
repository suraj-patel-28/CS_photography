const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');
const { protect } = require('../middleware/auth');
const {
  getAllMedia,
  uploadMedia,
  updateMedia,
  deleteMedia,
  bulkUploadMedia
} = require('../controllers/mediaController');

// Public routes
router.get('/', getAllMedia);

// Protected routes (require authentication)
router.post('/', protect, upload.single('image'), uploadMedia);
router.post('/bulk', protect, upload.array('images', 20), bulkUploadMedia);
router.put('/:id', protect, updateMedia);
router.delete('/:id', protect, deleteMedia);

module.exports = router;