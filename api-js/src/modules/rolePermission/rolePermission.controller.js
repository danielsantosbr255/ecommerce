const rolePermissionService = require("./rolePermission.service");

class UserRoleController {
  constructor() {
    this.userRoleService = userRoleService;
  }

  assignPermissionToRole = async (req, res) => {
    const { roleId, permissionId } = req.body;

    await rolePermissionService.assign(roleId, permissionId);
    res.status(201).json({ message: "Permissão atribuída ao cargo com sucesso." });
  };

  removePermissionFromRole = async (req, res) => {
    const { roleId, permissionId } = req.body;

    await rolePermissionService.remove(roleId, permissionId);
    res.status(200).json({ message: "Permissão removida do cargo com sucesso." });
  };

  getPermissionsByRole = async (req, res) => {
    const { roleId } = req.params;

    const permissions = await rolePermissionService.getPermissionsByRole(roleId);
    res.status(200).json(permissions);
  };
}

module.exports = new UserRoleController();
