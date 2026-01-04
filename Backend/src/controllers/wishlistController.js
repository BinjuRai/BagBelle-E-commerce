
const Wishlist = require("../models/wishlist");
const Product = require("../models/admin/productModel");

const wishlistController = {
  // Get user's wishlist
  list: async (req, res) => {
    try {
      const wishlist = await Wishlist.findOne({ user: req.user.id }).populate("products");
      
      if (!wishlist) {
        return res.json({
          success: true,
          wishlist: { products: [] }
        });
      }

      res.json({
        success: true,
        wishlist
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Toggle product in wishlist (add if not exists, remove if exists)
  toggle: async (req, res) => {
    try {
      const { productId } = req.body;

      if (!productId) {
        return res.status(400).json({
          success: false,
          message: "Product ID is required"
        });
      }

      // Check if product exists
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }

      let wishlist = await Wishlist.findOne({ user: req.user.id });

      if (!wishlist) {
        // Create new wishlist with the product
        wishlist = await Wishlist.create({
          user: req.user.id,
          products: [productId]
        });

        return res.json({
          success: true,
          message: "Product added to wishlist",
          wishlist: await wishlist.populate("products")
        });
      }

      // Check if product is already in wishlist
      const productIndex = wishlist.products.indexOf(productId);

      if (productIndex > -1) {
        // Remove product
        wishlist.products.splice(productIndex, 1);
        await wishlist.save();

        return res.json({
          success: true,
          message: "Product removed from wishlist",
          wishlist: await wishlist.populate("products")
        });
      } else {
        // Add product
        wishlist.products.push(productId);
        await wishlist.save();

        return res.json({
          success: true,
          message: "Product added to wishlist",
          wishlist: await wishlist.populate("products")
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Add item to wishlist
  add: async (req, res) => {
    try {
      const { productId } = req.body;

      if (!productId) {
        return res.status(400).json({
          success: false,
          message: "Product ID is required"
        });
      }

      // Check if product exists
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }

      let wishlist = await Wishlist.findOne({ user: req.user.id });

      if (!wishlist) {
        wishlist = await Wishlist.create({
          user: req.user.id,
          products: [productId]
        });
      } else {
        // Check if product is already in wishlist
        if (!wishlist.products.includes(productId)) {
          wishlist.products.push(productId);
          await wishlist.save();
        } else {
          return res.json({
            success: true,
            message: "Product already in wishlist",
            wishlist: await wishlist.populate("products")
          });
        }
      }

      res.json({
        success: true,
        message: "Product added to wishlist",
        wishlist: await wishlist.populate("products")
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Remove item from wishlist
  remove: async (req, res) => {
    try {
      const { productId } = req.params;

      const wishlist = await Wishlist.findOne({ user: req.user.id });

      if (!wishlist) {
        return res.status(404).json({
          success: false,
          message: "Wishlist not found"
        });
      }

      const productIndex = wishlist.products.indexOf(productId);

      if (productIndex > -1) {
        wishlist.products.splice(productIndex, 1);
        await wishlist.save();

        res.json({
          success: true,
          message: "Product removed from wishlist",
          wishlist: await wishlist.populate("products")
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Product not found in wishlist"
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};

module.exports = wishlistController;