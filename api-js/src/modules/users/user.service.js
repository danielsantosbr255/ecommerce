const authUtil = require("../../common/utils/auth.util");
const { prisma } = require("../../common/database/prisma");
const CustomError = require("../../common/utils/CustomError");
const userRepository = require("./user.repository");

const getUsers = async (req) => {
  return await userRepository.getAll(req);
};

const getUserById = async (req, id) => {
  const user = userRepository.getById(req, id);
  if (!user) throw new CustomError("Usuário não encontrado", 404);
  return user;
};

const updateUser = async (req, id, userData) => {
  let { name, email, password, role } = userData;

  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) throw new CustomError("Usuário não encontrado", 404);

  if (email && email !== user.email) {
    const existingEmail = await userRepository.getByEmail(email);
    if (existingEmail) throw new CustomError("Email já cadastrado.", 400);
  }

  if (password && password.length === 0) password = undefined;

  if (password && (await authUtil.verifyPassword(password, user.password))) {
    throw new CustomError("A senha não pode ser igual", 400);
  }

  if (role && role === user.role) {
    throw new CustomError(`O usuário ${user.name} já é ${role}`, 400);
  }

  const updatedUser = userRepository.update(req, id, { name, email, password, role });

  return { message: "Usuário atualizado com sucesso", user: updatedUser };
};

const deleteUser = async (req, id) => {
  const user = await userRepository.remove(req, id);
  if (!user) throw new CustomError("Usuário não encontrado", 404);
  return user;
};

module.exports = { getUsers, getUserById, updateUser, deleteUser };
