// Delete from Cloudinary
const Media = require("../models/Media");
const { cloudinary } = require("../config/cloudinary");

// @desc    Get all media items
// @route   GET /api/media
// @access  Public
exports.getAllMedia = async (req, res) => {
  try {
    const { category, type, featured } = req.query;

    const where = {};
    if (category) where.category = category;
    if (type) where.type = type;
    if (featured) where.featured = featured === "true";

    const media = await Media.findAll({
      where,
      order: [
        ["order", "ASC"],
        ["createdAt", "DESC"],
      ],
    });

    res.json({
      success: true,
      count: media.length,
      data: media,
    });
  } catch (error) {
    console.error("Error fetching media:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch media",
    });
  }
};

// @desc    Upload new media
// @route   POST /api/media/image or /api/media/video
// @access  Private/Admin
exports.uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a file",
      });
    }

    const { title, category, description, featured } = req.body;
    const isVideo =
      req.file.resource_type === "video" ||
      req.file.mimetype?.startsWith("video/");

    // Create thumbnail URL
    let thumbnailUrl;
    if (isVideo) {
      // For videos, generate frame at 1 second with transformation
      const videoId = req.file.public_id || req.file.filename;
      thumbnailUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload/so_1.0,w_400,h_400,c_fill,q_auto/${videoId}.jpg`;
    } else {
      // For images, use standard transformation
      thumbnailUrl = req.file.path.replace(
        "/upload/",
        "/upload/c_fill,h_400,w_400,q_auto/"
      );
    }

    const media = await Media.create({
      title: title || req.file.originalname?.split(".")[0] || "Untitled",
      category: category || "other",
      description: description || "",
      type: isVideo ? "video" : "photo",
      cloudinaryId: req.file.filename || req.file.public_id,
      imageUrl: req.file.path || req.file.secure_url,
      thumbnailUrl: thumbnailUrl,
      featured: featured === "true",
    });

    res.status(201).json({
      success: true,
      data: media,
    });
  } catch (error) {
    console.error("Error uploading media:", error);

    // If upload failed, delete from Cloudinary
    if (req.file && (req.file.filename || req.file.public_id)) {
      const resourceType = req.file.resource_type || "image";
      await cloudinary.uploader.destroy(
        req.file.filename || req.file.public_id,
        { resource_type: resourceType }
      );
    }

    res.status(500).json({
      success: false,
      message: "Failed to upload media",
    });
  }
};

// @desc    Update media details
// @route   PUT /api/media/:id
// @access  Private/Admin
exports.updateMedia = async (req, res) => {
  try {
    const { title, category, description, featured, order, thumbnailUrl } =
      req.body;

    const media = await Media.findByPk(req.params.id);

    if (!media) {
      return res.status(404).json({
        success: false,
        message: "Media not found",
      });
    }

    await media.update({
      title: title || media.title,
      category: category || media.category,
      description: description !== undefined ? description : media.description,
      featured: featured !== undefined ? featured === "true" : media.featured,
      order: order !== undefined ? parseInt(order) : media.order,
      thumbnailUrl: thumbnailUrl || media.thumbnailUrl,
    });

    res.json({
      success: true,
      data: media,
    });
  } catch (error) {
    console.error("Error updating media:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update media",
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
        message: "Media not found",
      });
    }

    // Delete from Cloudinary
    const resourceType = media.type === "video" ? "video" : "image";
    await cloudinary.uploader.destroy(media.cloudinaryId, {
      resource_type: resourceType,
    });

    // Delete from database
    await media.destroy();

    res.json({
      success: true,
      message: "Media deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting media:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete media",
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
        message: "Please upload at least one file",
      });
    }

    const { category } = req.body;
    const uploadedMedia = [];

    for (const file of req.files) {
      const thumbnailUrl = file.path.replace(
        "/upload/",
        "/upload/c_fill,h_400,w_400/"
      );

      const media = await Media.create({
        title: file.originalname.split(".")[0],
        category: category || "other",
        type: "photo",
        cloudinaryId: file.filename,
        imageUrl: file.path,
        thumbnailUrl: thumbnailUrl,
      });

      uploadedMedia.push(media);
    }

    res.status(201).json({
      success: true,
      count: uploadedMedia.length,
      data: uploadedMedia,
    });
  } catch (error) {
    console.error("Error in bulk upload:", error);

    // Clean up uploaded files on error
    if (req.files) {
      for (const file of req.files) {
        await cloudinary.uploader.destroy(file.filename);
      }
    }

    res.status(500).json({
      success: false,
      message: "Failed to upload files",
    });
  }
};
