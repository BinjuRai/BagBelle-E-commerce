

import axios from "../api/api";

// Get all categories - extract data from response
export const getAllCategoriesApi = async () => {
  const response = await axios.get("/categories");
  return response.data; // Return the actual data array
};

// Get single category by ID
export const getCategoryByIdApi = async (id) => {
  const response = await axios.get(`/categories/${id}`);
  return response.data;
};