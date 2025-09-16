// File: src/services/PayPalService.js
const axios = require("axios");
const paypalConfig = require("../config/paypal");
const { PAYMENT_STATUS } = require("../utils/constants");
const logger = require("../utils/logger");

class PayPalService {
  async createPayment(paymentData) {
    try {
      const accessToken = await paypalConfig.getAccessToken();

      const paymentPayload = {
        intent: "sale",
        payer: {
          payment_method: "paypal",
        },
        transactions: [
          {
            amount: {
              total: paymentData.amount.toString(),
              currency: paymentData.currency,
            },
            description: paymentData.description,
            custom: paymentData.orderId,
          },
        ],
        redirect_urls: {
          return_url: `${process.env.FRONTEND_URL}/payment/success`,
          cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
        },
      };

      const response = await axios.post(paypalConfig.getApiUrl("/v1/payments/payment"), paymentPayload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      const approvalUrl = response.data.links.find((link) => link.rel === "approval_url")?.href;

      return {
        id: response.data.id,
        status: response.data.state,
        approvalUrl,
        rawResponse: response.data,
      };
    } catch (error) {
      logger.error("Erro ao criar pagamento PayPal:", error.response?.data || error.message);
      throw new Error(`Erro PayPal: ${error.response?.data?.message || error.message}`);
    }
  }

  async executePayment(paymentId, executionData) {
    try {
      const accessToken = await paypalConfig.getAccessToken();

      const executePayload = {
        payer_id: executionData.PayerID,
      };

      const response = await axios.post(paypalConfig.getApiUrl(`/v1/payments/payment/${paymentId}/execute`), executePayload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      return {
        id: response.data.id,
        status: response.data.state,
        payerId: response.data.payer.payer_info.payer_id,
        rawResponse: response.data,
      };
    } catch (error) {
      logger.error("Erro ao executar pagamento PayPal:", error.response?.data || error.message);
      throw new Error(`Erro PayPal: ${error.response?.data?.message || error.message}`);
    }
  }

  async handleWebhook(webhookData) {
    try {
      const eventType = webhookData.event_type;
      const resource = webhookData.resource;

      switch (eventType) {
        case "PAYMENT.SALE.COMPLETED":
          return {
            paymentId: resource.parent_payment,
            status: PAYMENT_STATUS.COMPLETED,
            data: webhookData,
          };
        case "PAYMENT.SALE.DENIED":
          return {
            paymentId: resource.parent_payment,
            status: PAYMENT_STATUS.FAILED,
            data: webhookData,
          };
        case "PAYMENT.SALE.REFUNDED":
          return {
            paymentId: resource.parent_payment,
            status: PAYMENT_STATUS.REFUNDED,
            data: webhookData,
          };
        default:
          logger.warn("Evento PayPal não tratado:", eventType);
          return { status: "unhandled", data: webhookData };
      }
    } catch (error) {
      logger.error("Erro ao processar webhook PayPal:", error);
      throw error;
    }
  }

  async getPaymentDetails(paymentId) {
    try {
      const accessToken = await paypalConfig.getAccessToken();

      const response = await axios.get(paypalConfig.getApiUrl(`/v1/payments/payment/${paymentId}`), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      logger.error("Erro ao obter detalhes do pagamento PayPal:", error);
      throw error;
    }
  }
}

module.exports = PayPalService;
