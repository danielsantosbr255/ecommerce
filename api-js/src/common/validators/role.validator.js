const { z } = require("zod");

const msg = {
  required: "é obrigatório",
  partial: "dados Inválidos!",
  noempty: "não pode ser vazio",
  minLength: (min) => `deve ter pelo menos ${min} caracteres`,
  array: "deve ser um array de IDs numéricos",
  invalidId: "ID inválido! ID deve ser um UUID",
};

const schema = {
  name: z.string({ required_error: msg.required }).min(1, msg.minLength(1)),
  description: z.string({ required_error: msg.required }).min(1, msg.minLength(1)),
  permissions: z.array(z.number()).optional(),
  users: z.array(z.string().uuid({ message: msg.invalidId })).optional(),
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
