import React from "react";
import { redirect } from "next/navigation";
import AdminHeader from "./components/AdminHeader";
import { Sidebar, SidebarItem } from "@/app/admin/components/Sidebar";
import { FaClipboardList, FaUsers, FaUsersCog, FaWindowClose } from "react-icons/fa";
import { MdLibraryAddCheck, MdSpaceDashboard } from "react-icons/md";
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
        <SidebarItem href="/admin" icon={<MdSpaceDashboard size={20} />} text="Dashboard" alert />

        <SidebarItem href="/admin/products" icon={<AiFillProduct size={20} />} text="Produtos" />
        <SidebarItem href="/admin/categories" icon={<FaClipboardList size={20} />} text="Categorias" />
        <SidebarItem href="/admin/brands" icon={<AiFillProduct size={20} />} text="Marcas" />
        <SidebarItem href="/admin/users" icon={<FaUsers size={20} />} text="Usuários" />
        <SidebarItem href="/admin/orders" icon={<FaClipboardList size={20} />} text="Pedidos" />

        <SidebarItem href="/admin/permissions" icon={<MdLibraryAddCheck size={20} />} text="Permissões" />
        <SidebarItem href="/admin/roles" icon={<FaUsersCog size={20} />} text="Cargos" />
        <SidebarItem href="/admin/sessions" icon={<FaWindowClose size={20} />} text="Sessões" />
        <SidebarItem href="#" icon={<IoMdSettings size={20} />} text="Configurações" />
      </Sidebar>

      <AdminHeader />

      <div className="flex rounded-2xl p-5 overflow-y-auto">{children}</div>
    </div>
  );
}
