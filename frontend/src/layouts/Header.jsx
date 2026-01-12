import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../auth/authProvider";
import { useCart } from "../context/cartContext";
import { useSocket } from "../context/socketContext";
import {
  Facebook,
  Instagram,
  Youtube,
  ShoppingCart,
  Bell,
  User,
  X,
  Trash2,
} from "lucide-react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useCart();
  const socketContext = useSocket();
  const navigate = useNavigate();

  const { notifications = [], unreadCount = 0, markAsRead = () => {}, setNotifications = () => {}, setUnreadCount = () => {} } = socketContext || {};

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) fetchNotifications();
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsNotificationOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setIsProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5050/api";
      const { data } = await axios.get(`${API_URL}/notifications`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch {
      console.error("Failed to fetch notifications");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItemClass = ({ isActive }) =>
    `cursor-pointer transition ${
      isActive ? "text-accent font-semibold" : "hover:text-accent"
    }`;

  return (
    <header className="bg-surface-dark text-text-dark shadow-md">
      {/* Top Bar */}
      <div className="bg-background-light flex justify-between items-center px-6 py-2 text-sm">
        <span className="font-regilar text-text-light">Welcome to Bagbelle</span>
        <div className="flex space-x-2">
          <a href="#" className="text-surface-dark hover:text-primary transition"><Facebook size={18} /></a>
          <a href="#" className="text-surface-dark hover:text-primary transition"><Instagram size={18} /></a>
          <a href="#" className="text-surface-dark hover:text-primary transition"><Youtube size={18} /></a>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
          <img src="/src/assets/images/BagbelleLogo.svg" alt="Premium Bags Logo" className="w-20" />
        </div>

        {/* Menu */}
        <ul className="hidden md:flex gap-10 text-lg font-medium">
          <NavLink to="/aboutus" className={navItemClass}>About Us</NavLink>
          <NavLink to="/products" className={navItemClass}>All Products</NavLink>
          <NavLink to="/wishlist" className={navItemClass}>Wishlist</NavLink>
          <NavLink to="/blogs" className={navItemClass}>Blog</NavLink>
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-5">
          {/* Cart */}
          <NavLink to="/cart" className="relative">
            <ShoppingCart size={24} className="hover:text-accent transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-surface-light text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </NavLink>

          {/* User Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => user ? setIsProfileOpen(!isProfileOpen) : navigate("/login")}
              className="p-2 hover:bg-background-light rounded-full transition"
            >
              <User size={24} className="hover:text-accent" />
            </button>
            {user && isProfileOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-surface-light rounded-lg shadow-lg border border-border-light z-50">
                <button onClick={() => { navigate("/orders"); setIsProfileOpen(false); }} className="w-full px-4 py-2 text-black hover:bg-background-light text-left">My Orders</button>
                <button onClick={() => { navigate("/profile"); setIsProfileOpen(false); }} className="w-full px-4 py-2 text-black hover:bg-background-light text-left">My Profile</button>
                <button onClick={handleLogout} className="w-full px-4 py-2 hover:bg-background-light text-left text-red-600">Logout</button>
              </div>
            )}
          </div>

          {!user && (
            <button onClick={() => navigate("/login")} className="bg-primary text-surface-light border border-amber-50  px-6 py-2 rounded-lg font-semibold hover:bg-primary-hover transition ">
              Login
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
