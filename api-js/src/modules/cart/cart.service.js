const { prisma } = require("../../config/database/prisma");
const CustomError = require("../../config/utils/CustomError");

module.exports = {
    async addItem(userId, { productId, quantity }) {
        const product = await prisma.product.findUnique({
            where: { id: productId },
            select: { stock: true },
        });

        if (!product) throw new CustomError("Produto não encontrado.", 404);
        if (product.stock < quantity)
            throw new CustomError("Quantidade em estoque insuficiente.", 400);

        await prisma.product.update({
            where: { id: productId },
            data: { stock: { decrement: quantity } },
        });

        const existingItem = await prisma.cartItem.findFirst({
            where: { userId: userId, productId },
        });

        const cart = await prisma.cartItem.upsert({
            where: { id: existingItem?.id || "000" },
            update: { quantity: { increment: quantity } },
            create: { userId, productId, quantity },
        });

        return cart;
    },

    async removeItem(userId, productId) {
        return prisma.cartItem.deleteMany({
            where: { userId, productId },
        });
    },

    async getCart(userId) {
        const items = await prisma.user.findUnique({
            where: { id: userId },
            select: { cart: { select: { quantity: true, product: true } } },
        });
        return items.cart;
    },
};
