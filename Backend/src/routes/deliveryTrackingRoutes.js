
const express = require("express");
const router = express.Router();
const trackingController = require("../controllers/deliveryTrackingController");
const { authenticate, isAdmin } = require("../middlewares/authMiddleware");

router.post(
  "/create",
  authenticate,
  isAdmin,
  trackingController.createTracking
);

router.get(
  "/admin/all",
  authenticate,
  isAdmin,
  trackingController.getAllTracking
);

router.get(
  "/:orderId",
  authenticate,
  trackingController.getTracking
);

router.put(
  "/:orderId/status",
  authenticate,
  isAdmin,
  trackingController.updateStatus
);
module.exports = router;
