
import axios from "axios";

const API_URL = "http://localhost:5050/api/cart";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get user's cart
export const getCart = async () => {
  const res = await axios.get(API_URL, getAuthHeader());
  return res.data;
};

// Add item to cart
export const addToCart = async (productId, quantity = 1) => {
  const res = await axios.post(
    `${API_URL}/add`,
    { productId, quantity },
    getAuthHeader()
  );
  return res.data;
};

// Update cart item quantity
export const updateCartQuantity = async (productId, quantity) => {
  const res = await axios.put(
    `${API_URL}/update`,
    { productId, quantity },
    getAuthHeader()
  );
  return res.data;
};

// Remove item from cart
export const removeFromCart = async (productId) => {
  const res = await axios.delete(
    `${API_URL}/remove/${productId}`,
    getAuthHeader()
  );
  return res.data;
};

// Clear entire cart
export const clearCart = async () => {
  const res = await axios.delete(`${API_URL}/clear`, getAuthHeader());
  return res.data;
};
