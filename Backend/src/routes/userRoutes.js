// const express = require("express");
// const { registerUser, loginUser } = require("../controllers/userController");

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);

// module.exports = router;

// const express = require("express");
// const {
//   registerUser,
//   loginUser,
//   sendResetLink,
//   resetPassword,
//   getProfile,
//   updateProfile,
//   changePassword,
// } = require("../controllers/userController");
// const { authenticate } = require("../middlewares/authMiddleware");
// const {
//   loginLimiter,
//   registerLimiter,
//   passwordResetLimiter
// } = require("../middlewares/rateLimiter");

// const router = express.Router();

// // 🔓 Public routes with rate limiting
// router.post("/register", registerLimiter, registerUser);
// router.post("/login", loginLimiter, loginUser);
// router.post("/forgot-password", passwordResetLimiter, sendResetLink);
// router.post("/reset-password/:token", resetPassword);

// // 🔒 Protected routes (authentication required)
// router.get("/profile", authenticate, getProfile);
// router.put("/profile", authenticate, updateProfile);
// router.put("/profile/password", authenticate, changePassword);

// // module.exports = router;
// const express = require("express");
// const csrf = require("csurf");
// const {
//   registerUser,
//   loginUser,
//   sendResetLink,
//   resetPassword,
//   getProfile,
//   updateProfile,
//   changePassword,
//   refreshAccessToken,
//   logoutUser,
//   logoutAllDevices,
// } = require("../controllers/userController");
// const { authenticate } = require("../middlewares/authMiddleware");
// const {
//   loginLimiter,
//   registerLimiter,
//   passwordResetLimiter,
// } = require("../middlewares/rateLimiter");

// const router = express.Router();

// // 🔓 Public routes with rate limiting
// router.post("/register", registerLimiter, registerUser);
// router.post("/login", loginLimiter, loginUser);
// router.post("/forgot-password", passwordResetLimiter, sendResetLink);
// router.post("/reset-password/:token", resetPassword);

// // 🔄 Token management routes
// router.post("/refresh-token", refreshAccessToken);

// // 🔒 Protected routes (authentication required)
// router.post("/logout", authenticate, logoutUser);
// router.post("/logout-all", authenticate, logoutAllDevices);
// router.get("/profile", authenticate, getProfile);
// router.put("/profile", authenticate, updateProfile);
// router.put("/profile/password", authenticate, changePassword);

// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const csrf = require("csurf");
// const {
//   register,
//   login,
//   logout,
//   logoutAllDevices,
//   getUserProfile,
//   updateUserProfile,
//   changePassword,
//   forgotPassword,
//   resetPassword,
//   refreshToken,
// } = require("../controllers/userController");


// const { authenticate } = require("../middlewares/authMiddleware");
// // 🛡️ CSRF Protection
// const csrfProtection = csrf({
//   cookie: {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//   },
// });

// // ✅ PUBLIC ROUTES (No Auth, Apply CSRF for POST)
// router.post("/register", csrfProtection, register);
// router.post("/login", csrfProtection, login);
// router.post("/forgot-password", csrfProtection, forgotPassword);
// router.post("/reset-password/:token", csrfProtection, resetPassword);

// // ✅ PROTECTED ROUTES (Require Auth)
// router.get("/profile",authenticate, getUserProfile); // ✅ GET - No CSRF needed
// router.put("/profile",authenticate, csrfProtection, updateUserProfile);
// router.put("/profile/password",authenticate, csrfProtection, changePassword);
// router.post("/logout",authenticate, csrfProtection, logout);
// router.post("/logout-all",authenticate, csrfProtection, logoutAllDevices);
// router.post("/refresh-token",authenticate, csrfProtection, refreshToken);

// module.exports = router;

const express = require("express");
const router = express.Router();
const csrf = require("csurf");
const {
  registerUser,
  loginUser,
  logoutUser,
  logoutAllDevices,
  getProfile,
  updateProfile,
  changePassword,
  sendResetLink,
  resetPassword,
  refreshAccessToken,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

// 🛡️ CSRF Protection
const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  },
});

// ========================================
// PUBLIC ROUTES (No Auth Required)
// ========================================

// Register new user
router.post("/register", csrfProtection, registerUser);

// Login user
router.post("/login", csrfProtection, loginUser);

// Forgot password - send reset link
router.post("/forgot-password", csrfProtection, sendResetLink);

// Reset password with token
router.post("/reset-password/:token", csrfProtection, resetPassword);

// ========================================
// PROTECTED ROUTES (Auth Required)
// ========================================

// Get user profile
router.get("/profile", protect, getProfile);

// Update user profile
router.put("/profile", protect, csrfProtection, updateProfile);

// Change password
router.put("/profile/password", protect, csrfProtection, changePassword);

// Logout current device
router.post("/logout", protect, csrfProtection, logoutUser);

// Logout all devices
router.post("/logout-all", protect, csrfProtection, logoutAllDevices);

// Refresh access token
router.post("/refresh-token", refreshAccessToken);

module.exports = router;