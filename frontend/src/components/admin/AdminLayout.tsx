"use client";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Package, Users, Store, ClipboardList, ShieldUser } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();

    const isAdmin = user?.role === "ADMIN";

    if (!isAdmin) {
        window.location.replace("/");
        return null;
    }

    return (
        <div className="flex h-screen">
            <aside className="w-64 bg-gray-50 text-gray-700 space-y-4 h-screen shadow-lg z-50 grid grid-rows-[auto_1fr]">
                <div className="flex gap-2 items-center justify-center h-16 m-0 bg-amber-500 font-bold text-lg">
                    <ShieldUser /> Painel Administrativo
                </div>
                <nav className="flex flex-col p-4 space-y-2 h-full font-semibold border-y border-gray-300">
                    <Link
                        href="/admin/products"
                        className="flex gap-2 p-2 hover:bg-gray-200 rounded-md"
                    >
                        <Package /> Gerenciar Produtos
                    </Link>
                    <Link
                        href="/admin/orders"
                        className="flex gap-2 p-2 hover:bg-gray-200 rounded-md"
                    >
                        <ClipboardList /> Gerenciar Pedidos
                    </Link>
                    <Link
                        href="/admin/users"
                        className="flex gap-2 p-2 hover:bg-gray-200 rounded-md"
                    >
                        <Users /> Gerenciar Usuários
                    </Link>
                </nav>
                <div className="bg-amber-500 flex items-center justify-center p-4 text-lg text-gray-800 font-semibold gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <Store /> Voltar para Loja
                    </Link>
                </div>
            </aside>
            <main className="flex-1 overflow-y-auto p-6 bg-gray-100">{children}</main>
        </div>
    );
}
