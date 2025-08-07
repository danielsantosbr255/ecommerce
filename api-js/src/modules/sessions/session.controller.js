const CustomError = require("../../common/utils/CustomError");
const service = require("./session.service");

class SessionController {
  constructor() {
    this.service = service;
  }

  getAll = async (req, res) => {
    const sessions = await this.service.getAll(req.ability);
    res.json(sessions);
  };

  getById = async (req, res) => {
    const sessionId = parseInt(req.params.id, 10);
    const session = await this.service.getById(sessionId, req.ability);

    if (!session) throw new CustomError("Sessão não encontrada", 404);
    res.json(session);
  };

  update = async (req, res) => {
    const sessionId = parseInt(req.params.id, 10);

    const existingSession = await this.service.getById(sessionId, req.ability);
    if (!existingSession) throw new CustomError("Sessão não encontrada", 404);

    const session = await this.service.update(sessionId, req.body, req.ability);
    res.json({ message: "Sessão atualizada com sucesso", session });
  };

  remove = async (req, res) => {
    const sessionId = parseInt(req.params.id, 10);

    const existingSession = await this.service.getById(sessionId, req.ability);
    if (!existingSession) throw new CustomError("Sessão não encontrada", 404);

    const session = await this.service.remove(sessionId, req.ability);
    res.json({ message: "Sessão deletada com sucesso", session });
  };
}

module.exports = new SessionController();
