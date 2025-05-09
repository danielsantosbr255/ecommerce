import React from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { userService } from "@/services/users";
import { setServerCookies } from "@/lib/api/axios";
import AdminHeader from "@/components/admin/AdminHeader";
import { Sidebar, SidebarItem } from "@/components/layout/Sidebar";
import { DropdownMenu, DropdownItem } from "@/components/ui/DropdownMenu";
import { LayoutDashboard, Package, ClipboardList, Users, Settings } from "lucide-react";

export const metadata: Metadata = {
  title: "Fireforge Labs - Admin",
  description: "Criado por Daniel Santos",
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  setServerCookies((await cookies()).toString());
  const user = await userService.getOwn();

  if (user?.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="bg-bg-primary h-screen gap-2 p-2 grid grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
      <Sidebar className="row-span-2">
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
