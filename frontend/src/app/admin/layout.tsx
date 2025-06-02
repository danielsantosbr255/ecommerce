"use client";

import React from "react";
import { redirect } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import AdminHeader from "./components/AdminHeader";
import { Sidebar, SidebarItem } from "@/app/admin/components/Sidebar";
import { DropdownMenu, DropdownItem } from "@/components/ui/DropdownMenu";
import { LayoutDashboard, Package, ClipboardList, Users, Settings } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, signOut } = useAuth();

  if (!user) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="bg-bg-primary h-screen gap-2 p-2 grid grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
      <Sidebar className="row-span-2" user={user} signOut={signOut}>
        <SidebarItem href="/admin" icon={<LayoutDashboard />} text="Dashboard" alert />

        <DropdownMenu icon={<Package />} text="Produtos">
          <DropdownItem label="Listar Produtos" href="/admin/products" />
          <DropdownItem label="Novo Produto" href="#" />
        </DropdownMenu>

        <DropdownMenu icon={<Users />} text="Users">
          <DropdownItem label="Listar Usuários" href="/admin/users" />
          <DropdownItem label="Novo Usuário" href="#" />
        </DropdownMenu>

        <DropdownMenu icon={<ClipboardList />} text="Pedidos">
          <DropdownItem label="Listar Pedidos" href="/admin/orders" />
        </DropdownMenu>

        <SidebarItem href="#" icon={<Settings />} text="Configurações" />
      </Sidebar>

      <AdminHeader />

      <div className="flex rounded-2xl p-5 overflow-y-auto">{children}</div>
    </div>
  );
}
