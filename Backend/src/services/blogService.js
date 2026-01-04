

const blogService = require("../models/admin/blogModel"); // Admin blog model

// Create a new blog
const createBlog = async (data) => blogService.create(data);

// Get all blogs (admin/public)
const getAllBlogs = async () => blogService.find().sort({ createdAt: -1 });

// Get single blog by ID
const getBlogById = async (id) => blogService.findById(id);

// Update blog by ID
const updateBlog = async (id, data) =>
  blogService.findByIdAndUpdate(id, data, { new: true });

// Delete blog by ID
const deleteBlog = async (id) => blogService.findByIdAndDelete(id);

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
