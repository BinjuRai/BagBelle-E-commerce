

import api from "../api/api";

// Get user's wishlist
export const getWishlist = async () => {
  const response = await api.get("/wishlist");
  return response.data;
};

// Toggle product in wishlist
export const toggleWishlist = async (productId) => {
  const response = await api.post("/wishlist/toggle", { productId });
  return response.data;
};

// Add to wishlist
export const addToWishlist = async (productId) => {
  const response = await api.post("/wishlist/add", { productId });
  return response.data;
};

// Remove from wishlist
export const removeFromWishlist = async (productId) => {
  const response = await api.delete(`/wishlist/remove/${productId}`);
  return response.data;
};
