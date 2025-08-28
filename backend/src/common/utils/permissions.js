class Authorizer {
  /**
   * @param {{ id: string, roles: string[] }} user
   * @param {{ name: string, permissions: { action: string, subject: string }[] }[]} roles
   */

  constructor(user, roles) {
    this.user = user;
    this.roles = roles;
  }

  can = (action, subject) => {
    let hasPermission = false;

    this.user.roles.forEach((ur) => {
      const role = this.roles.find((r) => r.name === ur);
      const rolePermissions = role?.permissions?.map((p) => p.permission);

      rolePermissions?.forEach((rp) => {
        if (rp.action === "manage" && rp.subject === "all") hasPermission = true;
        if (rp.action === action && rp.subject === subject) hasPermission = true;
      });
    });

    return hasPermission;
  };

  cannot = (action, subject) => !this.can(action, subject);
}

module.exports = { Authorizer };
