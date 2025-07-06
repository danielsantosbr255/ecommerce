const repository = require("./permissions.repository");
const CustomError = require("../../common/utils/CustomError");
const validator = require("../../common/validators/permission.validator");

const create = async ({ action, subject, description }) => {
  const existingPermission = await repository.getByActionAndSubject(action, subject);
  if (existingPermission) throw new CustomError("Permissão ja cadastrada", 400);

  const validateData = validator.create({ action, subject, description });
  return await repository.create(validateData);
};

const getAll = async () => {
  return await repository.getAll();
};

const getById = async (id) => {
  return await repository.getById(Number(id));
};

const update = async (id, { action, subject, description }) => {
  const permission = await repository.getById(Number(id));
  if (!permission) throw new CustomError("Permissão nao encontrada", 404);

  const validateData = validator.update({ action, subject, description });
  return await repository.update(permission.id, validateData);
};

const remove = async (id) => {
  const permission = await repository.getById(Number(id));
  if (!permission) throw new CustomError("Permissão nao encontrada", 404);

  return await repository.remove(permission.id);
};

module.exports = { create, getAll, getById, update, remove };
