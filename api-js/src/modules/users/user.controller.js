const service = require("./user.service");
const dataValidator = require("../../common/validators/user.validator");

const getUsers = async (req, res) => {
  // if (!req.ability.can("read", "User")) throw new CustomError("Acesso negado!", 403);
  const users = await service.getUsers(req);
  return res.json(users);
};

const getUserById = async (req, res) => {
  const id = req.params.id === "me" ? req.user.id : req.params.id;
  const user = await service.getUserById(req, id);
  return res.json(user);
};

const updateUser = async (req, res) => {
  const id = req.params.id === "me" ? req.user.id : req.params.id;
  const validateData = dataValidator.update(req.body);

  const updatedUser = await service.updateUser(req, id, validateData);
  return res.json(updatedUser);
};

const deleteUser = async (req, res) => {
  const id = req.params.id === "me" ? req.user.id : req.params.id;
  // if (!req.ability.can("manage", "User")) throw new CustomError("Acesso negado!", 403);
  const user = await service.deleteUser(req, id);
  return res.json({ message: "Usuário deletado com sucesso", user });
};

// MY ACCOUNT
const getMyAccount = async (req, res) => {
  const user = await service.getUserById(req.user.id);
  return res.json(user);
};

const updateMyAccount = async (req, res) => {
  const validatedData = dataValidator.updateProfile(req.body);
  const updatedUser = await service.updateUser(req.user.id, validatedData);
  return res.json(updatedUser);
};

const deleteMyAccount = async (req, res) => {
  const user = await service.deleteUser(req.user.id);
  return res.json({ message: "Usuário deletado com sucesso", user });
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getMyAccount,
  updateMyAccount,
  deleteMyAccount,
};
