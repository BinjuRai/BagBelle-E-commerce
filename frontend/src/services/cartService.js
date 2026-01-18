
// import axios from "../api/api";



// const getAuthHeader = () => {
//   const token = localStorage.getItem("token");
//   return {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
// };

// // Get user's cart
// export const getCart = async () => {
//   const res = await axios.get(axios, getAuthHeader());
//   return res.data;
// };

// // Add item to cart
// export const addToCart = async (productId, quantity = 1) => {
//   const res = await axios.post(
//     `${axios}/add`,
//     { productId, quantity },
//     getAuthHeader()
//   );
//   return res.data;
// };

// // Update cart item quantity
// export const updateCartQuantity = async (productId, quantity) => {
//   const res = await axios.put(
//     `${axios}/update`,
//     { productId, quantity },
//     getAuthHeader()
//   );
//   return res.data;
// };

// // Remove item from cart
// export const removeFromCart = async (productId) => {
//   const res = await axios.delete(
//     `${axios}/remove/${productId}`,
//     getAuthHeader()
//   );
//   return res.data;
// };

// // Clear entire cart
// export const clearCart = async () => {
//   const res = await axios.delete(`${axios}/clear`, getAuthHeader());
//   return res.data;
// };


import axios from "../api/api";

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
  const res = await 
  axios.get("/cart", getAuthHeader());
  // axios.get(`/products/${id}`);
  return res.data;
};

// Add item to cart
export const addToCart = async (productId, quantity = 1) => {
  const res = await axios.post(
    "/cart/add",
    { productId, quantity },
    getAuthHeader()
  );
  return res.data;
};

// Update cart item quantity
export const updateCartQuantity = async (productId, quantity) => {
  const res = await axios.put(
    "/cart/update",
    { productId, quantity },
    getAuthHeader()
  );
  return res.data;
};

// Remove item from cart
export const removeFromCart = async (productId) => {
  const res = await axios.delete(
    `/cart/remove/${productId}`,
    getAuthHeader()
  );
  return res.data;
};

// Clear entire cart
export const clearCart = async () => {
  const res = await axios.delete("/cart/clear", getAuthHeader());
  return res.data;
};
