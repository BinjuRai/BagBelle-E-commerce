
const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/adminCategoryController");
const { authenticate, isAdmin } = require("../../middlewares/authMiddleware");
const upload = require("../../../utils/multer");



// Get all categories
router.get(
  "/",
  authenticate,
isAdmin,
  controller.adminGetCategories
);

// Get single category by ID
router.get(
  "/:id",
 authenticate,
isAdmin,
  controller.adminGetCategoryById
);

// Create category with image upload
router.post(
  "/",
  authenticate,
isAdmin,
  upload.fields([{ name: "image", maxCount: 1 }]), // ✅ Use fields method
  controller.adminCreateCategory
);

// Alternative route (keeping for compatibility)
router.post(
  "/add-category",
authenticate,
isAdmin,
  upload.fields([{ name: "image", maxCount: 1 }]), // ✅ Use fields method
  controller.adminCreateCategory
);

// Update category
router.put(
  "/:id",
  authenticate,
isAdmin,
  upload.fields([{ name: "image", maxCount: 1 }]), // ✅ Use fields method
  controller.adminUpdateCategory
);

// Delete category
router.delete(
  "/:id",
  authenticate,
isAdmin,
  controller.adminDeleteCategory
);

module.exports = router;