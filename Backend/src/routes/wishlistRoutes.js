
// const express = require("express");
// const router = express.Router();
// const wishlistController = require("../controllers/wishlistController");
// const { authenticate } = require("../middlewares/authMiddleware");

// // Routes
// router.get("/", authenticate, wishlistController.list);
// router.post("/toggle", authenticate, wishlistController.toggle);
// router.post("/add", authenticate, wishlistController.add);
// router.delete("/remove/:productId", authenticate, wishlistController.remove);

// module.exports = router;
const { authenticate } = require("../middlewares/authMiddleware");
const wishlistController = require("../controllers/wishlistController");
const router = require("express").Router();

// All wishlist routes require authentication
router.use(authenticate);

// Get wishlist
router.get("/", wishlistController.list);

// Toggle product
router.post("/toggle", wishlistController.toggle);

// Add product
router.post("/add", wishlistController.add);

// Remove product
router.delete("/remove/:productId", wishlistController.remove);

module.exports = router;
