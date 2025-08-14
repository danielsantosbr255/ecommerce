const repository = require("./session.repository");
const CustomError = require("../../common/utils/CustomError");

class SessionService {
  constructor() {
    this.repository = repository;
  }

  getAll(ability) {
    return this.repository.getAll(ability);
  }

  getOne(id, ability) {
    return this.repository.getOne(parseInt(id, 10), ability);
  }

  getByUserId(userId, ability) {
    return this.repository.getByUserId(userId, ability);
  }

  async update(id, data, ability) {
    const existingSession = await this.repository.getOne(parseInt(id, 10), ability);
    if (!existingSession) throw new CustomError("Sessão não encontrada", 404);

    return this.repository.update(id, data, ability);
  }

  async remove(id, ability) {
    const existingSession = await this.repository.getOne(parseInt(id, 10), ability);
    if (!existingSession) throw new CustomError("Sessão não encontrada", 404);

    return this.repository.remove(id, ability);
  }

  deleteByAgent({ userId, userAgent }) {
    return this.repository.deleteByAgent({ userId, userAgent });
  }
}

module.exports = new SessionService();
