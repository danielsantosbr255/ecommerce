const { z } = require("zod");

const msg = {
    email: "E-mail inválido",
    required: "Campo Obrigatório",
    partial_error: "Dados Inválidos!",
    minLength: (num) => `Deve ter pelo menos ${num} caracteres`,
};

const role = z.string().optional();
const name = z.string().min(2, msg.minLength(2)).optional();
const email = z.string().email(msg.email).optional();
const password = z.string().min(5, msg.minLength(5)).optional();

module.exports = {
    signUp(data) {
        return z.object({ name, email, password }).parse(data);
    },

    signIn(data) {
        return z.object({ email, password }).parse(data);
    },

    update(data) {
        let result = z.object({ name, email, password, role }).partial();
        result = result.refine((data) => Object.keys(data).length > 0, { message: msg.partial });
        return result.parse(data);
    },

    updateProfile(data) {
        let result = z.object({ name, email, password }).partial();
        result = result.refine((data) => Object.keys(data).length > 0, { message: msg.partial });
        return result.parse(data);
    },
};
