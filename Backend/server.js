// require("dotenv").config();
// const http = require("http");
// const socketio = require("socket.io");
// const jwt = require("jsonwebtoken");
// const app = require("./index");

// const PORT = process.env.PORT || 5050;

// // Create HTTP server using Express app
// const server = http.createServer(app);

// // Socket.io setup
// const io = socketio(server, {
//   cors: {
//     origin: process.env.CLIENT_URL || "http://localhost:5173",
//     methods: ["GET", "POST"],
//     credentials: true
//   }
// });

// // Socket.io authentication middleware
// io.use((socket, next) => {
//   const token = socket.handshake.auth.token;

//   if (!token) {
//     return next(new Error("Authentication error"));
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     socket.userId = decoded.id;
//     next();
//   } catch (err) {
//     next(new Error("Authentication error"));
//   }
// });

// // Socket.io connection handler
// io.on("connection", (socket) => {
//   console.log(`✅ User connected: ${socket.userId}`);
//   socket.join(socket.userId);

//   socket.on("disconnect", () => {
//     console.log(`❌ User disconnected: ${socket.userId}`);
//   });

//   socket.on("mark_notification_read", async (notificationId) => {
//     try {
//       const NotificationService = require("./services/notificationService");
//       await NotificationService.markAsRead(notificationId, socket.userId);
//       socket.emit("notification_marked_read", { notificationId });
//     } catch (error) {
//       socket.emit("error", { message: error.message });
//     }
//   });
// });

// // Pass io instance to notification service (if it exists)
// try {
//   const NotificationService = require("./services/notificationService");
//   NotificationService.setSocketIO(io);
//   console.log("✅ NotificationService connected to Socket.io");
// } catch (error) {
//   console.log("⚠️  NotificationService not found - notifications disabled");
// }

// // Make io accessible to routes
// app.set("io", io);

// // Start the server
// server.listen(PORT, "0.0.0.0", () => {
//   console.log(`🚀 Server running at http://0.0.0.0:${PORT}`);
//   console.log(`🔌 Socket.io enabled`);
//   console.log(`🌐 Client URL: ${process.env.CLIENT_URL || "http://localhost:5173"}`);
// });
// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// // Import routes
// const userRoutes = require("./src/routes/userRoutes");
// const demoRoutes = require("./src/routes/demoRoutes");
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Database connection
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => console.log("✅ MongoDB connected successfully"))
//   .catch((err) => {
//     console.error("❌ MongoDB connection error:", err);
//     process.exit(1);
//   });

// // Routes - All auth routes are now under /api/auth
// app.use("/api/auth", userRoutes);
// app.use("/api/demo", demoRoutes);

// // Test route
// app.get("/", (req, res) => {
//   res.json({ 
//     success: true,
//     message: "🎉 BagBelle API is running!",
//     endpoints: {
//       register: "POST /api/auth/register",
//       login: "POST /api/auth/login",
//       profile: "GET /api/auth/profile",
//       updateProfile: "PUT /api/auth/profile",
//       changePassword: "PUT /api/auth/profile/password",
//       forgotPassword: "POST /api/auth/forgot-password",
//       resetPassword: "POST /api/auth/reset-password/:token"
//     }
//   });
// });

// // Health check
// app.get("/health", (req, res) => {
//   res.json({
//     status: "OK",
//     mongodb: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
//     timestamp: new Date().toISOString()
//   });
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: `Route ${req.method} ${req.path} not found`,
//   });
// });

// // Error handler
// app.use((err, req, res, next) => {
//   console.error("Server error:", err);
//   res.status(500).json({
//     success: false,
//     message: "Internal server error",
//   });
// });

// // Start server ONLY if not already listening
// const PORT = process.env.PORT || 5050;

// if (!module.parent) {
//   app.listen(PORT, () => {
//     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//     console.log(`🚀 Server running on port ${PORT}`);
//     console.log(`📍 API: http://localhost:${PORT}`);
//     console.log(`📍 Auth: http://localhost:${PORT}/api/auth`);
//     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//   }).on("error", (err) => {
//     if (err.code === "EADDRINUSE") {
//       console.error(`❌ Port ${PORT} is already in use!`);
//       console.log(`💡 Change PORT in .env or run: lsof -ti:${PORT} | xargs kill -9`);
//     } else {
//       console.error("❌ Server error:", err);
//     }
//     process.exit(1);
//   });
// }

// module.exports = app;

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");

const app = express();

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

const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  },
});
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

// 🔗 USE ROUTES
// Note: Using /api/auth to match your existing structure
app.use("/api/auth", userRoutes);
app.use("/api/demo", demoRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin/products", csrfProtection, adminProductRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/admin/categories", csrfProtection, adminCategoryRoutes);
app.use("/api/wishlist", wishlistRoutes);


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