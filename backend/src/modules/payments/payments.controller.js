const PaymentService = require("./payments.service");

class PaymentController {
  constructor() {
    this.service = new PaymentService();
  }

  create = async (req, res) => {
    const { orderId, provider = "paypal", currency = "BRL" } = req.body;
    const frontendBaseUrl = process.env.FRONTEND_BASE_URL || "http://localhost:3000";

    const returnUrl = `${frontendBaseUrl}/payments/success?orderId=${orderId}`;
    const cancelUrl = `${frontendBaseUrl}/payments/cancel?orderId=${orderId}`;

    const response = await this.service.create({ orderId, provider, currency, returnUrl, cancelUrl });

    res.json({ response, message: "Redirect to this URL for payment approval" });
  };

  capture = async (req, res) => {
    const { providerOrderId } = req.body;
    const captureResult = await this.service.capture(providerOrderId);
    res.json(captureResult);
  };
}

module.exports = new PaymentController();
