const { AbilityBuilder } = require("@casl/ability");
const { createPrismaAbility } = require("@casl/prisma");
const { prisma } = require("../database/prisma");

async function defineAbilityFor(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { roles: { include: { role: { include: { permissions: { include: { permission: true } } } } } } },
  });

  const { can, build } = new AbilityBuilder(createPrismaAbility);

  if (user) {
    const roles = user.roles.map((ur) => ({ ...ur.role, permissions: ur.role.permissions }));

    roles.forEach((role) => {
      role.permissions.forEach((rp) => {
        const { action, subject } = rp.permission;
        can(action, subject);
      });
    });

    can("read", "Order", { userId: user.id });
    can("manage", "User", { id: user.id });
    can("manage", "Address", { userId: user.id });
    can("manage", "Session", { userId: user.id });
    can("manage", "Review", { userId: user.id });
    can("manage", "Cart", { userId: user.id });
  }

  return build();
}

module.exports = { defineAbilityFor };
