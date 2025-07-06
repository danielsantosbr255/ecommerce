const repository = require("./role.repository");
const CustomError = require("../../common/utils/CustomError");
const validator = require("../../common/validators/role.validator");

const create = async ({ name, description }) => {
  const existingRole = await repository.getByName(name);
  if (existingRole) throw new CustomError("Permissão ja cadastrada", 400);

  const validateData = validator.create({ name, description });
  return await repository.create(validateData);
};

const getAll = async () => {
  return await repository.getAll();
};

const getById = async (id) => {
  return await repository.getById(Number(id));
};

const update = async (id, data) => {
  const role = await repository.getById(Number(id));
  if (!role) throw new CustomError("Permissão nao encontrada", 404);

  const validateData = validator.update(data);
  return await repository.update(role.id, validateData);
};

const remove = async (id) => {
  const role = await repository.getById(Number(id));
  if (!role) throw new CustomError("Permissão nao encontrada", 404);

  return await repository.remove(role.id);
};

module.exports = { create, getAll, getById, update, remove };
