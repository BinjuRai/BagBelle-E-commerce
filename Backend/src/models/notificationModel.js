
const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: true 
    },
    title: { 
      type: String,
      required: true 
    },
    message: { 
      type: String,
      required: true 
    },
    type: {
      type: String,
      enum: [
        'order_placed',
        'order_confirmed', 
        'order_shipped', 
        'order_delivered', 
        'order_cancelled',
        'payment_success',
        'payment_failed'
      ],
      required: true
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order"
    },
    isRead: { 
      type: Boolean, 
      default: false 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);