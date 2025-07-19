const repository = require("./members.repository");
const CustomError = require("../../common/utils/CustomError");
const validator = require("../../common/validators/member.validator");

class MemberService {
  constructor() {
    this.repository = repository;
  }

  async create({ userId, roleId }) {
    const existingMember = await this.repository.getById({ userId, roleId });
    if (existingMember) throw new CustomError("Membro ja cadastrado", 422);

    const validateData = validator.create({ userId, roleId });
    return await this.repository.create(validateData);
  }

  async getAll() {
    return await this.repository.getAll();
  }

  async getById({ userId, roleId }) {
    return await this.repository.getById({ userId, roleId });
  }

  async update({ userId, roleId }, data) {
    const member = await this.repository.getById({ userId, roleId });
    if (!member) throw new CustomError("Membro nao encontrado", 404);

    const validateData = validator.update(data);
    return await this.repository.update({ userId, roleId }, validateData);
  }

  async remove({ userId, roleId }) {
    const member = await this.repository.getById({ userId, roleId });
    if (!member) throw new CustomError("Membro nao encontrado", 404);

    return await this.repository.remove({ userId, roleId });
  }
}

module.exports = new MemberService();
