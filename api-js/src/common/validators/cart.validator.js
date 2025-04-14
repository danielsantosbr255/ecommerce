const { z } = require("zod");

const msg = {
    required: "Campo Obrigatório",
    partial: "Dados Inválidos!",
    minLength: (num) => `Deve ter pelo menos ${num} caracteres`,
};

const quantity = z.number({ required_error: msg.required });
const productId = z.string({ required_error: msg.required });

module.exports = {
    create(data) {
        return z.object({ productId, quantity }).parse(data);
    },

    update(data) {
        return z.object({ quantity }).parse(data);
    },

    delete(data) {
        return z.object({ productId }).parse(data);
    },
};
