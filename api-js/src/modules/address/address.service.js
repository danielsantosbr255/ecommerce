const repository = require("./address.repository");
const CustomError = require("../../common/utils/CustomError");

class AddressService {
  constructor() {
    this.repository = repository;
  }

  async create(data) {
    const address = await this.repository.getByUserDefault(data.userId);
    if (address) throw new CustomError("Endereço padrão ja cadastrado", 422);
    return this.repository.create(data);
  }

  async getAll(ability) {
    return this.repository.getAll(ability);
  }

  async getById(ability, id) {
    const address = await this.repository.getOne(ability, id);
    if (!address) throw new CustomError("Endereço não encontrado", 404);
    return address;
  }

  async update(ability, id, data) {
    const address = await this.repository.getOne(ability, id);
    if (!address) throw new CustomError("Endereço não encontrado", 404);

    return this.repository.update(ability, id, data);
  }

  async remove(ability, id) {
    const address = await this.repository.getOne(ability, id);
    if (!address) throw new CustomError("Endereço não encontrado", 404);

    return this.repository.remove(ability, id);
  }
}

module.exports = new AddressService();
