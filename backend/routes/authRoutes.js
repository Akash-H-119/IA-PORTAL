const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const Faculty = require("../models/Faculty");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  const Model = role === "faculty" ? Faculty : Student;

  const user = await Model.findOne({ email });
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  console.log("Entered password:", password);
  console.log("DB password hash:", user.password);

  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid password" });
  }

  // 🔐 SIGNING TOKEN HERE
  const token = jwt.sign(
    {
      id: user._id,
      role: role
    },
    process.env.JWT_SECRET,   // ✅ JWT SECRET USED HERE
    { expiresIn: "1h" }
  );

  res.json({
    token,
    role,
    name: user.name
  });
});

module.exports = router;
