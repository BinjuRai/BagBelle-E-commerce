// Demo Controller for RBAC Testing

// 🌍 PUBLIC - Anyone can access (no auth required)
exports.publicEndpoint = (req, res) => {
  res.status(200).json({
    success: true,
    message: "✅ Public endpoint - Anyone can access this",
    data: {
      info: "This endpoint does not require authentication",
      timestamp: new Date().toISOString()
    }
  });
};

// 👤 USER ONLY - Only users with 'user' role
exports.userOnlyEndpoint = (req, res) => {
  res.status(200).json({
    success: true,
    message: "✅ User-only endpoint accessed successfully",
    data: {
      user: {
        name: req.user.name,
        email: req.user.email,
        role: req.user.role
      },
      info: "This endpoint is restricted to users with 'user' role",
      timestamp: new Date().toISOString()
    }
  });
};

// 🔒 ADMIN ONLY - Only users with 'admin' role
exports.adminOnlyEndpoint = (req, res) => {
  res.status(200).json({
    success: true,
    message: "✅ Admin endpoint accessed successfully",
    data: {
      admin: {
        name: req.user.name,
        email: req.user.email,
        role: req.user.role
      },
      info: "This endpoint is restricted to admins only",
      sensitiveData: {
        totalUsers: 1250,
        systemStatus: "operational",
        lastBackup: "2025-01-15T10:30:00Z"
      },
      timestamp: new Date().toISOString()
    }
  });
};

// 🔓 AUTHENTICATED - Both admin and user can access
exports.authenticatedEndpoint = (req, res) => {
  res.status(200).json({
    success: true,
    message: "✅ Authenticated endpoint accessed",
    data: {
      user: {
        name: req.user.name,
        email: req.user.email,
        role: req.user.role
      },
      info: "This endpoint requires authentication but accepts any role",
      timestamp: new Date().toISOString()
    }
  });
};

// 📊 DASHBOARD - Admin gets full stats, user gets limited stats
exports.getDashboard = (req, res) => {
  const isAdmin = req.user.role === "admin";

  const response = {
    success: true,
    message: "Dashboard data retrieved",
    data: {
      user: {
        name: req.user.name,
        role: req.user.role
      },
      stats: {
        orders: isAdmin ? 150 : "Your orders: 5",
        revenue: isAdmin ? "$45,000" : "Hidden",
        users: isAdmin ? 1250 : "Hidden",
      },
      permissions: {
        canViewAllOrders: isAdmin,
        canManageUsers: isAdmin,
        canEditProducts: isAdmin,
      }
    }
  };

  res.status(200).json(response);
};