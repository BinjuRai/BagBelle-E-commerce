const express = require("express");
const router = express.Router();
const AdminAnalyticsController = require("../../controllers/admin/adminAnalyticsController");
const { authenticate, isAdmin } = require("../../middlewares/authMiddleware");

// All routes require authentication and admin role
router.use(authenticate, isAdmin);

// Get analytics overview
router.get("/", AdminAnalyticsController.getAnalytics);

// Get top products
router.get("/top-products", AdminAnalyticsController.getTopProducts);

// Get revenue chart data
router.get("/revenue-chart", AdminAnalyticsController.getRevenueChart);

module.exports = router;