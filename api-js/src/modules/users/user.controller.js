const service = require("./user.service");
const dataValidator = require("../../common/validators/user.validator");

class UserController {
  constructor() {
    this.service = service;
  }

  getAll = async (req, res) => {
    const users = await this.service.getAll(req);
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

    const updatedUser = await this.service.update(req, id, validateData);
    res.json(updatedUser);
  };

  delete = async (req, res) => {
    const id = req.params.id === "me" ? req.user.id : req.params.id;
    const user = await this.service.delete(req, id);
    res.json({ message: "Usuário deletado com sucesso", user });
  };
}

module.exports = new UserController();
