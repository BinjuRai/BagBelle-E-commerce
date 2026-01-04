
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

//     // Attach user info to request
//     req.user = decoded;
//     // req.user = {
//     //   id: decoded.id, // make sure this matches your User model _id
//     //   role: decoded.role,
//     // };

//     next();
//   } catch (error) {
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


const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Authenticate user
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ FIX: Your JWT has "_id", but controller expects "id"
    req.user = {
      id: decoded._id,  // Convert _id to id
      _id: decoded._id, // Keep _id for backward compatibility
      email: decoded.email,
      name: decoded.name,
      role: decoded.role,
    };

    console.log("🔍 Authenticated user:", req.user.id); // For debugging

    next();
  } catch (error) {
    console.error("❌ Auth error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// Check if user is admin
const isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Access denied",
    });
  }
};

module.exports = { authenticate, isAdmin };