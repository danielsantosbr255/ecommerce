const { accessibleBy } = require("@casl/prisma");
const { prisma } = require("../../common/database/prisma");
const CustomError = require("../../common/utils/CustomError");

const createAddress = async (data) => {
  const address = await prisma.address.upsert({
    where: { userId: data.userId, isDefault: true },
    update: { ...data, isDefault: true },
    create: { ...data, isDefault: true },
    include: { user: { omit: { password: true } } },
  });

  return address;
};

const getAddresses = async (ability) => {
  console.log("🚨 MD - ability: ", accessibleBy(ability).Address);

  const address = await prisma.address.findMany({
    where: accessibleBy(ability).Address,
    include: { user: { omit: { password: true } } },
  });
  return address;
};

const getAddressById = async (req, id) => {
  const address = await prisma.address.findUnique({
    where: { id, AND: accessibleBy(req.ability, "read").Address },
    include: { user: { omit: { password: true } } },
  });

  if (!address) throw new CustomError("Endereço não encontrado", 404);

  return address;
};

const updateAddress = async (req, id, data) => {
  const address = await prisma.address.findUnique({
    where: { id, AND: accessibleBy(req.ability, "read").Address },
  });

  if (!address) throw new CustomError("Endereço não encontrado", 404);

  const updatedAddress = await prisma.address.update({
    where: { id, AND: accessibleBy(req.ability, "update").Address },
    data,
    include: { user: { omit: { password: true } } },
  });

  return updatedAddress;
};

const deleteAddress = async (req, id) => {
  const address = await prisma.address.delete({
    where: { id, AND: accessibleBy(req.ability, "delete").Address },
  });

  if (!address) throw new CustomError("Endereço não encontrado", 404);
  return address;
};

module.exports = { createAddress, getAddresses, getAddressById, updateAddress, deleteAddress };
