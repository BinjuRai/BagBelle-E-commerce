
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Product = require("../models/admin/productModel");
const trackingService = require("./deliveryTrackingService");

class OrderService {
  // Create an order from cart
  async createOrder(userId, shippingInfo, paymentMethod) {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) throw new Error("Cart is empty");

    // Map items
    const items = cart.items.map((i) => ({
      product: i.product._id,
      quantity: i.quantity,
      price: i.product.price,
      // Remove 'total' if it's not in your Order model schema
    }));

    const subtotal = items.reduce((sum, i) => sum + (i.quantity * i.price), 0);
    const shippingFee = subtotal > 2000 ? 0 : 150;
    const totalAmount = subtotal + shippingFee;

    // Reduce stock
    for (let i of cart.items) {
      const product = await Product.findById(i.product._id);
      if (!product) throw new Error(`Product not found: ${i.product._id}`);
      if (product.stock < i.quantity) throw new Error(`Not enough stock for ${product.name}`);
      product.stock -= i.quantity;
      await product.save();
    }

    // Create order
    const order = await Order.create({
      user: userId,
      items,
      shippingInfo,
      paymentMethod,
      subtotal,
      shippingFee,
      totalAmount,
      status: "pending",
    });

    // Clear cart
    cart.items = [];
    await cart.save();

    // Create delivery tracking
    try {
      await trackingService.createTracking(order._id);
    } catch (err) {
      console.error("Tracking creation failed:", err);
      // Don't fail the order if tracking fails
    }

    return order;
  }

  // Get orders for a specific user WITH POPULATED DATA
  async getUserOrders(userId) {
    return await Order.find({ user: userId })
      .populate('items.product', 'name image price') // Populate product details
      .sort({ createdAt: -1 });
  }

  // Admin: Get all orders WITH POPULATED DATA
  async getAllOrders() {
    return await Order.find()
      .populate('items.product', 'name image price')
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 });
  }

  // Get single order by ID WITH POPULATED DATA
  async getOrderById(orderId) {
    return await Order.findById(orderId)
      .populate('items.product', 'name image price description')
      .populate('user', 'name email phone');
  }

  // Admin: Update order status
  async updateOrderStatus(orderId, status) {
    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    const order = await Order.findByIdAndUpdate(
      orderId, 
      { status }, 
      { new: true }
    ).populate('items.product');
    
    if (!order) throw new Error("Order not found");
    
    return order;
  }

  // Admin: Update payment status (you mentioned this in controller)
  async updatePaymentStatus(orderId, paymentStatus, transactionId) {
    const updateData = { 
      'payment.paymentStatus': paymentStatus 
    };
    
    if (transactionId) {
      updateData['payment.transactionId'] = transactionId;
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      updateData,
      { new: true }
    ).populate('items.product');

    if (!order) throw new Error("Order not found");
    
    return order;
  }
}

module.exports = new OrderService();
