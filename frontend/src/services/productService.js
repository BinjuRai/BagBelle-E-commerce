
import api from "../api/api";

// Get all plants/products
export const getAllProductApi = async () => {
  const response = await api.get("/products");
  return response.data.products || response.data;
};

// Get single plant/product by ID
export const getProductByIdApi = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data.product || response.data;
};

// Get featured product
export const getFeaturedProductApi = async () => {
  const response = await api.get("/products?featured=true");
  return response.data.products || response.data;
};

// Get product by category
export const getProductByCategoryApi = async (categoryId) => {
  const response = await api.get(`/products?category=${categoryId}`);
  return response.data.products || response.data;
};