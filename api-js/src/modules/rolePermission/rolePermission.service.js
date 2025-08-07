const roleRepository = require("../roles/role.repository");
const repository = require("./rolePermission.repository");

class UserRoleController {
  constructor() {
    this.repository = repository;
  }

  assignPermissionToRole = async ({ roleId, permissionId }) => {
    const role = await roleRepository.getOne(roleId);

    if (!role) throw new CustomError("Cargo nao encontrado", 404);

    return await this.repository.assign(roleId, permissionId);
  };

  removePermissionFromRole = async ({ roleId, permissionId }) => {
    const { roleId, permissionId } = req.body;
    return await this.repository.remove(roleId, permissionId);
  };

  getPermissionsByRole = async ({ roleId }) => {
    const { roleId } = req.params;
    return await this.repository.getPermissionsByRole(roleId);
  };
}

module.exports = new UserRoleController();
