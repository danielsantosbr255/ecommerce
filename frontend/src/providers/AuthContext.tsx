"use client";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth";
import { userService } from "@/services/users";
import { SignInFormData, SignUpFormData, User } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { createContext, useCallback, useContext, useState } from "react";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  userLoading: boolean;
  signUp: (data: SignUpFormData) => Promise<void>;
  signIn: (data: SignInFormData) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false);

  const route = useRouter();
  const queryClient = useQueryClient();

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => userService.getOne("me"),
    staleTime: 0,
  });

  const signUp = useCallback(
    async ({ name, email, password }: SignUpFormData) => {
      try {
        setLoading(true);
        const result = await authService.signUp({ name, email, password });

        if (result && result.session) {
          sessionStorage.setItem("accessToken", result.session.accessToken);
          route.push("/account");
          toast.success("Conta criada com sucesso!");
        }
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
        else toast.error("Erro ao criar conta. Tente novamente.");
        console.error("Signup error:", error);
      } finally {
        setLoading(false);
      }
    },
    [route]
  );

  const signIn = useCallback(
    async ({ email, password }: SignInFormData) => {
      try {
        setLoading(true);
        const result = await authService.signIn({ email, password });

        if (result && result.session) {
          sessionStorage.setItem("accessToken", result.session.accessToken);
          await queryClient.invalidateQueries({ queryKey: ["user"] });
          route.push("/account");
          toast.success("Logado com sucesso!");
        }
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
        else toast.error("Erro ao fazer login. Tente novamente.");
        console.error("Login error:", error);
      } finally {
        setLoading(false);
      }
    },
    [route, queryClient]
  );

  const signOut = useCallback(async () => {
    setLoading(true);
    try {
      await authService.signOut();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      route.push("/sign-in");
      sessionStorage.removeItem("accessToken");
      toast.success("Deslogado com sucesso!");
      setLoading(false);
      queryClient.clear();
    }
  }, [queryClient, route]);

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        userLoading,
        loading,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar o contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider.");
  }
  return context;
}
