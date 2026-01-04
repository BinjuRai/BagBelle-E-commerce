const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    paymentMethod: { type: String, enum: ["cod", "esewa", "khalti"], default: "cod" },
    paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
    transactionId: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
