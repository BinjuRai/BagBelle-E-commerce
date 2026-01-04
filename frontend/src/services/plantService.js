
import api from "../api/api";

// Get all plants/products
export const getAllPlantsApi = async () => {
  const response = await api.get("/products");
  return response.data.products || response.data;
};

// Get single plant/product by ID
export const getPlantByIdApi = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data.product || response.data;
};

// Get featured plants
export const getFeaturedPlantsApi = async () => {
  const response = await api.get("/products?featured=true");
  return response.data.products || response.data;
};

// Get plants by category
export const getPlantsByCategoryApi = async (categoryId) => {
  const response = await api.get(`/products?category=${categoryId}`);
  return response.data.products || response.data;
};