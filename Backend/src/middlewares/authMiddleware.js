

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
