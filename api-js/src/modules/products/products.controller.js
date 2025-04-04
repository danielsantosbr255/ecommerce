const services = require("./products.service");

module.exports = {
    async getProducts(req, res) {
        const products = await services.getProducts();
        return res.json(products);
    },

    async createProduct(req, res) {
        const product = await services.createProduct(req);
        return res.status(201).json(product);
    },

    async getProductById(req, res) {
        const product = await services.getProductById(req.params.id);
        return res.json(product);
    },

    async updateProduct(req, res) {
        const updatedProduct = await services.updateProduct(req);
        return res.json(updatedProduct);
    },

    async deleteProduct(req, res) {
        const product = await services.deleteProduct(req);
        return res.json(product);
    },
};
