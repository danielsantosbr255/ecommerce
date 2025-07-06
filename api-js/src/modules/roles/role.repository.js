const { prisma } = require("../../common/database/prisma");

const create = async (data) => {
  return await prisma.role.create({ data });
};

const getAll = async () => {
  return await prisma.role.findMany();
};

const getById = async (id) => {
  return await prisma.role.findUnique({ where: { id } });
};

const getByName = async (name) => {
  return await prisma.role.findUnique({ where: { name } });
};

const update = async (id, data) => {
  return await prisma.role.update({ where: { id }, data });
};

const remove = async (id) => {
  return await prisma.role.delete({ where: { id } });
};

module.exports = { create, getAll, getById, getByName, update, remove };
