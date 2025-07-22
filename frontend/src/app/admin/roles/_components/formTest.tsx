// src/components/RoleUpdateForm.tsx
"use client";

import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Permission, Role } from "@/types";
import { roleService } from "@/services/roles";
import { zodResolver } from "@hookform/resolvers/zod";
import { RoleUpdateFormValues, roleUpdateSchema } from "@/lib/schemas/role.schema";

interface Props {
  role: Role;
  permissions: Permission[];
}

const RoleUpdateForm = ({ role, permissions }: Props) => {
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

  const onSubmit = async (data: RoleUpdateFormValues) => {
    try {
      await roleService.update(role.id, data);
      toast.success("Cargo atualizado com sucesso!");
    } catch (err) {
      if (err instanceof Error) toast.error(`Erro na atualização: ${err.message}`);
      else toast.error("Erro ao atualizar cargo. Tente novamente.");
    }
  };

  const selectedPermissions = watch("permissions") || [];

  const togglePermission = (id: number) => {
    const updated = selectedPermissions.includes(id)
      ? selectedPermissions.filter((pid) => pid !== id)
      : [...selectedPermissions, id];
    setValue("permissions", updated);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Atualizar Cargo: {role.name}</h2>

      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
          Nome:
        </label>
        <input
          type="text"
          id="name"
          {...register("name")}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
          Descrição:
        </label>
        <textarea
          id="description"
          {...register("description")}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.description && <p className="text-red-500 text-xs italic">{errors.description.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Permissões:</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {permissions.map((permission) => {
            return (
              <div key={permission.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedPermissions.includes(permission.id)}
                  onChange={() => togglePermission(permission.id)}
                  className="rounded"
                />
                <label htmlFor={`permission-${permission.id}`} className="text-gray-700">
                  {permission.action} ({permission.subject})
                </label>
              </div>
            );
          })}
        </div>
        {errors.permissions && <p className="text-red-500 text-xs italic">{errors.permissions.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
      >
        {isSubmitting ? "Atualizando..." : "Atualizar Cargo"}
      </button>
    </form>
  );
};

export default RoleUpdateForm;
