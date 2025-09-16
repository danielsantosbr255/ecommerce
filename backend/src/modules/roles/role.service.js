const repository = require("./role.repository");
const cache = require("../../common/utils/cache");
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
    if (cache.get("roles")) return cache.get("roles");

    const roles = await this.repository.getAll();
    cache.set("roles", roles);

    console.log("💾 Caching roles...");

    return roles;
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
