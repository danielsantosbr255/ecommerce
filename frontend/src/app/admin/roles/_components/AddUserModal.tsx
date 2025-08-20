"use client";

import { Role } from "@/types";
import { toast } from "react-toastify";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { roleService } from "@/services/roles";
import { userService } from "@/services/users";
import Checkbox from "@/components/ui/Checkbox";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface AddUserModalProps {
  role: Role;
  handleAddUsers: () => void;
}

export const AddUserModal = ({ role, handleAddUsers }: AddUserModalProps) => {
  const { data: users, isLoading } = useQuery({ queryKey: ["users"], queryFn: userService.getMany });
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>(role.users.map((user) => user.userId));

  const queryClient = useQueryClient();

  const handleCheckboxChange = (userId: string) => {
    setSelectedUserIds((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]));
  };

  const updateUsers = useMutation({
    mutationFn: () => roleService.update(role.id, { users: selectedUserIds }),
    onSuccess: () => {
      setSelectedUserIds([]);
      handleAddUsers();
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Membros atualizados com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao atualizar membros. Tente novamente.");
    },
  });

  const onClick = () => updateUsers.mutate();

  return (
    <div className="fixed inset-0 bg-bg-overlay bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 min-w-[300px]">
        <h2 className="text-lg font-semibold mb-4 text-center">Atualizar Membros</h2>
        <div className="max-h-64 overflow-y-auto mb-4">
          {isLoading || !users ? (
            <div>Carregando usuários...</div>
          ) : (
            users.map((user) => (
              <label key={user.id} className="flex items-center gap-2 py-1">
                <Checkbox checked={selectedUserIds.includes(user.id)} onChange={() => handleCheckboxChange(user.id)} />
                <span>{user.name}</span>
              </label>
            ))
          )}
        </div>

        <div className="flex gap-2">
          <Button onClick={onClick} disabled={updateUsers.isPending}>
            {updateUsers.isPending ? "Atualizando..." : "Atualizar"}
          </Button>
          <Button variant="secondary" onClick={handleAddUsers}>
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
};
