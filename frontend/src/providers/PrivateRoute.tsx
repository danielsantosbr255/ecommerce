"use client";

import LoadingState from "@/components/ui/LoadingState";
import { useAuth } from "@/providers/AuthContext";
import { redirect } from "next/navigation";

export const PrivateRoute = ({ children, admin }: { children: React.ReactNode; admin?: boolean }) => {
  const { user, userLoading } = useAuth();

  if (userLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LoadingState label="Verificando autorização" />
      </div>
    );
  }

  if (!user) redirect("/sign-in");

  const isStaff = user && user.roles.length > 0;

  if (admin && !isStaff) {
    redirect("/account");
  }

  return <>{children}</>;
};
