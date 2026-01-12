import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../api/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    totalRevenue: 0,
    lowStockProducts: 0,
    recentOrders: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const productsRes = await api.get("/admin/products");
      const products = productsRes.data.products || productsRes.data;

      const categoriesRes = await api.get("/admin/categories");
      const categories = categoriesRes.data.categories || categoriesRes.data;

      let orders = [];
      let revenue = 0;
      try {
        const ordersRes = await api.get("/orders/admin/all");
        orders = ordersRes.data.orders || [];
        revenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
      } catch {}

      const lowStock = products.filter((p) => p.stock < 5).length;

      setStats({
        totalProducts: products.length,
        totalCategories: categories.length,
        totalOrders: orders.length,
        totalRevenue: revenue,
        lowStockProducts: lowStock,
        recentOrders: orders.slice(0, 5),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="animate-spin h-10 w-10 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-primary">
          Dashboard Overview
        </h1>
        <p className="text-sm text-muted mt-1">
          Monitor store performance and manage Bagbelle operations
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          { label: "Products", value: stats.totalProducts },
          { label: "Categories", value: stats.totalCategories },
          { label: "Orders", value: stats.totalOrders },
          { label: "Low Stock", value: stats.lowStockProducts },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-surface border border-border rounded-xl p-6"
          >
            <p className="text-sm text-muted">{item.label}</p>
            <p className="text-3xl font-semibold text-text mt-2">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Revenue */}
      <div className="bg-accent border border-border rounded-xl p-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted">Total Revenue</p>
          <p className="text-3xl font-semibold text-primary mt-1">
            Rs.{stats.totalRevenue.toLocaleString()}
          </p>
        </div>
        <span className="text-sm text-muted">
          All-time sales
        </span>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-text mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { to: "/admin/products/add", label: "Add Product" },
            { to: "/admin/categories/add", label: "Add Category" },
            { to: "/admin/orders", label: "View Orders" },
            { to: "/admin/customers", label: "Customers" },
          ].map((action) => (
            <Link
              key={action.label}
              to={action.to}
              className="bg-surface border border-border rounded-xl p-5 hover:border-primary transition"
            >
              <p className="font-medium text-text">{action.label}</p>
              <p className="text-xs text-muted mt-1">
                Manage {action.label.toLowerCase()}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Management Sections */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Products */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-text">Product Management</h3>
            <Link
              to="/admin/products"
              className="text-sm text-primary hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Inventory</span>
              <span className="font-medium">{stats.totalProducts} items</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Low stock</span>
              <span className="font-medium text-red-600">
                {stats.lowStockProducts} items
              </span>
            </div>
          </div>

          <Link
            to="/admin/products"
            className="block mt-6 text-center bg-primary text-white py-2 rounded-lg text-sm hover:bg-primary-hover transition"
          >
            Manage Products
          </Link>
        </div>

        {/* Categories */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-text">Category Management</h3>
            <Link
              to="/admin/categories"
              className="text-sm text-primary hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted">Total categories</span>
            <span className="font-medium">
              {stats.totalCategories}
            </span>
          </div>

          <Link
            to="/admin/categories"
            className="block mt-6 text-center bg-primary text-white py-2 rounded-lg text-sm hover:bg-primary-hover transition"
          >
            Manage Categories
          </Link>
        </div>
      </div>

      {/* Tip */}
      <div className="bg-accent border border-border rounded-xl p-6">
        <h3 className="font-semibold text-text mb-2">
          Inventory Tip
        </h3>
        <p className="text-sm text-muted">
          You currently have {stats.lowStockProducts} products with low stock.
          Restocking early helps prevent missed sales and improves customer trust.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
