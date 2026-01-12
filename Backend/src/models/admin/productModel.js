
// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
   
//     description: { type: String },
//     price: { type: Number, required: true },
//     categoryId: { 
//       type: mongoose.Schema.Types.ObjectId, 
//       ref: "Category", 
//       required: true 
//     },
//     stock: { type: Number, default: 0 },
//     careInstructions: { type: String },
//     isFeatured: { type: Boolean, default: false },
//     imagepath: { type: String }, // Image file path
//     filepath: { type: String }   // Video file path
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Product", productSchema);

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    categoryId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Category", 
      required: true 
    },
    bagType: { 
      type: String, 
      enum: ["tote", "leather", "crossbody", "backpack", "clutch", "shoulder", "messenger"],
      default: "tote"
    },
    stock: { type: Number, default: 0 },
    material: { type: String }, // e.g., "Genuine Leather", "Canvas", "Nylon"
    dimensions: { type: String }, // e.g., "12x10x4 inches"
    BrandName: { type: String },
    isFeatured: { type: Boolean, default: false },
    imagepath: { type: String },
    filepath: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);