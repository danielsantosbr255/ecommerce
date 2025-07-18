import React from "react";
import { redirect } from "next/navigation";
import { userService } from "@/services/users";
import SidebarLayout from "./_components/SidebarLayout";

async function Layout({ children }: { children: React.ReactNode }) {
  const user = await userService.getOwn();

  if (!user) redirect("/sign-in");

  return (
    <>
      <SidebarLayout />
      <main className="grid grid-rows-1 grid-cols-1 w-full h-full">{children}</main>
    </>
  );
}

export default Layout;
