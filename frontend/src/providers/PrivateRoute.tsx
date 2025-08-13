"use client";

import LoadingState from "@/components/ui/LoadingState";
import { useAuth } from "@/providers/AuthContext";
import { redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
  admin?: boolean;
  className?: string;
}

export const ProtectedRoute = ({ children, admin, className }: Props) => {
  const { user, userLoading } = useAuth();

  if (userLoading) {
    return (
      <div className={`w-full flex flex-1 items-center justify-center ${className}`}>
        <LoadingState label="Verificando autenticação" />
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
