const express = require("express");
const router = express.Router();
const NotificationController = require("../controllers/notificationController");
const { authenticate } = require("../middlewares/authMiddleware");

// Get user notifications
router.get("/", authenticate, NotificationController.getNotifications);

// Get unread count
router.get("/unread-count", authenticate, NotificationController.getUnreadCount);

// Mark notification as read
router.put("/:notificationId/read", authenticate, NotificationController.markAsRead);

// Mark all notifications as read
router.put("/mark-all-read", authenticate, NotificationController.markAllAsRead);

// Delete notification
router.delete("/:notificationId", authenticate, NotificationController.deleteNotification);

module.exports = router;