const repository = require("./role.repository");
const CustomError = require("../../common/utils/CustomError");
const validator = require("../../common/validators/role.validator");

class RoleService {
  constructor() {
    this.repository = repository;
  }

  async create({ name, description }) {
    const existingRole = await this.repository.getByName(name);
    if (existingRole) throw new CustomError("Permissão ja cadastrada", 400);

    const validateData = validator.create({ name, description });
    return await this.repository.create(validateData);
  }

  async getAll() {
    return await this.repository.getAll();
  }

  async getById(id) {
    return await this.repository.getById(parseInt(id));
  }

  async update(id, data) {
    const role = await this.repository.getById(parseInt(id));
    if (!role) throw new CustomError("Permissão nao encontrada", 404);

    const validateData = validator.update(data);
    return await this.repository.update(role.id, validateData);
  }

  async remove(id) {
    const role = await this.repository.getById(parseInt(id));
    if (!role) throw new CustomError("Permissão nao encontrada", 404);

    return await this.repository.remove(role.id);
  }
}

module.exports = new RoleService();
