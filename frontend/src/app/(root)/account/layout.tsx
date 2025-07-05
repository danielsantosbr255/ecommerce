"use client";

import React from "react";
import { redirect } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import LoadingState from "@/components/ui/LoadingState";
import { Sidebar, SidebarItem } from "./_components/Sidebar";
import {
  FaAddressBook,
  FaHeart,
  FaShieldAlt,
  FaShoppingBasket,
  FaSignOutAlt,
  FaThumbsUp,
  FaUserNinja,
  FaWindowClose,
} from "react-icons/fa";

function Layout({ children }: { children: React.ReactNode }) {
  const { user, userLoading, signOut } = useAuth();

  if (userLoading) return <LoadingState />;
  if (!user) redirect("/sign-in");

  return (
    <>
      <Sidebar>
        <SidebarItem href="/account" icon={<FaUserNinja size={27} />} text="Minha Conta" />
        <SidebarItem href="/account/security" icon={<FaShieldAlt size={27} />} text="Acesso e segurança" />
        <SidebarItem href="/account/orders" icon={<FaShoppingBasket size={27} />} text="Meus Pedidos" />
        <SidebarItem href="/account/address" icon={<FaAddressBook size={27} />} text="Meus Endereços" />
        <SidebarItem href="/account/reviews" icon={<FaThumbsUp size={27} />} text="Avaliações" />
        <SidebarItem href="/account/favorites" icon={<FaHeart size={27} />} text="Meus Favoritos" />
        <SidebarItem href="/account/sessions" icon={<FaWindowClose size={27} />} text="Sessões" />
        <SidebarItem onClick={signOut} icon={<FaSignOutAlt size={27} />} text="Sair" />
      </Sidebar>

      <main className="grid grid-rows-1 grid-cols-1 w-full h-full">{children}</main>
    </>
  );
}

export default Layout;
