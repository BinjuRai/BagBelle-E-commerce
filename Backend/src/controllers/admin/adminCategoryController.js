const categoryService = require("../../services/categoryService");

// ✅ Create category
exports.adminCreateCategory = async (req, res) => {
  try {
    // 🔍 DEBUG: Log incoming data
    console.log("📦 req.body:", req.body);
    console.log("📸 req.files:", req.files);

    const categoryData = {
      name: req.body.name,
      description: req.body.description,
    };

    // Add image path if uploaded
    if (req.files?.image && req.files.image[0]) {
      categoryData.imagepath = req.files.image[0].filename;
      console.log("✅ Image filename:", req.files.image[0].filename);
    } else {
      console.log("❌ No image uploaded");
    }

    console.log("💾 Saving category data:", categoryData);
    const newCategory = await categoryService.create(categoryData);
    console.log("✅ Category saved:", newCategory);

    res.status(201).json(newCategory);
  } catch (err) {
    console.error("❌ Error creating category:", err);
    res.status(500).json({
      message: "Failed to create category",
      error: err.message,
    });
  }
};

// ✅ Update category
exports.adminUpdateCategory = async (req, res) => {
  try {
    console.log("📦 Update req.body:", req.body);
    console.log("📸 Update req.files:", req.files);

    const updateData = {
      name: req.body.name,
      description: req.body.description,
    };

    // Add new image if uploaded
    if (req.files?.image && req.files.image[0]) {
      updateData.imagepath = req.files.image[0].filename;
      console.log("✅ New image filename:", req.files.image[0].filename);
    }

    console.log("💾 Updating with data:", updateData);
    const updatedCategory = await categoryService.update(
      req.params.id,
      updateData
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    console.log("✅ Category updated:", updatedCategory);
    res.status(200).json(updatedCategory);
  } catch (err) {
    console.error("❌ Update error:", err);
    res.status(500).json({
      message: "Failed to update category",
      error: err.message,
    });
  }
};

// ✅ Get all categories
exports.adminGetCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAll();
    res.status(200).json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

// ✅ Get single category by ID
exports.adminGetCategoryById = async (req, res) => {
  try {
    const category = await categoryService.getById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch category" });
  }
};

// ✅ Delete category
exports.adminDeleteCategory = async (req, res) => {
  try {
    const deleted = await categoryService.delete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete category" });
  }
};
