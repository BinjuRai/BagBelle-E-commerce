
// const nodemailer = require("nodemailer");
// const User = require("../models/userModel");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });



// exports.registerUser = async (req, res) => {
//   console.log(">>> registerUser called");
//   const { name, email, password, phone } = req.body;

//   if (!name || !email || !password) {
//     return res.status(400).json({
//       success: false,
//       message: "Missing required fields",
//     });
//   }

//   try {
//     const existingUser = await User.findOne({
//       $or: [{ email: email }, { phone: phone }],
//     });

//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: "User with this email or phone already exists",
//       });
//     }

//     const hashedPass = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       name,
//       email,
//       password: hashedPass,
//       phone,
//     });

//     await newUser.save();

//     return res.status(201).json({
//       success: true,
//       message: "User Registered",
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       success: false,
//       message: err.message || "Server error",
//     });
//   }
// };





// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({
//       success: false,
//       message: "Missing email or password",
//     });
//   }

//   try {
//     const getUser = await User.findOne({ email });

//     if (!getUser) {
//       return res.status(403).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     const passwordCheck = await bcrypt.compare(password, getUser.password);
//     if (!passwordCheck) {
//       return res.status(403).json({
//         success: false,
//         message: "Invalid credentials",
//       });
//     }

//     const payload = {
//       _id: getUser._id,
//       email: getUser.email,
//       name: getUser.name,
//       role: getUser.role,
//     };

//     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

//     // ✅ Fix: Wrap user inside 'data.user'
//     return res.status(200).json({
//       success: true,
//       message: "Login Successful",
//       data: {
//         user: getUser, // now frontend can do { user } = response.data
//         token: token,  // optional: you could also just keep token separate
//       },
//     });
//   } catch (err) {
//     console.log("LOGIN ERROR:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };


// exports.sendResetLink = async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(404).json({ success: false, message: "User not found" });

//     const token = jwt.sign({ id: user._id }, process.env.SECRET, {
//       expiresIn: "15m",
//     });

//     const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;

//     const mailOptions = {
//       from: `"Your App" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Reset your password",
//       html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
//     };

//     transporter.sendMail(mailOptions, (err, info) => {
//       if (err)
//         return res.status(500).json({
//           success: false,
//           message: "Error sending email",
//         });

//       res.status(200).json({
//         success: true,
//         message: "Reset email sent",
//       });
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };



// exports.resetPassword = async (req, res) => {
//   const { token } = req.params;
//   const { password } = req.body;

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const hashed = await bcrypt.hash(password, 10);

//     await User.findByIdAndUpdate(decoded.id, { password: hashed });

//     res.status(200).json({ success: true, message: "Password updated" });
//   } catch (err) {
//     res.status(400).json({
//       success: false,
//       message: "Invalid or expired token",
//     });
//   }
// };


// exports.getProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select("-password");

//     if (!user)
//       return res.status(404).json({ success: false, message: "User not found" });

//     res.status(200).json({ success: true, data: user });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };



// exports.updateProfile = async (req, res) => {
//   try {
//     const updates = req.body;

//     const updatedUser = await User.findByIdAndUpdate(
//       req.user._id,
//       updates,
//       { new: true }
//     ).select("-password");

//     res.status(200).json({
//       success: true,
//       data: updatedUser,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "Update failed",
//     });
//   }
// };


// exports.changePassword = async (req, res) => {
//   const { oldPassword, newPassword } = req.body;

//   try {
//     const user = await User.findById(req.user._id);

//     const isMatch = await bcrypt.compare(oldPassword, user.password);

//     if (!isMatch) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Incorrect current password" });
//     }

//     user.password = await bcrypt.hash(newPassword, 10);
//     await user.save();

//     res.status(200).json({
//       success: true,
//       message: "Password changed successfully",
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };
const nodemailer = require("nodemailer");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 🔒 PASSWORD VALIDATION HELPER
const validatePasswordStrength = (password) => {
  const errors = [];
  
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push("Password must contain at least one special character");
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// 🔒 CHECK PASSWORD REUSE HELPER
const checkPasswordReuse = async (password, passwordHistory) => {
  if (!passwordHistory || passwordHistory.length === 0) {
    return false;
  }
  
  for (const oldPassword of passwordHistory) {
    const isSame = await bcrypt.compare(password, oldPassword.hash);
    if (isSame) {
      return true;
    }
  }
  
  return false;
};

// 🔒 VERIFY RECAPTCHA TOKEN
const verifyRecaptcha = async (token) => {
  if (!token) return false;
  
  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: token
        }
      }
    );
    
    return response.data.success && response.data.score >= 0.5;
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return false;
  }
};

exports.registerUser = async (req, res) => {
  console.log(">>> registerUser called");
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  // 🔒 VALIDATE PASSWORD STRENGTH
  const validation = validatePasswordStrength(password);
  if (!validation.isValid) {
    return res.status(400).json({
      success: false,
      message: "Password does not meet security requirements",
      errors: validation.errors
    });
  }

  try {
    const existingUser = await User.findOne({
      $or: [{ email: email }, { phone: phone }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email or phone already exists",
      });
    }

    const hashedPass = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      email,
      password: hashedPass,
      phone,
      passwordChangedAt: new Date(),
      passwordExpiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      passwordHistory: [{ hash: hashedPass, changedAt: new Date() }],
      loginAttempts: 0,
      requiresCaptcha: false
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Server error",
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password, recaptchaToken } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing email or password",
    });
  }

  try {
    const getUser = await User.findOne({ email });

    if (!getUser) {
      return res.status(403).json({
        success: false,
        message: "User not found",
      });
    }

    // 🔒 CHECK IF ACCOUNT IS LOCKED
    if (getUser.isLocked) {
      const minutesLeft = Math.ceil((getUser.lockUntil - Date.now()) / (1000 * 60));
      return res.status(403).json({
        success: false,
        message: `Account is locked due to too many failed login attempts. Try again in ${minutesLeft} minutes.`,
        accountLocked: true,
        lockUntil: getUser.lockUntil,
        minutesRemaining: minutesLeft
      });
    }

    // 🔒 CHECK IF CAPTCHA IS REQUIRED
    if (getUser.requiresCaptcha) {
      if (!recaptchaToken) {
        return res.status(403).json({
          success: false,
          message: "CAPTCHA verification required",
          requiresCaptcha: true,
          loginAttempts: getUser.loginAttempts
        });
      }

      const isCaptchaValid = await verifyRecaptcha(recaptchaToken);
      if (!isCaptchaValid) {
        return res.status(403).json({
          success: false,
          message: "CAPTCHA verification failed. Please try again.",
          requiresCaptcha: true
        });
      }
    }

    // 🔒 VERIFY PASSWORD
    const passwordCheck = await bcrypt.compare(password, getUser.password);
    
    if (!passwordCheck) {
      // Increment failed attempts
      await getUser.incLoginAttempts();
      
      const updatedUser = await User.findById(getUser._id);
      const attemptsLeft = 5 - updatedUser.loginAttempts;
      
      let message = "Invalid credentials";
      if (updatedUser.loginAttempts >= 3) {
        message = `Invalid credentials. ${attemptsLeft} attempts remaining before account lockout.`;
      }
      
      return res.status(403).json({
        success: false,
        message,
        loginAttempts: updatedUser.loginAttempts,
        requiresCaptcha: updatedUser.requiresCaptcha,
        attemptsRemaining: Math.max(0, attemptsLeft)
      });
    }

    // 🔒 CHECK PASSWORD EXPIRY
    const isExpired = getUser.checkPasswordExpiry();
    if (isExpired) {
      return res.status(403).json({
        success: false,
        message: "Your password has expired. Please reset your password.",
        passwordExpired: true
      });
    }

    // ✅ SUCCESSFUL LOGIN - Reset attempts
    await getUser.resetLoginAttempts();

    const payload = {
      _id: getUser._id,
      email: getUser.email,
      name: getUser.name,
      role: getUser.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

    const daysUntilExpiry = Math.ceil(
      (getUser.passwordExpiresAt - new Date()) / (1000 * 60 * 60 * 24)
    );

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      data: {
        user: getUser,
        token: token,
      },
      passwordExpiryWarning: daysUntilExpiry <= 7 ? 
        `Your password will expire in ${daysUntilExpiry} days` : null
    });
  } catch (err) {
    console.log("LOGIN ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.sendResetLink = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;

    const mailOptions = {
      from: `"BagBelle" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset your password",
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 15 minutes.</p>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err)
        return res.status(500).json({
          success: false,
          message: "Error sending email",
        });

      res.status(200).json({
        success: true,
        message: "Reset email sent",
      });
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const validation = validatePasswordStrength(password);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: "Password does not meet security requirements",
        errors: validation.errors
      });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const isReused = await checkPasswordReuse(password, user.passwordHistory);
    if (isReused) {
      return res.status(400).json({
        success: false,
        message: "Cannot reuse any of your last 5 passwords. Please choose a different password."
      });
    }

    const hashed = await bcrypt.hash(password, 12);
    
    user.addToPasswordHistory(hashed);
    user.password = hashed;
    
    // Reset login attempts on password reset
    await user.resetLoginAttempts();
    
    await user.save();

    res.status(200).json({ 
      success: true, 
      message: "Password updated successfully" 
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password -passwordHistory");

    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    const isExpired = user.checkPasswordExpiry();
    const daysUntilExpiry = Math.ceil(
      (user.passwordExpiresAt - new Date()) / (1000 * 60 * 60 * 24)
    );

    res.status(200).json({ 
      success: true, 
      data: user,
      passwordStatus: {
        isExpired,
        daysUntilExpiry: isExpired ? 0 : daysUntilExpiry,
        expiresAt: user.passwordExpiresAt
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true }
    ).select("-password -passwordHistory");

    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Update failed",
    });
  }
};

exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user._id);

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false, 
        message: "Incorrect current password" 
      });
    }

    const validation = validatePasswordStrength(newPassword);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: "Password does not meet security requirements",
        errors: validation.errors
      });
    }

    const isReused = await checkPasswordReuse(newPassword, user.passwordHistory);
    if (isReused) {
      return res.status(400).json({
        success: false,
        message: "Cannot reuse any of your last 5 passwords. Please choose a different password."
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.addToPasswordHistory(hashedPassword);
    user.password = hashedPassword;
    
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully. Your password will expire in 90 days.",
    });
  } catch (err) {
    console.error("Change password error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};