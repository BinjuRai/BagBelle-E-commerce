// // const mongoose = require("mongoose");

// // const userSchema = new mongoose.Schema(
// //   {
// //     name: { type: String, required: true },
// //     email: { type: String, required: true, unique: true },
// //     password: { type: String, required: true },
// //     phone: { type: String },
// //     address: [
// //       {
// //         fullName: String,
// //         city: String,
// //         district: String,
// //         ward: String,
// //         phone: String,
// //       }
// //     ],
// //     role: { type: String, enum: ["user", "admin"], default: "user" },
// //     filepath: {
// //             type: String
// //         }
// //   },
// //   { timestamps: true }
// // );

// // module.exports = mongoose.model("User", userSchema);

// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     phone: { type: String },
//     address: [
//       {
//         fullName: String,
//         city: String,
//         district: String,
//         ward: String,
//         phone: String,
//       }
//     ],
//     role: { type: String, enum: ["user", "admin"], default: "user" },
//     filepath: { type: String },

//     // 🔐 PASSWORD SECURITY FEATURES
//     passwordHistory: [
//       {
//         hash: String,
//         changedAt: { type: Date, default: Date.now }
//       }
//     ],
//     passwordChangedAt: { type: Date, default: Date.now },
//     passwordExpiresAt: { type: Date },
//     isPasswordExpired: { type: Boolean, default: false }
//   },
//   { timestamps: true }
// );

// // 🔒 Method to check password expiry (90 days)
// userSchema.methods.checkPasswordExpiry = function() {
//   if (!this.passwordExpiresAt) {
//     // Set expiry to 90 days from password change date
//     this.passwordExpiresAt = new Date(this.passwordChangedAt);
//     this.passwordExpiresAt.setDate(this.passwordExpiresAt.getDate() + 90);
//   }

//   const now = new Date();
//   this.isPasswordExpired = now > this.passwordExpiresAt;
//   return this.isPasswordExpired;
// };

// // 🔒 Method to add password to history (keep last 5)
// userSchema.methods.addToPasswordHistory = function(passwordHash) {
//   this.passwordHistory.unshift({
//     hash: passwordHash,
//     changedAt: new Date()
//   });

//   // Keep only last 5 passwords
//   if (this.passwordHistory.length > 5) {
//     this.passwordHistory = this.passwordHistory.slice(0, 5);
//   }

//   // Update password change date and expiry
//   this.passwordChangedAt = new Date();
//   this.passwordExpiresAt = new Date();
//   this.passwordExpiresAt.setDate(this.passwordExpiresAt.getDate() + 90);
//   this.isPasswordExpired = false;
// };

// module.exports = mongoose.model("User", userSchema);
// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     phone: { type: String },
//     address: [
//       {
//         fullName: String,
//         city: String,
//         district: String,
//         ward: String,
//         phone: String,
//       }
//     ],
//     role: { type: String, enum: ["user", "admin"], default: "user" },
//     filepath: { type: String },

//     // 🔐 PASSWORD SECURITY FEATURES
//     passwordHistory: [
//       {
//         hash: String,
//         changedAt: { type: Date, default: Date.now }
//       }
//     ],
//     passwordChangedAt: { type: Date, default: Date.now },
//     passwordExpiresAt: { type: Date },
//     isPasswordExpired: { type: Boolean, default: false },

//     // 🔒 BRUTE-FORCE PROTECTION
//     loginAttempts: { type: Number, default: 0 },
//     lockUntil: { type: Date },
//     requiresCaptcha: { type: Boolean, default: false }
//   },
//   { timestamps: true }
// );

// // 🔒 Virtual field to check if account is locked
// userSchema.virtual('isLocked').get(function() {
//   return !!(this.lockUntil && this.lockUntil > Date.now());
// });

// // 🔒 Method to increment failed login attempts
// userSchema.methods.incLoginAttempts = function() {
//   // If we have a previous lock that has expired, reset attempts
//   if (this.lockUntil && this.lockUntil < Date.now()) {
//     return this.updateOne({
//       $set: { loginAttempts: 1 },
//       $unset: { lockUntil: 1 }
//     });
//   }

//   const updates = { $inc: { loginAttempts: 1 } };

//   // Enable CAPTCHA after 3 failed attempts
//   if (this.loginAttempts + 1 >= 3) {
//     updates.$set = { requiresCaptcha: true };
//   }

//   // Lock account after 5 failed attempts for 30 minutes
//   if (this.loginAttempts + 1 >= 5) {
//     updates.$set = {
//       lockUntil: Date.now() + 30 * 60 * 1000, // 30 minutes
//       requiresCaptcha: true
//     };
//   }

//   return this.updateOne(updates);
// };

// // 🔒 Method to reset login attempts on successful login
// userSchema.methods.resetLoginAttempts = function() {
//   return this.updateOne({
//     $set: { loginAttempts: 0, requiresCaptcha: false },
//     $unset: { lockUntil: 1 }
//   });
// };

// // 🔒 Method to check password expiry (90 days)
// userSchema.methods.checkPasswordExpiry = function() {
//   if (!this.passwordExpiresAt) {
//     this.passwordExpiresAt = new Date(this.passwordChangedAt);
//     this.passwordExpiresAt.setDate(this.passwordExpiresAt.getDate() + 90);
//   }

//   const now = new Date();
//   this.isPasswordExpired = now > this.passwordExpiresAt;
//   return this.isPasswordExpired;
// };

// // 🔒 Method to add password to history (keep last 5)
// userSchema.methods.addToPasswordHistory = function(passwordHash) {
//   this.passwordHistory.unshift({
//     hash: passwordHash,
//     changedAt: new Date()
//   });

//   if (this.passwordHistory.length > 5) {
//     this.passwordHistory = this.passwordHistory.slice(0, 5);
//   }

//   this.passwordChangedAt = new Date();
//   this.passwordExpiresAt = new Date();
//   this.passwordExpiresAt.setDate(this.passwordExpiresAt.getDate() + 90);
//   this.isPasswordExpired = false;
// };

// module.exports = mongoose.model("User", userSchema);

// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     phone: { type: String },
//     address: [
//       {
//         fullName: String,
//         city: String,
//         district: String,
//         ward: String,
//         phone: String,
//       }
//     ],
//     role: { type: String, enum: ["user", "admin"], default: "user" },
//     filepath: { type: String },

//     // 🔐 PASSWORD SECURITY FEATURES
//     passwordHistory: [
//       {
//         hash: String,
//         changedAt: { type: Date, default: Date.now }
//       }
//     ],
//     passwordChangedAt: { type: Date, default: Date.now },
//     passwordExpiresAt: { type: Date },
//     isPasswordExpired: { type: Boolean, default: false },

//     // 🔒 BRUTE-FORCE PROTECTION
//     loginAttempts: { type: Number, default: 0 },
//     lockUntil: { type: Date },
//     requiresCaptcha: { type: Boolean, default: false },

//     // 🔑 REFRESH TOKEN MANAGEMENT (NEW)
//     refreshTokens: [
//       {
//         token: String,
//         createdAt: { type: Date, default: Date.now },
//         expiresAt: Date,
//         userAgent: String, // Track device/browser
//         ip: String // Track IP address
//       }
//     ]
//   },
//   { timestamps: true }
// );

// // 🔒 Virtual field to check if account is locked
// userSchema.virtual('isLocked').get(function() {
//   return !!(this.lockUntil && this.lockUntil > Date.now());
// });

// // 🔒 Method to increment failed login attempts
// userSchema.methods.incLoginAttempts = function() {
//   if (this.lockUntil && this.lockUntil < Date.now()) {
//     return this.updateOne({
//       $set: { loginAttempts: 1 },
//       $unset: { lockUntil: 1 }
//     });
//   }

//   const updates = { $inc: { loginAttempts: 1 } };

//   if (this.loginAttempts + 1 >= 3) {
//     updates.$set = { requiresCaptcha: true };
//   }

//   if (this.loginAttempts + 1 >= 5) {
//     updates.$set = {
//       lockUntil: Date.now() + 30 * 60 * 1000,
//       requiresCaptcha: true
//     };
//   }

//   return this.updateOne(updates);
// };

// // 🔒 Method to reset login attempts on successful login
// userSchema.methods.resetLoginAttempts = function() {
//   return this.updateOne({
//     $set: { loginAttempts: 0, requiresCaptcha: false },
//     $unset: { lockUntil: 1 }
//   });
// };

// // 🔒 Method to check password expiry (90 days)
// userSchema.methods.checkPasswordExpiry = function() {
//   if (!this.passwordExpiresAt) {
//     this.passwordExpiresAt = new Date(this.passwordChangedAt);
//     this.passwordExpiresAt.setDate(this.passwordExpiresAt.getDate() + 90);
//   }

//   const now = new Date();
//   this.isPasswordExpired = now > this.passwordExpiresAt;
//   return this.isPasswordExpired;
// };

// // 🔒 Method to add password to history (keep last 5)
// userSchema.methods.addToPasswordHistory = function(passwordHash) {
//   this.passwordHistory.unshift({
//     hash: passwordHash,
//     changedAt: new Date()
//   });

//   if (this.passwordHistory.length > 5) {
//     this.passwordHistory = this.passwordHistory.slice(0, 5);
//   }

//   this.passwordChangedAt = new Date();
//   this.passwordExpiresAt = new Date();
//   this.passwordExpiresAt.setDate(this.passwordExpiresAt.getDate() + 90);
//   this.isPasswordExpired = false;
// };

// // 🔑 NEW: Add refresh token to user
// userSchema.methods.addRefreshToken = function(token, userAgent, ip) {
//   const expiresAt = new Date();
//   expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

//   this.refreshTokens.push({
//     token,
//     expiresAt,
//     userAgent,
//     ip
//   });

//   // Keep only last 5 refresh tokens (allow 5 devices)
//   if (this.refreshTokens.length > 5) {
//     this.refreshTokens = this.refreshTokens.slice(-5);
//   }
// };

// // 🔑 NEW: Remove specific refresh token (logout)
// userSchema.methods.removeRefreshToken = function(token) {
//   this.refreshTokens = this.refreshTokens.filter(rt => rt.token !== token);
// };

// // 🔑 NEW: Remove all refresh tokens (logout all devices)
// userSchema.methods.removeAllRefreshTokens = function() {
//   this.refreshTokens = [];
// };

// // 🔑 NEW: Clean expired refresh tokens
// userSchema.methods.cleanExpiredTokens = function() {
//   const now = new Date();
//   this.refreshTokens = this.refreshTokens.filter(rt => rt.expiresAt > now);
// };

// module.exports = mongoose.model("User", userSchema);
const mongoose = require("mongoose");
const { encrypt, decrypt } = require("../../utils/encryption");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String }, // ✅ Will be auto-encrypted
    address: [
      {
        fullName: String,
        city: String,
        district: String,
        ward: String,
        phone: String, // ✅ Will be auto-encrypted
      },
    ],
    role: { type: String, enum: ["user", "admin"], default: "user" },
    filepath: { type: String },

    // 🔐 PASSWORD SECURITY FEATURES
    passwordHistory: [
      {
        hash: String,
        changedAt: { type: Date, default: Date.now },
      },
    ],
    passwordChangedAt: { type: Date, default: Date.now },
    passwordExpiresAt: { type: Date },
    isPasswordExpired: { type: Boolean, default: false },

    // 🔒 BRUTE-FORCE PROTECTION
    loginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date },
    requiresCaptcha: { type: Boolean, default: false },

    // 🔑 REFRESH TOKEN MANAGEMENT
    refreshTokens: [
      {
        token: String,
        createdAt: { type: Date, default: Date.now },
        expiresAt: Date,
        userAgent: String,
        ip: String,
      },
    ],
  },
  { timestamps: true },
);

// 🔐 AUTO-ENCRYPT PHONE BEFORE SAVING
// userSchema.pre("save", function(next) {
//   try {
//     // Encrypt main phone number if modified and not already encrypted
//     if (this.isModified("phone") && this.phone) {
//       // Check if already encrypted (encrypted data is longer and contains special chars)
//       if (!this.phone.includes("U2FsdGVk")) { // Base64 marker from CryptoJS
//         this.phone = encrypt(this.phone);
//       }
//     }

//     // Encrypt phone numbers in addresses
//     if (this.isModified("address") && this.address) {
//       this.address = this.address.map(addr => {
//         if (addr.phone && !addr.phone.includes("U2FsdGVk")) {
//           return { ...addr, phone: encrypt(addr.phone) };
//         }
//         return addr;
//       });
//     }

//     next();
//   } catch (error) {
//     next(error);
//   }
// });
// 🔐 AUTO-ENCRYPT PHONE BEFORE SAVING
userSchema.pre("save", async function () {
  try {
    // Encrypt main phone number if modified and not already encrypted
    if (this.isModified("phone") && this.phone) {
      // Check if already encrypted (encrypted data is longer and contains special chars)
      if (!this.phone.includes("U2FsdGVk")) {
        // Base64 marker from CryptoJS
        this.phone = encrypt(this.phone);
      }
    }

    // Encrypt phone numbers in addresses
    if (this.isModified("address") && this.address) {
      this.address = this.address.map((addr) => {
        if (addr.phone && !addr.phone.includes("U2FsdGVk")) {
          return { ...addr, phone: encrypt(addr.phone) };
        }
        return addr;
      });
    }
  } catch (error) {
    throw error; // Let Mongoose handle the error
  }
});

// 🔐 AUTO-DECRYPT PHONE WHEN CONVERTING TO JSON
userSchema.methods.toJSON = function () {
  const user = this.toObject();

  // Decrypt main phone
  if (user.phone) {
    user.phone = decrypt(user.phone);
  }

  // Decrypt address phones
  if (user.address) {
    user.address = user.address.map((addr) => ({
      ...addr,
      phone: addr.phone ? decrypt(addr.phone) : null,
    }));
  }

  // Remove sensitive fields
  delete user.password;
  delete user.passwordHistory;
  delete user.refreshTokens;

  return user;
};

// 🔒 Virtual field to check if account is locked
userSchema.virtual("isLocked").get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// 🔒 Method to increment failed login attempts
userSchema.methods.incLoginAttempts = function () {
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $set: { loginAttempts: 1 },
      $unset: { lockUntil: 1 },
    });
  }

  const updates = { $inc: { loginAttempts: 1 } };

  if (this.loginAttempts + 1 >= 3) {
    updates.$set = { requiresCaptcha: true };
  }

  if (this.loginAttempts + 1 >= 5) {
    updates.$set = {
      lockUntil: Date.now() + 30 * 60 * 1000,
      requiresCaptcha: true,
    };
  }

  return this.updateOne(updates);
};

// 🔒 Method to reset login attempts on successful login
userSchema.methods.resetLoginAttempts = function () {
  return this.updateOne({
    $set: { loginAttempts: 0, requiresCaptcha: false },
    $unset: { lockUntil: 1 },
  });
};

// 🔒 Method to check password expiry (90 days)
userSchema.methods.checkPasswordExpiry = function () {
  if (!this.passwordExpiresAt) {
    this.passwordExpiresAt = new Date(this.passwordChangedAt);
    this.passwordExpiresAt.setDate(this.passwordExpiresAt.getDate() + 90);
  }

  const now = new Date();
  this.isPasswordExpired = now > this.passwordExpiresAt;
  return this.isPasswordExpired;
};

// 🔒 Method to add password to history (keep last 5)
userSchema.methods.addToPasswordHistory = function (passwordHash) {
  this.passwordHistory.unshift({
    hash: passwordHash,
    changedAt: new Date(),
  });

  if (this.passwordHistory.length > 5) {
    this.passwordHistory = this.passwordHistory.slice(0, 5);
  }

  this.passwordChangedAt = new Date();
  this.passwordExpiresAt = new Date();
  this.passwordExpiresAt.setDate(this.passwordExpiresAt.getDate() + 90);
  this.isPasswordExpired = false;
};

// 🔑 Add refresh token to user
userSchema.methods.addRefreshToken = function (token, userAgent, ip) {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  this.refreshTokens.push({
    token,
    expiresAt,
    userAgent,
    ip,
  });

  if (this.refreshTokens.length > 5) {
    this.refreshTokens = this.refreshTokens.slice(-5);
  }
};

// 🔑 Remove specific refresh token (logout)
userSchema.methods.removeRefreshToken = function (token) {
  this.refreshTokens = this.refreshTokens.filter((rt) => rt.token !== token);
};

// 🔑 Remove all refresh tokens (logout all devices)
userSchema.methods.removeAllRefreshTokens = function () {
  this.refreshTokens = [];
};

// 🔑 Clean expired refresh tokens
userSchema.methods.cleanExpiredTokens = function () {
  const now = new Date();
  this.refreshTokens = this.refreshTokens.filter((rt) => rt.expiresAt > now);
};

module.exports = mongoose.model("User", userSchema);
