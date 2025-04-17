import React from "react";
import { Package, Users, Store, ClipboardList, LayoutDashboard, Settings, Power } from "lucide-react";
import Link from "next/link";

type SidebarProps = {
  logout: () => void;
};

const DesktopBar = ({ logout }: SidebarProps) => {
  return (
    <aside className="w-64 bg-white py-8 px-4 shadow-md hidden flex-col justify-between z-50 lg:flex">
      <div>
        <Link href="/admin" className="flex items-center space-x-2 mb-6">
          <LayoutDashboard className="text-highlight-n" size={24} />
          <span className="text-xl font-bold text-gray-800">Admin Panel</span>
        </Link>
        <nav className="space-y-3">
          <Link
            href="/admin/products"
            className="flex items-center space-x-2 text-gray-700 hover:text-highlight-n"
          >
            <Package size={20} />
            <span>Gerenciar Produtos</span>
          </Link>
          <Link
            href="/admin/orders"
            className="flex items-center space-x-2 text-gray-700 hover:text-highlight-n"
          >
            <ClipboardList size={20} />
            <span>Gerenciar Pedidos</span>
          </Link>
          <Link
            href="/admin/users"
            className="flex items-center space-x-2 text-gray-700 hover:text-highlight-n"
          >
            <Users size={20} />
            <span>Gerenciar Usuários</span>
          </Link>
          <Link href="/admin" className="flex items-center space-x-2 text-gray-700 hover:text-highlight-n">
            <Settings size={20} />
            <span>Configurações</span>
          </Link>
        </nav>
      </div>

      <div className="mt-6 flex justify-between">
        <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-highlight-n">
          <Store size={20} />
          <span>Voltar para Loja</span>
        </Link>
        <button onClick={logout} className="flex items-center space-x-2 text-gray-600 hover:text-red-500 ">
          <Power size={20} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
};

const MobileBar = () => {
  return (
    <div className="bg-white w-full flex fixed bottom-0 h-16 shadow-md items-center z-40 lg:hidden border-t border-gray-200">
      <nav className="grid grid-cols-5 items-center text-sm justify-center h-full w-full text-gray-700">
        <Link href="/admin" className="flex flex-col items-center hover:text-highlight-n">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>
        <Link href="/admin/products" className="flex flex-col items-center hover:text-highlight-n">
          <Package size={20} />
          <span>Produtos</span>
        </Link>
        <Link href="/admin/orders" className="flex flex-col items-center hover:text-highlight-n">
          <ClipboardList size={20} />
          <span>Pedidos</span>
        </Link>
        <Link href="/admin/users" className="flex flex-col items-center hover:text-highlight-n">
          <Users size={20} />
          <span>Usuários</span>
        </Link>
        <Link href="/admin" className="flex flex-col items-center hover:text-highlight-n">
          <Settings size={20} />
          <span>Configurações</span>
        </Link>
      </nav>
    </div>
  );
};

export default function Sidebar({ logout }: SidebarProps) {
  return (
    <main className="flex">
      <DesktopBar logout={logout} />
      <MobileBar />
    </main>
  );
}
