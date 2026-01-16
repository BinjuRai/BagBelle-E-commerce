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
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: [
      {
        fullName: String,
        city: String,
        district: String,
        ward: String,
        phone: String,
      }
    ],
    role: { type: String, enum: ["user", "admin"], default: "user" },
    filepath: { type: String },
    
    // 🔐 PASSWORD SECURITY FEATURES
    passwordHistory: [
      {
        hash: String,
        changedAt: { type: Date, default: Date.now }
      }
    ],
    passwordChangedAt: { type: Date, default: Date.now },
    passwordExpiresAt: { type: Date },
    isPasswordExpired: { type: Boolean, default: false },

    // 🔒 BRUTE-FORCE PROTECTION
    loginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date },
    requiresCaptcha: { type: Boolean, default: false }
  },
  { timestamps: true }
);

// 🔒 Virtual field to check if account is locked
userSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// 🔒 Method to increment failed login attempts
userSchema.methods.incLoginAttempts = function() {
  // If we have a previous lock that has expired, reset attempts
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $set: { loginAttempts: 1 },
      $unset: { lockUntil: 1 }
    });
  }

  const updates = { $inc: { loginAttempts: 1 } };

  // Enable CAPTCHA after 3 failed attempts
  if (this.loginAttempts + 1 >= 3) {
    updates.$set = { requiresCaptcha: true };
  }

  // Lock account after 5 failed attempts for 30 minutes
  if (this.loginAttempts + 1 >= 5) {
    updates.$set = { 
      lockUntil: Date.now() + 30 * 60 * 1000, // 30 minutes
      requiresCaptcha: true
    };
  }

  return this.updateOne(updates);
};

// 🔒 Method to reset login attempts on successful login
userSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $set: { loginAttempts: 0, requiresCaptcha: false },
    $unset: { lockUntil: 1 }
  });
};

// 🔒 Method to check password expiry (90 days)
userSchema.methods.checkPasswordExpiry = function() {
  if (!this.passwordExpiresAt) {
    this.passwordExpiresAt = new Date(this.passwordChangedAt);
    this.passwordExpiresAt.setDate(this.passwordExpiresAt.getDate() + 90);
  }
  
  const now = new Date();
  this.isPasswordExpired = now > this.passwordExpiresAt;
  return this.isPasswordExpired;
};

// 🔒 Method to add password to history (keep last 5)
userSchema.methods.addToPasswordHistory = function(passwordHash) {
  this.passwordHistory.unshift({
    hash: passwordHash,
    changedAt: new Date()
  });
  
  if (this.passwordHistory.length > 5) {
    this.passwordHistory = this.passwordHistory.slice(0, 5);
  }
  
  this.passwordChangedAt = new Date();
  this.passwordExpiresAt = new Date();
  this.passwordExpiresAt.setDate(this.passwordExpiresAt.getDate() + 90);
  this.isPasswordExpired = false;
};

module.exports = mongoose.model("User", userSchema);