const mongoose = require("mongoose");

const FacultySchema = new mongoose.Schema({
  empId: String,
  name: String,
  email: String,
  password: String,
  role: { type: String, default: "faculty" }
});

module.exports = mongoose.model("Faculty", FacultySchema);
