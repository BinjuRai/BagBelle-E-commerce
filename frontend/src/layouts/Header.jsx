// import { NavLink, useNavigate } from "react-router-dom";
// import { useContext, useState, useEffect, useRef } from "react";
// import { AuthContext } from "../auth/authProvider";
// import { useCart } from "../context/cartContext";
// import { useSocket } from "../context/socketContext";
// import {
//   Facebook,
//   Instagram,
//   Youtube,
//   ShoppingCart,
//   Bell,
//   User,
//   X,
//   Trash2,
// } from "lucide-react";
// import axios from "axios";
// import { formatDistanceToNow } from "date-fns";

// const Header = () => {
//   const { user, logout } = useContext(AuthContext);
//   const { cartCount } = useCart();
//   const socketContext = useSocket();
//   const navigate = useNavigate();

//   const {
//     notifications = [],
//     unreadCount = 0,
//     markAsRead = () => {},
//     setNotifications = () => {},
//     setUnreadCount = () => {},
//   } = socketContext || {};

//   const [isNotificationOpen, setIsNotificationOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const profileRef = useRef(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (user) fetchNotifications();
//   }, [user]);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target))
//         setIsNotificationOpen(false);
//       if (profileRef.current && !profileRef.current.contains(e.target))
//         setIsProfileOpen(false);
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const fetchNotifications = async () => {
//     try {
//       const API_URL =
//         import.meta.env.VITE_API_BASE_URL || "http://localhost:5050/api";
//       const { data } = await axios.get(`${API_URL}/notifications`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setNotifications(data.notifications);
//       setUnreadCount(data.unreadCount);
//     } catch {
//       console.error("Failed to fetch notifications");
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const navItemClass = ({ isActive }) =>
//     `cursor-pointer transition ${
//       isActive ? "text-accent font-semibold" : "hover:text-accent"
//     }`;

//   return (
//     <header className="bg-surface-dark text-text-dark shadow-md">
//       {/* Top Bar */}
//       <div className="bg-background-light flex justify-between items-center px-6 py-2 text-sm">
//         <span className="font-regilar text-text-light">
//           Welcome to Bagbelle
//         </span>
//         <div className="flex space-x-2">
//           <a
//             href="#"
//             className="text-surface-dark hover:text-primary transition"
//           >
//             <Facebook size={18} />
//           </a>
//           <a
//             href="#"
//             className="text-surface-dark hover:text-primary transition"
//           >
//             <Instagram size={18} />
//           </a>
//           <a
//             href="#"
//             className="text-surface-dark hover:text-primary transition"
//           >
//             <Youtube size={18} />
//           </a>
//         </div>
//       </div>

//       {/* Main Nav */}
//       <nav className="flex items-center justify-between px-8 py-4">
//         {/* Logo */}
//         <div
//           className="flex items-center cursor-pointer"
//           onClick={() => navigate("/")}
//         >
//           <img
//             src="/src/assets/images/BagbelleLogo.svg"
//             alt="Premium Bags Logo"
//             className="w-20"
//           />
//         </div>

//         {/* Menu */}
//         <ul className="hidden md:flex gap-10 text-lg font-medium">
//           <NavLink to="/aboutus" className={navItemClass}>
//             About Us
//           </NavLink>
//           <NavLink to="/products" className={navItemClass}>
//             All Products
//           </NavLink>
//           <NavLink to="/wishlist" className={navItemClass}>
//             Wishlist
//           </NavLink>
//           <NavLink to="/blogs" className={navItemClass}>
//             Blog
//           </NavLink>
//         </ul>

//         {/* Icons */}
//         {/* <div className="flex items-center gap-5">

//           <NavLink to="/cart" className="relative">
//             <ShoppingCart size={24} className="hover:text-accent transition-colors" />
//             {cartCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-accent text-surface-light text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
//                 {cartCount > 9 ? "9+" : cartCount}
//               </span>
//             )}
//           </NavLink>

//           <div className="relative" ref={profileRef}>
//             <button
//               onClick={() => user ? setIsProfileOpen(!isProfileOpen) : navigate("/login")}
//               className="p-2 hover:bg-background-light rounded-full transition"
//             >
//               <User size={24} className="hover:text-accent" />
//             </button>
//             {user && isProfileOpen && (
//               <div className="absolute right-0 mt-2 w-44 bg-surface-light rounded-lg shadow-lg border border-border-light z-50">
//                 <button onClick={() => { navigate("/orders"); setIsProfileOpen(false); }} className="w-full px-4 py-2 text-black hover:bg-background-light text-left">My Orders</button>
//                 <button onClick={() => { navigate("/profile"); setIsProfileOpen(false); }} className="w-full px-4 py-2 text-black hover:bg-background-light text-left">My Profile</button>
//                 <button onClick={handleLogout} className="w-full px-4 py-2 hover:bg-background-light text-left text-red-600">Logout</button>
//               </div>
//             )}
//           </div>

//           {!user && (
//             <button onClick={() => navigate("/login")} className="bg-primary text-surface-light border border-amber-50  px-6 py-2 rounded-lg font-semibold hover:bg-primary-hover transition ">
//               Login
//             </button>
//           )}
//         </div> */}
//         {/* Icons */}
//         <div className="flex items-center gap-5">
//           {/* Cart */}
//           <NavLink to="/cart" className="relative">
//             <ShoppingCart
//               size={24}
//               className="hover:text-accent transition-colors"
//             />
//             {cartCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-accent text-surface-light text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
//                 {cartCount > 9 ? "9+" : cartCount}
//               </span>
//             )}
//           </NavLink>

//           {/* Notification Bell */}
//           {user && (
//             <div className="relative" ref={dropdownRef}>
//               <button
//                 onClick={() => setIsNotificationOpen(!isNotificationOpen)}
//                 className="p-2 hover:bg-background-light rounded-full transition relative"
//               >
//                 <Bell size={24} className="hover:text-accent" />
//                 {unreadCount > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-accent text-surface-light text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
//                     {unreadCount > 9 ? "9+" : unreadCount}
//                   </span>
//                 )}
//               </button>

//               {/* Notification Dropdown */}
//               {isNotificationOpen && (
//                 <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-surface-light rounded-lg shadow-lg border border-border-light z-50">
//                   {notifications.length === 0 ? (
//                     <div className="p-4 text-center text-muted-light">
//                       No notifications
//                     </div>
//                   ) : (
//                     notifications.slice(0, 5).map((n) => (
//                       <div
//                         key={n._id}
//                         className={`flex items-start justify-between px-4 py-3 border-b border-border-light hover:bg-background-light cursor-pointer ${
//                           !n.isRead ? "bg-accent-hover" : ""
//                         }`}
//                         onClick={() => {
//                           markAsRead(n._id);
//                           navigate("/notifications");
//                           setIsNotificationOpen(false);
//                         }}
//                       >
//                         <div className="flex items-center gap-3">
//                           <span className="text-xl">
//                             {n.type === "order_delivered" ? "🎉" : "📦"}
//                           </span>
//                           <div>
//                             <p className="text-sm font-medium text-text-light">
//                               {n.title}
//                             </p>
//                             <p className="text-xs text-muted-light">
//                               {n.message}
//                             </p>
//                             <p className="text-xs text-muted-light">
//                               {formatDistanceToNow(new Date(n.createdAt), {
//                                 addSuffix: true,
//                               })}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     ))
//                   )}

//                   {notifications.length > 5 && (
//                     <button
//                       onClick={() => navigate("/notifications")}
//                       className="w-full text-center py-2 text-primary hover:bg-background-light transition"
//                     >
//                       View All
//                     </button>
//                   )}
//                 </div>
//               )}
//             </div>
//           )}

//           {/* User Profile */}
//           <div className="relative" ref={profileRef}>
//             <button
//               onClick={() =>
//                 user ? setIsProfileOpen(!isProfileOpen) : navigate("/login")
//               }
//               className="p-2 hover:bg-background-light rounded-full transition"
//             >
//               <User size={24} className="hover:text-accent" />
//             </button>
//             {user && isProfileOpen && (
//               <div className="absolute right-0 mt-2 w-44 bg-surface-light rounded-lg shadow-lg border border-border-light z-50">
//                 <button
//                   onClick={() => {
//                     navigate("/orders");
//                     setIsProfileOpen(false);
//                   }}
//                   className="w-full px-4 py-2 text-black hover:bg-background-light text-left"
//                 >
//                   My Orders
//                 </button>
//                 <button
//                   onClick={() => {
//                     navigate("/profile");
//                     setIsProfileOpen(false);
//                   }}
//                   className="w-full px-4 py-2 text-black hover:bg-background-light text-left"
//                 >
//                   My Profile
//                 </button>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full px-4 py-2 hover:bg-background-light text-left text-red-600"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>

//           {!user && (
//             <button
//               onClick={() => navigate("/login")}
//               className="bg-primary text-surface-light border border-amber-50  px-6 py-2 rounded-lg font-semibold hover:bg-primary-hover transition "
//             >
//               Login
//             </button>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;

import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../auth/authProvider"; // ✅ Changed from AuthContext
import { useCart } from "../context/cartContext";
import { useSocket } from "../context/socketContext";
import {
  Facebook,
  Instagram,
  Youtube,
  ShoppingCart,
  Bell,
  User,
} from "lucide-react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

const Header = () => {
  const { user, logout } = useAuth(); // ✅ Use useAuth hook instead of useContext
  const { cartCount } = useCart();
  const socketContext = useSocket();
  const navigate = useNavigate();

  const {
    notifications = [],
    unreadCount = 0,
    markAsRead = () => {},
    setNotifications = () => {},
    setUnreadCount = () => {},
  } = socketContext || {};

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    if (user) fetchNotifications();
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setIsNotificationOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target))
        setIsProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    try {
      const API_URL =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:5050/api";
      const { data } = await axios.get(`${API_URL}/notifications`, {
        withCredentials: true, // ✅ Use cookies instead of Authorization header
      });
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      navigate("/login");
    }
  };

  const navItemClass = ({ isActive }) =>
    `cursor-pointer transition ${
      isActive ? "text-accent font-semibold" : "hover:text-accent"
    }`;

  return (
    <header className="bg-surface-dark text-text-dark shadow-md">
      {/* Top Bar */}
      <div className="bg-background-light flex justify-between items-center px-6 py-2 text-sm">
        <span className="font-regular text-text-light">
          Welcome to Bagbelle
        </span>
        <div className="flex space-x-2">
          <a
            href="#"
            className="text-surface-dark hover:text-primary transition"
          >
            <Facebook size={18} />
          </a>
          <a
            href="#"
            className="text-surface-dark hover:text-primary transition"
          >
            <Instagram size={18} />
          </a>
          <a
            href="#"
            className="text-surface-dark hover:text-primary transition"
          >
            <Youtube size={18} />
          </a>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="/src/assets/images/BagbelleLogo.svg"
            alt="Premium Bags Logo"
            className="w-20"
          />
        </div>

        {/* Menu */}
        <ul className="hidden md:flex gap-10 text-lg font-medium">
          <NavLink to="/aboutus" className={navItemClass}>
            About Us
          </NavLink>
          <NavLink to="/products" className={navItemClass}>
            All Products
          </NavLink>
          <NavLink to="/wishlist" className={navItemClass}>
            Wishlist
          </NavLink>
          <NavLink to="/blogs" className={navItemClass}>
            Blog
          </NavLink>
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-5">
          {/* Cart */}
          <NavLink to="/cart" className="relative">
            <ShoppingCart
              size={24}
              className="hover:text-accent transition-colors"
            />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-surface-light text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </NavLink>

          {/* Notification Bell */}
          {user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="p-2 hover:bg-background-light rounded-full transition relative"
              >
                <Bell size={24} className="hover:text-accent" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-surface-light text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-surface-light rounded-lg shadow-lg border border-border-light z-50">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-muted-light">
                      No notifications
                    </div>
                  ) : (
                    notifications.slice(0, 5).map((n) => (
                      <div
                        key={n._id}
                        className={`flex items-start justify-between px-4 py-3 border-b border-border-light hover:bg-background-light cursor-pointer ${
                          !n.isRead ? "bg-accent-hover" : ""
                        }`}
                        onClick={() => {
                          markAsRead(n._id);
                          navigate("/notifications");
                          setIsNotificationOpen(false);
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">
                            {n.type === "order_delivered" ? "🎉" : "📦"}
                          </span>
                          <div>
                            <p className="text-sm font-medium text-text-light">
                              {n.title}
                            </p>
                            <p className="text-xs text-muted-light">
                              {n.message}
                            </p>
                            <p className="text-xs text-muted-light">
                              {formatDistanceToNow(new Date(n.createdAt), {
                                addSuffix: true,
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}

                  {notifications.length > 5 && (
                    <button
                      onClick={() => {
                        navigate("/notifications");
                        setIsNotificationOpen(false);
                      }}
                      className="w-full text-center py-2 text-primary hover:bg-background-light transition"
                    >
                      View All
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* User Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() =>
                user ? setIsProfileOpen(!isProfileOpen) : navigate("/login")
              }
              className="p-2 hover:bg-background-light rounded-full transition"
            >
              <User size={24} className="hover:text-accent" />
            </button>
            {user && isProfileOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-surface-light rounded-lg shadow-lg border border-border-light z-50">
                <button
                  onClick={() => {
                    navigate("/orders");
                    setIsProfileOpen(false);
                  }}
                  className="w-full px-4 py-2 text-black hover:bg-background-light text-left"
                >
                  My Orders
                </button>
                <button
                  onClick={() => {
                    navigate("/profile");
                    setIsProfileOpen(false);
                  }}
                  className="w-full px-4 py-2 text-black hover:bg-background-light text-left"
                >
                  My Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 hover:bg-background-light text-left text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {!user && (
            <button
              onClick={() => navigate("/login")}
              className="bg-primary text-surface-light border border-amber-50 px-6 py-2 rounded-lg font-semibold hover:bg-primary-hover transition"
            >
              Login
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
