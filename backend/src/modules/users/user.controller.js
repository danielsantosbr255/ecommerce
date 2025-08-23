const service = require("./user.service");
const CustomError = require("../../common/utils/CustomError");
const { defineAbilityFor } = require("../../common/utils/ability");
const dataValidator = require("../../common/validators/user.validator");
const queryValidator = require("../../common/validators/query.validator");

class UserController {
  constructor() {
    this.service = service;
  }

  getMany = async (req, res) => {
    // if (!ability.can("read", "User")) throw new CustomError("Acesso negado!", 403);
    const query = queryValidator.users(req.query);

    const result = await this.service.getMany(query);
    res.json(result);
  };

  getOne = async (req, res) => {
    const ability = await defineAbilityFor(req.userId);
    const id = req.params.id === "me" ? req.userId : req.params.id;

    console.log("can manage: ", ability.can("manage", "User"));
    console.log("me: ", id === req.userId);

    if (!ability.can("read", "User") && id !== req.userId) {
      throw new CustomError("Acesso negado!", 403);
    }

    const user = await this.service.getOne(ability, id);
    res.json(user);
  };

  update = async (req, res) => {
    const id = req.params.id === "me" ? req.userId : req.params.id;
    const validateData = dataValidator.update(req.body);

    const updatedUser = await this.service.update(ability, id, validateData);
    res.json(updatedUser);
  };

  delete = async (req, res) => {
    const id = req.params.id === "me" ? req.userId : req.params.id;
    const user = await this.service.delete(ability, id);
    res.json({ message: "Usuário deletado com sucesso", user });
  };

  // TEST: Get a specific resource related to the user
  getResource = async (req, res) => {
    if (!ability.can("read", "User")) throw new CustomError("Acesso negado!", 403);
    const id = req.params.id === "me" ? req.userId : req.params.id;

    const user = await this.service.getResource(id, req.query);
    res.json(user);
  };
}

module.exports = new UserController();
