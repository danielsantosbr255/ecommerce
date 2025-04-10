"use client";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import {
    Package,
    Users,
    Store,
    ClipboardList,
    ShieldUser,
    LayoutDashboard,
    Settings,
    Bell,
    Power,
} from "lucide-react";
import Image from "next/image";
import React from "react";

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const { user, logout } = useAuth();

    const isAdmin = user?.role === "ADMIN";

    if (!isAdmin) {
        window.location.replace("/");
        return null;
    }

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-white py-8 px-4 shadow-md flex flex-col justify-between z-50">
                <div>
                    <Link href="/admin" className="flex items-center space-x-2 mb-6">
                        <LayoutDashboard className="text-amber-500" size={24} />
                        <span className="text-xl font-bold text-gray-800">Admin Panel</span>
                    </Link>
                    <nav className="space-y-3">
                        <Link
                            href="/admin/products"
                            className="flex items-center space-x-2 text-gray-700 hover:text-amber-500"
                        >
                            <Package size={20} />
                            <span>Gerenciar Produtos</span>
                        </Link>
                        <Link
                            href="/admin/orders"
                            className="flex items-center space-x-2 text-gray-700 hover:text-amber-500"
                        >
                            <ClipboardList size={20} />
                            <span>Gerenciar Pedidos</span>
                        </Link>
                        <Link
                            href="/admin/users"
                            className="flex items-center space-x-2 text-gray-700 hover:text-amber-500"
                        >
                            <Users size={20} />
                            <span>Gerenciar Usuários</span>
                        </Link>
                        <Link
                            href="/admin/settings"
                            className="flex items-center space-x-2 text-gray-700 hover:text-amber-500"
                        >
                            <Settings size={20} />
                            <span>Configurações</span>
                        </Link>
                        {/* Adicione mais links de navegação conforme necessário */}
                    </nav>
                </div>
                <button
                    onClick={logout}
                    className="flex items-center space-x-2 text-gray-600 hover:text-red-500 mt-8"
                >
                    <Power size={20} />
                    <span>Sair</span>
                </button>
                <div className="mt-6">
                    <Link
                        href="/"
                        className="flex items-center space-x-2 text-gray-600 hover:text-amber-500"
                    >
                        <Store size={20} />
                        <span>Voltar para Loja</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8 bg-gray-100">
                <header className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
                    <div className="flex items-center space-x-4">
                        <button className="relative">
                            <Bell size={20} className="text-gray-500 hover:text-gray-700" />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        {user?.image ? (
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                                <Image
                                    src={user.image}
                                    alt={user.name || "Admin"}
                                    width={32}
                                    height={32}
                                />
                            </div>
                        ) : (
                            <ShieldUser className="text-amber-500" size={32} />
                        )}
                        <span className="text-gray-700">{user?.name}</span>
                    </div>
                </header>

                {children}
            </main>
        </div>
    );
}
