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
import { useRoleForm } from "./useRoleForm";
import { RoleFormData, roleSchema } from "./RoleSchema";
import Checkbox from "@/components/ui/Checkbox";

const RoleForm = ({ role }: { role?: Role }) => {
  const { permissions, loadingOptions, optionsError } = useRoleForm();

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

  if (loadingOptions) {
    return <div className="bg-bg-secondary shadow-xs rounded-2xl p-6 text-center">Carregando opções...</div>;
  }

  if (optionsError) {
    return (
      <div className="bg-bg-secondary shadow-xs rounded-2xl p-6 text-center">
        <ErrorMessage message={optionsError} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* <h1 className="text-lg font-semibold mb-4 text-center">{role ? "Editar cargo" : "Novo cargo"}</h1> */}

      <form onSubmit={handleSubmit(onSubmit)} className="bg-bg-secondary flex flex-col gap-4 shadow-xs rounded-2xl p-6 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <Input label="Nome" id="name" {...register("name")} placeholder="Digite o nome do cargo" />
            {errors.name && <ErrorMessage message={errors.name.message} />}
          </div>

          <div className="flex flex-col gap-1">
            <Input label="Descrição" id="description" {...register("description")} placeholder="Digite a descrição do cargo" />
            {errors.description && <ErrorMessage message={errors.description.message} />}
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-4 border-t pt-4 border-lines">
          <h2 className="font-semibold">Permissoes</h2>

          <div className="flex flex-col gap-1">
            {permissions.map((permission) => (
              <div key={permission.id} className="flex gap-2 justify-between items-center border-2 border-lines p-3 rounded-xl">
                <div className="flex flex-col">
                  <label htmlFor={`permission-${permission.id}`} className="font-semibold text-lg ">
                    {`${permission.action.charAt(0).toUpperCase()}${permission.action.slice(1).toLowerCase()}`}{" "}
                    {`${permission.subject.charAt(0).toUpperCase()}${permission.subject.slice(1).toLowerCase()}`}
                  </label>
                  <span className="text-sm text-tx-secondary">{permission.description}</span>
                </div>

                <Checkbox
                  id={`permission-${permission.id}`}
                  // {...register("permissions")}
                  value={permission.id}
                />
              </div>
            ))}
          </div>
        </div>
      </form>

      <section>
        <div className="col-span-full">
          <Button type="submit" className="font-bold" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default RoleForm;
