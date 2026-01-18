// // import axios from "axios";

// // const API_URL =
// //   import.meta.env.VITE_API_BASE_URL || "http://localhost:5050/api";
// // console.log("Using API base URL:", API_URL);
// // const instance = axios.create({
// //   baseURL: API_URL,
// //   withCredentials: true,
// //   headers: {
// //     "Content-Type": "application/json",
// //   },
// // });

// // // Add token to all requests
// // instance.interceptors.request.use(
// //   (config) => {
// //     const token = localStorage.getItem("token");
// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }
// //     return config;
// //   },
// //   (error) => Promise.reject(error)
// // );

// // // Handle responses globally
// // // instance.interceptors.response.use(
// // //   (response) => response,
// // //   (error) => {
// // //     if (error.response?.status === 401) {
// // //       localStorage.removeItem("token");
// // //       window.location.href = "/login";
// // //     }
// // //     return Promise.reject(error);
// // //   }
// // // );
// // instance.interceptors.response.use(
// //   (response) => response,
// //   (error) => Promise.reject(error)
// // );

// // export default instance;

// // import axios from "axios";

// // const API_URL = "http://localhost:5050/api";

// // // 🔧 CREATE AXIOS INSTANCE
// // const api = axios.create({
// //   baseURL: API_URL,
// //   withCredentials: true, // ✅ CRITICAL: Send cookies with requests
// //   headers: {
// //     "Content-Type": "application/json",
// //   },
// // });

// // // 🛡️ CSRF TOKEN CACHE
// // let csrfToken = null;

// // // 🛡️ FETCH CSRF TOKEN
// // export const fetchCsrfToken = async () => {
// //   try {
// //     const response = await api.get("/csrf-token");
// //     csrfToken = response.data.csrfToken;
// //     console.log("✅ CSRF Token fetched:", csrfToken);
// //     return csrfToken;
// //   } catch (error) {
// //     console.error("❌ Failed to fetch CSRF token:", error);
// //     throw error;
// //   }
// // };

// // // 🔄 REQUEST INTERCEPTOR - Add CSRF token to requests
// // api.interceptors.request.use(
// //   async (config) => {
// //     // Skip CSRF for GET requests and refresh-token endpoint
// //     if (config.method !== "get" && !config.url.includes("/refresh-token")) {
// //       // Fetch CSRF token if not cached
// //       if (!csrfToken) {
// //         await fetchCsrfToken();
// //       }
// //       // Add CSRF token to header
// //       config.headers["X-CSRF-Token"] = csrfToken;
// //     }
// //     return config;
// //   },
// //   (error) => {
// //     return Promise.reject(error);
// //   }
// // );

// // // 🔄 RESPONSE INTERCEPTOR - Handle token expiry
// // api.interceptors.response.use(
// //   (response) => response,
// //   async (error) => {
// //     const originalRequest = error.config;

// //     // 🔑 If access token expired, try to refresh
// //     if (error.response?.status === 401 && !originalRequest._retry) {
// //       originalRequest._retry = true;

// //       try {
// //         await api.post("/auth/refresh-token");
// //         return api(originalRequest);
// //       } catch (refreshError) {
// //         // Redirect to login if refresh fails
// //         window.location.href = "/login";
// //         return Promise.reject(refreshError);
// //       }
// //     }

// //     // 🛡️ If CSRF token invalid, refetch and retry
// //     if (error.response?.status === 403 && error.response?.data?.message?.includes("CSRF")) {
// //       console.log("🔄 Refetching CSRF token...");
// //       await fetchCsrfToken();
// //       originalRequest.headers["X-CSRF-Token"] = csrfToken;
// //       return api(originalRequest);
// //     }

// //     return Promise.reject(error);
// //   }
// // );

// // // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// // // 🔐 AUTH ENDPOINTS
// // // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// // export const authAPI = {
// //   // 📝 Register
// //   register: (data) => api.post("/auth/register", data),

// //   // 🔑 Login
// //   login: (data) => api.post("/auth/login", data),

// //   // 🚪 Logout
// //   logout: () => api.post("/auth/logout"),

// //   // 🚪 Logout All Devices
// //   logoutAll: () => api.post("/auth/logout-all"),

// //   // 👤 Get Profile
// //   getProfile: () => api.get("/auth/profile"),

// //   // ✏️ Update Profile
// //   updateProfile: (data) => api.put("/auth/profile", data),

// //   // 🔑 Change Password
// //   changePassword: (data) => api.put("/auth/profile/password", data),

// //   // 📧 Forgot Password
// //   forgotPassword: (data) => api.post("/auth/forgot-password", data),

// //   // 🔒 Reset Password
// //   resetPassword: (token, data) => api.post(`/auth/reset-password/${token}`, data),
// // };

// // export default api;

// import axios from "axios";

// const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5050/api";

// // 🔧 CREATE AXIOS INSTANCE
// const api = axios.create({
//   baseURL: API_URL,
//   withCredentials: true, // ✅ CRITICAL: Send cookies with requests
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // 🛡️ CSRF TOKEN CACHE
// let csrfToken = null;

// // 🛡️ FETCH CSRF TOKEN
// export const fetchCsrfToken = async () => {
//   try {
//     const response = await api.get("/csrf-token");
//     csrfToken = response.data.csrfToken;
//     console.log("✅ CSRF Token fetched:", csrfToken);
//     return csrfToken;
//   } catch (error) {
//     console.error("❌ Failed to fetch CSRF token:", error);
//     throw error;
//   }
// };

// // 🔄 REQUEST INTERCEPTOR - Add CSRF token to requests
// api.interceptors.request.use(
//   async (config) => {
//     // Skip CSRF for GET requests and refresh-token endpoint
//     if (config.method !== "get" && !config.url.includes("/refresh-token")) {
//       // Fetch CSRF token if not cached
//       if (!csrfToken) {
//         await fetchCsrfToken();
//       }
//       // Add CSRF token to header
//       config.headers["X-CSRF-Token"] = csrfToken;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // 🔄 RESPONSE INTERCEPTOR - Handle token expiry
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // 🔑 If access token expired, try to refresh
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         await api.post("/auth/refresh-token");
//         return api(originalRequest);
//       } catch (refreshError) {
//         // Redirect to login if refresh fails
//         window.location.href = "/login";
//         return Promise.reject(refreshError);
//       }
//     }

//     // 🛡️ If CSRF token invalid, refetch and retry
//     if (error.response?.status === 403 && error.response?.data?.message?.includes("CSRF")) {
//       console.log("🔄 Refetching CSRF token...");
//       await fetchCsrfToken();
//       originalRequest.headers["X-CSRF-Token"] = csrfToken;
//       return api(originalRequest);
//     }

//     return Promise.reject(error);
//   }
// );

// // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// // 🔐 AUTH ENDPOINTS
// // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// export const authAPI = {
//   // 📝 Register
//   register: (data) => api.post("/auth/register", data),

//   // 🔑 Login
//   login: (data) => api.post("/auth/login", data),

//   // 🚪 Logout
//   logout: () => api.post("/auth/logout"),

//   // 🚪 Logout All Devices
//   logoutAll: () => api.post("/auth/logout-all"),

//   // 👤 Get Profile
//   getProfile: () => api.get("/auth/profile"),

//   // ✏️ Update Profile
//   updateProfile: (data) => api.put("/auth/profile", data),

//   // 🔑 Change Password
//   changePassword: (data) => api.put("/auth/profile/password", data),

//   // 📧 Forgot Password
//   forgotPassword: (data) => api.post("/auth/forgot-password", data),

//   // 🔒 Reset Password
//   resetPassword: (token, data) => api.post(`/auth/reset-password/${token}`, data),
// };

// export default api;

import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5050/api";

// 🔧 CREATE AXIOS INSTANCE
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // ✅ CRITICAL: Send cookies with requests
  headers: {
    "Content-Type": "application/json",
  },
});

// 🛡️ CSRF TOKEN CACHE
let csrfToken = null;

// 🛡️ FETCH CSRF TOKEN
export const fetchCsrfToken = async () => {
  try {
    const response = await api.get("/csrf-token");
    csrfToken = response.data.csrfToken;
    console.log("✅ CSRF Token fetched");
    return csrfToken;
  } catch (error) {
    console.error("❌ Failed to fetch CSRF token:", error);
    throw error;
  }
};

// 🔄 REQUEST INTERCEPTOR - Add CSRF token to requests
api.interceptors.request.use(
  async (config) => {
    // Skip CSRF for GET requests, refresh-token, and csrf-token endpoints
    const skipCsrf =
      config.method === "get" ||
      config.url.includes("/refresh-token") ||
      config.url.includes("/csrf-token");

    if (!skipCsrf) {
      // Fetch CSRF token if not cached
      if (!csrfToken) {
        try {
          await fetchCsrfToken();
        } catch (error) {
          console.error("Failed to fetch CSRF token in interceptor");
        }
      }
      // Add CSRF token to header
      if (csrfToken) {
        config.headers["X-CSRF-Token"] = csrfToken;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 🔄 RESPONSE INTERCEPTOR - Handle token expiry
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 🛡️ Handle CSRF token errors (403)
    if (
      error.response?.status === 403 &&
      error.response?.data?.message?.includes("CSRF") &&
      !originalRequest._retryCSRF
    ) {
      console.log("🔄 CSRF token invalid, refetching...");
      originalRequest._retryCSRF = true;
      csrfToken = null; // Clear invalid token
      try {
        await fetchCsrfToken();
        originalRequest.headers["X-CSRF-Token"] = csrfToken;
        return api(originalRequest);
      } catch (csrfError) {
        return Promise.reject(csrfError);
      }
    }

    // 🔑 Handle 401 Unauthorized (Token Expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      // ⚠️ CRITICAL: Don't retry if this IS the refresh-token endpoint
      if (originalRequest.url.includes("/refresh-token")) {
        console.log("❌ Refresh token is invalid. Redirecting to login...");
        isRefreshing = false;
        processQueue(error, null);

        // Clear any stored auth state
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        // Redirect to login (only if not already there)
        if (!window.location.pathname.includes("/login")) {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }

      // Queue other requests while refreshing
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log("🔄 Attempting to refresh access token...");
        await api.post("/auth/refresh-token");
        console.log("✅ Access token refreshed successfully");

        isRefreshing = false;
        processQueue(null);

        return api(originalRequest);
      } catch (refreshError) {
        console.log("❌ Failed to refresh token. Logging out...");
        isRefreshing = false;
        processQueue(refreshError, null);

        // Clear any stored auth state
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        // Redirect to login (only if not already there)
        if (!window.location.pathname.includes("/login")) {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🔐 AUTH ENDPOINTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const authAPI = {
  // 📝 Register
  register: (data) => api.post("/auth/register", data),

  // 🔑 Login
  login: (data) => api.post("/auth/login", data),

  // 🚪 Logout
  logout: () => api.post("/auth/logout"),

  // 🚪 Logout All Devices
  logoutAll: () => api.post("/auth/logout-all"),

  // 👤 Get Profile
  getProfile: () => api.get("/auth/profile"),

  // ✏️ Update Profile
  updateProfile: (data) => api.put("/auth/profile", data),

  // 🔑 Change Password
  changePassword: (data) => api.put("/auth/profile/password", data),

  // 📧 Forgot Password
  forgotPassword: (data) => api.post("/auth/forgot-password", data),

  // 🔒 Reset Password
  resetPassword: (token, data) =>
    api.post(`/auth/reset-password/${token}`, data),
};

export default api;
