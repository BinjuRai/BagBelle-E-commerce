const Cart = require("../models/cartModel");
const Product = require("../models/admin/productModel");

class CartService {
  // Get user's cart
  async getUserCart(userId) {
    let cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }
    return cart;
  }

  // Add item to cart
  async addToCart(userId, productId, quantity = 1) {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    return await cart.populate("items.product");
  }

  // Update quantity
  async updateQuantity(userId, productId, quantity) {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) return null;

    const item = cart.items.find(
      (i) => i.product.toString() === productId
    );

    if (!item) return null;

    item.quantity = quantity;
    await cart.save();

    return await cart.populate("items.product");
  }

  // Remove product
  async removeItem(userId, productId) {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) return null;

    cart.items = cart.items.filter(
      (i) => i.product.toString() !== productId
    );

    await cart.save();
    return await cart.populate("items.product");
  }

  // Clear cart
  async clearCart(userId) {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return null;

    cart.items = [];
    await cart.save();
    return cart;
  }
}

module.exports = new CartService();
