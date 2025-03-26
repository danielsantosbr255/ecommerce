const UserService = require("./user.service");

class UserController {
    static register = async (req, res) => {
        const { name, email, password } = req.body;
        const response = await UserService.create(name, email, password);

        res.status(201).json(response);
    };

    static login = async (req, res) => {
        const { email, password } = req.body;
        const response = await UserService.signIn(email, password);

        res.status(200).json(response);
    };

    static getProfile = async (req, res) => {
        const user = await UserService.getById(req.user.id);
        res.json(user);
    };

    static updateProfile = async (req, res) => {
        const { name, email, password } = req.body;
        const updatedUser = await UserService.update(req.user.id, name, email, password);
        res.json(updatedUser);
    };

    static deleteProfile = async (req, res) => {
        const response = await UserService.remove(req.user.id);
        res.json(response);
    };
}

module.exports = UserController;
