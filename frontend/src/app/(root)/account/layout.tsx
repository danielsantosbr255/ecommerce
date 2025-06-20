"use client";

import React from "react";
import { redirect } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import LoadingState from "@/components/ui/LoadingState";
import { Sidebar, SidebarItem } from "./_components/Sidebar";
import { FiLogOut } from "react-icons/fi";
import { FaAddressBook, FaHeart, FaShieldAlt, FaShoppingBasket, FaThumbsUp, FaUserNinja, FaWindowClose } from "react-icons/fa";

function Layout({ children }: { children: React.ReactNode }) {
  const { user, userLoading, signOut } = useAuth();

  if (userLoading) return <LoadingState />;
  if (!user) redirect("/sign-in");

  return (
    <>
      <Sidebar>
        <SidebarItem href="/account" icon={<FaUserNinja size={27} />} text="Minha Conta" />
        <SidebarItem href="#" icon={<FaShieldAlt size={27} />} text="Acesso e segurança" />
        <SidebarItem href="/account/my-orders" icon={<FaShoppingBasket size={27} />} text="Meus Pedidos" />
        <SidebarItem href="#" icon={<FaAddressBook size={27} />} text="Meus Endereços" />
        <SidebarItem href="#" icon={<FaThumbsUp size={27} />} text="Avaliações" />
        <SidebarItem href="#" icon={<FaHeart size={27} />} text="Meus Favoritos" />
        <SidebarItem href="#" icon={<FaWindowClose size={27} />} text="Sessões" />
        <SidebarItem onClick={signOut} icon={<FiLogOut size={27} />} text="Sair" />
      </Sidebar>

      <main className="flex flex-col flex-1">{children}</main>
    </>
  );
}

export default Layout;
