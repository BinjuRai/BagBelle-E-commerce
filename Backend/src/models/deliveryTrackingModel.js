const mongoose = require("mongoose");

const deliveryTrackingSchema = new mongoose.Schema(
  {
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    status: {
      type: String,
      enum: [
        "processing",
        "packed",
        "shipped",
        "out-for-delivery",
        "delivered"
      ],
      default: "processing"
    },
    estimatedDelivery: { type: Date },
    currentLocation: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("DeliveryTracking", deliveryTrackingSchema);
