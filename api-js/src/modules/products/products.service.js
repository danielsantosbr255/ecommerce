const { prisma } = require("../../common/database/prisma");
const CustomError = require("../../common/utils/CustomError");
const validator = require("../../common/validators/product.validator");
const path = require("path");
const fs = require("fs");

const bodyData = (req) => {
    const { title, description, price, stock, category } = req.body;

    return {
        ...(title !== undefined && { title }),
        ...(category !== undefined && { category }),
        ...(description !== undefined && { description }),
        ...(price !== undefined && { price: Number(price) }),
        ...(stock !== undefined && { stock: Number(stock) }),
        ...(req.file && { image: `/uploads/${req.file.filename}` }),
    };
};

module.exports = {
    getProducts() {
        return prisma.product.findMany();
    },

    getProductById(id) {
        return prisma.product.findUnique({ where: { id } });
    },

    createProduct(req) {
        if (!req.ability.can("manage", "Product")) throw new CustomError("Acesso negado!", 403);

        const validatedData = validator.create(bodyData(req));
        
        if (validatedData.stock < 0) throw new CustomError("Quantidade de estoque inválida!", 400);

        return prisma.product.create({ data: validatedData });
    },

    async updateProduct(req) {
        if (!req.ability.can("manage", "Product")) throw new CustomError("Acesso negado!", 403);

        const existingProduct = await prisma.product.findUnique({ where: { id: req.params.id } });
        if (!existingProduct) throw new CustomError("Produto não encontrado!", 404);

        const validatedData = validator.update(bodyData(req));

        if (req.file && existingProduct.image) {
            const oldImagePath = path.join(__dirname, "../../..", existingProduct.image);
            fs.unlink(oldImagePath, (err) => {
                if (err) console.error("Erro ao deletar imagem antiga:", err);
            });
        }
        return prisma.product.update({ where: { id: req.params.id }, data: validatedData });
    },

    async deleteProduct(req) {
        const { id } = req.params;
        if (!req.ability.can("manage", "Product")) throw new CustomError("Acesso negado!", 403);

        const product = await prisma.product.findUnique({ where: { id } });
        if (!product) throw new CustomError("Produto não encontrado!", 404);

        if (product.image) {
            const oldImagePath = path.join(__dirname, "../../..", product.image);
            fs.unlink(oldImagePath, (err) => {
                if (err) console.error("Erro ao deletar imagem antiga:", err);
            });
        }

        return prisma.product.delete({ where: { id } });
    },
};
