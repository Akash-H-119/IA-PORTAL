const express = require("express");
const Marks = require("../models/Marks");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// 🔐 PROTECTED ROUTE (STUDENT ONLY)
router.get("/marks", auth("student"), async (req, res) => {
  try {
    const marks = await Marks.find({ studentId: req.user.id });
    res.json(marks);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching marks" });
  }
});

module.exports = router;
