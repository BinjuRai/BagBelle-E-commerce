const express = require("express");
const router = express.Router();
const AdminUserController = require("../../controllers/admin/adminUserController");
const { authenticate, isAdmin } = require("../../middlewares/authMiddleware");

// All routes require authentication and admin role
router.use(authenticate, isAdmin);

// Get all users
router.get("/", AdminUserController.getAllUsers);

// Get user statistics
router.get("/stats", AdminUserController.getUserStats);

// Get single user
router.get("/:userId", AdminUserController.getUserById);

// Create new user
router.post("/", AdminUserController.createUser);

// Update user role
router.put("/:userId/role", AdminUserController.updateUserRole);

// Delete user
router.delete("/:userId", AdminUserController.deleteUser);

module.exports = router;