const { z } = require("zod");

const msg = {
  required: "Campo Obrigatório",
  partial: "Dados Inválidos!",
  minLength: (num) => `Deve ter pelo menos ${num} caracteres`,
  invalidId: "ID do produto inválido",
  negative: "não pode ser negativo",
};

const schema = {
  id: z.string().uuid().optional(),
  quantity: z.number({ required_error: msg.required }).int().nonnegative({ message: msg.negative }),
  productId: z.string({ required_error: msg.required }).uuid({ message: msg.invalidId }),
};

const create = (data) => {
  return z.object(schema).parse(data);
};

const update = (data) => {
  let result = z.object(schema).partial();
  result = result.refine((data) => Object.keys(data).length > 0, { message: msg.partial });
  return result.parse(data);
};

const remove = (data) => {
  let result = z.object(schema).partial();
  result = result.refine((data) => Object.keys(data).length > 0, { message: msg.partial });
  return result.parse(data);
};

module.exports = { create, update, remove };
