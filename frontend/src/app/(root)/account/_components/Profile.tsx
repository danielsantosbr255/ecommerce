"use client";

import React from "react";
import { redirect } from "next/navigation";
import Button from "@/components/ui/Button";
import { useAuth } from "@/providers/AuthContext";
import LoadingState from "@/components/ui/LoadingState";
import {
  FaAddressBook, FaHeart,
  FaMailBulk,
  FaShieldAlt,
  FaShoppingBasket,
  FaThumbsUp,
  FaUserEdit,
  FaUserAstronaut,
  FaWindowClose
} from "react-icons/fa";
import Link from "next/link";

interface ProfileCardProps {
  children: React.ReactNode;
  label: string;
  icon: React.ReactNode;
  href?: string;
}

const ProfileCard = ({ children, label, icon, href = "" }: ProfileCardProps) => {
  return (
    <Link
      href={href}
      className="bg-bg-secondary flex gap-6 rounded-md shadow-xs p-4 h-30 border border-lines/0 hover:border-primary/20 transition-colors duration-200"
    >
      <span className="flex items-center p-4 justify-center text-primary">{icon}</span>

      <div className="flex flex-col justify-center items- w-full text-tx-primary">
        <h2 className="text-lg font-semibold mb-1">{label}</h2>
        {children}
      </div>
    </Link>
  );
};

export default function Profile() {
  const { user, userLoading } = useAuth();

  if (userLoading) return <LoadingState />;
  if (!user) redirect("/sign-in");

  return (
    <main className="flex flex-col w-full h-full">
      <section className="bg-bg-secondary flex w-full p-6 rounded-lg items-center justify-between shadow-xs gap-3 my-2">
        <div className="flex gap-4 items-center">
          <span className="bg-bg-primary p-3 shadow rounded-full">
            <FaUserAstronaut className="text-primary" size={40} />
          </span>
          <div className="flex flex-col gap-1">
            <h1 className="flex w-full text-lg font-bold text-tx-primary">Bem-vindo, {user.name}</h1>
            <p className="text-tx-primary flex items-center gap-2">
              <FaMailBulk className="text-primary" size={16} /> {user.email}
            </p>
          </div>
        </div>

        <Button>
          <FaUserEdit className="mr-2" size={20} /> Editar Dados
        </Button>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <ProfileCard href="/account/security" label="Acesso e segurança" icon={<FaShieldAlt size={40} />}>
          <p>Alterar o login, nome ou celular</p>
        </ProfileCard>

        {/* Cartão de Últimos Pedidos */}
        <ProfileCard href="/account/orders" label="Meus Pedidos" icon={<FaShoppingBasket size={40} />}>
          <p>Rastrear, devolver, cancelar um pedido, baixar a nota fiscal ou comprar novamente</p>
        </ProfileCard>

        <ProfileCard href="/account/address" label="Meus endereços" icon={<FaAddressBook size={40} />}>
          <p>Alterar, remover ou definir o endereço padrão</p>
        </ProfileCard>

        {/* Cartão de Endereço Principal */}
        <ProfileCard href="/account/reviews" label="Avaliações" icon={<FaThumbsUp size={40} />}>
          <p>Avalie suas compras e visualize suas avaliações e comentários</p>
        </ProfileCard>

        {/* Cartão de Favoritos Recentes */}
        <ProfileCard href="/account/favorites" label="Favoritos" icon={<FaHeart size={40} />}>
          <p>Consulte sua lista de produtos favoritados</p>
        </ProfileCard>

        <ProfileCard href="/account/sessions" label="Sessões" icon={<FaWindowClose size={40} />}>
          <p>Veja, encerre ou gerencie sessões em outros dispositivos.</p>
        </ProfileCard>
      </section>
    </main>
  );
}
