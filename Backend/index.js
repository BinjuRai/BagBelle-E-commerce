const app = require("./server");
const http = require("http");

const PORT = process.env.PORT || 5050;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API: http://localhost:${PORT}`);
  console.log(`📍 Auth: http://localhost:${PORT}/api/auth`);
  console.log(`📍 Products: http://localhost:${PORT}/api/products`);
  console.log(`📍 Admin: http://localhost:${PORT}/api/admin`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} is already in use!`);
    console.log("💡 Run: kill -9 $(lsof -ti:5050)");
  } else {
    console.error("❌ Server error:", err);
  }
  process.exit(1);
});