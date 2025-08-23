const service = require("./address.service");
const dataValidator = require("../../common/validators/address.validator");

class AddressController {
  constructor() {
    this.service = service;
  }

  create = async (req, res) => {
    const validateData = dataValidator.create({ ...req.body, userId: req.userId });
    const address = await this.service.create(validateData);
    res.json(address);
  };

  getAll = async (req, res) => {
    const addresses = await this.service.getAll(req.ability);
    res.json(addresses);
  };

  getById = async (req, res) => {
    const address = await this.service.getById(req.ability, req.params.id);
    res.json(address);
  };

  update = async (req, res) => {
    const validateData = dataValidator.update(req.body);
    const updatedAddress = await this.service.update(req.ability, req.params.id, validateData);
    res.json(updatedAddress);
  };

  remove = async (req, res) => {
    const address = await this.service.remove(req.ability, req.params.id);
    res.json({ message: "Endereço deletado com sucesso", address });
  };
}

module.exports = new AddressController();
