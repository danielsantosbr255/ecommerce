"use client";

import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { roleService } from "@/services/roles";
import { useQueryClient } from "@tanstack/react-query";

export default function CreateRole() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createRole = async () => {
    try {
      const role = await roleService.create({ name: "Novo cargo", description: "Descrição do cargo" });
      await queryClient.invalidateQueries({ queryKey: ["roles"] });

      if (role) router.push(`/admin/roles/${role.id}`);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Erro ao adicionar cargo. Tente novamente.");
    }
  };

  return (
    <Button className="absolute left-3 top-1/2 -translate-y-1/2 !rounded-2xl !text-sm" onClick={createRole}>
      <FaPlus className="mr-1" size={10} /> Novo cargo
    </Button>
  );
}
