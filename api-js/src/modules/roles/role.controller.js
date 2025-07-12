const service = require("./role.service");
const CustomError = require("../../common/utils/CustomError");

class RoleController {
  constructor() {
    this.service = service;
  }

  create = async (req, res) => {
    if (!req.ability.can("manage", "Role")) throw new CustomError("Acesso negado!", 403);

    const role = await this.service.create(req.body);
    res.status(201).json(role);
  };

  getAll = async (req, res) => {
    const roles = await this.service.getAll();
    res.status(200).json(roles);
  };

  getById = async (req, res) => {
    if (!req.ability.can("manage", "Role")) throw new CustomError("Acesso negado!", 403);

    const role = await this.service.getById(req.params.id);
    res.status(200).json(role);
  };

  update = async (req, res) => {
    if (!req.ability.can("manage", "Role")) throw new CustomError("Acesso negado!", 403);

    const updatedRole = await this.service.update(req.params.id, req.body);
    res.status(200).json(updatedRole);
  };

  remove = async (req, res) => {
    if (!req.ability.can("manage", "Role")) throw new CustomError("Acesso negado!", 403);

    await this.service.remove(req.params.id);
    res.status(200).json({ message: "Cargo deletado com sucesso" });
  };
}

module.exports = new RoleController();
