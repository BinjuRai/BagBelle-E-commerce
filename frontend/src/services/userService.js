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


import axios from "../api/api";

/* ---------------- AUTH APIs ---------------- */

export const loginUserApi = async (data) => {
  const response = await axios.post("/auth/login", data);
  return response; // Return full response, not response.data
};

export const registerUserApi = async (user) => {
  const response = await axios.post("/auth/register", user);
  return response; // Return full response
};

export const loginAdminApi = async (data) => {
  const response = await axios.post("/admin/login", data);
  return response;
};

/* ---------------- AUTH HEADER ---------------- */

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No auth token found");
  return { Authorization: `Bearer ${token}` };
};

/* ---------------- PROFILE APIs ---------------- */

export const fetchProfileApi = async () => {
  const response = await axios.get("/auth/profile", { // Changed from /users/profile
    headers: getAuthHeader(),
  });
  return response.data;
};

export const updateProfileApi = async (updates) => {
  const response = await axios.put("/auth/profile", updates, { // Changed from /users/profile
    headers: getAuthHeader(),
  });
  return response.data;
};

export const uploadProfileImageApi = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await axios.put("/auth/profile/image", formData, { // Changed
    headers: {
      ...getAuthHeader(),
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const changePasswordApi = async (oldPassword, newPassword) => {
  const response = await axios.put(
    "/auth/profile/password", // Changed from /users/profile/password
    { oldPassword, newPassword },
    { headers: getAuthHeader() }
  );
  return response.data;
};