

const Category = require("../models/admin/categoryModel");

class CategoryService {
    
    // User: Get all categories
    async getAll() {
        return await Category.find();
    }

    // User: Get category by ID
    async getById(id) {
        return await Category.findById(id);
    }

    // Admin: Create category
    async create(data) {
        return await Category.create(data);
    }

    // Admin: Update category
    async update(id, data) {
        return await Category.findByIdAndUpdate(id, data, { new: true });
    }

    // Admin: Delete category
    async delete(id) {
        return await Category.findByIdAndDelete(id);
    }
}

module.exports = new CategoryService();
