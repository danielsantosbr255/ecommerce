import React from "react";
import { redirect } from "next/navigation";
import { IoMdSettings } from "react-icons/io";
import { userService } from "@/services/users";
import { AiFillProduct } from "react-icons/ai";
import AdminHeader from "./components/AdminHeader";
import { FaBoxesPacking } from "react-icons/fa6";
import { MdLibraryAddCheck } from "react-icons/md";
import { Sidebar, SidebarItem } from "@/app/admin/components/Sidebar";
import { FaBoxes, FaClipboardList, FaHome, FaUsers, FaUsersCog, FaWindowClose } from "react-icons/fa";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await userService.getOwn();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="bg-bg-primary h-screen gap-2 p-2 grid grid-cols-1 grid-rows-[auto_1fr]">
      <AdminHeader user={user} />

      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] grid-rows-[auto_1fr] gap-2">
        <Sidebar className="row-span-2">
          <SidebarItem href="/admin" icon={<FaHome size={20} />} text="Inicio" />

          <SidebarItem href="/admin/products" icon={<FaBoxes size={20} />} text="Produtos" />
          <SidebarItem href="/admin/categories" icon={<FaClipboardList size={20} />} text="Categorias" />
          <SidebarItem href="/admin/brands" icon={<AiFillProduct size={20} />} text="Marcas" />
          <SidebarItem href="/admin/users" icon={<FaUsers size={20} />} text="Usuários" />
          <SidebarItem href="/admin/orders" icon={<FaBoxesPacking size={20} />} text="Pedidos" />

          <SidebarItem href="/admin/permissions" icon={<MdLibraryAddCheck size={20} />} text="Permissões" />
          <SidebarItem href="/admin/roles" icon={<FaUsersCog size={20} />} text="Cargos" />
          <SidebarItem href="/admin/sessions" icon={<FaWindowClose size={20} />} text="Sessões" />
          <SidebarItem href="#" icon={<IoMdSettings size={20} />} text="Configurações" />
        </Sidebar>

        <div className="flex overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
