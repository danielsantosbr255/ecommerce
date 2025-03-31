const { prisma } = require("../../common/database/prisma");
const CustomError = require("../../common/utils/CustomError");

module.exports = {
    async createOrder(userId) {
        const cartItems = await prisma.cartItem.findMany({
            where: { userId },
            include: { product: true },
        });

        if (cartItems.length === 0) {
            throw new CustomError("O carrinho está vazio", 400);
        }

        const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

        // Criar o pedido
        const order = await prisma.order.create({
            data: {
                userId: userId,
                totalPrice: total,
                items: {
                    create: cartItems.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                    })),
                },
            },
        });

        // Apagar o carrinho após a compra
        await prisma.cartItem.deleteMany({ where: { userId } });

        return order;
    },

    async getOrdersByUserId(userId) {
        const orders = await prisma.order.findMany({
            where: { userId },
            include: { items: true },
        });
        return orders;
    },
};
