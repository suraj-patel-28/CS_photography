const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  createContact,
  getContacts,
  updateContactStatus,
  deleteContact,
} = require("../controllers/contactController");

// Validation middleware
const validateContact = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 100 })
    .withMessage("Name cannot exceed 100 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email"),
  body("phone").trim().notEmpty().withMessage("Phone number is required"),
  body("eventDate")
    .notEmpty()
    .withMessage("Event date is required")
    .isISO8601()
    .withMessage("Please provide a valid date"),
  body("eventType")
    .notEmpty()
    .withMessage("Event type is required")
    .isIn([
      "Wedding Photography",
      "Portrait Session",
      "Corporate Event",
      "Product Photography",
      "Nature/Landscape",
      "Other",
    ])
    .withMessage("Invalid event type"),
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ max: 1000 })
    .withMessage("Message cannot exceed 1000 characters"),
];

// Routes
router.post("/", validateContact, createContact);
router.get("/", getContacts); // Protected route - add auth middleware in production
router.put("/:id", updateContactStatus); // Protected route
router.delete("/:id", deleteContact); // Protected route

module.exports = router;
