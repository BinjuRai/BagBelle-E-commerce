// import axios from "../api/api";

// const API_URL =
//   import.meta.env.VITE_API_BASE_URL || "http://localhost:5050/api";

// export const getMyOrders = () => {
//   const token = localStorage.getItem("token");
//   console.log("🔍 Token:", token);
//   console.log("🔍 API URL:", `${API_URL}/orders/my-orders`);

//   return axios.get(`${API_URL}/orders/my-orders`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };

// export const getOrderById = (orderId) => {
//   const token = localStorage.getItem("token");
//   return axios.get(`${API_URL}/orders/${orderId}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };


import api from "../api/api";

// 📦 Get logged-in user's orders
export const getMyOrders = () => {
  return api.get("/orders/my-orders");
};

// 📦 Get order by ID
export const getOrderById = (orderId) => {
  if (!orderId) {
    throw new Error("Order ID is required");
  }

  return api.get(`/orders/${orderId}`);
};
