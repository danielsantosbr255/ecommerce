"use client";
import { User } from "@/types";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth";
import { userService } from "@/services/users";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  userLoading: boolean;
  error: unknown;
  signUp: (credentials: { name: string; email: string; password: string }) => Promise<boolean>;
  signIn: (credentials: { email: string; password: string }) => Promise<boolean>;
  signOut: () => Promise<void>;
  loadUser: () => Promise<User>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [userLoading, setUserLoading] = useState<boolean>(true);
  const router = useRouter();

  const loadUser = async (): Promise<User> => {
    setLoading(true);
    setUserLoading(true);
    const userData = await userService.getOwn();
    if (userData) setUser(userData);
    else setError(error);
    setLoading(false);
    setUserLoading(false);
    return userData;
  };

  const signUp = async (credentials: { name: string; email: string; password: string }) => {
    setLoading(true);
    const success = await authService.signUp(credentials);
    if (success) {
      await loadUser();
      toast.success("Conta criada com sucesso!");
      router.push("/account");
    }
    setLoading(false);
    return success;
  };

  const signIn = async (credentials: { email: string; password: string }) => {
    setLoading(true);
    const success = await authService.signIn(credentials);
    if (success) {
      await loadUser();
      toast.success("Logado com sucesso!");
      router.push("/account");
    } else {
      toast.error("Credenciais inválidas.");
    }
    setLoading(false);
    return success;
  };

  const signOut = async () => {
    await authService.signOut();
    setUser(null);
    router.push("/auth/sign-in");
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userLoading, loading, error, signUp, signIn, signOut, loadUser }}>
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
