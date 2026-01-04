
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    // scientificName: { type: String },
    description: { type: String },
    price: { type: Number, required: true },
    categoryId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Category", 
      required: true 
    },
    stock: { type: Number, default: 0 },
    // plantType: {
    //   type: String,
    //   enum: ["indoor", "outdoor", "hanging", "succulent", "flowering"]
    // },
    careInstructions: { type: String },
    isFeatured: { type: Boolean, default: false },
    imagepath: { type: String }, // Image file path
    filepath: { type: String }   // Video file path
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);