const services = require("./products.service");
const validator = require("../../common/validators/product.validator");

module.exports = {
    async getProducts(req, res) {
        const products = await services.getProducts();
        return res.json(products);
    },

    async createProduct(req, res) {
        const validatedData = validator.create(req.body);
        const product = await services.createProduct(validatedData);
        return res.status(201).json(product);
    },

    async getProductById(req, res) {
        const product = await services.getProductById(req.params.id);
        return res.json(product);
    },

    async updateProduct(req, res) {
        const validatedData = validator.update(req.body);
        const updatedProduct = await services.updateProduct(req.params.id, validatedData);
        return res.json(updatedProduct);
    },

    async deleteProduct(req, res) {
        const product = await services.deleteProduct(req.params.id);
        return res.json(product);
    },
};
