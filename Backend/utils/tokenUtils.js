// const jwt = require("jsonwebtoken");

// // 🔑 Generate Access Token (short-lived, 15 minutes)
// const generateAccessToken = (payload) => {
//   return jwt.sign(payload, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_ACCESS_EXPIRY || "15m",
//   });
// };

// // 🔑 Generate Refresh Token (long-lived, 7 days)
// const generateRefreshToken = (payload) => {
//   return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
//     expiresIn: process.env.JWT_REFRESH_EXPIRY || "7d",
//   });
// };

// // 🔑 Verify Access Token
// const verifyAccessToken = (token) => {
//   try {
//     return jwt.verify(token, process.env.JWT_SECRET);
//   } catch (error) {
//     throw new Error("Invalid or expired access token");
//   }
// };

// // 🔑 Verify Refresh Token
// const verifyRefreshToken = (token) => {
//   try {
//     return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
//   } catch (error) {
//     throw new Error("Invalid or expired refresh token");
//   }
// };

// // 🍪 Set Cookie Options
// const getCookieOptions = (maxAge) => {
//   return {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//     maxAge: maxAge,
//     path: "/",
//   };
// };

// // 🍪 Access Token Cookie Options (15 minutes)
// const accessTokenCookieOptions = getCookieOptions(15 * 60 * 1000);

// // 🍪 Refresh Token Cookie Options (7 days)
// const refreshTokenCookieOptions = getCookieOptions(7 * 24 * 60 * 60 * 1000);

// module.exports = {
//   generateAccessToken,
//   generateRefreshToken,
//   verifyAccessToken,
//   verifyRefreshToken,
//   accessTokenCookieOptions,
//   refreshTokenCookieOptions,
// };

const jwt = require("jsonwebtoken");

// Token expiry times
const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY = "7d";

// Generate Access Token
exports.generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
};

// Generate Refresh Token
exports.generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
};

// Verify Access Token
exports.verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw error;
  }
};

// Verify Refresh Token
exports.verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    throw error;
  }
};

// Cookie options for Access Token
exports.accessTokenCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 15 * 60 * 1000, // 15 minutes
};

// Cookie options for Refresh Token
exports.refreshTokenCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};