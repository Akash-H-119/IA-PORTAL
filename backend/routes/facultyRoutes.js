const express = require("express");
const mongoose = require("mongoose");
const Marks = require("../models/Marks");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

function getGrade(marks) {
  if (marks >= 90) return "S";
  if (marks >= 80) return "A";
  if (marks >= 70) return "B";
  if (marks >= 60) return "C";
  if (marks >= 50) return "D";
  return "F";
}

router.post("/upload", auth("faculty"), async (req, res) => {
  try {
    const { studentId, course, marks } = req.body;

    // 🔐 Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ msg: "Invalid Student ID" });
    }

    const grade = getGrade(Number(marks));

    await Marks.findOneAndUpdate(
      { studentId, course },
      {
        studentId,
        course,
        marks: Number(marks),
        grade
      },
      { upsert: true, new: true }
    );

    res.json({ msg: "Marks uploaded successfully" });
  } catch (err) {
    console.error("Upload Marks Error:", err);
    res.status(500).json({ msg: "Server error while uploading marks" });
  }
});

module.exports = router;
