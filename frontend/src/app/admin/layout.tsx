// "use client";

import React from "react";
import { redirect } from "next/navigation";
// import { useAuth } from "@/providers/AuthContext";
import AdminHeader from "./components/AdminHeader";
// import LoadingState from "@/components/ui/LoadingState";
import { Sidebar, SidebarItem } from "@/app/admin/components/Sidebar";
import { DropdownMenu, DropdownItem } from "@/components/ui/DropdownMenu";
import { FaBox, FaClipboardList, FaUsers } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { userService } from "@/services/users";
import { authService } from "@/services/auth";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const signOut = async () => {
  "use server";
  return authService.signOut();
};

export default async function AdminLayout({ children }: AdminLayoutProps) {
  // const { user, userLoading, signOut } = useAuth();
  const user = await userService.getOwn();

  // if (userLoading)
  //   return (
  //     <main className="w-full h-screen flex items-center justify-center">
  //       <LoadingState />
  //     </main>
  //   );

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="bg-bg-primary h-screen gap-2 p-2 grid grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
      <Sidebar className="row-span-2" user={user} signOut={signOut}>
        <SidebarItem href="/admin" icon={<MdSpaceDashboard size={20} />} text="Dashboard" alert />

        <DropdownMenu icon={<FaBox size={20} />} text="Produtos">
          <DropdownItem label="Listar Produtos" href="/admin/products" />
          <DropdownItem label="Novo Produto" href="#" />
        </DropdownMenu>

        <DropdownMenu icon={<FaUsers size={20} />} text="Users">
          <DropdownItem label="Listar Usuários" href="/admin/users" />
          <DropdownItem label="Novo Usuário" href="#" />
        </DropdownMenu>

        <DropdownMenu icon={<FaClipboardList size={20} />} text="Pedidos">
          <DropdownItem label="Listar Pedidos" href="/admin/orders" />
        </DropdownMenu>

        <SidebarItem href="#" icon={<IoMdSettings size={20} />} text="Configurações" />
      </Sidebar>

      <AdminHeader />

      <div className="flex rounded-2xl p-5 overflow-y-auto">{children}</div>
    </div>
  );
}
