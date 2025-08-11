"use client";

import { Role } from "@/types";
import { toast } from "react-toastify";
import Permissions from "./Permissions";
import Input from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import { roleService } from "@/services/roles";
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import LoadingState from "@/components/ui/LoadingState";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { permissionService } from "@/services/permissions";
import { roleUpdateSchema } from "@/lib/schemas/role.schema";
import { RoleUpdateFormValues } from "@/lib/schemas/role.schema";

const RoleForm = ({ role }: { role: Role | null | undefined }) => {
  const queryClient = useQueryClient();
  const { data: permissions, isLoading } = useQuery({ queryKey: ["permissions"], queryFn: permissionService.getAll });

  const { register, handleSubmit, setValue, watch, formState } = useForm<RoleUpdateFormValues>({
    resolver: zodResolver(roleUpdateSchema),
    mode: "onChange",
    defaultValues: {
      name: role?.name || "",
      description: role?.description || "",
      permissions: role?.permissions?.map((permission) => permission.permission.id) || [],      
    },
  });

  const { errors, isSubmitting } = formState;
  const selectedPermissions = watch("permissions") || [];

  if (isLoading || !role) return <LoadingState />;

  const onSubmit = async (data: RoleUpdateFormValues) => {
    try {
      await roleService.update(role.id, data);
      await queryClient.invalidateQueries({ queryKey: ["roles"] });
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

  if (!permissions) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-bg-secondary flex flex-col gap-6 px-6 border-x border-lines/50">
      <h1 className="font-semibold">Editar cargo</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_auto] gap-4">
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
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-semibold">Permissoes</h2>
        <Permissions permissions={permissions} checkChange={togglePermission} selectedPermissions={selectedPermissions} />
      </div>
    </form>
  );
};

export default RoleForm;
