const service = require("./user.service");
const dataValidator = require("../../common/validators/user.validator");

class UserController {
  constructor() {
    this.service = service;
  }

  getAll = async (req, res) => {
    const users = await this.service.getAll(req.ability);
    res.json(users);
  };

  getById = async (req, res) => {
    const id = req.params.id === "me" ? req.user.id : req.params.id;
    const user = await this.service.getById(req.ability, id);
    res.json(user);
  };

  update = async (req, res) => {
    const id = req.params.id === "me" ? req.user.id : req.params.id;
    const validateData = dataValidator.update(req.body);

    const updatedUser = await this.service.update(req.ability, id, validateData);
    res.json(updatedUser);
  };

  delete = async (req, res) => {
    const id = req.params.id === "me" ? req.user.id : req.params.id;
    const user = await this.service.delete(req.ability, id);
    res.json({ message: "Usuário deletado com sucesso", user });
  };

  assignRoleToUser = async(userId, roleId) => {
    // Reutiliza a lógica do serviço de roles para manter a consistência
    return rolesService.assignUserToRole(roleId, userId);
  };
}

module.exports = new UserController();
