// // const blogService = require("../../services/blogService");

// // exports.createBlog = async (req, res) => {
// //   try {
// //     const blog = await blogService.createBlog(req.body);
// //     res.status(201).json(blog);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };
// // exports.getAllBlogs = async (req, res) => {  // rename from getBlogs
// //   try {
// //     const blogs = await blogService.getAllBlogs();
// //     res.json(blogs);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };


// // exports.getBlogById = async (req, res) => {
// //   try {
// //     const blog = await blogService.getBlogById(req.params.id);
// //     res.json(blog);
// //   } catch (err) {
// //     res.status(404).json({ message: "Blog not found" });
// //   }
// // };

// // exports.updateBlog = async (req, res) => {
// //   try {
// //     const blog = await blogService.updateBlog(req.params.id, req.body);
// //     res.json(blog);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // exports.deleteBlog = async (req, res) => {
// //   try {
// //     await blogService.deleteBlog(req.params.id);
// //     res.json({ message: "Blog deleted" });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// const Blog = require("../../models/Blog");
// // const blogService = require("../../services/blogService");
// exports.createBlog = async (req, res) => {
//   try {
//     const { title, content, author, image } = req.body;

//     if (!title || !content) {
//       return res.status(400).json({ message: "Title and content are required" });
//     }

//     const blog = await Blog.create({
//       title,
//       content,
//       author,
//       image: req.file ? `/uploads/${req.file.filename}` : image,
//     });

//     res.status(201).json(blog);
//   } catch (error) {
//     console.error("CREATE BLOG ERROR:", error);
//     res.status(500).json({ message: error.message });
//   }
// };


// const blogService = require("../../services/blogService");

// // ===== ADMIN CONTROLLERS =====

// // Create blog
// exports.createBlog = async (req, res) => {
//   try {
//     const { title, content, author } = req.body;

//     if (!title || !content) {
//       return res.status(400).json({ message: "Title and content are required" });
//     }

//     const blog = await blogService.createBlog({
//       title,
//       content,
//       author,
//       image: req.file ? `/uploads/${req.file.filename}` : null,
//     });

//     res.status(201).json(blog);
//   } catch (error) {
//     console.error("CREATE BLOG ERROR:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get all blogs (admin)
// exports.getAllBlogsAdmin = async (req, res) => {
//   try {
//     const blogs = await blogService.getAllBlogs();
//     res.status(200).json(blogs);
//   } catch (error) {
//     console.error("GET ALL BLOGS ERROR:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update blog
// exports.updateBlog = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, content, author } = req.body;

//     const updatedBlog = await blogService.updateBlog(id, {
//       title,
//       content,
//       author,
//       image: req.file ? `/uploads/${req.file.filename}` : undefined,
//     });

//     res.status(200).json(updatedBlog);
//   } catch (error) {
//     console.error("UPDATE BLOG ERROR:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete blog
// exports.deleteBlog = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await blogService.deleteBlog(id);
//     res.status(200).json({ message: "Blog deleted successfully" });
//   } catch (error) {
//     console.error("DELETE BLOG ERROR:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // ===== PUBLIC CONTROLLERS =====

// // Get all blogs for public
// exports.getAllBlogsPublic = async (req, res) => {
//   try {
//     const blogs = await blogService.getAllBlogs();
//     res.status(200).json(
//       blogs.map(blog => ({
//         id: blog._id,
//         title: blog.title,
//         content: blog.content,
//         author: blog.author,
//           imagepath: blog.imagepath,
//         createdAt: blog.createdAt,
//       }))
//     );
//   } catch (error) {
//     console.error("GET PUBLIC BLOGS ERROR:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get single blog for public
// exports.getBlogByIdPublic = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const blog = await blogService.getBlogById(id);
//     if (!blog) return res.status(404).json({ message: "Blog not found" });

//     res.status(200).json({
//       id: blog._id,
//       title: blog.title,
//       content: blog.content,
//       author: blog.author,
//         imagepath: blog.imagepath,
//       createdAt: blog.createdAt,
//     });
//   } catch (error) {
//     console.error("GET BLOG BY ID ERROR:", error);
//     res.status(500).json({ message: error.message });
//   }
// };


const blogService = require("../../services/blogService");

// ===== ADMIN CONTROLLERS =====

// Create blog
exports.createBlog = async (req, res) => {
  try {
    const { title, content, author, tags } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const blog = await blogService.createBlog({
      title,
      content,
      author: author || "Admin",
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      imagepath: req.file ? req.file.filename : null, // ✅ Save only filename
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog
    });
  } catch (error) {
    console.error("CREATE BLOG ERROR:", error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// Get all blogs (admin)
exports.getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await blogService.getAllBlogs();
    res.status(200).json({
      success: true,
      blogs: blogs
    });
  } catch (error) {
    console.error("GET ALL BLOGS ERROR:", error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// Get single blog (admin)
exports.getBlogByIdAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogService.getBlogById(id);
    
    if (!blog) {
      return res.status(404).json({ 
        success: false,
        message: "Blog not found" 
      });
    }

    res.status(200).json({
      success: true,
      data: blog
    });
  } catch (error) {
    console.error("GET BLOG BY ID ERROR:", error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// Update blog
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author, tags } = req.body;

    const updateData = {
      title,
      content,
      author,
      tags: tags ? tags.split(',').map(t => t.trim()) : undefined,
    };

    // Only update image if new file is uploaded
    if (req.file) {
      updateData.imagepath = req.file.filename;
    }

    const updatedBlog = await blogService.updateBlog(id, updateData);

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog
    });
  } catch (error) {
    console.error("UPDATE BLOG ERROR:", error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// Delete blog
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    await blogService.deleteBlog(id);
    res.status(200).json({ 
      success: true,
      message: "Blog deleted successfully" 
    });
  } catch (error) {
    console.error("DELETE BLOG ERROR:", error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// ===== PUBLIC CONTROLLERS =====

// Get all blogs for public
exports.getAllBlogsPublic = async (req, res) => {
  try {
    const blogs = await blogService.getAllBlogs();
    
    res.status(200).json({
      success: true,
      data: blogs.map(blog => ({
        _id: blog._id,
        title: blog.title,
        content: blog.content,
        author: blog.author,
        imagepath: blog.imagepath, // ✅ Use imagepath
        tags: blog.tags,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
      }))
    });
  } catch (error) {
    console.error("GET PUBLIC BLOGS ERROR:", error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// Get single blog for public
exports.getBlogByIdPublic = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogService.getBlogById(id);
    
    if (!blog) {
      return res.status(404).json({ 
        success: false,
        message: "Blog not found" 
      });
    }

    res.status(200).json({
      success: true,
      data: {
        _id: blog._id,
        title: blog.title,
        content: blog.content,
        author: blog.author,
        imagepath: blog.imagepath, // ✅ Use imagepath
        tags: blog.tags,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
      }
    });
  } catch (error) {
    console.error("GET BLOG BY ID ERROR:", error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};