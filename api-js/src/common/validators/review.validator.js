const { z } = require("zod");

const msg = {
  required: "Campo Obrigatório",
  partial: "Dados Inválidos!",
  minLength: (num) => `Deve ter pelo menos ${num} caracteres`,
  noempty: "Nao pode ser vazio",
};

const schema = {
  rating: z.number({ required_error: msg.required }).min(1).max(5),
  comment: z.string({ required_error: msg.required }).min(10, msg.minLength(10)),
  userId: z.string({ required_error: msg.required }),
  productId: z.string({ required_error: msg.required }).min(1, msg.minLength(1)),
};

const create = (data) => {
  return z.object(schema).parse(data);
};

const update = (data) => {
  let result = z.object(schema).partial();
  result = result.refine((data) => Object.keys(data).length > 0, { message: msg.partial });
  return result.parse(data);
};

module.exports = { create, update };
