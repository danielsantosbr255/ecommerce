const { prisma } = require("../src/common/database/prisma");
const authUtil = require("../src/common/utils/auth.util");

async function main() {
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@email.com" },
    update: {},
    create: { email: "admin@email.com", name: "Administrador", password: await authUtil.hashPassword("gGCxU34aueNKwK") },
  });
  const sellerUser = await prisma.user.upsert({
    where: { email: "seller@email.com" },
    update: {},
    create: { email: "seller@email.com", name: "Vendedor", password: await authUtil.hashPassword("123123") },
  });
  const buyerUser = await prisma.user.upsert({
    where: { email: "buyer@email.com" },
    update: {},
    create: { email: "buyer@email.com", name: "Comprador", password: await authUtil.hashPassword("123123") },
  });

  const adminRole = await prisma.role.create({ data: { name: "admin", description: "Administrador completo do sistema" } });
  const sellerRole = await prisma.role.create({ data: { name: "seller", description: "Pode criar e atualizar dados" } });

  // #region | Criar Permissões
  const manageAllPermission = await prisma.permission.create({
    data: {
      action: "manage",
      subject: "all",
      description: "Gerenciar todas as ações em todos os sujeitos",
    },
  });
  const manageUserPermission = await prisma.permission.create({
    data: {
      action: "manage",
      subject: "User",
      description: "Gerenciar usuários",
    },
  });
  const manageProductPermission = await prisma.permission.create({
    data: {
      action: "manage",
      subject: "Product",
      description: "Gerenciar produtos",
    },
  });
  const manageAddressesPermission = await prisma.permission.create({
    data: {
      action: "manage",
      subject: "Address",
      description: "Gerenciar endereços",
    },
  });
  const manageOrderPermission = await prisma.permission.create({
    data: {
      action: "manage",
      subject: "Order",
      description: "Gerenciar pedidos",
    },
  });
  // #endregion

  // #region | Atribuir Permissões aos Roles
  await prisma.rolePermission.createMany({
    data: [
      { roleId: adminRole.id, permissionId: manageAllPermission.id }, // Admin: Pode gerenciar tudo
      { roleId: sellerRole.id, permissionId: manageOrderPermission.id },
      { roleId: sellerRole.id, permissionId: manageProductPermission.id },
    ],
  });

  await prisma.userRole.createMany({
    data: [
      { userId: adminUser.id, roleId: adminRole.id },
      { userId: sellerUser.id, roleId: sellerRole.id },
    ],
  });
  // #endregion

  // #region | Criar Endereços
  const adminAddress = await prisma.address.create({
    data: {
      label: "Endereço Admin",
      street: "Rua Admin",
      number: "123",
      neighborhood: "Bairro Admin",
      city: "Cidade Admin",
      state: "SP",
      country: "Brasil",
      zipCode: "00000-000",
      userId: adminUser.id,
    },
  });
  const sellerAddress = await prisma.address.create({
    data: {
      label: "Endereço Vendedor",
      street: "Avenida Vendedor",
      number: "456",
      neighborhood: "Bairro Vendedor",
      city: "Cidade Vendedor",
      state: "RJ",
      country: "Brasil",
      zipCode: "11111-111",
      userId: sellerUser.id,
    },
  });
  await prisma.address.create({
    data: {
      label: "Endereço Comprador",
      street: "Rua Comprador",
      number: "789",
      neighborhood: "Bairro Comprador",
      city: "Cidade Comprador",
      state: "MG",
      country: "Brasil",
      zipCode: "22222-222",
      userId: buyerUser.id,
    },
  });
  // #endregion

  console.log("Seed de dados concluído!");
  console.log("Admin User ID:", adminUser.id);
  console.log("Vendedor User ID:", sellerUser.id);
  console.log("Admin Address ID:", adminAddress.id);
  console.log("Vendedor Address ID:", sellerAddress.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
