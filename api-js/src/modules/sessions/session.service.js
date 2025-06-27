const repository = require("./session.repository");

const getAll = async (ability) => {
  return await repository.getAll(ability);
};

const getById = async (id, ability) => {
  return await repository.getById(id, ability);
};

const update = async (id, data, ability) => {
  return await repository.update(id, data, ability);
};

const remove = async (id, ability) => {
  return await repository.remove(id, ability);
};

const deleteByAgent = async ({ userId, userAgent }) => {
  return await repository.deleteByAgent({ userId, userAgent });
};

module.exports = { getAll, getById, update, remove, deleteByAgent };
