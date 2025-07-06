const service = require("./role.service");
const CustomError = require("../../common/utils/CustomError");

const create = async (req, res) => {
  if (!req.ability.can("manage", "Role")) throw new CustomError("Acesso negado!", 403);

  const role = await service.create(req.body);
  return res.status(201).json(role);
};

const getAll = async (req, res) => {
  const roles = await service.getAll();
  return res.status(200).json(roles);
};

const getById = async (req, res) => {
  if (!req.ability.can("manage", "Role")) throw new CustomError("Acesso negado!", 403);

  const role = await service.getById(req.params.id);
  return res.status(200).json(role);
};

const update = async (req, res) => {
  if (!req.ability.can("manage", "Role")) throw new CustomError("Acesso negado!", 403);

  const updatedRole = await service.update(req.params.id, req.body);
  res.status(200).json(updatedRole);
};

const remove = async (req, res) => {
  if (!req.ability.can("manage", "Role")) throw new CustomError("Acesso negado!", 403);

  await service.remove(req.params.id);
  return res.status(200).json({ message: "Cargo deletado com sucesso" });
};

module.exports = { create, getAll, getById, update, remove };
