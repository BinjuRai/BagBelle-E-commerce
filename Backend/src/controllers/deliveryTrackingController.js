const trackingService = require("../services/deliveryTrackingService");

class DeliveryTrackingController {

  async createTracking(req, res) {
    try {
      const { orderId, estimatedDelivery } = req.body;
      const tracking = await trackingService.createTracking(orderId, estimatedDelivery);
      res.json({ success: true, tracking });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async getTracking(req, res) {
    try {
      const { orderId } = req.params;
      const tracking = await trackingService.getTracking(orderId);
      res.json({ success: true, tracking });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async updateStatus(req, res) {
    try {
      const { orderId } = req.params;
      const { status, currentLocation } = req.body;

      const tracking = await trackingService.updateStatus(orderId, status, currentLocation);
      res.json({ success: true, tracking });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async getAllTracking(req, res) {
    try {
      const trackingRecords = await trackingService.getAllTracking();
      res.json({ success: true, trackingRecords });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}

module.exports = new DeliveryTrackingController();

