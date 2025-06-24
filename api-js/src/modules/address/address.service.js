const { accessibleBy } = require("@casl/prisma");
const { prisma } = require("../../common/database/prisma");
const CustomError = require("../../common/utils/CustomError");

const createAddress = async (data) => {
  const existingAddress = await prisma.address.findFirst({
    where: { userId: data.userId, isDefault: true },
  });

  if (existingAddress) {
    await prisma.address.update({
      where: { id: existingAddress.id },
      data: { isDefault: false },
    });
  }

  const address = await prisma.address.create({
    data,
    include: { user: { omit: { password: true } } },
  });

  return address;
};

const getAddresses = async (req) => {
  const address = await prisma.address.findMany({
    where: { AND: [accessibleBy(req.ability, "read").Address] },
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
