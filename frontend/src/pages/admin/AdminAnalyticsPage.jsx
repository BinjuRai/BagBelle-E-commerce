import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, ShoppingCart, Users, Package, Calendar } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AdminAnalyticsPage = () => {
  const [analytics, setAnalytics] = useState({
    revenue: { total: 0, thisMonth: 0, lastMonth: 0, growth: 0 },
    orders: { total: 0, thisMonth: 0, pending: 0, completed: 0 },
    users: { total: 0, newThisMonth: 0, activeUsers: 0 },
    products: { total: 0, lowStock: 0, outOfStock: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30'); // days

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange]);

  const fetchAnalytics = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5050/api';
      const { data } = await axios.get(`${API_URL}/admin/analytics?days=${dateRange}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setAnalytics(data.analytics);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      toast.error('Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <TrendingUp size={32} />
                Analytics Dashboard
              </h1>
              <p className="text-gray-600 mt-2">Monitor your store's performance</p>
            </div>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last year</option>
            </select>
          </div>
        </div>

        {/* Revenue Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign size={24} className="text-green-600" />
              </div>
              <span className={`text-sm font-semibold ${analytics.revenue.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {analytics.revenue.growth >= 0 ? '↑' : '↓'} {Math.abs(analytics.revenue.growth)}%
              </span>
            </div>
            <p className="text-sm text-gray-600">Total Revenue</p>
            <p className="text-3xl font-bold text-gray-900">Rs. {analytics.revenue.total.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">
              This month: Rs. {analytics.revenue.thisMonth.toLocaleString()}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <ShoppingCart size={24} className="text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600">Total Orders</p>
            <p className="text-3xl font-bold text-gray-900">{analytics.orders.total}</p>
            <p className="text-xs text-gray-500 mt-2">
              Pending: {analytics.orders.pending} | Completed: {analytics.orders.completed}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Users size={24} className="text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600">Total Users</p>
            <p className="text-3xl font-bold text-gray-900">{analytics.users.total}</p>
            <p className="text-xs text-gray-500 mt-2">
              New this month: {analytics.users.newThisMonth}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-100 p-3 rounded-full">
                <Package size={24} className="text-yellow-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600">Products</p>
            <p className="text-3xl font-bold text-gray-900">{analytics.products.total}</p>
            <p className="text-xs text-gray-500 mt-2">
              Low stock: {analytics.products.lowStock} | Out: {analytics.products.outOfStock}
            </p>
          </div>
        </div>

        {/* Charts Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
              <p className="text-gray-500">Chart visualization would go here</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Order Status Distribution</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
              <p className="text-gray-500">Chart visualization would go here</p>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Top Performing Products</h3>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded"></div>
                  <div>
                    <p className="font-medium">Product {i}</p>
                    <p className="text-sm text-gray-500">Category</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">Rs. 5,000</p>
                  <p className="text-sm text-gray-500">50 sales</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalyticsPage;