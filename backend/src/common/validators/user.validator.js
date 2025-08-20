const { z } = require("zod");

const msg = {
  invalid: "inválido",
  required: "é obrigatório",
  partial: "Dados Inválidos!",
  noempty: "Nao pode ser vazio",
  minLength: (num) => `deve ter pelo menos ${num} caracteres`,
};

const role = z.string().optional();
const name = z.string({ required_error: msg.required }).min(3, msg.minLength(3));
const email = z.string({ required_error: msg.required }).email(msg.invalid);
const password = z.string({ required_error: msg.required }).min(5, msg.minLength(5));

const signUp = (data) => {
  return z.object({ name, email, password }).parse(data);
};

const signIn = (data) => {
  return z.object({ email, password }).parse(data);
};

const update = (data) => {
  let result = z.object({ name, email, password, role }).partial();
  result = result.refine((data) => Object.keys(data).length > 0, { message: msg.partial });
  return result.parse(data);
};

const updateProfile = (data) => {
  let result = z.object({ name, email, password }).partial();
  result = result.refine((data) => Object.keys(data).length > 0, { message: msg.partial });
  return result.parse(data);
};

module.exports = { signUp, signIn, update, updateProfile };
