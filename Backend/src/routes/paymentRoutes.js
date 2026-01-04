
const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/paymentController");
const { authenticate } = require("../middlewares/authMiddleware");

// COD Payment
router.post("/cod/:orderId", authenticate, PaymentController.cod);

// eSewa Payment
router.post("/esewa/initialize/:orderId", authenticate, PaymentController.esewaInitialize);
router.get("/esewa/verify", PaymentController.esewaVerify);

// Khalti Payment
router.post("/khalti/initialize/:orderId", authenticate, PaymentController.khaltiInitialize);
router.post("/khalti/verify", authenticate, PaymentController.khaltiVerify);

module.exports = router;