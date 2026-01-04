const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number, required: true },
    lastRestocked: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inventory", inventorySchema);
