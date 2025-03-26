const service = require("./account.service")
const userService = require("../user/user.service")

module.exports = {
    async getProfile(req, res) {
        const user = await userService.getUserById(req.user.id);
        // const user = await service.getProfile(req.user.id);
        return res.status(201).json(user);
    },
};
