"use client";

import LoadingState from "@/components/ui/LoadingState";
import { useAuth } from "@/providers/AuthContext";
import { redirect } from "next/navigation";

export const PrivateRoute = ({ children, admin }: { children: React.ReactNode; admin?: boolean }) => {
  const { user, userLoading } = useAuth();

  if (userLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LoadingState label="Verificando autenticação" />
      </div>
    );
  }

  if (!user) {
    redirect("/sign-in");
  }

  const permissions = user.roles.flatMap((ur) => ur.role.permissions.map((rp) => rp.permission));
  // const hasPermission = (action: string, subject: string) => {
  //   return permissions.find((p) => p.action === action && p.subject === subject);
  // };

  if (admin && !permissions) {
    redirect("/sign-in");
  }

  // if (admin && !hasPermission("manage", "all")) {
  //   redirect("/sign-in");
  // }

  return <>{children}</>;
};
