const { z } = require("zod");

const msg = {
  required: "Campo Obrigatório",
  partial: "Dados Inválidos!",
  minLength: (num) => `Deve ter pelo menos ${num} caracteres`,
  noempty: "Nao pode ser vazio",
};

const productSlug = z.string({ required_error: msg.required });
const rating = z.number({ required_error: msg.required });
const comment = z.string({ required_error: msg.required }).min(10, msg.minLength(10));
const userId = z.string({ required_error: msg.required });

const create = (data) => {
  return z.object({ productSlug, rating, comment, userId }).parse(data);
};

const update = (data) => {
  let result = z.object({ rating, comment, userId }).partial();
  result = result.refine((data) => Object.keys(data).length > 0, { message: msg.partial });
  return result.parse(data);
};

module.exports = { create, update };
