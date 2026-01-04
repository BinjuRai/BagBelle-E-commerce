

const Order = require("../models/orderModel");
const Payment = require("../models/paymentModel");
const axios = require("axios");
const crypto = require("crypto");

class PaymentController {
  // COD Payment
  async cod(req, res) {
    try {
      const { orderId } = req.params;
      
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ 
          success: false, 
          message: "Order not found" 
        });
      }

      // Update payment status
      const payment = await Payment.findById(order.payment);
      payment.paymentStatus = "pending";
      await payment.save();
      
      res.json({ 
        success: true, 
        message: "Order placed successfully with Cash on Delivery",
        order 
      });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error.message 
      });
    }
  }

  // eSewa Initialize
  async esewaInitialize(req, res) {
    try {
      const { orderId } = req.params;
      const order = await Order.findById(orderId);
      
      if (!order) {
        return res.status(404).json({ 
          success: false, 
          message: "Order not found" 
        });
      }

      // eSewa configuration
      const esewaConfig = {
        merchantId: process.env.ESEWA_MERCHANT_ID || "EPAYTEST",
        successUrl: `${process.env.CLIENT_URL}/payment/esewa/verify?orderId=${orderId}`,
        failureUrl: `${process.env.CLIENT_URL}/payment/failed?orderId=${orderId}`
      };

      const paymentData = {
        amount: order.totalAmount,
        tax_amount: 0,
        total_amount: order.totalAmount,
        transaction_uuid: order._id.toString(),
        product_code: esewaConfig.merchantId,
        product_service_charge: 0,
        product_delivery_charge: 0,
        success_url: esewaConfig.successUrl,
        failure_url: esewaConfig.failureUrl,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        signature: ""
      };

      // Generate signature (if you have secret key)
      if (process.env.ESEWA_SECRET_KEY) {
        const message = `total_amount=${paymentData.total_amount},transaction_uuid=${paymentData.transaction_uuid},product_code=${paymentData.product_code}`;
        const signature = crypto
          .createHmac("sha256", process.env.ESEWA_SECRET_KEY)
          .update(message)
          .digest("base64");
        
        paymentData.signature = signature;
      }

      res.json({ 
        success: true, 
        paymentUrl: "https://uat.esewa.com.np/epay/main",
        paymentData 
      });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error.message 
      });
    }
  }

  // eSewa Verify
  async esewaVerify(req, res) {
    try {
      const { orderId, refId } = req.query;
      
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ 
          success: false, 
          message: "Order not found" 
        });
      }

      // Update payment status
      const payment = await Payment.findById(order.payment);
      payment.paymentStatus = "paid";
      payment.transactionId = refId;
      await payment.save();

      // Update order status
      order.status = "confirmed";
      await order.save();
      
      res.redirect(`${process.env.CLIENT_URL}/order-success?orderId=${orderId}`);
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error.message 
      });
    }
  }

  // Khalti Initialize
  async khaltiInitialize(req, res) {
    try {
      const { orderId } = req.params;
      const order = await Order.findById(orderId).populate("user");
      
      if (!order) {
        return res.status(404).json({ 
          success: false, 
          message: "Order not found" 
        });
      }

      const khaltiPayload = {
        return_url: `${process.env.CLIENT_URL}/payment/khalti/verify`,
        website_url: process.env.CLIENT_URL,
        amount: order.totalAmount * 100, // Amount in paisa
        purchase_order_id: order._id.toString(),
        purchase_order_name: `Order #${order._id.toString().slice(-8)}`,
        customer_info: {
          name: order.user.name || "Customer",
          email: order.user.email || "customer@plantnest.com",
          phone: order.user.phone || "9800000000"
        }
      };

      if (!process.env.KHALTI_SECRET_KEY) {
        return res.json({
          success: true,
          message: "Khalti not configured - using test mode",
          paymentUrl: `${process.env.CLIENT_URL}/payment/khalti/verify?orderId=${orderId}&test=true`,
          pidx: "test_" + orderId
        });
      }

      const response = await axios.post(
        "https://a.khalti.com/api/v2/epayment/initiate/",
        khaltiPayload,
        {
          headers: {
            Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );

      res.json({ 
        success: true, 
        paymentUrl: response.data.payment_url,
        pidx: response.data.pidx 
      });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error.message 
      });
    }
  }

  // Khalti Verify
  async khaltiVerify(req, res) {
    try {
      const { pidx, orderId, test } = req.body;

      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ 
          success: false, 
          message: "Order not found" 
        });
      }

      // Test mode
      if (test) {
        const payment = await Payment.findById(order.payment);
        payment.paymentStatus = "paid";
        payment.transactionId = pidx;
        await payment.save();

        order.status = "confirmed";
        await order.save();

        return res.json({ 
          success: true, 
          message: "Payment verified successfully (test mode)",
          order 
        });
      }

      // Real Khalti verification
      const response = await axios.post(
        "https://a.khalti.com/api/v2/epayment/lookup/",
        { pidx },
        {
          headers: {
            Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (response.data.status === "Completed") {
        const payment = await Payment.findById(order.payment);
        payment.paymentStatus = "paid";
        payment.transactionId = response.data.transaction_id;
        await payment.save();

        order.status = "confirmed";
        await order.save();
        
        res.json({ 
          success: true, 
          message: "Payment verified successfully",
          order 
        });
      } else {
        res.status(400).json({ 
          success: false, 
          message: "Payment verification failed" 
        });
      }
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error.message 
      });
    }
  }
}

module.exports = new PaymentController();