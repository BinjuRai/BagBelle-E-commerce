const DeliveryTracking = require("../models/deliveryTrackingModel");
const Order = require("../models/orderModel");

class DeliveryTrackingService {

  // Create tracking for a new order
  async createTracking(orderId, estimatedDelivery = null) {
    const tracking = await DeliveryTracking.create({
      order: orderId,
      estimatedDelivery,
    });
    return tracking;
  }

  // Get tracking info by order
  async getTracking(orderId) {
    return await DeliveryTracking.findOne({ order: orderId }).populate("order");
  }

  // Update status and current location
  async updateStatus(orderId, status, currentLocation = null) {
    const tracking = await DeliveryTracking.findOne({ order: orderId });
    if (!tracking) throw new Error("Tracking record not found");

    tracking.status = status;
    if (currentLocation) tracking.currentLocation = currentLocation;
    await tracking.save();

    // Auto-update order status
    await Order.findByIdAndUpdate(orderId, { status });

    return tracking;
  }

  // Admin: get all tracking records
  async getAllTracking() {
    return await DeliveryTracking.find().populate("order").sort({ createdAt: -1 });
  }
}

module.exports = new DeliveryTrackingService();
