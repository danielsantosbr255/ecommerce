const { prisma } = require("../../common/database/prisma");
const CustomError = require("../../common/utils/CustomError");

module.exports = {
    getProducts() {
        return prisma.product.findMany();
    },

    getProductById(id) {
        return prisma.product.findUnique({ where: { id } });
    },

    createProduct({ title, description, price, stock, image, category }) {
        return prisma.product.create({
            data: { title, description, price, stock, image, category },
        });
    },

    updateProduct(id, { title, description, price, stock, image, category }) {
        return prisma.product.update({
            where: { id },
            data: { title, description, price, stock, image, category },
        });
    },

    async deleteProduct(id) {
        const product = await prisma.product.findUnique({ where: { id } });
        if (!product) throw new CustomError("Produto não encontrado!", 404);
        return prisma.product.delete({ where: { id } });
    },
};
