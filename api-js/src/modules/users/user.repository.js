const { accessibleBy } = require("@casl/prisma");
const { prisma } = require("../../common/database/prisma");

const getAll = async (req) => {
  return await prisma.user.findMany({
    where: accessibleBy(req.ability, "read").User,
    omit: { password: true },
  });
};

const getById = async (req, id) => {
  return await prisma.user.findUnique({
    where: { id, AND: accessibleBy(req.ability, "read").User },
    omit: { password: true },
    include: { roles: { include: { role: { include: { permissions: { include: { permission: true } } } } } } },
  });
};

const getByEmail = async (req, email) => {
  return await prisma.user.findUnique({
    where: { email, AND: accessibleBy(req.ability, "read").User },
    omit: { password: true },
  });
};

const update = async (req, id, data) => {
  return await prisma.user.update({
    where: { id, AND: accessibleBy(req.ability, "update").User },
    data: {
      name: data.name || user.name,
      email: data.email || user.email,
      password: data.password ? await authUtil.hashPassword(data.password, 10) : user.password,
      role: role || user.role,
    },
  });
};

const remove = async (req, id) => {
  return await prisma.user.delete({
    where: { id, AND: accessibleBy(req.ability, "delete").User },
    omit: { password: true },
  });
};

const userRepository = { getAll, getById, getByEmail, update, remove };

module.exports = userRepository;
