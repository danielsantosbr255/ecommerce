const { AbilityBuilder } = require("@casl/ability");
const { createPrismaAbility, accessibleBy } = require("@casl/prisma");

const rolePermissionMap = {
  ADMIN: (user, { can }) => {
    can("manage", "all");
  },

  USER: (user, { can }) => {
    can("read", "Product");
    can("read", "Order", { userId: user.id });
    can("manage", "User", { id: user.id });
    can("manage", "Address", { userId: user.id });
    can("manage", "Session", { userId: user.id });
  },
};

const defineAbilitiesFor = (user) => {
  const { can, cannot, build } = new AbilityBuilder(createPrismaAbility);

  if (rolePermissionMap[user.role]) {
    rolePermissionMap[user.role](user, { can, cannot });
  }
  return build();
};

module.exports = { defineAbilitiesFor, accessibleBy };
