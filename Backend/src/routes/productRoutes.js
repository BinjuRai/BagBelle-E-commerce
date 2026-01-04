const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const { isAuthenticated } = require("../middlewares/authMiddleware");

// Public: anyone can view
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

// // Admin only: create, update, delete
// router.post("/", isAuthenticated, isAdmin, productController.createProduct);
// router.put("/:id", isAuthenticated, isAdmin, productController.updateProduct);
// router.delete("/:id", isAuthenticated, isAdmin, productController.deleteProduct);

module.exports = router;
