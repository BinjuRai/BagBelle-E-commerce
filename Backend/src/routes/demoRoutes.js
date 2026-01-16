const express = require("express");
const router = express.Router();
const demoController = require("../controllers/demoController");
const { authenticate, authorize, isAdmin, isUser, isAuthenticated } = require("../middlewares/authMiddleware");

/* ================= RBAC DEMO ROUTES ================= */

// 🌍 PUBLIC - No authentication required
router.get("/public", demoController.publicEndpoint);

// 🔓 AUTHENTICATED - Any logged-in user (admin or user)
router.get("/authenticated", authenticate, isAuthenticated, demoController.authenticatedEndpoint);

// 👤 USER ONLY - Only users with 'user' role
router.get("/user-only", authenticate, isUser, demoController.userOnlyEndpoint);

// 🔒 ADMIN ONLY - Only users with 'admin' role
router.get("/admin-only", authenticate, isAdmin, demoController.adminOnlyEndpoint);

// 📊 DASHBOARD - Different data based on role
router.get("/dashboard", authenticate, isAuthenticated, demoController.getDashboard);

// 🔒 ALTERNATIVE: Using authorize() with multiple roles
router.get("/moderator", authenticate, authorize("admin", "moderator"), (req, res) => {
  res.json({
    success: true,
    message: "Moderator endpoint - Admin or Moderator can access",
    user: req.user
  });
});

module.exports = router;