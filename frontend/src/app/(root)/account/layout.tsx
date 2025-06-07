"use client";

import React from "react";
import { redirect } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import LoadingState from "@/components/ui/LoadingState";
import { Sidebar, SidebarItem } from "./_components/Sidebar";
import { FiHeart, FiLock, FiLogOut, FiMapPin, FiShoppingBag, FiUser } from "react-icons/fi";

function Layout({ children }: { children: React.ReactNode }) {
  const { user, userLoading, signOut } = useAuth();

  if (userLoading) return <LoadingState />;
  if (!user) redirect("/sign-in");

  return (
    <>
      <Sidebar>
        <SidebarItem href="/account" icon={<FiUser size={27} />} text="Minha Conta" />
        <SidebarItem href="#" icon={<FiShoppingBag size={27} />} text="Meus Pedidos" />
        <SidebarItem href="#" icon={<FiMapPin size={27} />} text="Meus Endereços" />
        <SidebarItem href="#" icon={<FiHeart size={27} />} text="Meus Favoritos" />
        <SidebarItem href="#" icon={<FiLock size={27} />} text="Alterar Senha" />
        <SidebarItem onClick={signOut} icon={<FiLogOut size={27} />} text="Sair" />
      </Sidebar>

      <main className="flex flex-col flex-1">{children}</main>
    </>
  );
}

export default Layout;
