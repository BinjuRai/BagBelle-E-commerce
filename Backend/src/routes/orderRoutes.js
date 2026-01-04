

const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");
const { authenticate, isAdmin } = require("../middlewares/authMiddleware");

// User routes
router.post("/", authenticate, OrderController.createOrder);
router.get("/my-orders", authenticate, OrderController.getMyOrders);
router.get("/:orderId", authenticate, OrderController.getOrderById);

// Admin routes
router.get("/admin/all", authenticate, isAdmin, OrderController.adminGetOrders);
router.put(
  "/admin/:orderId/status",
  authenticate,
  isAdmin,
  OrderController.adminUpdateStatus
);
router.put(
  "/admin/:orderId/payment",
  authenticate,
  isAdmin,
  OrderController.adminUpdatePayment
);

module.exports = router;
