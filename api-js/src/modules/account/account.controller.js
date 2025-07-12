const userService = require("../users/user.service");
const userDataValidator = require("../../common/validators/user.validator");

const getMyAccount = async (req, res) => {
  const user = await userService.getUserById(req.user.id);
  res.json(user);
};

const updateMyAccount = async (req, res) => {
  const validatedData = userDataValidator.updateProfile(req.body);
  const updatedUser = await userService.updateUser(req.user.id, validatedData);
  res.json(updatedUser);
};

const deleteMyAccount = async (req, res) => {
  const user = await userService.deleteUser(req.user.id);
  res.json({ message: "Conta deletada com sucesso", user });
};

module.exports = { getMyAccount, updateMyAccount, deleteMyAccount };
