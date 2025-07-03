const service = require("./address.service");
const dataValidator = require("../../common/validators/address.validator");

const createAddress = async (req, res) => {
  const validateData = dataValidator.create({ ...req.body, userId: req.user.id });
  const address = await service.createAddress(validateData);
  return res.json(address);
};

const getAddresses = async (req, res) => {
  const addresses = await service.getAddresses(req.ability);
  return res.json(addresses);
};

const getAddressById = async (req, res) => {
  const address = await service.getAddressById(req, req.params.id);
  return res.json(address);
};

const updateAddress = async (req, res) => {
  const validateData = dataValidator.update(req.body);
  const updatedAddress = await service.updateAddress(req, req.params.id, validateData);
  return res.json(updatedAddress);
};

const deleteAddress = async (req, res) => {
  const address = await service.deleteAddress(req, req.params.id);
  return res.json({ message: "Endereço deletado com sucesso", address });
};

module.exports = { createAddress, getAddresses, getAddressById, updateAddress, deleteAddress };
