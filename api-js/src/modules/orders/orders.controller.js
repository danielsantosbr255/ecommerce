const service = require("./orders.service");

module.exports = {
    async createOrder(req, res) {
        const cart = await service.createOrder(req.user.id);
        res.json(cart);
    },

    async getOrdersByUserId(req, res) {
        const orders = await service.getOrdersByUserId(req);
        res.json(orders);
    },

    async findAllOrders(req, res) {
        const orders = await service.findAllOrders(req);
        res.json(orders);
    },
};
