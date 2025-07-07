const authUtil = require("../../common/utils/auth.util");
const CustomError = require("../../common/utils/CustomError");
const repository = require("./user.repository");

class UserService {
  constructor() {
    this.repository = repository;
  }

  async getAll(ability) {
    return await this.repository.getAll(ability);
  }

  async getById(ability, id) {
    const user = this.repository.getById(ability, id);
    if (!user) throw new CustomError("Usuário não encontrado", 404);
    return user;
  }

  async update(ability, id, userData) {
    let { name, email, password, role } = userData;

    const user = await this.repository.getById(ability, id);
    if (!user) throw new CustomError("Usuário não encontrado", 404);

    if (email && email !== user.email) {
      const existingEmail = await this.repository.getByEmail(email);
      if (existingEmail) throw new CustomError("Email já cadastrado.", 400);
    }

    if (password && password.length === 0) password = undefined;

    if (password && (await authUtil.verifyPassword(password, user.password))) {
      throw new CustomError("A senha não pode ser igual", 400);
    }

    if (role && role === user.role) {
      throw new CustomError(`O usuário ${user.name} já é ${role}`, 400);
    }

    const updatedUser = this.repository.update(ability, id, { name, email, password, role });

    return { message: "Usuário atualizado com sucesso", user: updatedUser };
  }

  async delete(ability, id) {
    const user = await this.repository.remove(ability, id);
    if (!user) throw new CustomError("Usuário não encontrado", 404);
    return user;
  }
}

module.exports = new UserService();
