const express = require("express");
const router = express.Router();

// Placeholder routes for media
// You can implement these later when needed

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Media routes will be implemented when needed",
    data: [],
  });
});

router.post("/", (req, res) => {
  res.status(501).json({
    success: false,
    message: "Media upload not implemented yet",
  });
});

router.delete("/:id", (req, res) => {
  res.status(501).json({
    success: false,
    message: "Media deletion not implemented yet",
  });
});

module.exports = router;
