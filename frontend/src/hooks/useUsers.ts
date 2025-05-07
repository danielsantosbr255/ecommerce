// src/hooks/api/useUsers.ts
import { useState } from "react";
import { User } from "@/types";
import { userService } from "@/services/users";

export const useUsers = () => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);

    const data = await userService.getAll();
    if (data) {
      setError(null);
      setUsers(data);
    } else {
      setError("Falha ao carregar usuários");
    }
    setLoading(false);
  };

  const fetchUser = async (id: string) => {
    setLoading(true);
    const data = await userService.getOne(id);
    if (data) {
      setError(null);
      setUser(data);
    } else {
      setError("Falha ao carregar usuário");
    }
    setLoading(false);
  };

  const fetchOwnUser = async () => {
    setLoading(true);
    const data = await userService.getOwn();
    if (data) {
      setError(null);
      setUser(data);
    } else {
      setError("Falha ao carregar usuário");
    }
    setLoading(false);
  };

  const createUser = async (userData: User) => {
    setLoading(true);

    const newUser = await userService.create(userData);
    if (newUser) {
      setUsers((prev) => [...prev, newUser]);
      setError(null);
      return newUser;
    } else {
      setError("Falha ao criar usuário");
    }
    setLoading(false);
  };

  const updateUser = async (id: string, userData: Partial<User>) => {
    setLoading(true);

    const updatedUser = await userService.update(id, userData);
    if (updatedUser) {
      setUsers((prev) => prev.map((user) => (user.id === id ? updatedUser : user)));
      setError(null);
    } else {
      setError("Falha ao atualizar usuário");
    }
    setLoading(false);
  };

  const deleteUser = async (id: string) => {
    setLoading(true);
    const deletedUser = await userService.delete(id);

    if (deletedUser) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
      setError(null);
    } else {
      setError("Falha ao deletar usuário");
    }
    setLoading(false);
  };

  return {
    user,
    users,
    loading,
    error,
    fetchUsers,
    fetchOwnUser,
    fetchUser,
    createUser,
    updateUser,
    deleteUser,
  };
};
