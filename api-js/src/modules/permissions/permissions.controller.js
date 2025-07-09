const service = require("./permissions.service");
const CustomError = require("../../common/utils/CustomError");

class PermissionController {
  constructor() {
    this.service = service;
  }

  create = async (req, res) => {
    if (!req.ability.can("manage", "Permission")) throw new CustomError("Acesso negado!", 403);

    const permission = await this.service.create(req.body);
    return res.status(201).json(permission);
  };

  getAll = async (req, res) => {
    if (!req.ability.can("manage", "Permission")) throw new CustomError("Acesso negado!", 403);

    const permissions = await this.service.getAll();
    return res.status(200).json(permissions);
  };

  getById = async (req, res) => {
    if (!req.ability.can("manage", "Permission")) throw new CustomError("Acesso negado!", 403);

    const permission = await this.service.getById(req.params.id);
    return res.status(200).json(permission);
  };

  update = async (req, res) => {
    if (!req.ability.can("manage", "Permission")) throw new CustomError("Acesso negado!", 403);

    const updatedPermission = await this.service.update(req.params.id, req.body);
    res.status(200).json(updatedPermission);
  };

  remove = async (req, res) => {
    if (!req.ability.can("manage", "Permission")) throw new CustomError("Acesso negado!", 403);

    await this.service.remove(req.params.id);
    return res.status(200).json({ message: "Cargo deletado com sucesso" });
  };
}

module.exports = new PermissionController();
