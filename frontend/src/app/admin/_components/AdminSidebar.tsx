"use client";

import { IoMdSettings } from "react-icons/io";
import { FaBoxesPacking } from "react-icons/fa6";
import { MdLibraryAddCheck } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { MdLocalFireDepartment } from "react-icons/md";
import { Sidebar, SidebarItem } from "@/app/admin/_components/Sidebar";
import { FaBoxes, FaHome, FaUsers, FaUsersCog, FaWindowClose } from "react-icons/fa";
import { useAuth } from "@/providers/AuthContext";

export function AdminSidebar() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const can = (action: string, subject: string) => {
    const permissions = user.roles.flatMap((ur) => ur.role.permissions.map((rp) => rp.permission));

    if (permissions.find((p) => p.action === "manage" && p.subject === "all")) {
      return true;
    }
    return permissions.find((p) => p.action === action && p.subject === subject);
  };

  return (
    <Sidebar>
      <SidebarItem href="/admin" icon={<FaHome size={20} />} text="Inicio" />

      {can("manage", "Product") && <SidebarItem href="/admin/products" icon={<FaBoxes size={20} />} text="Produtos" />}
      {can("manage", "Category") && (
        <SidebarItem href="/admin/categories" icon={<BiSolidCategoryAlt size={20} />} text="Categorias" />
      )}
      {can("manage", "Brand") && <SidebarItem href="/admin/brands" icon={<MdLocalFireDepartment size={20} />} text="Marcas" />}
      {can("manage", "User") && <SidebarItem href="/admin/users" icon={<FaUsers size={20} />} text="Usuários" />}
      {can("manage", "Order") && <SidebarItem href="/admin/orders" icon={<FaBoxesPacking size={20} />} text="Pedidos" />}

      {can("manage", "Permission") && (
        <SidebarItem href="/admin/permissions" icon={<MdLibraryAddCheck size={20} />} text="Permissões" />
      )}
      {can("manage", "Role") && <SidebarItem href="/admin/roles" icon={<FaUsersCog size={20} />} text="Cargos" />}
      {can("manage", "Session") && <SidebarItem href="/admin/sessions" icon={<FaWindowClose size={20} />} text="Sessões" />}
      <SidebarItem href="#" icon={<IoMdSettings size={20} />} text="Configurações" />
    </Sidebar>
  );
}
