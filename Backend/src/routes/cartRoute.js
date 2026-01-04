const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { authenticate } = require("../middlewares/authMiddleware");

// All routes require authenticateentication
router.get("/", authenticate, cartController.getCart);
router.post("/add", authenticate, cartController.addToCart);
router.put("/update", authenticate, cartController.updateQuantity);
router.delete("/remove/:productId", authenticate, cartController.removeItem);
router.delete("/clear", authenticate, cartController.clearCart);

module.exports = router;