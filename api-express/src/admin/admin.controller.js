const AdminService = require("./admin.service");

class AdminController {
    static getUsers = async (req, res) => {
        const users = await AdminService.getUsers();
        res.json(users);
    };

    static getUserById = async (req, res) => {
        const user = await AdminService.getUserById(req.params.id);
        res.json(user);
    };

    static createUser = async (req, res) => {
        const newUser = await AdminService.createUser(req.body);
        res.status(201).json(newUser);
    };

    static updateUser = async (req, res) => {
        const updatedUser = await AdminService.updateUser(req.params.id, req.body);
        res.json(updatedUser);
    };

    static deleteUser = async (req, res) => {
        const response = await AdminService.deleteUser(req.params.id);
        res.json(response);
    };
}

module.exports = AdminController;
