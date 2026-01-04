

const Wishlist = require("../models/wishlist");
const Product = require("../models/admin/productModel");

class WishlistService {
  async getWishlist(userId) {
    try {
      let wishlist = await Wishlist.findOne({ user: userId })
        .populate({
          path: "products",
          select: "name price imagepath stock plantType isFeatured description categoryId"
        });

      if (!wishlist) {
        wishlist = await Wishlist.create({ user: userId, products: [] });
      }

      return wishlist;
    } catch (err) {
      console.error("Get wishlist error:", err);
      throw err;
    }
  }

  async addToWishlist(userId, productId) {
    try {
      // Verify product exists
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error("Product not found");
      }

      let wishlist = await Wishlist.findOne({ user: userId });

      if (!wishlist) {
        wishlist = await Wishlist.create({ 
          user: userId, 
          products: [productId] 
        });
      } else {
        if (!wishlist.products.includes(productId)) {
          wishlist.products.push(productId);
          await wishlist.save();
        }
      }

      return await Wishlist.findOne({ user: userId })
        .populate({
          path: "products",
          select: "name price imagepath stock plantType isFeatured description categoryId"
        });
    } catch (err) {
      console.error("Add to wishlist error:", err);
      throw err;
    }
  }

  async removeFromWishlist(userId, productId) {
    try {
      const wishlist = await Wishlist.findOne({ user: userId });

      if (!wishlist) {
        throw new Error("Wishlist not found");
      }

      wishlist.products = wishlist.products.filter(
        (id) => id.toString() !== productId
      );
      await wishlist.save();

      return await Wishlist.findOne({ user: userId })
        .populate({
          path: "products",
          select: "name price imagepath stock plantType isFeatured description categoryId"
        });
    } catch (err) {
      console.error("Remove from wishlist error:", err);
      throw err;
    }
  }

  async toggleWishlist(userId, productId) {
    try {
      // Verify product exists
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error("Product not found");
      }

      let wishlist = await Wishlist.findOne({ user: userId });

      if (!wishlist) {
        wishlist = await Wishlist.create({ 
          user: userId, 
          products: [productId] 
        });
        return { 
          added: true, 
          wishlist: await this.getWishlist(userId) 
        };
      }

      const index = wishlist.products.findIndex(
        (id) => id.toString() === productId
      );

      if (index > -1) {
        wishlist.products.splice(index, 1);
        await wishlist.save();
        return { 
          added: false, 
          wishlist: await this.getWishlist(userId) 
        };
      } else {
        wishlist.products.push(productId);
        await wishlist.save();
        return { 
          added: true, 
          wishlist: await this.getWishlist(userId) 
        };
      }
    } catch (err) {
      console.error("Toggle wishlist error:", err);
      throw err;
    }
  }
}

module.exports = new WishlistService();