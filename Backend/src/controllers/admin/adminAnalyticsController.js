const Order = require("../../models/orderModel");
const User = require("../../models/userModel");
const Product = require("../../models/admin/productModel");

class AdminAnalyticsController {
  async getAnalytics(req, res) {
    try {
      const days = parseInt(req.query.days) || 30;
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      // Revenue Analytics
      const orders = await Order.find({ createdAt: { $gte: startDate } });
      const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
      
      // This month revenue
      const thisMonthStart = new Date();
      thisMonthStart.setDate(1);
      thisMonthStart.setHours(0, 0, 0, 0);
      
      const thisMonthOrders = await Order.find({ 
        createdAt: { $gte: thisMonthStart } 
      });
      const thisMonthRevenue = thisMonthOrders.reduce((sum, order) => sum + order.totalAmount, 0);

      // Last month revenue
      const lastMonthStart = new Date(thisMonthStart);
      lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);
      const lastMonthEnd = new Date(thisMonthStart);
      lastMonthEnd.setSeconds(lastMonthEnd.getSeconds() - 1);
      
      const lastMonthOrders = await Order.find({
        createdAt: { $gte: lastMonthStart, $lt: lastMonthEnd }
      });
      const lastMonthRevenue = lastMonthOrders.reduce((sum, order) => sum + order.totalAmount, 0);

      // Calculate growth
      const revenueGrowth = lastMonthRevenue > 0 
        ? ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue * 100).toFixed(1)
        : 0;

      // Order Analytics
      const totalOrders = await Order.countDocuments();
      const thisMonthOrderCount = thisMonthOrders.length;
      const pendingOrders = await Order.countDocuments({ status: 'pending' });
      const completedOrders = await Order.countDocuments({ status: 'delivered' });

      // User Analytics
      const totalUsers = await User.countDocuments();
      const newUsersThisMonth = await User.countDocuments({
        createdAt: { $gte: thisMonthStart }
      });

      // Product Analytics
      const totalProducts = await Product.countDocuments();
      const lowStockProducts = await Product.countDocuments({ stock: { $lt: 5, $gt: 0 } });
      const outOfStockProducts = await Product.countDocuments({ stock: 0 });

      res.json({
        success: true,
        analytics: {
          revenue: {
            total: totalRevenue,
            thisMonth: thisMonthRevenue,
            lastMonth: lastMonthRevenue,
            growth: parseFloat(revenueGrowth)
          },
          orders: {
            total: totalOrders,
            thisMonth: thisMonthOrderCount,
            pending: pendingOrders,
            completed: completedOrders
          },
          users: {
            total: totalUsers,
            newThisMonth: newUsersThisMonth,
            activeUsers: totalUsers // You can add more logic here
          },
          products: {
            total: totalProducts,
            lowStock: lowStockProducts,
            outOfStock: outOfStockProducts
          }
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get top selling products
  async getTopProducts(req, res) {
    try {
      const limit = parseInt(req.query.limit) || 10;

      const topProducts = await Order.aggregate([
        { $unwind: "$items" },
        {
          $group: {
            _id: "$items.product",
            totalSales: { $sum: "$items.quantity" },
            totalRevenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } }
          }
        },
        { $sort: { totalRevenue: -1 } },
        { $limit: limit },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "productDetails"
          }
        },
        { $unwind: "$productDetails" },
        {
          $project: {
            name: "$productDetails.name",
            image: "$productDetails.image",
            totalSales: 1,
            totalRevenue: 1
          }
        }
      ]);

      res.json({
        success: true,
        products: topProducts
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get revenue chart data
  async getRevenueChart(req, res) {
    try {
      const days = parseInt(req.query.days) || 30;
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const revenueByDay = await Order.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
            },
            revenue: { $sum: "$totalAmount" },
            orders: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ]);

      res.json({
        success: true,
        data: revenueByDay
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new AdminAnalyticsController();
