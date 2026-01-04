const Notification = require("../models/notificationModel");

class NotificationService {
  async createNotification(userId, type, orderId, customMessage = null) {
    const messages = {
      order_placed: {
        title: "Order Placed Successfully! 🎉",
        message: "Your order has been received and is being processed."
      },
      order_confirmed: {
        title: "Order Confirmed ✅",
        message: "Great news! Your order has been confirmed and will be prepared for shipping."
      },
      order_shipped: {
        title: "Order Shipped 🚚",
        message: "Your plants are on their way! Track your delivery for updates."
      },
      order_delivered: {
        title: "Order Delivered 🎉",
        message: "Your order has been delivered! Enjoy your new plants!"
      },
      order_cancelled: {
        title: "Order Cancelled ❌",
        message: "Your order has been cancelled. If you have questions, please contact support."
      },
      payment_success: {
        title: "Payment Successful 💳",
        message: "Your payment has been processed successfully."
      },
      payment_failed: {
        title: "Payment Failed ⚠️",
        message: "Your payment could not be processed. Please try again."
      }
    };

    const notificationData = messages[type] || {
      title: "Order Update",
      message: customMessage || "Your order status has been updated."
    };

    const notification = await Notification.create({
      user: userId,
      title: notificationData.title,
      message: customMessage || notificationData.message,
      type: type,
      orderId: orderId,
      isRead: false
    });

    return notification;
  }

  async getNotificationsByUser(userId) {
    return await Notification.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate('orderId', 'status totalAmount');
  }

  async getUnreadCount(userId) {
    return await Notification.countDocuments({
      user: userId,
      isRead: false
    });
  }

  async markAsRead(notificationId, userId) {
    return await Notification.findOneAndUpdate(
      { _id: notificationId, user: userId },
      { isRead: true },
      { new: true }
    );
  }

  async markAllAsRead(userId) {
    return await Notification.updateMany(
      { user: userId, isRead: false },
      { isRead: true }
    );
  }

  async deleteNotification(notificationId, userId) {
    return await Notification.findOneAndDelete({
      _id: notificationId,
      user: userId
    });
  }
}

module.exports = new NotificationService();