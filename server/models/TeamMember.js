const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const TeamMember = sequelize.define(
  "TeamMember",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name is required",
        },
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Role is required",
        },
      },
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cloudinaryId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    socialLinks: {
      type: DataTypes.JSON,
      defaultValue: {},
      // Example: { facebook: 'url', instagram: 'url', linkedin: 'url' }
    },
  },
  {
    timestamps: true,
    tableName: "team_members",
  }
);

module.exports = TeamMember;
