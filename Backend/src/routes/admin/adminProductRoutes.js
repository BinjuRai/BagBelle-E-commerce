
const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/adminProductController");
const { authenticate, isAdmin } = require("../../middlewares/authMiddleware");
const upload = require("../../../utils/multer");

/* ================= ADMIN PRODUCT ROUTES ================= */


// Get all products
router.get(
  "/",
  authenticate,
  isAdmin,
  controller.getAllProducts
);

// Get single product
router.get(
  "/:id",
  authenticate,
  isAdmin,
  controller.getProductById
);

// Create product with image/video upload
router.post(
  "/",
  authenticate,
  isAdmin,
  upload.fields([
    { name: "imagepath", maxCount: 1 },
    { name: "filepath", maxCount: 1 }
  ]),
  controller.createProduct
);

// Alternative route for add-product
router.post(
  "/add-product",
  authenticate,
  isAdmin,
  upload.fields([
    { name: "imagepath", maxCount: 1 },
    { name: "filepath", maxCount: 1 }
  ]),
  controller.createProduct
);

// Update product
router.put(
  "/:id",
  authenticate,
  isAdmin,
  upload.fields([
    { name: "imagepath", maxCount: 1 },
    { name: "filepath", maxCount: 1 }
  ]),
  controller.updateProduct
);

// Delete product
router.delete(
  "/:id",
  authenticate,
  isAdmin,
  controller.deleteProduct
);

module.exports = router;