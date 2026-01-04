const Order = require("../models/orderModel");

module.exports = async function (req, res, next) {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    req.order = order;

    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid order ID" });
  }
};
