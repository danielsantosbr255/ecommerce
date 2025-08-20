const { z } = require("zod");

const msg = {
  required: "é obrigatório",
  partial: "Dados Inválidos!",
  minLength: (num) => `deve ter pelo menos ${num} caracteres`,
  minItems: (num) => `deve ter pelo menos ${num} item(s)`,
  noempty: "nao pode ser vazio",
};

const signInSchema = {
  email: z.string({ required_error: msg.required }).email(msg.invalid),
  password: z.string({ required_error: msg.required }),
};

const signUpSchema = {
  name: z.string({ required_error: msg.required }).min(3, msg.minLength(3)),
  email: z.string({ required_error: msg.required }).email(msg.invalid),
  password: z.string({ required_error: msg.required }).min(5, msg.minLength(5)),
};

const signIn = (data) => {
  return z.object(signInSchema).parse(data);
};

const signUp = (data) => {
  return z.object(signUpSchema).parse(data);
};

module.exports = { signIn, signUp };
