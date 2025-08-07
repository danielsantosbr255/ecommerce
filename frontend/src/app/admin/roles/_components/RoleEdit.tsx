"use client";

import { roleService } from "@/services/roles";
import RoleForm from "../_components/RoleForm";
import { useQuery } from "@tanstack/react-query";
import RoleMembers from "../_components/RoleMembers";
import RolesSection from "../_components/RolesSection";
import LoadingState from "@/components/ui/LoadingState";

export default function RoleEditPage({ id }: { id: string }) {
  const { data: roles, isLoading } = useQuery({ queryKey: ["roles"], queryFn: roleService.getAll });

  if (isLoading) return <LoadingState />;
  if (!roles) return null;

  const role = roles?.find((role) => role.id === parseInt(id));

  return (
    <main className="bg-bg-secondary w-full h-full py-4 shadow-xs border border-lines/20 rounded-2xl grid grid-cols-1 lg:grid-cols-[1fr_5fr_1fr]">
      <RolesSection roles={roles} />

      <RoleForm role={role} />

      <RoleMembers role={role} />
    </main>
  );
}
