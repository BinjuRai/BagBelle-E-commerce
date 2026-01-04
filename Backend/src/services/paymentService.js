class PaymentService {

  async processCOD() {
    return { status: "success", method: "COD" };
  }

  async processStripe(amount) {
   
    return { status: "pending", provider: "esewa", amount };
  }

  async processRazorpay(amount) {

    return { status: "pending", provider: "khalti", amount };
  }
}

module.exports = new PaymentService();
