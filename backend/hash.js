const bcrypt = require("bcryptjs");

async function generateHashes() {
  const studentHash = await bcrypt.hash("Student@123", 10);
  const facultyHash = await bcrypt.hash("Faculty@123", 10);

  console.log("Student Hash:", studentHash);
  console.log("Faculty Hash:", facultyHash);
}

generateHashes();
