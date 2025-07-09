const repository = require("./address.repository");
const CustomError = require("../../common/utils/CustomError");

class AddressService {
  constructor() {
    this.repository = repository;
  }

  async create(data) {
    const address = await this.repository.create(data);
    return address;
  }

  async getAll(ability) {
    this.repository.getAll(ability);
  }

  async getById(ability, id) {
    const address = await this.repository.getById(ability, id);
    if (!address) throw new CustomError("Endereço não encontrado", 404);
    return address;
  }

  async update(ability, id, data) {
    const address = await this.repository.getById(ability, id);
    if (!address) throw new CustomError("Endereço não encontrado", 404);

    return this.repository.update(ability, id, data);
  }

  async remove(ability, id) {
    const address = await this.repository.getById(ability, id);
    if (!address) throw new CustomError("Endereço não encontrado", 404);

    return this.repository.remove(ability, id);
  }
}

module.exports = new AddressService();
