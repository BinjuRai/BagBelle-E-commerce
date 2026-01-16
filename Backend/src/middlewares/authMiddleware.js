// const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");

// // Authenticate user
// const authenticate = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "No token provided",
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // ✅ FIX: Your JWT has "_id", but controller expects "id"
//     req.user = {
//       id: decoded._id,  // Convert _id to id
//       _id: decoded._id, // Keep _id for backward compatibility
//       email: decoded.email,
//       name: decoded.name,
//       role: decoded.role,
//     };

//     console.log("🔍 Authenticated user:", req.user.id); // For debugging

//     next();
//   } catch (error) {
//     console.error("❌ Auth error:", error.message);
//     return res.status(401).json({
//       success: false,
//       message: "Invalid or expired token",
//     });
//   }
// };

// // Check if user is admin
// const isAdmin = async (req, res, next) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({
//         success: false,
//         message: "Admin access required",
//       });
//     }
//     next();
//   } catch (error) {
//     return res.status(403).json({
//       success: false,
//       message: "Access denied",
//     });
//   }
// };

// module.exports = { authenticate, isAdmin };

// const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");

// // 🔐 AUTHENTICATE USER
// const authenticate = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "No token provided. Please login.",
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Store user info in request
//     req.user = {
//       id: decoded._id,
//       _id: decoded._id,
//       email: decoded.email,
//       name: decoded.name,
//       role: decoded.role,
//     };

//     console.log("🔍 Authenticated user:", req.user.email, "| Role:", req.user.role);

//     next();
//   } catch (error) {
//     console.error("❌ Auth error:", error.message);
//     return res.status(401).json({
//       success: false,
//       message: "Invalid or expired token",
//     });
//   }
// };

// // 🔒 AUTHORIZE BY ROLE (Flexible - accepts multiple roles)
// const authorize = (...allowedRoles) => {
//   return (req, res, next) => {
//     if (!req.user) {
//       return res.status(401).json({
//         success: false,
//         message: "Authentication required",
//       });
//     }

//     if (!allowedRoles.includes(req.user.role)) {
//       console.log(`🚫 Access denied for ${req.user.email} (Role: ${req.user.role})`);
//       return res.status(403).json({
//         success: false,
//         message: `Access denied. Required role: ${allowedRoles.join(" or ")}. Your role: ${req.user.role}`,
//         requiredRole: allowedRoles,
//         currentRole: req.user.role
//       });
//     }

//     console.log(`✅ Access granted for ${req.user.email} (Role: ${req.user.role})`);
//     next();
//   };
// };

// // 🔒 ADMIN ONLY (Shortcut for admin-only routes)
// const isAdmin = authorize("admin");

// // 🔒 USER ONLY (Shortcut for user-only routes)
// const isUser = authorize("user");

// // 🔒 ADMIN OR USER (Shortcut for authenticated routes)
// const isAuthenticated = authorize("admin", "user");

// module.exports = {
//   authenticate,
//   authorize,
//   isAdmin,
//   isUser,
//   isAuthenticated
// };

// const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");

// exports.protect = async (req, res, next) => {
//   try {
//     // 🍪 Get token from HTTP-Only cookie
//     const token = req.cookies.token;

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "Not authorized, no token",
//       });
//     }

//     // ✅ Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // 📌 Get user from token (exclude password)
//     req.user = await User.findById(decoded.id).select("-password");

//     if (!req.user) {
//       return res.status(401).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     next();
//   } catch (error) {
//     console.error("Auth middleware error:", error.message);

//     if (error.name === "TokenExpiredError") {
//       return res.status(401).json({
//         success: false,
//         message: "Token expired",
//         tokenExpired: true, // ✅ Signal to frontend to refresh
//       });
//     }

//     return res.status(401).json({
//       success: false,
//       message: "Not authorized, token failed",
//     });
//   }
// };

// // 🛡️ Admin middleware
// exports.admin = (req, res, next) => {
//   if (req.user && req.user.role === "admin") {
//     next();
//   } else {
//     res.status(403).json({
//       success: false,
//       message: "Access denied. Admin only.",
//     });
//   }
// };

// const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");
// const { verifyAccessToken } = require("../../utils/tokenUtils");

// exports.protect = async (req, res, next) => {
//   try {
//     // 🍪 Get token from HTTP-Only cookie
//     const token = req.cookies.accessToken;

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "Not authorized, no token",
//       });
//     }

//     // ✅ Verify token using your utility function
//     const decoded = verifyAccessToken(token);

//     if (!decoded) {
//       return res.status(401).json({
//         success: false,
//         message: "Not authorized, invalid token",
//       });
//     }

//     // 📌 Get user from token (exclude password)
//     req.user = await User.findById(decoded._id).select("-password -passwordHistory");

//     if (!req.user) {
//       return res.status(401).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     next();
//   } catch (error) {
//     console.error("Auth middleware error:", error.message);

//     if (error.name === "TokenExpiredError") {
//       return res.status(401).json({
//         success: false,
//         message: "Token expired",
//         tokenExpired: true,
//       });
//     }

//     if (error.name === "JsonWebTokenError") {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid token",
//       });
//     }

//     return res.status(401).json({
//       success: false,
//       message: "Not authorized",
//     });
//   }
// };

// // 🛡️ Admin middleware
// exports.admin = (req, res, next) => {
//   if (req.user && req.user.role === "admin") {
//     next();
//   } else {
//     res.status(403).json({
//       success: false,
//       message: "Access denied. Admin only.",
//     });
//   }
// };

const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { verifyAccessToken } = require("../../utils/tokenUtils");

// 🔐 AUTHENTICATION - Verify JWT token
exports.protect = async (req, res, next) => {
  try {
    // 🍪 Get token from HTTP-Only cookie
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, no token",
      });
    }

    // ✅ Verify token
    const decoded = verifyAccessToken(token);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, invalid token",
      });
    }

    // 📌 Get user from token (exclude sensitive fields)
    req.user = await User.findById(decoded._id).select(
      "-password -passwordHistory"
    );

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
        tokenExpired: true,
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Not authorized",
    });
  }
};

// 🔐 ALIAS for protect (for your demo routes)
exports.authenticate = exports.protect;

// 🛡️ RBAC - Role-Based Authorization Middleware
exports.authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role: ${allowedRoles.join(" or ")}`,
        userRole: req.user.role,
        requiredRoles: allowedRoles,
      });
    }

    next();
  };
};

// 🔒 ADMIN ONLY - Check if user is admin
exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Access denied. Admin privileges required.",
      userRole: req.user?.role || "none",
    });
  }
};

// 👤 USER ONLY - Check if user has 'user' role
exports.isUser = (req, res, next) => {
  if (req.user && req.user.role === "user") {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Access denied. User role required.",
      userRole: req.user?.role || "none",
    });
  }
};

// 🔓 CHECK AUTHENTICATED - Just verify user exists (any role)
exports.isAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }
};

// 🛡️ LEGACY - Keep for backward compatibility
exports.admin = exports.isAdmin;
