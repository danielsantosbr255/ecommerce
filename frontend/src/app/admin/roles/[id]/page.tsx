// import RoleForm from "../_components/RoleForm";
import { roleService } from "@/services/roles";
import RolesSection from "../_components/RolesSection";
import RoleMembers from "../_components/RoleMembers";
import { permissionService } from "@/services/permissions";
import RoleForm from "../_components/RoleForm";

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const role = await roleService.getOne(parseInt(id));
  const roles = await roleService.getAll();
  const permissions = await permissionService.getAll();

  if (!role || !roles || !permissions) {
    return <div className="w-full h-full flex items-center justify-center">Cargo nao encontrado.</div>;
  }

  return (
    <main className="bg-bg-secondary w-full h-full py-4 shadow-xs border border-lines/20 rounded-2xl grid grid-cols-1 lg:grid-cols-[1fr_5fr_1fr]">
      <RolesSection roles={roles} />

      <RoleForm role={role} permissions={permissions} />

      <RoleMembers members={role.users} />
    </main>
  );
}
