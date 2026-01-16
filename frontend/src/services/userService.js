

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
