const service = require("./permissions.service");
const CustomError = require("../../common/utils/CustomError");

const create = async (req, res) => {
  if (!req.ability.can("manage", "Permission")) throw new CustomError("Acesso negado!", 403);

  const permission = await service.create(req.body);
  return res.status(201).json(permission);
};

const getAll = async (req, res) => {
  if (!req.ability.can("manage", "Permission")) throw new CustomError("Acesso negado!", 403);
  
  const permissions = await service.getAll();
  return res.status(200).json(permissions);
};

const getById = async (req, res) => {
  if (!req.ability.can("manage", "Permission")) throw new CustomError("Acesso negado!", 403);

  const permission = await service.getById(req.params.id);
  return res.status(200).json(permission);
};

const update = async (req, res) => {
  if (!req.ability.can("manage", "Permission")) throw new CustomError("Acesso negado!", 403);

  const updatedPermission = await service.update(req.params.id, req.body);
  res.status(200).json(updatedPermission);
};

const remove = async (req, res) => {
  if (!req.ability.can("manage", "Permission")) throw new CustomError("Acesso negado!", 403);

  await service.remove(req.params.id);
  return res.status(200).json({ message: "Cargo deletado com sucesso" });
};

module.exports = { create, getAll, getById, update, remove };
