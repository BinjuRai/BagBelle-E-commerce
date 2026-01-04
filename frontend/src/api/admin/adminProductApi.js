import api from "../api";

export const getProducts = () => api.get("/admin/products");
export const getProduct = (id) => api.get(`/admin/products/${id}`);
export const createProduct = (data) =>
  api.post("/admin/products", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updateProduct = (id, data) =>
  api.put(`/admin/products/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deleteProduct = (id) =>
  api.delete(`/admin/products/${id}`);