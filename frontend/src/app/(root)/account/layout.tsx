import React from "react";
import SidebarLayout from "./_components/SidebarLayout";
import { ProtectedRoute } from "@/providers/PrivateRoute";

async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <SidebarLayout />
      <main className="grid grid-rows-1 grid-cols-1 w-full h-full">{children}</main>
    </ProtectedRoute>
  );
}

export default Layout;
