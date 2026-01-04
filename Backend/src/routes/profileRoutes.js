// src/routes/profileRoutes.js
const express = require("express");
const {
  getProfile,
  updateProfile,
  uploadProfileImage,
  changePassword,
} = require("../controllers/profileController");

const { authenticate } = require("../middlewares/authMiddleware");
const multerInstance = require("../middlewares/fileuploads");

const router = express.Router();

// Get user profile
router.get("/profile", authenticate, getProfile);

// Update profile info
router.put("/profile", authenticate, updateProfile);

// Upload profile image
router.put("/profile/image", authenticate, multerInstance.single("image"), uploadProfileImage);

// Change password
router.put("/profile/password", authenticate, changePassword);



module.exports = router;
