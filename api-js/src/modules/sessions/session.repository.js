const { accessibleBy } = require("@casl/prisma");
const { prisma } = require("../../common/database/prisma");

const getAll = (ability) => {
  return prisma.session.findMany({ where: accessibleBy(ability, "read").Session });
};

const getById = (id, ability) => {
  return prisma.session.findUnique({
    where: { id, AND: accessibleBy(ability, "read").Session },
  });
};

const update = (id, data, ability) => {
  return prisma.session.update({
    where: { id, AND: accessibleBy(ability, "update").Session },
    data,
  });
};

const deleteByAgent = ({ userId, userAgent }) => {
  return prisma.session.delete({ where: { userId_userAgent: { userId, userAgent } } });
};

const remove = (id, ability) => {
  return prisma.session.delete({
    where: { id, AND: accessibleBy(ability, "delete").Session },
  });
};

module.exports = { getAll, getById, update, deleteByAgent, remove };
