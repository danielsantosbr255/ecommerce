const { z } = require("zod");

const msg = {
  required: "é obrigatório",
  partial: "Dados Inválidos!",
  minLength: (num) => `deve ter pelo menos ${num} caracteres`,
  minItems: (num) => `deve ter pelo menos ${num} item(s)`,
  noempty: "nao pode ser vazio",
  invalidId: "ID inválido! ID deve ser um UUID",
};

const schema = {
  label: z.string().min(3, "Nome do endereço deve ter pelo menos 3 caracteres").optional().nullable(),
  street: z.string({ required_error: msg.required }).min(1, msg.minLength(1)),
  number: z.string({ required_error: msg.required }).min(1, msg.minLength(1)),
  complement: z.string().optional(),
  neighborhood: z.string({ required_error: msg.required }).min(1, msg.minLength(1)),
  city: z.string({ required_error: msg.required }).min(1, msg.minLength(1)),
  state: z.string({ required_error: msg.required }).min(1, msg.minLength(1)),
  country: z.string({ required_error: msg.required }).min(1, msg.minLength(1)),
  zipCode: z.string({ required_error: msg.required }).min(1, msg.minLength(1)),
  isDefault: z.boolean().default(false).optional(),
  userId: z.string().uuid({ message: msg.invalidId }).optional(),
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
