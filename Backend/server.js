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
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import routes
const userRoutes = require("./src/routes/userRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Routes - All auth routes are now under /api/auth
app.use("/api/auth", userRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ 
    success: true,
    message: "🎉 BagBelle API is running!",
    endpoints: {
      register: "POST /api/auth/register",
      login: "POST /api/auth/login",
      profile: "GET /api/auth/profile",
      updateProfile: "PUT /api/auth/profile",
      changePassword: "PUT /api/auth/profile/password",
      forgotPassword: "POST /api/auth/forgot-password",
      resetPassword: "POST /api/auth/reset-password/:token"
    }
  });
});

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    mongodb: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// Start server ONLY if not already listening
const PORT = process.env.PORT || 5050;

if (!module.parent) {
  app.listen(PORT, () => {
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 API: http://localhost:${PORT}`);
    console.log(`📍 Auth: http://localhost:${PORT}/api/auth`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  }).on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`❌ Port ${PORT} is already in use!`);
      console.log(`💡 Change PORT in .env or run: lsof -ti:${PORT} | xargs kill -9`);
    } else {
      console.error("❌ Server error:", err);
    }
    process.exit(1);
  });
}

module.exports = app;