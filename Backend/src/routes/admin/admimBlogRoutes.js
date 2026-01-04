// // const express = require("express");
// // const router = express.Router();
// // const blogController = require("../../controllers/admin/blogController");

// // // Public
// // router.get("/", blogController.getBlogs);
// // router.get("/:id", blogController.getBlog);

// // // Admin
// // router.post("/", blogController.createBlog);
// // router.put("/:id", blogController.updateBlog);
// // router.delete("/:id", blogController.deleteBlog);

// // // module.exports = router;
// // const express = require("express");
// // const router = express.Router();
// // const blogController = require("../../controllers/admin/blogController");
// // const { adminAuth } = require("../../middlewares/authMiddleware");
// // const upload = require("../../middlewares/fileuploads");

// // router.post(
// //   "/",
// //   adminAuth,
// //   upload.single("image"),
// //   blogController.createBlog
// // );
// // router.put("/:id", adminAuth, upload.single("image"), blogController.updateBlog);
// // router.delete("/:id", adminAuth, blogController.deleteBlog);

// // module.exports = router;

// const express = require("express");
// const router = express.Router();

// const upload = require("../../middlewares/fileuploads");
// const { authenticate, isAdmin } = require("../../middlewares/authMiddleware");
// const blogController = require("../../controllers/admin/blogController");

// router.post(
//   "/",
//   authenticate,
//   isAdmin,
//   upload.single("image"),
//   blogController.createBlog
// );

// router.put(
//   "/:id",
//   authenticate,
//   isAdmin,
//   upload.single("image"),
//   blogController.updateBlog
// );

// router.delete("/:id", authenticate, isAdmin, blogController.deleteBlog);

// module.exports = router;

// const express = require("express");
// const router = express.Router();

// const upload = require("../../src/middlewares/fileuploads");
// const { authenticate, isAdmin } = require("../../src/middlewares/authMiddleware");
// const blogController = require("../controllers/admin/blogController");

// router.post(
//   "/blogs",
//   authenticate,
//   isAdmin,
//   upload.single("image"),
//   blogController.createBlog
// );

// router.get("/blogs", blogController.getAllBlogs);

// router.put(
//   "/blogs/:id",
//   authenticate,
//   isAdmin,
//   upload.single("image"),
//   blogController.updateBlog
// );

// router.delete(
//   "/blogs/:id",
//   authenticate,
//   isAdmin,
//   blogController.deleteBlog
// );

// module.exports = router;
