const service = require("./user.service");
const dataValidator = require("../../common/validators/user.validator");
const queryValidator = require("../../common/validators/query.validator");

class UserController {
  constructor() {
    this.service = service;
  }

  getMany = async (req, res) => {
    if (!req.ability.can("read", "User")) throw new CustomError("Acesso negado!", 403);
    const query = queryValidator.users(req.query);

    const result = await this.service.getMany(query);
    res.json(result);
  };

  getOne = async (req, res) => {
    const id = req.params.id === "me" ? req.user.id : req.params.id;
    const user = await this.service.getOne(req.ability, id);
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
}

module.exports = new UserController();
