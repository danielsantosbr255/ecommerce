"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { User } from "@/types";
import { toast } from "react-toastify";
import { FaPencil } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { userService } from "@/services/users";
import { FaTimes, FaUserAstronaut, FaUsers } from "react-icons/fa";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Actions = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isPeding, setIsPeding] = useState(false);

  const handleRemove = async (id: string) => {
    try {
      setIsPeding(true);
      await userService.delete(id);
      toast.success("Usuário excluída com sucesso!");
      router.refresh();
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Erro ao excluir usuário");
    } finally {
      setIsPeding(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-3">
      <Link href={`/admin/users/edit/${user.id}`} className="text-primary hover:underline cursor-pointer">
        <FaPencil size={18} className="hover:scale-110 transition cursor-pointer" />
      </Link>

      <button
        type="button"
        disabled={isPeding}
        className={`text-tx-error hover:scale-110 transition cursor-pointer ${
          isPeding ? "pointer-events-none opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => handleRemove(user.id)}
      >
        <FaTimes size={20} />
      </button>
    </div>
  );
};

function UsersTable({ users, totalItems }: { users: User[]; totalItems: number }) {
  if (!users || users.length === 0) {
    return (
      <div className="flex flex-col gap-4 p-6 bg-bg-secondary rounded-lg shadow-xs">
        <p className="text-tx-primary text-center font-semibold">Nenhum usuário encontrado.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableCaption className="text-center py-4">
        <div className="relative flex justify-center items-center gap-2 text-tx-primary font-semibold text-xl">
          <FaUsers className="text-primary" size={25} />
          <p>Listagem de usuários</p>

          <span className="absolute top-0 right-3 bg-primary/20 text-primary font-normal text-sm px-2 py-1 rounded-xl">
            {totalItems > 0 ? `${totalItems} usuários` : "Nenhum usuário"}
          </span>
        </div>
      </TableCaption>

      <TableHeader>
        <TableRow className="bg-bg-overlay/10 text-sm">
          <TableHead>Imagem</TableHead>
          <TableHead>ID</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-center">Telefone</TableHead>
          <TableHead className="text-center">Cargo</TableHead>
          <TableHead className="text-right">Criado em</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="bg-bg-secondary divide-lines">
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="text-center">
              {user.image ? (
                <Image src={user.image} alt={user.name} className="object-cover" width={40} height={40} priority />
              ) : (
                <FaUserAstronaut size={20} />
              )}
            </TableCell>
            <TableCell className="py-5">{user.id}</TableCell>
            <TableCell className="items-center">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className="text-center">{user.phone || "-"}</TableCell>
            <TableCell className="text-center">
              {user?.roles && user.roles.length > 0 ? (
                <span className="bg-primary/20 text-primary font-medium text-sm px-2 py-1 rounded-full">
                  {user.roles.map((role) => role.role.name).join(", ")}
                </span>
              ) : (
                "-"
              )}
            </TableCell>
            <TableCell className="text-right">{new Date(user.createdAt).toLocaleString()}</TableCell>
            <TableCell className="text-right">
              <Actions user={user} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default UsersTable;
