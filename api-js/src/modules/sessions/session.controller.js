const CustomError = require("../../common/utils/CustomError");
const service = require("./session.service");

const getAll = async (req, res) => {
  const sessions = await service.getAll(req.ability);
  res.json(sessions);
};

const getById = async (req, res) => {
  const sessionId = parseInt(req.params.id, 10);
  const session = await service.getById(sessionId, req.ability);

  if (!session) throw new CustomError("Sessão não encontrada", 404);
  res.json(session);
};

const update = async (req, res) => {
  const sessionId = parseInt(req.params.id, 10);

  const existingSession = await service.getById(sessionId, req.ability);
  if (!existingSession) throw new CustomError("Sessão não encontrada", 404);

  const session = await service.update(sessionId, req.body, req.ability);
  res.json({ message: "Sessão atualizada com sucesso", session });
};

const remove = async (req, res) => {
  const sessionId = parseInt(req.params.id, 10);

  const existingSession = await service.getById(sessionId, req.ability);
  if (!existingSession) throw new CustomError("Sessão não encontrada", 404);

  const session = await service.remove(sessionId, req.ability);
  res.json({ message: "Sessão deletada com sucesso", session });
};

module.exports = { getAll, getById, update, remove };
