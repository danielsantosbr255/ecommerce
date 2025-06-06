"use client";

import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import LoadingState from "@/components/ui/LoadingState";
import { Edit, Mail, User } from "lucide-react";
import Button from "@/components/ui/Button";

interface ProfileCardProps {
  children: React.ReactNode;
  label: string;
  icon: React.ReactNode;
}

const ProfileCard = ({ children, label, icon }: ProfileCardProps) => {
  return (
    <div className="bg-white flex gap-6 rounded-md shadow p-4">
      <div className="flex items-center justify-center text-primary">{icon}</div>

      <div className="flex flex-col justify-center items-start">
        <h2 className="text-lg font-semibold text-tx-secondary mb-2">{label}</h2>
        {children}
      </div>
    </div>
  );
};

export default function Profile() {
  const { user, userLoading } = useAuth();

  if (userLoading) return <LoadingState />;
  if (!user) redirect("/auth/sign-in");

  return (
    <main className="flex flex-col w-full h-full">
      <section className="bg-bg-secondary flex w-full p-6 rounded-lg items-center justify-between shadow gap-3 my-2">
        <div className="flex gap-4 items-center">
          <User className="bg-bg-primary p-4 shadow rounded-full text-primary" size={60} />
          <div className="flex flex-col gap-1">
            <h1 className="flex w-full text-lg font-bold text-tx-secondary">Bem-vindo, {user.name}</h1>
            <p className="text-tx-secondary flex items-center gap-2">
              <Mail className="text-primary" size={16} /> {user.email}
            </p>
          </div>
        </div>

        <Button>
          <Edit className="mr-2" /> Editar Dados
        </Button>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full h-full">
        <ProfileCard label="Informações Pessoais" icon={<User size={40} />}>
          <p>Altere seus dados cadastrados, endereços ou cadastre um novo endereço.</p>
        </ProfileCard>

        {/* Cartão de Últimos Pedidos */}
        <ProfileCard label="Últimos Pedidos" icon={<User size={40} />}>
          <ul>
            <li className="text-tx-secondary py-1">
              Pedido #12345 - Camiseta Azul - 15/04/2025 - <span className="text-green-500">Entregue</span>
            </li>
            <li className="text-tx-secondary py-1">
              Pedido #67890 - Calça Jeans - 10/04/2025 - <span className="text-yellow-500">Em Trânsito</span>
            </li>
            {/* Mais itens de pedidos aqui */}
          </ul>
          <Link href="#" className="inline-block mt-2 text-tx-link hover:underline">
            Ver Todos os Pedidos
          </Link>
        </ProfileCard>

        {/* Cartão de Endereço Principal */}
        <ProfileCard label="Endereço Principal" icon={<User size={40} />}>
          <p className="text-tx-secondary">Rua das Flores, 123</p>
          <p className="text-tx-secondary">Cidade, Estado</p>
          <Link href="#" className="inline-block mt-2 text-tx-link hover:underline">
            Gerenciar Endereços
          </Link>
        </ProfileCard>

        {/* Cartão de Favoritos Recentes */}
        <ProfileCard label="Favoritos Recentes" icon={<User size={40} />}>
          <ul>
            <li className="text-tx-secondary py-1">Produto 1</li>
            <li className="text-tx-secondary py-1">Produto 2</li>
          </ul>
          <Link href="#" className="inline-block mt-2 text-tx-link hover:underline">
            Ver Todos os Favoritos
          </Link>
        </ProfileCard>
      </section>
    </main>
  );
}
