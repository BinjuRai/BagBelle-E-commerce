

const OrderService = require("../services/orderService");
const mongoose = require("mongoose");

const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");
const Product = require("../models/admin/productModel");
const trackingService = require("../services/deliveryTrackingService");
const NotificationService = require("../services/notificationService");

class OrderController {
  constructor() {
    this.createOrder = this.createOrder.bind(this);
    this.getMyOrders = this.getMyOrders.bind(this);
    this.getOrderById = this.getOrderById.bind(this);
    this.adminGetOrders = this.adminGetOrders.bind(this);
    this.adminUpdateStatus = this.adminUpdateStatus.bind(this);
    this.adminUpdatePayment = this.adminUpdatePayment.bind(this);
  }


  async createOrder(req, res) {
    try {
      // const userId = req.user?.id;
      const userId = req.user?.id || req.user?._id;

      if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid user ID",
        });
      }

      const { shippingInfo, paymentMethod } = req.body;

      if (!shippingInfo || !paymentMethod) {
        return res.status(400).json({
          success: false,
          message: "Missing shipping info or payment method",
        });
      }

      const userObjectId = new mongoose.Types.ObjectId(userId);

      const cart = await Cart.findOne({ user: userObjectId }).populate(
        "items.product"
      );

      if (!cart || cart.items.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Cart is empty",
        });
      }

      const items = cart.items.map((i) => ({
        product: i.product._id,
        quantity: i.quantity,
        price: i.product.price,
        total: i.quantity * i.product.price,
      }));

      const subtotal = items.reduce((sum, i) => sum + i.total, 0);
      const shippingFee = subtotal > 2000 ? 0 : 150;
      const totalAmount = subtotal + shippingFee;

      for (let i of cart.items) {
        const product = await Product.findById(i.product._id);
        if (!product) {
          return res.status(404).json({
            success: false,
            message: `Product not found`,
          });
        }
        if (product.stock < i.quantity) {
          return res.status(400).json({
            success: false,
            message: `Not enough stock for ${product.name}`,
          });
        }
        product.stock -= i.quantity;
        await product.save();
      }

      const order = await Order.create({
        user: userObjectId,
        items,
        shippingInfo,
        paymentMethod,
        subtotal,
        shippingFee,
        totalAmount,
        status: "pending",
      });

      cart.items = [];
      await cart.save();

      try {
        if (trackingService?.createTracking) {
          await trackingService.createTracking(order._id);
        }
      } catch (err) {
        console.error("Tracking creation failed:", err);
      }

      res.status(201).json({
        success: true,
        order,
      });
    } catch (error) {
      console.error("Create order error:", error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getMyOrders(req, res) {
    try {
      console.log("🔍 getMyOrders called!");
      console.log("🔍 User from token:", req.user);

      // Use _id instead of id
      const userId = req.user.id || req.user._id;
      console.log("🔍 User ID:", userId);

      const orders = await OrderService.getUserOrders(userId);

      console.log("📦 Orders found:", orders.length);
      console.log("📦 First order (if any):", orders[0]);

      res.json({ success: true, orders });
    } catch (err) {
      console.error("❌ Error in getMyOrders:", err);
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async getOrderById(req, res) {
    try {
      const order = await OrderService.getOrderById(req.params.orderId);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      // Ownership check
      if (
        order.user._id.toString() !== req.user.id &&
        req.user.role !== "admin"
      ) {
        return res.status(403).json({
          success: false,
          message: "Not allowed to view this order",
        });
      }

      res.json({ success: true, order });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async adminGetOrders(req, res) {
    try {
      const orders = await OrderService.getAllOrders();
      res.json({ success: true, orders });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  // async adminUpdateStatus(req, res) {
  //   try {
  //     const { status } = req.body;

  //     if (!status) {
  //       return res.status(400).json({
  //         success: false,
  //         message: "Status is required",
  //       });
  //     }

  //     const updated = await OrderService.updateOrderStatus(
  //       req.params.orderId,
  //       status
  //     );

  //     res.json({ success: true, order: updated });
  //   } catch (err) {
  //     res.status(400).json({ success: false, message: err.message });
  //   }
  // }

  async adminUpdateStatus(req, res) {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ 
        success: false, 
        message: "Status is required" 
      });
    }

    const updated = await OrderService.updateOrderStatus(
      req.params.orderId,
      status
    );

    // Create notification for the user
    const statusTypeMap = {
      'pending': 'order_placed',
      'confirmed': 'order_confirmed',
      'shipped': 'order_shipped',
      'delivered': 'order_delivered',
      'cancelled': 'order_cancelled'
    };

    const notificationType = statusTypeMap[status];
    
    if (notificationType) {
      const notification = await NotificationService.createNotification(
        updated.user._id || updated.user,
        notificationType,
        updated._id
      );

      // Emit socket event for real-time notification
      const io = req.app.get('io');
      if (io) {
        io.to(updated.user._id.toString() || updated.user.toString()).emit('notification', {
          notification,
          unreadCount: await NotificationService.getUnreadCount(updated.user._id || updated.user)
        });
      }
    }

    res.json({ success: true, order: updated });
  } catch (err) {
    console.error('Error updating order status:', err);
    res.status(400).json({ success: false, message: err.message });
  }
}
  async adminUpdatePayment(req, res) {
    try {
      const { paymentStatus, transactionId } = req.body;

      if (!paymentStatus) {
        return res.status(400).json({
          success: false,
          message: "Payment status is required",
        });
      }

      const updated = await OrderService.updatePaymentStatus(
        req.params.orderId,
        paymentStatus,
        transactionId
      );

      res.json({ success: true, order: updated });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
}

module.exports = new OrderController();
