"use client";

import { Role } from "@/types";
import { useCallback } from "react";
import { toast } from "react-toastify";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { roleService } from "@/services/roles";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useForm } from "react-hook-form";
import { RoleFormData, roleSchema } from "./RoleSchema";

const RoleForm = ({ role }: { role?: Role }) => {
  const { register, handleSubmit, formState, reset } = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema),
    mode: "onChange",
    defaultValues: {
      name: role?.name ?? "",
      description: role?.description ?? "",
    },
  });

  const { errors, isSubmitting } = formState;

  const onSubmit = useCallback(
    async (data: RoleFormData) => {
      try {
        await roleService.create(data);
        reset();
        toast.success("Cargo adicionado com sucesso!");
      } catch (err) {
        if (err instanceof Error) toast.error(err.message);
        else toast.error("Erro ao adicionar cargo. Tente novamente.");
      }
    },
    [reset]
  );

  return (
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
    </form>
  );
};

export default RoleForm;
