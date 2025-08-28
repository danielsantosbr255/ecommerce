const { AbilityBuilder } = require("@casl/ability");
const { createPrismaAbility } = require("@casl/prisma");

/**
 * @param {{ id: string, roles: string[] }} user
 * @param {{ name: string, permissions: { permission: { action: string, subject: string } }[] }[]} roles
 * @return {import("@casl/ability").Ability}
 */
function defineAbilityFor(user, roles) {
  const { can, build } = new AbilityBuilder(createPrismaAbility);

  if (!user) return build();

  user.roles.forEach((ur) => {
    const role = roles.find((r) => r.name === ur);
    const rolePermissions = role.permissions.map((p) => p.permission);
    rolePermissions.forEach((permission) => can(permission.action, permission.subject));
  });

  can("read", "Order", { userId: user.id });
  can("manage", "User", { id: user.id });
  can("manage", "Address", { userId: user.id });
  can("manage", "Session", { userId: user.id });
  can("manage", "Review", { userId: user.id });
  can("manage", "Cart", { userId: user.id });

  return build();
}

module.exports = { defineAbilityFor };
