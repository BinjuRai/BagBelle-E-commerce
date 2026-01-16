// // import axios from "../api/api";

// // // export const loginUserApi = async (credentials) => {
// // //   const response = await axios.post("/auth/login", credentials);
// // //   return response.data;
// // // };
// // export const loginUserApi = (data) => {
// //   return axios.post(
// //     "http://localhost:5050/api/auth/login",
// //     data,
// //     {
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //     }
// //   );
// // };

// // export const registerUserApi = async (user) => {
// //   const response = await axios.post("/auth/register", user);
// //   return response.data;
// // };

// // export const loginAdminApi = (data) => {
// //   return axios.post(
// //     "http://localhost:5050/api/admin/login", // admin login endpoint
// //     data,
// //     {
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //     }
// //   );
// // };

// // // // Get token from localStorage (or pass it as parameter)
// // // const getAuthHeader = () => {
// // //   const token = localStorage.getItem("token");
// // //   if (!token) throw new Error("No auth token found");
// // //   return { Authorization: `Bearer ${token}` };
// // // };

// // // ---------------- Profile APIs ----------------
// // export const fetchProfileApi = async () => {
// //   const headers = getAuthHeader();
// //   const response = await axios.get("/users/profile", { headers });
// //   return response.data;
// // };

// // export const updateProfileApi = async (updates) => {
// //   const headers = getAuthHeader();
// //   const response = await axios.put("/users/profile", updates, { headers });
// //   return response.data;
// // };

// // export const uploadProfileImageApi = async (file) => {
// //   const headers = {
// //     ...getAuthHeader(),
// //     "Content-Type": "multipart/form-data",
// //   };
// //   const formData = new FormData();
// //   formData.append("image", file);

// //   const response = await axios.put("/users/profile/image", formData, { headers });
// //   return response.data;
// // };

// // export const changePasswordApi = async (oldPassword, newPassword) => {
// //   const headers = getAuthHeader();
// //   const response = await axios.put(
// //     "/users/profile/password",
// //     { oldPassword, newPassword },
// //     { headers }
// //   );
// //   return response.data;
// // };

// import axios from "../api/api";

// /* ---------------- AUTH APIs ---------------- */

// export const loginUserApi = async (data) => {
//   const response = await axios.post("/auth/login", data);
//   return response.data;
// };

// export const registerUserApi = async (user) => {
//   const response = await axios.post("/auth/register", user);
//   return response.data;
// };

// export const loginAdminApi = async (data) => {
//   const response = await axios.post("/admin/login", data);
//   return response.data;
// };

// /* ---------------- AUTH HEADER ---------------- */

// const getAuthHeader = () => {
//   const token = localStorage.getItem("token");
//   if (!token) throw new Error("No auth token found");
//   return { Authorization: `Bearer ${token}` };
// };

// /* ---------------- PROFILE APIs ---------------- */

// export const fetchProfileApi = async () => {
//   const response = await axios.get("/users/profile", {
//     headers: getAuthHeader(),
//   });
//   return response.data;
// };

// export const updateProfileApi = async (updates) => {
//   const response = await axios.put("/users/profile", updates, {
//     headers: getAuthHeader(),
//   });
//   return response.data;
// };

// export const uploadProfileImageApi = async (file) => {
//   const formData = new FormData();
//   formData.append("image", file);

//   const response = await axios.put("/users/profile/image", formData, {
//     headers: {
//       ...getAuthHeader(),
//       "Content-Type": "multipart/form-data",
//     },
//   });

//   return response.data;
// };

// export const changePasswordApi = async (oldPassword, newPassword) => {
//   const response = await axios.put(
//     "/users/profile/password",
//     { oldPassword, newPassword },
//     { headers: getAuthHeader() }
//   );
//   return response.data;
// };

// import axios from "../api/api";

// /* ---------------- AUTH APIs ---------------- */

// export const loginUserApi = async (data) => {
//   const response = await axios.post("/auth/login", data);
//   return response; // Return full response, not response.data
// };

// export const registerUserApi = async (user) => {
//   const response = await axios.post("/auth/register", user);
//   return response; // Return full response
// };

// export const loginAdminApi = async (data) => {
//   const response = await axios.post("/admin/login", data);
//   return response;
// };

// /* ---------------- AUTH HEADER ---------------- */

// const getAuthHeader = () => {
//   const token = localStorage.getItem("token");
//   if (!token) throw new Error("No auth token found");
//   return { Authorization: `Bearer ${token}` };
// };

// /* ---------------- PROFILE APIs ---------------- */

// export const fetchProfileApi = async () => {
//   const response = await axios.get("/auth/profile", { // Changed from /users/profile
//     headers: getAuthHeader(),
//   });
//   return response.data;
// };

// export const updateProfileApi = async (updates) => {
//   const response = await axios.put("/auth/profile", updates, { // Changed from /users/profile
//     headers: getAuthHeader(),
//   });
//   return response.data;
// };

// export const uploadProfileImageApi = async (file) => {
//   const formData = new FormData();
//   formData.append("image", file);

//   const response = await axios.put("/auth/profile/image", formData, { // Changed
//     headers: {
//       ...getAuthHeader(),
//       "Content-Type": "multipart/form-data",
//     },
//   });

//   return response.data;
// };

// export const changePasswordApi = async (oldPassword, newPassword) => {
//   const response = await axios.put(
//     "/auth/profile/password", // Changed from /users/profile/password
//     { oldPassword, newPassword },
//     { headers: getAuthHeader() }
//   );
//   return response.data;
// };

// import axios from "../api/api";

// // const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// // 🔧 CREATE AXIOS INSTANCE
// const api = axios.create({
//   baseURL: API_URL,
//   withCredentials: true, // ✅ CRITICAL: Send cookies with requests
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // 🔑 CSRF TOKEN STORAGE
// let csrfToken = null;

// // 🔑 GET CSRF TOKEN
// export const getCsrfToken = async () => {
//   if (csrfToken) return csrfToken;

//   try {
//     const response = await api.get("/csrf-token");
//     csrfToken = response.data.csrfToken;
//     return csrfToken;
//   } catch (error) {
//     console.error("Failed to get CSRF token:", error);
//     return null;
//   }
// };

// // 🔄 REQUEST INTERCEPTOR (Add CSRF token to state-changing requests)
// api.interceptors.request.use(
//   async (config) => {
//     // Add CSRF token for POST, PUT, DELETE requests
//     if (["post", "put", "delete", "patch"].includes(config.method.toLowerCase())) {
//       const token = await getCsrfToken();
//       if (token) {
//         config.headers["X-CSRF-Token"] = token;
//       }
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // 🔄 RESPONSE INTERCEPTOR (Handle token refresh)
// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });
//   failedQueue = [];
// };

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // If access token expired, try to refresh
//     if (
//       error.response?.status === 401 &&
//       error.response?.data?.tokenExpired &&
//       !originalRequest._retry
//     ) {
//       if (isRefreshing) {
//         // Wait for token refresh to complete
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then(() => api(originalRequest))
//           .catch((err) => Promise.reject(err));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         await api.post("/users/refresh-token");
//         processQueue(null);
//         return api(originalRequest);
//       } catch (refreshError) {
//         processQueue(refreshError);
//         // Redirect to login page
//         window.location.href = "/login";
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// // 👤 USER API FUNCTIONS
// export const registerUserApi = (userData) => {
//   return api.post("/users/register", userData);
// };

// export const loginUserApi = (credentials) => {
//   return api.post("/users/login", credentials);
// };

// export const logoutUserApi = () => {
//   return api.post("/users/logout");
// };

// export const logoutAllDevicesApi = () => {
//   return api.post("/users/logout-all");
// };

// export const getUserProfileApi = () => {
//   return api.get("/users/profile");
// };

// export const updateUserProfileApi = (updates) => {
//   return api.put("/users/profile", updates);
// };

// export const changePasswordApi = (passwords) => {
//   return api.put("/users/profile/password", passwords);
// };

// export const forgotPasswordApi = (email) => {
//   return api.post("/users/forgot-password", { email });
// };

// export const resetPasswordApi = (token, password) => {
//   return api.post(`/users/reset-password/${token}`, { password });
// };

// export const refreshTokenApi = () => {
//   return api.post("/users/refresh-token");
// };

// export default api;
// import axios from "../api/api";

// /* ---------------- AUTH APIs ---------------- */

// export const loginUserApi = async (data) => {
//   const response = await axios.post("/auth/login", data);
//   return response; // Return full response, not response.data
// };

// export const registerUserApi = async (user) => {
//   const response = await axios.post("/auth/register", user);
//   return response; // Return full response
// };

// export const loginAdminApi = async (data) => {
//   const response = await axios.post("/admin/login", data);
//   return response;
// };

// /* ---------------- AUTH HEADER ---------------- */

// const getAuthHeader = () => {
//   const token = localStorage.getItem("token");
//   if (!token) throw new Error("No auth token found");
//   return { Authorization: `Bearer ${token}` };
// };

// /* ---------------- PROFILE APIs ---------------- */

// export const fetchProfileApi = async () => {
//   const response = await axios.get("/auth/profile", { // Changed from /users/profile
//     headers: getAuthHeader(),
//   });
//   return response.data;
// };

// export const updateProfileApi = async (updates) => {
//   const response = await axios.put("/auth/profile", updates, { // Changed from /users/profile
//     headers: getAuthHeader(),
//   });
//   return response.data;
// };

// export const uploadProfileImageApi = async (file) => {
//   const formData = new FormData();
//   formData.append("image", file);

//   const response = await axios.put("/auth/profile/image", formData, { // Changed
//     headers: {
//       ...getAuthHeader(),
//       "Content-Type": "multipart/form-data",
//     },
//   });

//   return response.data;
// };

// export const changePasswordApi = async (oldPassword, newPassword) => {
//   const response = await axios.put(
//     "/auth/profile/password", // Changed from /users/profile/password
//     { oldPassword, newPassword },
//     { headers: getAuthHeader() }
//   );
//   return response.data;
// };

import api from "../api/api";

// ==============================
// 🔑 CSRF TOKEN STORAGE
// ==============================
let csrfToken = null;

// ==============================
// 🔑 GET CSRF TOKEN
// ==============================
export const getCsrfToken = async () => {
  if (csrfToken) return csrfToken;

  try {
    const res = await api.get("/csrf-token"); // ✅ /api/csrf-token
    csrfToken = res.data.csrfToken;
    return csrfToken;
  } catch (error) {
    console.error("Failed to get CSRF token:", error);
    return null;
  }
};

// ==============================
// 🔄 REQUEST INTERCEPTOR (CSRF)
// ==============================
api.interceptors.request.use(
  async (config) => {
    if (
      ["post", "put", "delete", "patch"].includes(config.method?.toLowerCase())
    ) {
      const token = await getCsrfToken();
      if (token) {
        config.headers["X-CSRF-Token"] = token;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ==============================
// 🔄 RESPONSE INTERCEPTOR (REFRESH TOKEN)
// ==============================
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve()));
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      error.response?.data?.tokenExpired &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.post("/auth/refresh-token"); // ✅ FIXED
        processQueue(null);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// ==============================
// 👤 USER AUTH API FUNCTIONS
// ==============================
export const registerUserApi = (data) => api.post("/auth/register", data);

export const loginUserApi = (data) => api.post("/auth/login", data);

export const logoutUserApi = () => api.post("/auth/logout");

export const logoutAllDevicesApi = () => api.post("/auth/logout-all");

export const getUserProfileApi = () => api.get("/auth/profile");

export const updateUserProfileApi = (data) => api.put("/auth/profile", data);

export const changePasswordApi = (data) =>
  api.put("/auth/profile/password", data);

export const forgotPasswordApi = (email) =>
  api.post("/auth/forgot-password", { email });

export const resetPasswordApi = (token, password) =>
  api.post(`/auth/reset-password/${token}`, { password });

export const refreshTokenApi = () => api.post("/auth/refresh-token");

export default api;
