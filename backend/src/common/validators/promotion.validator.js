const { z, string } = require("zod");

const msg = {
  required: "é obrigatório",
  partial: "Dados Inválidos!",
  minLength: (num) => `deve ter pelo menos ${num} caracteres`,
  minItems: (num) => `deve ter pelo menos ${num} item(s)`,
  noempty: "nao pode ser vazio",
  invalidId: "ID do produto inválido",
};

const title = z.string({ required_error: msg.required }).min(5, msg.minLength(5));
const description = z.string().min(10, msg.minLength(10));
const discount = z.number({ required_error: msg.required });
const isActive = z.boolean({ required_error: msg.required }).optional().default(true);
const startsAt = z.string().datetime({ message: "Data de início inválida." });
const endsAt = z.string().datetime({ message: "Data de término inválida." });
const products = z
  .array(string().uuid({ message: msg.invalidId }), { required_error: msg.required })
  .min(1, { message: msg.minItems(1) });

const create = (data) => {
  return z.object({ title, description, discount, isActive, startsAt, endsAt, products }).parse(data);
};

const update = (data) => {
  let result = z.object({ title, description, discount, isActive, startsAt, endsAt, products }).partial();
  result = result.refine((data) => Object.keys(data).length > 0, { message: msg.partial });
  return result.parse(data);
};

module.exports = { create, update };
