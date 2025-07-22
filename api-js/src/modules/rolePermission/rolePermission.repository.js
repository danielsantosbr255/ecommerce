const { prisma } = require("../../common/database/prisma");

class RolePermissionRepository {
  constructor() {
    this.prisma = prisma;
  }

  assign = async (roleId, permissionId) => {
    return this.prisma.rolePermission.create({
      data: { roleId, permissionId },
    });
  };

  remove = async (roleId, permissionId) => {
    return this.prisma.rolePermission.delete({
      where: { roleId_permissionId: { roleId, permissionId } },
    });
  };

  getPermissionsByRole = async (roleId) => {
    const permissions = await this.prisma.rolePermission.findMany({
      where: { roleId },
      include: { permission: true },
    });
    return permissions.map((p) => p.permission);
  };
}

module.exports = new RolePermissionRepository();
