"use client";
import React, { useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
}

const AdminUsersPage = () => {
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "João Silva", email: "joao.silva@email.com", role: "ADMIN" },
    { id: "2", name: "Maria Oliveira", email: "maria.oliveira@email.com", role: "USER" },
  ]);
  const [newUser, setNewUser] = useState<{ name: string; email: string; role: "ADMIN" | "USER" }>({
    name: "",
    email: "",
    role: "USER",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value as "ADMIN" | "USER" | string }));
  };

  const handleAddUser = () => {
    const newId = Math.random().toString(36).substring(7);
    setUsers((prev) => [...prev, { id: newId, ...newUser }]);
    setNewUser({ name: "", email: "", role: "USER" });
    alert("Usuário adicionado!"); // Replace with a better notification
  };

  return (
    <>
      <header className="mb-6">
        <h2 className="text-xl font-semibold text-tx-primary">Gerenciamento de Usuários</h2>
      </header>
    </>
  );
};

export default AdminUsersPage;
