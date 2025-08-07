const repository = require("./session.repository");

class SessionService {
  constructor() {
    this.repository = repository;
  }

  getAll(ability) {
    return this.repository.getAll(ability);
  }

  getById(id, ability) {
    return this.repository.getById(id, ability);
  }

  update(id, data, ability) {
    return this.repository.update(id, data, ability);
  }

  remove(id, ability) {
    return this.repository.remove(id, ability);
  }

  deleteByAgent({ userId, userAgent }) {
    return this.repository.deleteByAgent({ userId, userAgent });
  }
}

module.exports = new SessionService();
