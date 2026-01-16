// import { createContext, useContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// // Custom hook for easy access
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within AuthContextProvider");
//   }
//   return context;
// };

// const AuthContextProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [redirectPath, setRedirectPath] = useState(null);
//   // useEffect(() => {
//   //   setIsLoading(true);
//   //   const token = localStorage.getItem("token");

//   //   if (token) {
//   //     fetch(`${import.meta.env.VITE_API_URL}/users/profile`, {
//   //       headers: { Authorization: `Bearer ${token}` },
//   //     })
//   //       .then((res) => res.json())
//   //       .then((data) => {
//   //         if (data.success) setUser(data.data); // update user with latest info
//   //         else logout();
//   //       })
//   //       .catch(() => logout())
//   //       .finally(() => setIsLoading(false));
//   //   } else {
//   //     setUser(null);
//   //     setIsLoading(false);
//   //   }
//   // }, []);

//   // Initialize auth state from localStorage
//   useEffect(() => {
//     setIsLoading(true);
//     const token = localStorage.getItem("token");
//     const userData = localStorage.getItem("user");

//     if (token && userData) {
//       try {
//         const parsedUser = JSON.parse(userData);
//         setUser(parsedUser);
//       } catch (error) {
//         console.error("Error parsing user data:", error);
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         setUser(null);
//       }
//     } else {
//       // No token/user found
//       setUser(null);
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//     }

//     setIsLoading(false);
//   }, []);

//   // Login function
//   const login = (userData, token) => {
//     if (!userData || !token) {
//       console.error("Cannot login: missing user or token");
//       return;
//     }

//     try {
//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(userData));
//       setUser(userData);
//     } catch (error) {
//       console.error("Error saving user to localStorage:", error);
//     }
//   };

//   // Logout function
//   const logout = (callback) => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     setRedirectPath(null);

//     if (callback) callback(); // optional navigation after logout
//   };

//   // Helpers
//   const isAuthenticated = () => !!user;
//   const isAdmin = () => user?.role === "admin";

//   const value = {
//     user,
//     isLoading,
//     loading: isLoading, // backward compatibility
//     login,
//     logout,
//     isAuthenticated,
//     isAdmin,
//     redirectPath,
//     setRedirectPath,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export default AuthContextProvider;

// import { createContext, useContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// // Custom hook for easy access
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within AuthContextProvider");
//   }
//   return context;
// };

// const AuthContextProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [redirectPath, setRedirectPath] = useState(null);

//   // Initialize auth state from localStorage
//   useEffect(() => {
//     setIsLoading(true);
//     const token = localStorage.getItem("token");
//     const userData = localStorage.getItem("user");

//     if (token && userData) {
//       try {
//         const parsedUser = JSON.parse(userData);
//         setUser(parsedUser);
//       } catch (error) {
//         console.error("Error parsing user data:", error);
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         setUser(null);
//       }
//     } else {
//       // No token/user found - this is normal for guests
//       setUser(null);
//       // ✅ DON'T remove items that don't exist - just set user to null
//     }

//     setIsLoading(false);
//   }, []);

//   // Login function
//   const login = (userData, token) => {
//     if (!userData || !token) {
//       console.error("Cannot login: missing user or token");
//       return;
//     }

//     try {
//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(userData));
//       setUser(userData);
//     } catch (error) {
//       console.error("Error saving user to localStorage:", error);
//     }
//   };

//   // Logout function
//   const logout = (callback) => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     setRedirectPath(null);

//     if (callback) callback(); // optional navigation after logout
//   };

//   // Helpers
//   const isAuthenticated = () => !!user;
//   const isAdmin = () => user?.role === "admin";

//   const value = {
//     user,
//     isLoading,
//     loading: isLoading, // backward compatibility
//     login,
//     logout,
//     isAuthenticated,
//     isAdmin,
//     redirectPath,
//     setRedirectPath,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export default AuthContextProvider;

// import { createContext, useContext, useState, useEffect } from "react";
// import { logoutUserApi, getUserProfileApi } from "../services/userService";

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within AuthProvider");
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [redirectPath, setRedirectPath] = useState(null);

//   // 🔍 CHECK IF USER IS LOGGED IN ON MOUNT
//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         // Try to get user profile using cookie-based auth
//         const response = await getUserProfileApi();
//         if (response.data.success) {
//           setUser(response.data.data);
//         }
//       } catch (error) {
//         console.log("Not authenticated");
//         setUser(null);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     checkAuth();
//   }, []);

//   // ✅ LOGIN (stores user in state, cookies handled by backend)
//   const login = (userData) => {
//     setUser(userData);
//     console.log("✅ User logged in:", userData);
//   };

//   // 🚪 LOGOUT
//   const logout = async () => {
//     try {
//       await logoutUserApi();
//       setUser(null);
//       console.log("👋 User logged out");
//     } catch (error) {
//       console.error("Logout error:", error);
//       // Even if logout API fails, clear local state
//       setUser(null);
//     }
//   };

//   // 🚪 LOGOUT ALL DEVICES
//   const logoutAllDevices = async () => {
//     try {
//       await logoutAllDevicesApi();
//       setUser(null);
//       console.log("👋 Logged out from all devices");
//     } catch (error) {
//       console.error("Logout all devices error:", error);
//       setUser(null);
//     }
//   };

//   // 🔍 CHECK IF USER IS AUTHENTICATED
//   const isAuthenticated = !!user;

//   // 🔍 CHECK IF USER IS ADMIN
//   const isAdmin = user?.role === "admin";

//   const value = {
//     user,
//     isLoading,
//     isAuthenticated,
//     isAdmin,
//     login,
//     logout,
//     logoutAllDevices,
//     redirectPath,
//     setRedirectPath,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export default AuthProvider;

import { createContext, useContext, useState, useEffect } from "react";
import { logoutUserApi, getUserProfileApi } from "../services/userService";

// ✅ CREATE AND EXPORT AuthContext
export const AuthContext = createContext();

// ✅ EXPORT useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

// ✅ EXPORT AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [redirectPath, setRedirectPath] = useState(null);

  // 🔍 CHECK IF USER IS LOGGED IN ON MOUNT
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       // Try to get user profile using cookie-based auth
  //       const response = await getUserProfileApi();
  //       if (response.data.success) {
  //         setUser(response.data.data);
  //       }
  //     } catch (error) {
  //       console.log("Not authenticated");
  //       setUser(null);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   checkAuth();
  // }, []);

  // useEffect(() => {
  //   let isMounted = true;

  //   const checkAuth = async () => {
  //     try {
  //       const res = await getUserProfileApi();
  //       if (isMounted && res.data.success) {
  //         setUser(res.data.data);
  //       }
  //     } catch {
  //       if (isMounted) setUser(null);
  //     } finally {
  //       if (isMounted) setIsLoading(false);
  //     }
  //   };

  //   checkAuth();

  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const res = await getUserProfileApi();
        if (isMounted && res.data.success) {
          setUser(res.data.data);
        }
      } catch (error) {
        if (isMounted) {
          // Only log if it's not a simple 401 (user not logged in)
          if (error.response?.status !== 401) {
            console.error("Auth check error:", error);
          }
          setUser(null);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);
  // ✅ LOGIN (stores user in state, cookies handled by backend)
  const login = (userData) => {
    setUser(userData);
    console.log("✅ User logged in:", userData);
  };

  // 🚪 LOGOUT
  const logout = async () => {
    try {
      await logoutUserApi();
      setUser(null);
      console.log("👋 User logged out");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if logout API fails, clear local state
      setUser(null);
    }
  };

  // 🚪 LOGOUT ALL DEVICES
  const logoutAllDevices = async () => {
    try {
      await logoutAllDevicesApi();
      setUser(null);
      console.log("👋 Logged out from all devices");
    } catch (error) {
      console.error("Logout all devices error:", error);
      setUser(null);
    }
  };

  // 🔍 CHECK IF USER IS AUTHENTICATED
  const isAuthenticated = !!user;

  // 🔍 CHECK IF USER IS ADMIN
  const isAdmin = user?.role === "admin";

  const value = {
    user,
    isLoading,
    isAuthenticated,
    isAdmin,
    login,
    logout,
    logoutAllDevices,
    redirectPath,
    setRedirectPath,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ✅ DEFAULT EXPORT
export default AuthProvider;
