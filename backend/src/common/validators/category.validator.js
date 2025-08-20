const { z } = require("zod");

const msg = {
  required: "é obrigatório",
  partial: "Dados Inválidos!",
  minLength: (num) => `deve ter pelo menos ${num} caracteres`,
  minItems: (num) => `deve ter pelo menos ${num} item(s)`,
  noempty: "nao pode ser vazio",
  invalidId: "ID do produto inválido",
};

const schema = {
  name: z.string({ required_error: msg.required }).min(1, msg.minLength(1)),
  slug: z.string({ required_error: msg.required }).min(1, msg.minLength(1)),
  image: z.string().url({ message: "URL inválida." }),
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
