"use client";

import { FaPlus } from "react-icons/fa";
import { redirect } from "next/navigation";
import Button from "@/components/ui/Button";
import { roleService } from "@/services/roles";

const createRole = async () => {
  const role = await roleService.create({ name: "Novo cargo", description: "Descrição do cargo" });
  if (role) redirect(`/admin/roles/${role.id}`);
};

export default function CreateRole() {
  return (
    <Button className="absolute left-3 top-1/2 -translate-y-1/2 !rounded-2xl !text-sm" onClick={createRole}>
      <FaPlus className="mr-1" size={10} /> Novo cargo
    </Button>
  );
}
