const express = require("express");
const router = express.Router();
const Review = require("../models/reviewModel");
const Product = require("../models/admin/productModel");
const { authenticate } = require("../middlewares/authMiddleware"); // optional, if you want only logged-in users
// Add a review to a product
router.post("/:productId", authenticate, async (req, res) => {
  const { productId } = req.params;
  const { rating, comment } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be 1-5" });
  }

  try {
    const review = new Review({
      product: productId,
      user: req.user._id, // from authMiddleware
      rating,
      comment,
    });

    await review.save();
    await review.populate("user", "name email"); // optional

    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save review" });
  }
});

// Get all reviews for a product
router.get("/:productId", async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
});

module.exports = router;