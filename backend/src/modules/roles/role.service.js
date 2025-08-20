const repository = require("./role.repository");
const CustomError = require("../../common/utils/CustomError");
const validator = require("../../common/validators/role.validator");

class RoleService {
  constructor() {
    this.repository = repository;
  }

  async create(data) {
    const validateData = validator.create(data);
    return await this.repository.create(validateData);
  }

  async getAll() {
    return await this.repository.getAll();
  }

  async getOne(id) {
    return await this.repository.getOne(parseInt(id));
  }

  async update(id, data) {
    const role = await this.repository.getOne(parseInt(id));
    if (!role) throw new CustomError("Cargo nao encontrado", 404);

    const validateData = validator.update(data);

    if (validateData.permissions) {
      validateData.permissions = {
        deleteMany: {},
        create: validateData.permissions.map((pid) => ({ permission: { connect: { id: pid } } })),
      };
    }

    if (validateData.users) {
      validateData.users = {
        deleteMany: {},
        create: validateData.users.map((userId) => ({ user: { connect: { id: userId } } })),
      };
    }

    return await this.repository.update(role.id, validateData);
  }

  async remove(id) {
    const role = await this.repository.getOne(parseInt(id));
    if (!role) throw new CustomError("Cargo nao encontrado", 404);

    return await this.repository.remove(role.id);
  }
}

module.exports = new RoleService();
