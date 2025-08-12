import React from "react";
import { Metadata } from "next";
import AdminHeader from "./_components/AdminHeader";
import { PrivateRoute } from "@/providers/PrivateRoute";
import { AdminSidebar } from "./_components/AdminSidebar";

export const metadata: Metadata = {
  title: "Fireforge Labs - Painel de Administração",
  description:
    "Painel de administração do ecommerce Fireforge Labs, aqui você pode gerenciar os produtos, usuários, pedidos e muito mais.",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <PrivateRoute admin={true}>
      <div className="bg-bg-primary w-full h-full min-h-screen gap-2 p-2 grid grid-cols-[auto_1fr] grid-rows-1">
        <AdminSidebar />

        <div className="grid grid-cols-1 grid-rows-[auto_1fr] gap-2">
          <AdminHeader />
          <div className="flex overflow-y-auto h-full">{children}</div>
        </div>
      </div>
    </PrivateRoute>
  );
}
