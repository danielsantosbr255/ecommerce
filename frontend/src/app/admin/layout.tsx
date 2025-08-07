import React from "react";
import { redirect } from "next/navigation";
import { IoMdSettings } from "react-icons/io";
import { userService } from "@/services/users";
import AdminHeader from "./components/AdminHeader";
import { FaBoxesPacking } from "react-icons/fa6";
import { MdLibraryAddCheck } from "react-icons/md";
import { Sidebar, SidebarItem } from "@/app/admin/components/Sidebar";
import { FaBoxes, FaHome, FaUsers, FaUsersCog, FaWindowClose } from "react-icons/fa";
import { MdLocalFireDepartment } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fireforge Labs - Painel de Administração",
  description:
    "Painel de administração do ecommerce Fireforge Labs, aqui você pode gerenciar os produtos, usuários, pedidos e muito mais.",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await userService.getOwn();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="bg-bg-primary w-full h-full min-h-screen gap-2 p-2 grid grid-cols-[auto_1fr] grid-rows-1">
      <Sidebar>
        <SidebarItem href="/admin" icon={<FaHome size={20} />} text="Inicio" />

        <SidebarItem href="/admin/products" icon={<FaBoxes size={20} />} text="Produtos" />
        <SidebarItem href="/admin/categories" icon={<BiSolidCategoryAlt size={20} />} text="Categorias" />
        <SidebarItem href="/admin/brands" icon={<MdLocalFireDepartment size={20} />} text="Marcas" />
        <SidebarItem href="/admin/users" icon={<FaUsers size={20} />} text="Usuários" />
        <SidebarItem href="/admin/orders" icon={<FaBoxesPacking size={20} />} text="Pedidos" />

        <SidebarItem href="/admin/permissions" icon={<MdLibraryAddCheck size={20} />} text="Permissões" />
        <SidebarItem href="/admin/roles" icon={<FaUsersCog size={20} />} text="Cargos" />
        <SidebarItem href="/admin/sessions" icon={<FaWindowClose size={20} />} text="Sessões" />
        <SidebarItem href="#" icon={<IoMdSettings size={20} />} text="Configurações" />
      </Sidebar>

      <div className="grid grid-cols-1 grid-rows-[auto_1fr] gap-2">
        <AdminHeader user={user} />

        <div className="flex overflow-y-auto h-full">{children}</div>
      </div>
    </div>
  );
}
