const Product = require("../models/admin/productModel");

class ProductService {
  async createProduct(data) {
    return await Product.create(data);
  }

  async getAllProducts(filter = {}) {
    return await Product.find(filter).populate("categoryId");
  }

  async getProductById(id) {
    return await Product.findById(id).populate("categoryId");
  }

  async updateProduct(id, data) {
    return await Product.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
  }
}

module.exports = new ProductService();
