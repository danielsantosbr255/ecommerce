// src/services/payment/PaymentService.js - Abstract Payment Service (Interface-like for extensibility)
class PaymentInterface {
  constructor() {
    if (this.constructor === PaymentInterface) {
      throw new Error("PaymentService is an abstract class and cannot be instantiated directly.");
    }
  }

  /**
   * Creates a payment order.
   * @param {Object} orderData - Data required to create the payment order.
   * @returns {Promise<Object>} - Payment creation response.
   */
  async createOrder(orderData) {
    throw new Error("createOrder method must be implemented by subclasses.");
  }

  /**
   * Captures the payment after approval.
   * @param {string} paymentId - The ID of the payment to capture.
   * @returns {Promise<Object>} - Capture response.
   */
  async capturePayment(paymentId) {
    throw new Error("capturePayment method must be implemented by subclasses.");
  }

  /**
   * Gets payment details.
   * @param {string} paymentId - The ID of the payment.
   * @returns {Promise<Object>} - Payment details.
   */
  async getPaymentDetails(paymentId) {
    throw new Error("getPaymentDetails method must be implemented by subclasses.");
  }
}

module.exports = PaymentInterface;
