"use client";
import { useAuth } from "@/contexts/AuthContext";
import { ShieldUser, Bell } from "lucide-react";
import Image from "next/image";
import React from "react";
import Sidebar from "../layout/Sidebar";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

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
      <Sidebar logout={logout} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-2 lg:p-8 bg-gray-100">
        <header className="flex items-center justify-between mb-6">
          <Link href="/" className="flex items-center font-semibold">
            <FaArrowLeft className="mr-3 group-hover:-translate-x-1 transition duration-300" />
            Voltar para a Loja
          </Link>
          <div className="flex items-center space-x-4">
            <button className="relative">
              <Bell size={20} className="text-secondary hover:text-gray-700" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            {user?.image ? (
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <Image src={user.image} alt={user.name || "Admin"} width={32} height={32} />
              </div>
            ) : (
              <ShieldUser className="text-highlight-n" size={32} />
            )}
            <span className="text-gray-700">{user?.name}</span>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
