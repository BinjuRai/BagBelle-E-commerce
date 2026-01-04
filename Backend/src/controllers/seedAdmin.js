require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/userModel"); // adjust path

const seedAdmin = async () => {
  try {
  await mongoose.connect(process.env.MONGODB_URI);
    const hashedPass = await bcrypt.hash("admin123", 10);

    const admin = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPass,
      role: "admin",
      phone: "1234567890"
    });

    await admin.save();
    console.log("Admin created successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedAdmin();
