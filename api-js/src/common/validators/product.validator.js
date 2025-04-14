const { z } = require("zod");

const msg = {
  required: "Campo Obrigatório",
  partial: "Dados Inválidos!",
  minLength: (num) => `Deve ter pelo menos ${num} caracteres`,
  noempty: "Nao pode ser vazio",
};

const title = z.string({ required_error: msg.required }).min(5, msg.minLength(5));
const price = z.number({ required_error: msg.required });
const stock = z.number({ required_error: msg.required });
const image = z.string().optional();
const category = z.string().optional();
const description = z.string().min(10, msg.minLength(10)).optional();

const create = (data) => {
  return z.object({ title, price, stock, description, image, category }).parse(data);
};

const update = (data) => {
  let result = z.object({ title, price, stock, description, image, category }).partial();
  result = result.refine((data) => Object.keys(data).length > 0, { message: msg.partial });
  return result.parse(data);
};

module.exports = { create, update };
