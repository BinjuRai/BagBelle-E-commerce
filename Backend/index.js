// const app = require("./server");
// const http = require("http");

// const PORT = process.env.PORT || 5050;

// const server = http.createServer(app);

// server.listen(PORT, () => {
//   console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`📍 API: http://localhost:${PORT}`);
//   console.log(`📍 Auth: http://localhost:${PORT}/api/auth`);
//   console.log(`📍 Products: http://localhost:${PORT}/api/products`);
//   console.log(`📍 Admin: http://localhost:${PORT}/api/admin`);
//   console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
// });

// server.on("error", (err) => {
//   if (err.code === "EADDRINUSE") {
//     console.error(`❌ Port ${PORT} is already in use!`);
//     console.log("💡 Run: kill -9 $(lsof -ti:5050)");
//   } else {
//     console.error("❌ Server error:", err);
//   }
//   process.exit(1);
// });

require("dotenv").config();
const http = require("http");
const socketio = require("socket.io");
const jwt = require("jsonwebtoken");
const app = require("./server");

const PORT = process.env.PORT || 5050;

// Create HTTP server using Express app
const server = http.createServer(app);

// Socket.io setup
const io = socketio(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Socket.io authentication middleware
io.use((socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new Error("Authentication error"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.id;
    next();
  } catch (err) {
    next(new Error("Authentication error"));
  }
});

// Socket.io connection handler
io.on("connection", (socket) => {
  console.log(`✅ User connected: ${socket.userId}`);
  socket.join(socket.userId);

  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.userId}`);
  });

  socket.on("mark_notification_read", async (notificationId) => {
    try {
      const NotificationService = require("./services/notificationService");
      await NotificationService.markAsRead(notificationId, socket.userId);
      socket.emit("notification_marked_read", { notificationId });
    } catch (error) {
      socket.emit("error", { message: error.message });
    }
  });
});

// Pass io instance to notification service (if it exists)
try {
  const NotificationService = require("./services/notificationService");
  NotificationService.setSocketIO(io);
  console.log("✅ NotificationService connected to Socket.io");
} catch (error) {
  console.log("⚠️  NotificationService not found - notifications disabled");
}

// Make io accessible to routes
app.set("io", io);

// Start the server
server.listen(PORT, "0.0.0.0", () => {
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API: http://localhost:${PORT}`);
  console.log(`📍 Auth: http://localhost:${PORT}/api/auth`);
  console.log(`🍪 Cookies: Enabled (HTTP-Only, SameSite)`);
  console.log(`🛡️  CSRF: Protected`);
  console.log(`🔌 Socket.io: Enabled`);
  console.log(`🌐 Client URL: ${process.env.CLIENT_URL || "http://localhost:5173"}`);
  console.log(`🔒 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} is already in use!`);
    console.log(`💡 Run: lsof -ti:${PORT} | xargs kill -9`);
  } else {
    console.error("❌ Server error:", err);
  }
  process.exit(1);
});