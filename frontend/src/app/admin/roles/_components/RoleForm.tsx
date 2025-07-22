"use client";

import { Permission, Role } from "@/types";
import { toast } from "react-toastify";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { roleService } from "@/services/roles";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useForm } from "react-hook-form";
import Permissions from "./Permissions";
import { RoleUpdateFormValues } from "@/lib/schemas/role.schema";
import { roleUpdateSchema } from "@/lib/schemas/role.schema";

interface Props {
  role: Role;
  permissions: Permission[];
}

const RoleForm = ({ role, permissions }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RoleUpdateFormValues>({
    resolver: zodResolver(roleUpdateSchema),
    mode: "onChange",
    defaultValues: {
      name: role.name,
      description: role.description,
      permissions: role.permissions.map((permission) => permission.permission.id),
      users: role.users.map((user) => user.user.id),
    },
  });

  const selectedPermissions = watch("permissions") || [];

  const onSubmit = async (data: RoleUpdateFormValues) => {
    try {
      await roleService.update(role.id, data);
      toast.success("Cargo atualizado com sucesso!");
    } catch (err) {
      if (err instanceof Error) toast.error(`Erro na atualização: ${err.message}`);
      else toast.error("Erro ao atualizar cargo. Tente novamente.");
    }
  };

  const togglePermission = (id: number) => {
    const updated = selectedPermissions.includes(id)
      ? selectedPermissions.filter((pid) => pid !== id)
      : [...selectedPermissions, id];
    setValue("permissions", updated);
  };

  return (
    <section className="bg-bg-secondary flex flex-col gap-6 px-6 border-x border-lines">
      <div className="flex flex-col gap-3">
        <h1 className="font-semibold">Editar cargo</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_auto] gap-4">
          <div className="flex flex-col gap-1">
            <Input label="Nome" id="name" {...register("name")} placeholder="Digite o nome do cargo" />
            <ErrorMessage message={errors.name?.message} />
          </div>

          <div className="flex flex-col gap-1">
            <Input label="Descrição" id="description" {...register("description")} placeholder="Digite a descrição do cargo" />
            {errors.description && <ErrorMessage message={errors.description.message} />}
          </div>

          <div className="flex justify-end items-center">
            <Button type="submit" className="font-bold" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="font-semibold">Permissoes</h2>
            <Permissions
              permissions={permissions}
              handleCheckboxChange={togglePermission}
              selectedPermissions={selectedPermissions}
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default RoleForm;
