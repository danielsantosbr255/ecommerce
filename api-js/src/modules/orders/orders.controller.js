const service = require("./orders.service");

module.exports = {
    async createOrder(req, res) {
        const cart = await service.createOrder(req.user.id);
        res.json(cart);
    },

    async getOrdersByUserId(req, res) {
        const orders = await service.getOrdersByUserId(req.user.id);
        res.json(orders);
    },
};
