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


import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// Custom hook for easy access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthContextProvider");
  }
  return context;
};

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [redirectPath, setRedirectPath] = useState(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      }
    } else {
      // No token/user found - this is normal for guests
      setUser(null);
      // ✅ DON'T remove items that don't exist - just set user to null
    }

    setIsLoading(false);
  }, []);

  // Login function
  const login = (userData, token) => {
    if (!userData || !token) {
      console.error("Cannot login: missing user or token");
      return;
    }

    try {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("Error saving user to localStorage:", error);
    }
  };

  // Logout function
  const logout = (callback) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setRedirectPath(null);

    if (callback) callback(); // optional navigation after logout
  };

  // Helpers
  const isAuthenticated = () => !!user;
  const isAdmin = () => user?.role === "admin";

  const value = {
    user,
    isLoading,
    loading: isLoading, // backward compatibility
    login,
    logout,
    isAuthenticated,
    isAdmin,
    redirectPath,
    setRedirectPath,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;