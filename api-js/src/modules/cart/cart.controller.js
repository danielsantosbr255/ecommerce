const service = require("./cart.service");
const validator = require("../../config/validators/cart.validator");

module.exports = {
    async addToCart(req, res) {
        const validatedData = validator.create(req.body);
        const cart = await service.addItem(req.user.id, validatedData);
        res.json(cart);
    },

    async removeItem(req, res) {
        const validatedData = validator.delete({ productId: req.params.productId });
        const item = await service.removeItem(req.user.id, validatedData);
        res.json({ message: "Item removido do carrinho!", item });
    },

    async getCart(req, res) {
        const cart = await service.getCart(req.user.id);
        res.json(cart);
    },
};
