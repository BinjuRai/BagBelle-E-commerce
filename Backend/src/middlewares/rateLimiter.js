const rateLimit = require("express-rate-limit");

// 🔒 LOGIN RATE LIMITER
// Limits login attempts to 5 per 15 minutes per IP address
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: "Too many login attempts from this IP. Please try again after 15 minutes.",
    retryAfter: 15 * 60 // seconds
  },
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  handler: (req, res) => {
    console.log(`🚨 Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      message: "Too many login attempts. Please try again after 15 minutes.",
      retryAfter: 15 * 60
    });
  },
  // Skip rate limiting for successful logins
  skipSuccessfulRequests: true,
});

// 🔒 REGISTRATION RATE LIMITER
// Prevents spam registrations
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Limit each IP to 3 registrations per hour
  message: {
    success: false,
    message: "Too many accounts created from this IP. Please try again after an hour."
  },
  handler: (req, res) => {
    console.log(`🚨 Registration rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      message: "Too many accounts created from this IP. Please try again after an hour."
    });
  },
});

// 🔒 PASSWORD RESET RATE LIMITER
const passwordResetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Limit each IP to 3 password reset requests
  message: {
    success: false,
    message: "Too many password reset attempts. Please try again after 15 minutes."
  },
});

module.exports = {
  loginLimiter,
  registerLimiter,
  passwordResetLimiter
};

