const repository = require("./user.repository");
const authUtil = require("../../common/utils/auth.util");
const CustomError = require("../../common/utils/CustomError");
const { buildOrder } = require("../../common/utils/filter.util");
const { getPagination, buildMeta } = require("../../common/utils/pagination.util");

class UserService {
  constructor() {
    this.repository = repository;
  }

  async getMany(query) {
    const { page, limit, skip } = getPagination(query);

    const where = query.search
      ? {
          OR: [
            { name: { contains: query.search, mode: "insensitive" } },
            { email: { contains: query.search, mode: "insensitive" } },
          ],
        }
      : {};

    const orderBy = buildOrder(query.orderBy, query.order);

    const [data, total] = await Promise.all([
      this.repository.getMany({
        where,
        skip,
        take: limit,
        orderBy: orderBy || { createdAt: "desc" },
      }),
      this.repository.count(where),
    ]);

    return {
      data,
      meta: buildMeta(total, page, limit),
    };
  }

  async getOne(ability, id) {
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
