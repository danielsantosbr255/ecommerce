const service = require("./session.service");

class SessionController {
  constructor() {
    this.service = service;
  }

  getAll = async (req, res) => {
    const sessions = await this.service.getAll(req.ability);
    res.json(sessions);
  };

  getOne = async (req, res) => {
    const session = await this.service.getOne(req.params.id, req.ability);
    res.json(session);
  };

  getByUserId = async (req, res) => {
    const id = req.params.id === "me" ? req.user.id : req.params.id;
    const sessions = await this.service.getByUserId(id, req.ability);
    res.json(sessions);
  };

  update = async (req, res) => {
    const session = await this.service.update(req.params.id, req.body, req.ability);
    res.json({ message: "Sessão atualizada com sucesso", session });
  };

  remove = async (req, res) => {
    const session = await this.service.remove(req.params.id, req.ability);
    res.json({ message: "Sessão deletada com sucesso", session });
  };
}

module.exports = new SessionController();
