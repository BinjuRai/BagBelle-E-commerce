const productService = require("../../services/productService");

// ✅ Create Product
exports.createProduct = async (req, res) => {
  try {
    console.log("📦 Create Product - req.body:", req.body);
    console.log("📸 Create Product - req.files:", req.files);

    const productData = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      categoryId: req.body.categoryId,
      plantType: req.body.plantType,
      stock: req.body.stock || 0,
      careInstructions: req.body.careInstructions,
      isFeatured:
        req.body.isFeatured === "true" || req.body.isFeatured === true,
      scientificName: req.body.scientificName,
    };

    // Add image path if uploaded
    if (req.files?.imagepath && req.files.imagepath[0]) {
      productData.imagepath = req.files.imagepath[0].filename;
      console.log("✅ Image filename:", req.files.imagepath[0].filename);
    }

    // Add video path if uploaded
    if (req.files?.filepath && req.files.filepath[0]) {
      productData.filepath = req.files.filepath[0].filename;
      console.log("✅ Video filename:", req.files.filepath[0].filename);
    }

    console.log("💾 Saving product data:", productData);
    const product = await productService.createProduct(productData);
    console.log("✅ Product saved:", product);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (err) {
    console.error("❌ Create product error:", err);
    res.status(500).json({
      success: false,
      message: "Error creating product",
      error: err.message,
    });
  }
};

// ✅ Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json({ success: true, products });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Error fetching products" });
  }
};

// ✅ Get Product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching product" });
  }
};

// ✅ Update Product
exports.updateProduct = async (req, res) => {
  try {
    console.log("📦 Update Product - req.body:", req.body);
    console.log("📸 Update Product - req.files:", req.files);

    const updateData = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      categoryId: req.body.categoryId,
      plantType: req.body.plantType,
      stock: req.body.stock,
      careInstructions: req.body.careInstructions,
      isFeatured:
        req.body.isFeatured === "true" || req.body.isFeatured === true,
      scientificName: req.body.scientificName,
    };

    // Add new image if uploaded
    if (req.files?.imagepath && req.files.imagepath[0]) {
      updateData.imagepath = req.files.imagepath[0].filename;
      console.log("✅ New image filename:", req.files.imagepath[0].filename);
    }

    // Add new video if uploaded
    if (req.files?.filepath && req.files.filepath[0]) {
      updateData.filepath = req.files.filepath[0].filename;
      console.log("✅ New video filename:", req.files.filepath[0].filename);
    }

    const updated = await productService.updateProduct(
      req.params.id,
      updateData
    );

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updated,
    });
  } catch (err) {
    console.error("❌ Update product error:", err);
    res.status(500).json({
      success: false,
      message: "Error updating product",
      error: err.message,
    });
  }
};

// ✅ Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await productService.deleteProduct(req.params.id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error deleting product" });
  }
};
