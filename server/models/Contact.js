const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Contact = sequelize.define(
  "Contact",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name is required",
        },
        len: {
          args: [1, 100],
          msg: "Name cannot exceed 100 characters",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Email is required",
        },
        isEmail: {
          msg: "Please provide a valid email",
        },
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Phone number is required",
        },
      },
    },
    eventDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Event date is required",
        },
        isDate: {
          msg: "Please provide a valid date",
        },
      },
    },
    eventType: {
      type: DataTypes.ENUM(
        "Wedding Photography",
        "Portrait Session",
        "Corporate Event",
        "Product Photography",
        "Nature/Landscape",
        "Other"
      ),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Event type is required",
        },
      },
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Message is required",
        },
        len: {
          args: [1, 1000],
          msg: "Message cannot exceed 1000 characters",
        },
      },
    },
    status: {
      type: DataTypes.ENUM("new", "contacted", "closed"),
      defaultValue: "new",
    },
  },
  {
    timestamps: true,
    tableName: "contacts",
    indexes: [
      {
        fields: ["email"],
      },
      {
        fields: ["createdAt"],
      },
    ],
  }
);

module.exports = Contact;
