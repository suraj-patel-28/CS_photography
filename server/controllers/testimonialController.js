const Testimonial = require("../models/Testimonial");
const { cloudinary } = require("../config/cloudinary");

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll({
      order: [
        ["order", "ASC"],
        ["createdAt", "DESC"],
      ],
    });

    res.json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch testimonials",
    });
  }
};

// @desc    Create testimonial
// @route   POST /api/testimonials
// @access  Private/Admin
exports.createTestimonial = async (req, res) => {
  try {
    const { name, role, content, rating, event, featured } = req.body;

    let imageData = {};
    if (req.file) {
      imageData = {
        cloudinaryId: req.file.filename || req.file.public_id,
        imageUrl: req.file.path || req.file.secure_url,
      };
    }

    const testimonial = await Testimonial.create({
      name,
      role,
      content,
      rating: rating || 5,
      event,
      featured: featured === "true",
      ...imageData,
    });

    res.status(201).json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    console.error("Error creating testimonial:", error);

    // Delete uploaded image if creation failed
    if (req.file && (req.file.filename || req.file.public_id)) {
      await cloudinary.uploader.destroy(
        req.file.filename || req.file.public_id
      );
    }

    res.status(500).json({
      success: false,
      message: "Failed to create testimonial",
    });
  }
};

// @desc    Update testimonial
// @route   PUT /api/testimonials/:id
// @access  Private/Admin
exports.updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    const updateData = {};
    const { name, role, content, rating, event, featured, order } = req.body;

    if (name !== undefined) updateData.name = name;
    if (role !== undefined) updateData.role = role;
    if (content !== undefined) updateData.content = content;
    if (rating !== undefined) updateData.rating = parseInt(rating);
    if (event !== undefined) updateData.event = event;
    if (featured !== undefined) updateData.featured = featured === "true";
    if (order !== undefined) updateData.order = parseInt(order);

    // Handle image update
    if (req.file) {
      // Delete old image if exists
      if (testimonial.cloudinaryId) {
        await cloudinary.uploader.destroy(testimonial.cloudinaryId);
      }

      updateData.cloudinaryId = req.file.filename || req.file.public_id;
      updateData.imageUrl = req.file.path || req.file.secure_url;
    }

    await testimonial.update(updateData);

    res.json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update testimonial",
    });
  }
};

// @desc    Delete testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private/Admin
exports.deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    // Delete image from Cloudinary if exists
    if (testimonial.cloudinaryId) {
      await cloudinary.uploader.destroy(testimonial.cloudinaryId);
    }

    await testimonial.destroy();

    res.json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete testimonial",
    });
  }
};
