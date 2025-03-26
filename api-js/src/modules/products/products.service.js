const { prisma } = require("../../config/database/prisma");
const CustomError = require("../../config/utils/CustomError");

module.exports = {
    getProducts() {
        return prisma.product.findMany();
    },

    getProductById(id) {
        return prisma.product.findUnique({ where: { id } });
    },

    createProduct({ name, description, price, stock }) {
        // const existProduct = prisma.product.findFirst({ where: { name } });
        return prisma.product.create({ data: { name, description, price, stock } });
    },

    updateProduct(id, { name, description, price, stock }) {
        return prisma.product.update({
            where: { id },
            data: { name, description, price, stock },
        });
    },

    async deleteProduct(id) {
        const product = await prisma.product.findUnique({ where: { id } });
        if (!product) throw new CustomError("Produto não encontrado!", 404);
        return prisma.product.delete({ where: { id } });
    },
};
