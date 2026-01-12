import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/authProvider";
import { useState } from "react";

const AdminNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-6 sticky top-0 z-50">
      {/* Left: Brand */}
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold text-primary tracking-wide">
          Bagbelle
        </h1>
        <span className="text-xs text-muted">
          Premium Bags Admin
        </span>
      </div>

      {/* Center: Search */}
      <div className="hidden md:block w-96">
        <input
          type="text"
          placeholder="Search products, orders…"
          className="w-full px-4 py-2 rounded-lg bg-accent text-sm text-text placeholder-muted focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-5">
        {/* Notifications */}
        <button className="relative text-muted hover:text-text transition">
          <span className="text-sm">Notifications</span>
          <span className="absolute -top-2 -right-3 w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
            3
          </span>
        </button>

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent-hover transition"
          >
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
              {user?.email?.charAt(0).toUpperCase() || "A"}
            </div>

            <div className="hidden sm:flex flex-col items-start">
              <span className="text-sm font-medium text-text">
                {user?.name || "Admin"}
              </span>
              <span className="text-xs text-muted">
                {user?.email}
              </span>
            </div>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-surface border border-border rounded-xl shadow-lg overflow-hidden">
              <button
                onClick={() => navigate("/admin/profile")}
                className="w-full px-4 py-3 text-sm text-text hover:bg-accent text-left"
              >
                My Profile
              </button>

              <button
                onClick={() => navigate("/admin/settings")}
                className="w-full px-4 py-3 text-sm text-text hover:bg-accent text-left"
              >
                Settings
              </button>

              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 text-left"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
