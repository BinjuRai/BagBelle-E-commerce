require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");

// Route imports
const userRoutes = require("./src/routes/userRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const paymentRoutes = require("./src/routes/paymentRoutes");
const wishlistRoutes = require("./src/routes/wishlistRoutes");
const deliveryTrackingRoutes = require("./src/routes/deliveryTrackingRoutes");

const adminProductRoutes = require("./src/routes/admin/adminProductRoutes");
const adminCategoryRoutes = require("./src/routes/admin/adminCategoryRoutes");
const adminUserRoutes = require("./src/routes/admin/adminUserRoutes");
const adminAnalyticsRoutes = require("./src/routes/admin/adminAnalyticsRoutes");

const productRoutes = require("./src/routes/productRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes");
const cartRoute = require("./src/routes/cartRoute");

const notificationRoutes = require("./src/routes/notificationRoutes");
const blogRoutes = require("./src/routes/blogRoutes");
const profileRoutes = require("./src/routes/profileRoutes");



// const adminBlogRoutes = require("./src/routes/admin/blogRoutes");
// Connect to MongoDB
connectDB();

const app = express();

// Middleware
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/delivery-tracking", deliveryTrackingRoutes);

app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin/categories", adminCategoryRoutes);
app.use("/api/admin/users", adminUserRoutes);
app.use("/api/admin/analytics", adminAnalyticsRoutes);

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoute);
app.use("/api/notifications", notificationRoutes);
app.use("/api/users", profileRoutes)
app.use("/api", blogRoutes);

// Test route
app.get("/test", (req, res) => {
  res.send("Server is working!");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Something went wrong",
  });
});


module.exports = app;
