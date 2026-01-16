// const express = require("express");
// const { registerUser, loginUser } = require("../controllers/userController");

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);

// module.exports = router;

const express = require("express");
const {
  registerUser,
  loginUser,
  sendResetLink,
  resetPassword,
  getProfile,
  updateProfile,
  changePassword,
} = require("../controllers/userController");
const { authenticate } = require("../middlewares/authMiddleware");
const { 
  loginLimiter, 
  registerLimiter, 
  passwordResetLimiter 
} = require("../middlewares/rateLimiter");

const router = express.Router();

// 🔓 Public routes with rate limiting
router.post("/register", registerLimiter, registerUser);
router.post("/login", loginLimiter, loginUser);
router.post("/forgot-password", passwordResetLimiter, sendResetLink);
router.post("/reset-password/:token", resetPassword);

// 🔒 Protected routes (authentication required)
router.get("/profile", authenticate, getProfile);
router.put("/profile", authenticate, updateProfile);
router.put("/profile/password", authenticate, changePassword);

module.exports = router;