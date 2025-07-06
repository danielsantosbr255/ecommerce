const { prisma } = require("../../common/database/prisma");

const create = async (data) => {
  return await prisma.permission.create({ data });
};

const getAll = async () => {
  return await prisma.permission.findMany();
};

const getById = async (id) => {
  return await prisma.permission.findUnique({ where: { id } });
};

const getByActionAndSubject = async (action, subject) => {
  return await prisma.permission.findUnique({ where: { action, subject } });
};

const update = async (id, data) => {
  return await prisma.permission.update({ where: { id }, data });
};

const remove = async (id) => {
  return await prisma.permission.delete({ where: { id } });
};

module.exports = { create, getAll, getById, getByActionAndSubject, update, remove };
