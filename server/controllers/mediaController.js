const Media = require('../models/Media');
const { cloudinary } = require('../config/cloudinary');

// @desc    Get all media items
// @route   GET /api/media
// @access  Public
exports.getAllMedia = async (req, res) => {
  try {
    const { category, type, featured } = req.query;
    
    const where = {};
    if (category) where.category = category;
    if (type) where.type = type;
    if (featured) where.featured = featured === 'true';

    const media = await Media.findAll({
      where,
      order: [['order', 'ASC'], ['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      count: media.length,
      data: media
    });
  } catch (error) {
    console.error('Error fetching media:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch media'
    });
  }
};

// @desc    Upload new media
// @route   POST /api/media
// @access  Private/Admin
exports.uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file'
      });
    }

    const { title, category, description, featured } = req.body;

    // Create thumbnail URL by adding transformation
    const thumbnailUrl = req.file.path.replace('/upload/', '/upload/c_fill,h_400,w_400/');

    const media = await Media.create({
      title: title || 'Untitled',
      category: category || 'other',
      description: description || '',
      type: 'photo',
      cloudinaryId: req.file.filename,
      imageUrl: req.file.path,
      thumbnailUrl: thumbnailUrl,
      featured: featured === 'true'
    });

    res.status(201).json({
      success: true,
      data: media
    });
  } catch (error) {
    console.error('Error uploading media:', error);
    
    // If upload failed, delete from Cloudinary
    if (req.file && req.file.filename) {
      await cloudinary.uploader.destroy(req.file.filename);
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to upload media'
    });
  }
};

// @desc    Update media details
// @route   PUT /api/media/:id
// @access  Private/Admin
exports.updateMedia = async (req, res) => {
  try {
    const { title, category, description, featured, order } = req.body;
    
    const media = await Media.findByPk(req.params.id);
    
    if (!media) {
      return res.status(404).json({
        success: false,
        message: 'Media not found'
      });
    }

    await media.update({
      title: title || media.title,
      category: category || media.category,
      description: description !== undefined ? description : media.description,
      featured: featured !== undefined ? featured === 'true' : media.featured,
      order: order !== undefined ? parseInt(order) : media.order
    });

    res.json({
      success: true,
      data: media
    });
  } catch (error) {
    console.error('Error updating media:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update media'
    });
  }
};

// @desc    Delete media
// @route   DELETE /api/media/:id
// @access  Private/Admin
exports.deleteMedia = async (req, res) => {
  try {
    const media = await Media.findByPk(req.params.id);
    
    if (!media) {
      return res.status(404).json({
        success: false,
        message: 'Media not found'
      });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(media.cloudinaryId);
    
    // Delete from database
    await media.destroy();

    res.json({
      success: true,
      message: 'Media deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting media:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete media'
    });
  }
};

// @desc    Bulk upload media
// @route   POST /api/media/bulk
// @access  Private/Admin
exports.bulkUploadMedia = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please upload at least one file'
      });
    }

    const { category } = req.body;
    const uploadedMedia = [];

    for (const file of req.files) {
      const thumbnailUrl = file.path.replace('/upload/', '/upload/c_fill,h_400,w_400/');
      
      const media = await Media.create({
        title: file.originalname.split('.')[0],
        category: category || 'other',
        type: 'photo',
        cloudinaryId: file.filename,
        imageUrl: file.path,
        thumbnailUrl: thumbnailUrl
      });
      
      uploadedMedia.push(media);
    }

    res.status(201).json({
      success: true,
      count: uploadedMedia.length,
      data: uploadedMedia
    });
  } catch (error) {
    console.error('Error in bulk upload:', error);
    
    // Clean up uploaded files on error
    if (req.files) {
      for (const file of req.files) {
        await cloudinary.uploader.destroy(file.filename);
      }
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to upload files'
    });
  }
};