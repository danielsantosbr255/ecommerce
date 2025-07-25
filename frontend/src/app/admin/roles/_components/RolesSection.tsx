"use client";

import Link from "next/link";
import { Role } from "@/types";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";
import { FaPlus, FaTimes, FaUserTie } from "react-icons/fa";
import { roleService } from "@/services/roles";
import { usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export default function RolesSection({ roles }: { roles: Role[] }) {
  const path = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();

  const createRole = async () => {
    try {
      const role = await roleService.create({ name: "Novo cargo", description: "Descrição do cargo" });
      if (role) {
        await queryClient.invalidateQueries({ queryKey: ["roles"] });
        router.push(`/admin/roles/${role.id}`);
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  const deleteRole = async (id: number) => {
    try {
      await roleService.delete(id);
      await queryClient.invalidateQueries({ queryKey: ["roles"] });
      toast.success("Cargo excluído com sucesso!");
      router.push(`/admin/roles/${roles[0].id}`);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <section className="flex flex-col gap-4 px-2">
      <h1 className="flex justify-between items-center font-semibold mb-4 mx-2">
        Cargos
        <button
          onClick={createRole}
          className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2 flex items-center justify-center cursor-pointer font-medium"
        >
          <FaPlus size={12} />
        </button>
      </h1>

      <div className="flex flex-col gap-1">
        {roles?.map((role) => (
          <Link
            href={`/admin/roles/${role.id}`}
            key={role.id}
            className={cn(
              "flex rounded-lg px-2 py-2 gap-2 font-medium justify-between items-center hover:bg-bg-overlay cursor-pointer transition-all ease-in-out duration-300",
              path === `/admin/roles/${role.id}` && "bg-bg-overlay"
            )}
          >
            <div className="flex items-center gap-2">
              <FaUserTie size={20} />
              {role.name}
            </div>

            <button onClick={() => deleteRole(role.id)}>
              <FaTimes size={12} className=" hover:text-red-500 hover:scale-120 cursor-pointer transition-all" />
            </button>
          </Link>
        ))}
      </div>
    </section>
  );
}
