import React from "react";
import { redirect } from "next/navigation";
import AdminHeader from "./components/AdminHeader";
import { Sidebar, SidebarItem } from "@/app/admin/components/Sidebar";
import { DropdownMenu, DropdownItem } from "@/components/ui/DropdownMenu";
import { FaClipboardList, FaUsers, FaWindowClose } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { userService } from "@/services/users";
import { authService } from "@/services/auth";
import { AiFillProduct } from "react-icons/ai";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const signOut = async () => {
  "use server";
  await authService.signOut();
  redirect("/sign-in");
};

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const user = await userService.getOwn();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="bg-bg-primary h-screen gap-2 p-2 grid grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
      <Sidebar className="row-span-2" user={user} signOut={signOut}>
        <SidebarItem href="/admin" icon={<MdSpaceDashboard size={25} />} text="Dashboard" alert />

        <DropdownMenu icon={<AiFillProduct size={25} />} text="Produtos">
          <DropdownItem label="Listar Produtos" href="/admin/products" />
          <DropdownItem label="Novo Produto" href="#" />
        </DropdownMenu>

        <DropdownMenu icon={<AiFillProduct size={25} />} text="Categorias">
          <DropdownItem label="Listar Categorias" href="/admin/categories" />
          <DropdownItem label="Nova Categoria" href="#" />
        </DropdownMenu>

        <DropdownMenu icon={<AiFillProduct size={25} />} text="Marcas">
          <DropdownItem label="Listar Categorias" href="/admin/brands" />
          <DropdownItem label="Nova Marca" href="#" />
        </DropdownMenu>

        <DropdownMenu icon={<FaUsers size={25} />} text="Users">
          <DropdownItem label="Listar Usuários" href="/admin/users" />
          <DropdownItem label="Novo Usuário" href="#" />
        </DropdownMenu>

        <DropdownMenu icon={<FaClipboardList size={25} />} text="Pedidos">
          <DropdownItem label="Listar Pedidos" href="/admin/orders" />
        </DropdownMenu>

        <SidebarItem href="/admin/sessions" icon={<FaWindowClose size={25} />} text="Sessões" />
        <SidebarItem href="#" icon={<IoMdSettings size={25} />} text="Configurações" />
      </Sidebar>

      <AdminHeader />

      <div className="flex rounded-2xl p-5 overflow-y-auto">{children}</div>
    </div>
  );
}
