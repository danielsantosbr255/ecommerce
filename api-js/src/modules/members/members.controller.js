const service = require("./members.service");
const CustomError = require("../../common/utils/CustomError");

class MemberController {
  constructor() {
    this.service = service;
  }

  create = async (req, res) => {
    if (!req.ability.can("manage", "Member")) throw new CustomError("Acesso negado!", 403);

    const member = await this.service.create(req.body);
    res.status(201).json(member);
  };

  getAll = async (req, res) => {
    const members = await this.service.getAll();
    res.status(200).json(members);
  };

  getById = async (req, res) => {
    const { userId, roleId } = req.params;
    if (!req.ability.can("manage", "Member")) throw new CustomError("Acesso negado!", 403);

    const member = await this.service.getById({ userId, roleId: parseInt(roleId) });
    res.status(200).json(member);
  };

  update = async (req, res) => {
    const { userId, roleId } = req.params;
    if (!req.ability.can("manage", "Member")) throw new CustomError("Acesso negado!", 403);

    const updatedMember = await this.service.update({ userId, roleId: parseInt(roleId) }, req.body);
    res.status(200).json(updatedMember);
  };

  remove = async (req, res) => {
    const { userId, roleId } = req.params;
    if (!req.ability.can("manage", "Member")) throw new CustomError("Acesso negado!", 403);

    await this.service.remove({ userId, roleId: parseInt(roleId) });
    res.status(200).json({ message: "Cargo deletado com sucesso" });
  };
}

module.exports = new MemberController();
