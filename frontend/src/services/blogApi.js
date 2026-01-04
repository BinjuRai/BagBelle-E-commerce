


import api from "../api/api";

/* ================= ADMIN BLOG API (Requires Admin Auth) ================= */
export const getAdminBlogs = (params) =>
  api.get("/admin/blogs", { params });

export const getAdminBlog = (id) =>
  api.get(`/admin/blogs/${id}`);

export const createBlog = (data) =>
  api.post("/admin/blogs", data);

export const updateBlog = (id, data) =>
  api.put(`/admin/blogs/${id}`, data);

export const deleteBlog = (id) =>
  api.delete(`/admin/blogs/${id}`);

/* ================= PUBLIC BLOG API (No Auth Required) ================= */
export const getBlogs = (params) =>
  api.get("/blogs", { params });

export const getBlog = (id) =>
  api.get(`/blogs/${id}`);