const repository = require("./payment.repository");
const PayPalService = require("./paypal.service");
const OrderService = require("../orders/orders.service");
const CustomError = require("../../common/utils/CustomError");

class PaymentService {
  constructor() {
    this.repository = repository;
    this.orderService = OrderService;
    this.providers = { paypal: new PayPalService() };
  }

  async create(orderData) {
    const { orderId, provider: paymentProvider, currency, returnUrl, cancelUrl } = orderData;
    const order = await this.orderService.getOne(orderId);

    if (!order) throw new CustomError("Pedido não encontrado.", 404);
    if (order.status !== "PENDING") throw new CustomError("Este pedido já foi processado.", 422);

    const provider = this.getProvider(paymentProvider);

    // Criar pagamento no provedor
    const providerResponse = await provider.createOrder({
      orderId,
      totalAmount: Number(order.totalPrice),
      currency,
      returnUrl,
      cancelUrl,
    });

    // Salvar pagamento no banco de dados
    const payment = await this.repository.create({
      orderId,
      provider: paymentProvider,
      providerOrderId: providerResponse.id,
      providerCaptureId: providerResponse.captureId,
      status: "PENDING",
      amount: order.totalPrice,
      providerResponse: providerResponse,
    });

    return payment;
  }

  async capture(providerOrderId) {
    const payment = await this.repository.findByOrderId(providerOrderId);

    if (!payment) throw new CustomError("Pagamento não encontrado.", 404);
    if (payment.status === "COMPLETED") throw new CustomError("Pagamento já foi capturado.", 422);

    const provider = this.getProvider(payment.provider);

    try {
      const captureResult = await provider.capturePayment(providerOrderId);
      const captureStatus = captureResult.status;

      if (captureStatus !== "COMPLETED" && captureStatus !== "PAYER_ACTION_REQUIRED") {
        await this.repository.updateStatus(payment.id, "FAILED", captureResult);
        await this.orderService.update(payment.orderId, { status: "FAILED" });
        throw new CustomError("Captura do pagamento falhou.", 500);
      }

      await this.repository.updateStatus(payment.id, "COMPLETED", captureResult);
      await this.orderService.update(payment.orderId, { status: "COMPLETED" });

      return captureResult;
    } catch (error) {
      await this.repository.updateStatus(payment.id, "FAILED");
      await this.orderService.update(payment.orderId, { status: "FAILED" });
      console.error(error);
      throw error;
    }
  }

  async getById(id) {
    const payment = await this.repository.findById(id);
    if (!payment) {
      throw new CustomError("Pagamento não encontrado", 404);
    }
    return payment;
  }

  async getByOrderId(orderId) {
    const payment = await this.repository.findByOrderId(orderId);
    if (!payment) {
      throw new CustomError("Pagamento não encontrado", 404);
    }
    return payment;
  }

  /**
   * Retorna o provedor de pagamento pelo nome.
   * @param {string} providerName
   * @returns {import('../../common/lib/interfaces/payment.interface')} // Para autocomplete, use JSDoc import
   */
  getProvider(providerName) {
    const provider = this.providers[providerName];
    if (!provider) {
      throw new CustomError(`Provedor de pagamento não suportado: ${providerName}`, 422);
    }
    return provider;
  }

  addPaymentProvider(providerName, providerInstance) {
    this.providers[providerName] = providerInstance;
  }
}

module.exports = PaymentService;
