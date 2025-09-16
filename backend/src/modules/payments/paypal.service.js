const axios = require("axios");
const PaymentService = require("../../common/lib/interfaces/payment.interface");

class PayPalService extends PaymentService {
  constructor() {
    super();
    this.baseUrl = process.env.PAYPAL_BASE_URL || "https://api-m.sandbox.paypal.com";
    this.clientId = process.env.PAYPAL_CLIENT_ID;
    this.clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    this.brandName = "Fireforge Labs";

    if (!this.clientId || !this.clientSecret) {
      throw new Error("PayPal credentials are missing.");
    }
  }

  async getAccessToken() {
    const response = await axios.post(`${this.baseUrl}/v1/oauth2/token`, "grant_type=client_credentials", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: this.clientId,
        password: this.clientSecret,
      },
    });
    return response.data.access_token;
  }

  async createOrder(orderData) {
    const { orderId, totalAmount, currency = "BRL", returnUrl, cancelUrl } = orderData;
    const accessToken = await this.getAccessToken();

    const payload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: orderId,
          amount: {
            currency_code: currency,
            value: totalAmount.toFixed(2),
          },
        },
      ],
      application_context: {
        return_url: returnUrl,
        cancel_url: cancelUrl,
        shipping_preference: "NO_SHIPPING",
        user_action: "PAY_NOW",
      },
      experience_context: {
        brand_name: this.brandName,
      },
    };

    const response = await axios.post(`${this.baseUrl}/v2/checkout/orders`, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    return {
      orderId: response.data.id,
      approvalUrl: response.data.links.find((link) => link.rel === "approve").href,
      status: response.data.status,
    };
  }

  async capturePayment(orderId) {
    const accessToken = await this.getAccessToken();

    const response = await axios.post(
      `${this.baseUrl}/v2/checkout/orders/${orderId}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return {
      status: response.data.status,
      captureId: response.data.purchase_units[0].payments.captures[0].id,
      amount: response.data.purchase_units[0].payments.captures[0].amount.value,
    };
  }

  async getPaymentDetails(orderId) {
    const accessToken = await this.getAccessToken();

    const response = await axios.get(`${this.baseUrl}/v2/checkout/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return response.data;
  }
}

module.exports = PayPalService;
