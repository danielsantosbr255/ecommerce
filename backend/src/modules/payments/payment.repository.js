const database = require("../../common/database/database");

class PaymentRepository {
  constructor() {
    this.prisma = database.getClient();
  }

  async create(paymentData) {
    return await this.prisma.payment.create({
      data: paymentData,
      include: { order: true },
    });
  }

  async findById(id) {
    return await this.prisma.payment.findUnique({
      where: { id },
      include: { order: true },
    });
  }

  async findByProviderPaymentId(providerPaymentId) {
    return await this.prisma.payment.findFirst({
      where: { providerPaymentId },
      include: { order: true },
    });
  }

  async updateStatus(id, status, providerResponse = null) {
    const updateData = { status };
    if (providerResponse) {
      updateData.providerResponse = providerResponse;
    }

    return await this.prisma.payment.update({
      where: { id },
      data: updateData,
    });
  }

  async findByOrderId(providerOrderId) {
    return await this.prisma.payment.findMany({
      where: { providerOrderId },
      orderBy: { createdAt: "desc" },
    });
  }
}

module.exports = new PaymentRepository();
