

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const rateLimit = require("express-rate-limit");

const app = express();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 attempts per 15 minutes per IP
  message: {
    success: false,
    message: "Too many login attempts. Please try again after 15 minutes."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// 🔧 MIDDLEWARE SETUP (Order matters!)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🍪 COOKIE PARSER (must be BEFORE CSRF)
app.use(cookieParser());

// 🌐 CORS CONFIGURATION (allow credentials for cookies)
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true, // ✅ CRITICAL: Allow cookies
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"],
  })
);

// 🛡️ CSRF PROTECTION (cookie-based)
// const csrfProtection = csrf({
//   cookie: {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//   },
// });

// 🛡️ CSRF Token Endpoint (GET request - no CSRF needed)
// app.get("/api/csrf-token", csrfProtection, (req, res) => {
//   res.json({
//     success: true,
//     csrfToken: req.csrfToken(),
//   });
// });

// 🛡️ CSRF PROTECTION (cookie-based)
const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  },
});

// 🛡️ CSRF Token Endpoint (GET request - no CSRF needed)
app.get("/api/csrf-token", csrfProtection, (req, res) => {
  res.json({
    success: true,
    csrfToken: req.csrfToken(),
  });
});

// 📁 IMPORT ROUTES
const userRoutes = require("./src/routes/userRoutes");
const demoRoutes = require("./src/routes/demoRoutes");
const productRoutes = require("./src/routes/productRoutes");
const adminProductRoutes = require("./src/routes/admin/adminProductRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes")
const adminCategoryRoutes = require("./src/routes/admin/adminCategoryRoutes")
const wishlistRoutes = require("./src/routes/wishlistRoutes");
const cartRoute = require("./src/routes/cartRoute");
const notificationRoutes = require("./src/routes/notificationRoutes");
const blogRoutes = require("./src/routes/blogRoutes");
const deliveryTrackingRoutes = require("./src/routes/deliveryTrackingRoutes");
const profileRoutes = require("./src/routes/profileRoutes");

const reviewRoutes = require("./src/routes/reviewRoutes");

// 🔗 USE ROUTES
// Note: Using /api/auth to match your existing structure
app.use("/api/auth", userRoutes);
app.use("/api/demo", demoRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin/products", csrfProtection, adminProductRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/admin/categories", csrfProtection, adminCategoryRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/auth/login", loginLimiter);
app.use("/api/cart", cartRoute);
app.use("/api/notifications", notificationRoutes);
app.use("/api/auth/users", profileRoutes)
app.use("/api", blogRoutes);
app.use("/api/delivery-tracking", deliveryTrackingRoutes);
app.use("/api/reviews", reviewRoutes);

app.use((req, res, next) => {
  console.log("🍪 Cookies:", req.cookies);
  next();
});


// 🏠 TEST ROUTE
app.get("/", (req, res) => {
  res.json({ 
    success: true,
    message: "🎉 BagBelle API is running!",
    security: "🔒 Secured with JWT, HTTP-Only Cookies, and CSRF Protection",
    endpoints: {
      csrf: "/api/csrf-token",
      register: "/api/auth/register",
      login: " /api/auth/login",
      logout: " /api/auth/logout",
      logoutAll: " /api/auth/logout-all",
      refreshToken: " /api/auth/refresh-token",
      profile: " /api/auth/profile",
      updateProfile: " /api/auth/profile",
      changePassword: " /api/auth/profile/password",
      forgotPassword: " /api/auth/forgot-password",
      resetPassword: " /api/auth/reset-password/:token"
    }
  });
});

// 🏥 HEALTH CHECK
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    mongodb: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString()
  });
});

// 🗄️ DATABASE CONNECTION
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// 🛡️ CSRF ERROR HANDLER
app.use((err, req, res, next) => {
  if (err.code === "EBADCSRFTOKEN") {
    return res.status(403).json({
      success: false,
      message: "Invalid CSRF token. Please refresh and try again.",
    });
  }
  next(err);
});

// 🔒 HTTPS ENFORCEMENT (Production only)
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    // Check if request is already HTTPS
    if (req.headers["x-forwarded-proto"] !== "https") {
      return res.redirect(301, `https://${req.headers.host}${req.url}`);
    }
    next();
  });
  
  console.log("🔒 HTTPS enforcement enabled");
}

// ❌ 404 HANDLER
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`,
  });
});

// ⚠️ ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === "production" 
      ? "Internal server error" 
      : err.message,
  });
});

module.exports = app;