import { useState } from "react";
import { useAuth } from "../auth/authProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LogoutButton = () => {
  const { logout, logoutAllDevices, user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      toast.success("Logged out successfully 👋");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoutAllDevices = async () => {
    const confirmed = window.confirm(
      "This will log you out from all devices. Are you sure?"
    );
    
    if (!confirmed) return;

    setIsLoading(true);
    try {
      await logoutAllDevices();
      toast.success("Logged out from all devices 🔒");
      navigate("/login");
    } catch (error) {
      console.error("Logout all devices error:", error);
      toast.error("Failed to logout from all devices");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="flex items-center gap-3">
      {/* User Info */}
      <div className="hidden md:block text-right">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          {user.name}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {user.email}
        </p>
      </div>

      {/* Logout Buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Logging out..." : "Logout"}
        </button>
        
        <button
          onClick={handleLogoutAllDevices}
          disabled={isLoading}
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          title="Logout from all devices"
        >
          🔒 All Devices
        </button>
      </div>
    </div>
  );
};

export default LogoutButton;