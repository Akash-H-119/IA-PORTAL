const mongoose = require("mongoose");

const MarksSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },
  course: {
    type: String,
    required: true
  },
  marks: {
    type: Number,
    required: true
  },
  grade: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Marks", MarksSchema);
