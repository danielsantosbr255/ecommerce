"use client";

import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { roleService } from "@/services/roles";
import { FaPlus, FaTimes, FaUsersCog, FaUserTie } from "react-icons/fa";
import LoadingState from "@/components/ui/LoadingState";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Button from "@/components/ui/Button";
import { FaPencil } from "react-icons/fa6";

function RolesTable() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: roles, isLoading } = useQuery({ queryKey: ["roles"], queryFn: roleService.getAll });

  const createRole = useMutation({
    mutationFn: async () => {
      return await roleService.create({ name: "Novo cargo", description: "Descrição do cargo" });
    },
    onSuccess: (role) => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      if (role) {
        router.push(`/admin/roles/${role.id}`);
        toast.success("Cargo criado com sucesso!");
      }
    },
    onError: (error) => {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Erro ao criar cargo. Tente novamente.");
    },
  });

  const deleteRole = useMutation({
    mutationFn: (id: number) => roleService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      toast.success("Cargo excluído com sucesso!");
    },
    onError: (error) => {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Erro ao excluir cargo. Tente novamente.");
    },
  });

  const handleCreate = () => createRole.mutate();
  const handleRemove = (id: number) => deleteRole.mutate(id);

  if (isLoading) return <LoadingState label="Carregando cargos..." />;

  if (!roles) return <div className="w-full h-full flex items-center justify-center">Nenhum cargo encontrado.</div>;

  return (
    <Table>
      <TableCaption className="text-center py-4">
        <div className="relative flex justify-center items-center gap-3 text-tx-primary font-semibold text-xl">
          <FaUsersCog className="text-primary" size={25} />
          <p>Listagem de cargos</p>

          <span className="absolute top-0 right-3 bg-primary/20 text-primary font-normal text-sm px-2 py-1 rounded-xl">
            {roles.length > 0 ? `${roles.length} cargos` : "nenhum cargo"}
          </span>

          <Button
            className="absolute left-3 top-1/2 -translate-y-1/2 !rounded-2xl !text-sm"
            onClick={handleCreate}
            disabled={createRole.isPending}
          >
            <FaPlus className="mr-1" size={10} /> Novo cargo
          </Button>
        </div>
      </TableCaption>

      <TableHeader>
        <TableRow className="bg-bg-overlay/10 text-sm">
          <TableHead>Cargo</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="bg-bg-secondary divide-lines">
        {roles.map((role) => (
          <TableRow key={role.id}>
            <TableCell className="items-center py-5">
              <span className="flex items-center gap-4 font-medium">
                <FaUserTie className="inline-block text-primary" size={20} /> {role.name}
              </span>
            </TableCell>

            <TableCell className="text-center">
              <span className="flex items-center gap-2">{role.description}</span>
            </TableCell>

            <TableCell>
              <div className="flex items-center justify-end gap-3">
                <Link href={`/admin/roles/${role.id}`} className="text-primary hover:underline cursor-pointer">
                  <FaPencil size={18} className="hover:scale-110 transition cursor-pointer" />
                </Link>

                <button className="text-tx-error hover:scale-110 transition cursor-pointer" onClick={() => handleRemove(role.id)}>
                  <FaTimes size={20} />
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default RolesTable;
