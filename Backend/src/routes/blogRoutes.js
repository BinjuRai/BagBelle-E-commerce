

// const express = require("express");
// const router = express.Router();

// const { authenticate, isAdmin } = require("../middlewares/authMiddleware");
// const blogController = require("../controllers/admin/blogController");
// const upload = require("../../utils/multer");

// /* ================= ADMIN BLOG ROUTES ================= */
// router.get("/admin/blogs", authenticate, isAdmin, blogController.getAllBlogsAdmin);
// router.post("/admin/blogs", authenticate, isAdmin, upload.single("image"), blogController.createBlog);
// router.put("/admin/blogs/:id", authenticate, isAdmin, upload.single("image"), blogController.updateBlog);
// router.delete("/admin/blogs/:id", authenticate, isAdmin, blogController.deleteBlog);

// /* ================= PUBLIC BLOG ROUTES ================= */
// router.get("/blogs", blogController.getAllBlogsPublic);
// router.get("/blogs/:id", blogController.getBlogByIdPublic);

// module.exports = router;


const express = require("express");
const router = express.Router();

const { authenticate, isAdmin } = require("../middlewares/authMiddleware");
const blogController = require("../controllers/admin/blogController");
const upload = require("../../utils/multer");

/* ================= ADMIN BLOG ROUTES ================= */
router.get("/admin/blogs", authenticate, isAdmin, blogController.getAllBlogsAdmin);
router.get("/admin/blogs/:id", authenticate, isAdmin, blogController.getBlogByIdAdmin); // ✅ Added
router.post("/admin/blogs", authenticate, isAdmin, upload.single("image"), blogController.createBlog);
router.put("/admin/blogs/:id", authenticate, isAdmin, upload.single("image"), blogController.updateBlog);
router.delete("/admin/blogs/:id", authenticate, isAdmin, blogController.deleteBlog);

/* ================= PUBLIC BLOG ROUTES ================= */
router.get("/blogs", blogController.getAllBlogsPublic);
router.get("/blogs/:id", blogController.getBlogByIdPublic);

module.exports = router;