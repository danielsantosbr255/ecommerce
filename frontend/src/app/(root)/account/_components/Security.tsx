"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuth } from "@/contexts/AuthContext";
import React, { useState } from "react";
import { FaUserLock, FaKey } from "react-icons/fa";

export default function AccessAndSecurity() {
  const { user, userLoading } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert("As senhas não coincidem.");
      return;
    }
    try {
      alert("Em breve, essa funcionalidade estará disponível.");
    } catch {
      alert("Erro ao realizar alterações. Tente novamente mais tarde.");
    }
  }

  if (userLoading) return <div>Carregando...</div>;

  return (
    <form onSubmit={handleSubmit} className="bg-bg-secondary shadow-xs p-4 rounded-lg flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <FaUserLock className="text-primary" size={20} />
        <h2 className="text-md font-semibold text-tx-primary">Configurações de Login</h2>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-tx-primary" htmlFor="name">
          Nome:
        </label>
        <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-tx-primary" htmlFor="email">
          Email:
        </label>
        <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-tx-primary" htmlFor="phone">
          Telefone:
        </label>
        <Input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-tx-primary" htmlFor="newPassword">
          Nova Senha:
        </label>
        <Input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-tx-primary" htmlFor="confirmNewPassword">
          Confirmar Nova Senha:
        </label>
        <Input
          type="password"
          id="confirmNewPassword"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <FaKey className="text-primary" size={20} />
        <label className="text-tx-primary" htmlFor="twoFactorEnabled">
          Autenticação de Dois Fatores:
        </label>
        <Input
          type="checkbox"
          id="twoFactorEnabled"
          checked={twoFactorEnabled}
          onChange={(e) => setTwoFactorEnabled(e.target.checked)}
          className="!w-auto"
        />
      </div>
      <Button type="submit">Salvar Alterações</Button>
    </form>
  );
}
