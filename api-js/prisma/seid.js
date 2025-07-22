const { prisma } = require("../src/common/database/prisma");
const authUtil = require("../src/common/utils/auth.util");

async function main() {
  //#region | Criar Usuários
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
  //#endregion

  // #region | Criar Permissões
  const manageAllPermission = await prisma.permission.create({
    data: {
      action: "manage",
      subject: "all",
      description:
        "Permissão total: permite ao usuário acessar, criar, editar e excluir qualquer recurso do sistema, sem restrições.",
    },
  });
  const manageUserPermission = await prisma.permission.create({
    data: {
      action: "manage",
      subject: "User",
      description:
        "Permite gerenciar usuários: criar, visualizar, editar e remover contas de outros membros, além de alterar suas permissões e funções.",
    },
  });
  const manageProductPermission = await prisma.permission.create({
    data: {
      action: "manage",
      subject: "Product",
      description:
        "Permite gerenciar produtos: cadastrar novos produtos, editar informações, alterar preços, atualizar estoque e remover produtos do catálogo.",
    },
  });
  const manageAddressesPermission = await prisma.permission.create({
    data: {
      action: "manage",
      subject: "Address",
      description:
        "Permite gerenciar endereços: adicionar, editar e remover endereços associados a usuários ou pedidos no sistema.",
    },
  });
  const manageOrderPermission = await prisma.permission.create({
    data: {
      action: "manage",
      subject: "Order",
      description:
        "Permite gerenciar pedidos: criar, visualizar, atualizar status, editar detalhes e cancelar pedidos realizados na plataforma.",
    },
  });
  // #endregion

  // #region | Atribuir Permissões aos Roles
  const adminRole = await prisma.role.upsert({
    where: { name: "admin" },
    update: { permissions: { set: manageAllPermission.map((p) => ({ id: p.id })) } },
    create: {
      name: "admin",
      description: "Acesso total ao sistema",
      permissions: {
        connect: manageAllPermission.map((p) => ({ id: p.id })),
      },
    },
  });

  const sellerRole = await prisma.role.upsert({
    where: { name: "seller" },
    update: { permissions: { set: manageProductPermission.map((p) => ({ id: p.id })) } },
    create: {
      name: "seller",
      description: "Gerente da loja com acesso a produtos e pedidos",
      permissions: {
        connect: manageProductPermission.map((p) => ({ id: p.id })),
      },
    },
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
