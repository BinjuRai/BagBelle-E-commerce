import { NavLink } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { path: "/admin", label: "Dashboard", end: true },
    { path: "/admin/products", label: "Products" },
    { path: "/admin/blogs", label: "Blogs" },
    { path: "/admin/categories", label: "Categories" },
    { path: "/admin/orders", label: "Orders", badge: "3" },
    { path: "/admin/customers", label: "Customers" },
    { path: "/admin/analytics", label: "Analytics" },
    { path: "/admin/settings", label: "Settings" },
  ];

  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-[var(--color-surface-light)] text-[var(--color-text-light)] min-h-screen border-r border-[var(--color-border-light)] transition-all duration-300 relative`}
    >
      {/* Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-24 w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-sm shadow-md hover:bg-[var(--color-primary-hover)] transition"
      >
        {isCollapsed ? "›" : "‹"}
      </button>

      {/* Brand */}
      <div className="px-6 py-5 border-b border-[var(--color-border-light)]">
        <h2
          className={`font-semibold tracking-wide ${
            isCollapsed ? "text-center text-lg" : "text-xl"
          }`}
        >
          {isCollapsed ? "B" : "Bagbelle"}
        </h2>
        {!isCollapsed && (
          <p className="text-xs text-[var(--color-muted-light)] mt-1">
            Admin Panel
          </p>
        )}
      </div>

      {/* Menu */}
      <nav className="px-3 py-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              `relative flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition
              ${
                isActive
                  ? "bg-[var(--color-accent)] text-[var(--color-primary)]"
                  : "text-[var(--color-muted-light)] hover:bg-[var(--color-accent-hover)]"
              }`
            }
          >
            {/* Dot Indicator */}
            <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] opacity-70" />

            {!isCollapsed && <span className="flex-1">{item.label}</span>}

            {!isCollapsed && item.badge && (
              <span className="text-xs bg-[var(--color-primary)] text-white px-2 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="absolute bottom-6 left-4 right-4 rounded-xl bg-[var(--color-accent)] p-4 text-center">
          <p className="text-xs text-[var(--color-muted-light)]">
            Store Status
          </p>
          <p className="font-semibold text-sm text-[var(--color-primary)] mt-1">
            ● Live & Selling
          </p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
