import api from "../api";

// Public APIs
export const getAllCategoriesApi = async () => {
  const response = await api.get("/categories");
  return response.data;
};

export const getCategoryByIdApi = async (id) => {
  const response = await api.get(`/categories/${id}`);
  return response.data;
};


//Admin APIs
export const getAdminCategories = () => 
  api.get("/admin/categories");

export const getCategoryById = (id) =>
  api.get(`/admin/categories/${id}`);

export const createCategory = (formData) =>
  api.post("/admin/categories/add-category", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

export const updateCategory = (id, formData) =>
  api.put(`/admin/categories/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

export const deleteCategory = (id) =>
  api.delete(`/admin/categories/${id}`);