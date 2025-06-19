const TeamMember = require("../models/TeamMember");
const { cloudinary } = require("../config/cloudinary");

// @desc    Get all team members
// @route   GET /api/team
// @access  Public
exports.getAllTeamMembers = async (req, res) => {
  try {
    const teamMembers = await TeamMember.findAll({
      order: [
        ["order", "ASC"],
        ["createdAt", "DESC"],
      ],
    });

    res.json({
      success: true,
      count: teamMembers.length,
      data: teamMembers,
    });
  } catch (error) {
    console.error("Error fetching team members:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch team members",
    });
  }
};

// @desc    Create team member
// @route   POST /api/team
// @access  Private/Admin
exports.createTeamMember = async (req, res) => {
  try {
    const { name, role, bio, socialLinks } = req.body;

    let imageData = {};
    if (req.file) {
      imageData = {
        cloudinaryId: req.file.filename || req.file.public_id,
        imageUrl: req.file.path || req.file.secure_url,
      };
    }

    const teamMember = await TeamMember.create({
      name,
      role,
      bio,
      socialLinks: socialLinks ? JSON.parse(socialLinks) : {},
      ...imageData,
    });

    res.status(201).json({
      success: true,
      data: teamMember,
    });
  } catch (error) {
    console.error("Error creating team member:", error);

    // Delete uploaded image if creation failed
    if (req.file && (req.file.filename || req.file.public_id)) {
      await cloudinary.uploader.destroy(
        req.file.filename || req.file.public_id
      );
    }

    res.status(500).json({
      success: false,
      message: "Failed to create team member",
    });
  }
};

// @desc    Update team member
// @route   PUT /api/team/:id
// @access  Private/Admin
exports.updateTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findByPk(req.params.id);

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    const updateData = {};
    const { name, role, bio, socialLinks, order } = req.body;

    if (name !== undefined) updateData.name = name;
    if (role !== undefined) updateData.role = role;
    if (bio !== undefined) updateData.bio = bio;
    if (socialLinks !== undefined)
      updateData.socialLinks = JSON.parse(socialLinks);
    if (order !== undefined) updateData.order = parseInt(order);

    // Handle image update
    if (req.file) {
      // Delete old image if exists
      if (teamMember.cloudinaryId) {
        await cloudinary.uploader.destroy(teamMember.cloudinaryId);
      }

      updateData.cloudinaryId = req.file.filename || req.file.public_id;
      updateData.imageUrl = req.file.path || req.file.secure_url;
    }

    await teamMember.update(updateData);

    res.json({
      success: true,
      data: teamMember,
    });
  } catch (error) {
    console.error("Error updating team member:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update team member",
    });
  }
};

// @desc    Delete team member
// @route   DELETE /api/team/:id
// @access  Private/Admin
exports.deleteTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findByPk(req.params.id);

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    // Delete image from Cloudinary if exists
    if (teamMember.cloudinaryId) {
      await cloudinary.uploader.destroy(teamMember.cloudinaryId);
    }

    await teamMember.destroy();

    res.json({
      success: true,
      message: "Team member deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting team member:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete team member",
    });
  }
};
