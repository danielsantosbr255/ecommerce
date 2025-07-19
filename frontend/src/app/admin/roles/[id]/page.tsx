import RoleForm from "../_components/RoleForm";
import { roleService } from "@/services/roles";
import RolesSection from "../_components/RolesSection";
import RoleMembers from "../_components/RoleMembers";
import { permissionService } from "@/services/permissions";
import Permissions from "../_components/Permissions";

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const role = await roleService.getOne(id);
  const roles = await roleService.getAll();
  const permissions = await permissionService.getAll();

  if (!role) {
    return <div className="w-full h-full flex items-center justify-center">Cargo nao encontrado.</div>;
  }

  return (
    <main className="w-full h-full grid grid-cols-1 lg:grid-cols-[1fr_5fr_1fr] gap-2">
      <RolesSection roles={roles} />

      <section className="bg-bg-secondary flex flex-col gap-6 p-6 shadow-xs rounded-2xl">
        <div className="flex flex-col gap-3">
          <h1 className="font-semibold">Editar cargo</h1>
          <RoleForm role={role} />
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-semibold">Permissoes</h2>
          <Permissions permissions={permissions} />
        </div>
      </section>

      <RoleMembers members={role.users} />
    </main>
  );
}
