"use client";
import { User } from "@/types";
import { authService } from "@/services/auth";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: unknown;
  signUp: (credentials: { name: string; email: string; password: string }) => Promise<boolean>;
  signIn: (credentials: { email: string; password: string }) => Promise<boolean>;
  signOut: () => Promise<void>;
  loadUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);
  const router = useRouter();
  const pathname = usePathname();

  const loadUser = async () => {
    setLoading(true);
    const userData = await authService.getCurrentUser();
    if (userData) setUser(userData);
    else setError(error);
    setLoading(false);
  };

  const signUp = async (credentials: { name: string; email: string; password: string }) => {
    const success = await authService.signUp(credentials);
    if (success) {
      await loadUser();
      router.push("/account");
    }
    return success;
  };

  const signIn = async (credentials: { email: string; password: string }) => {
    const success = await authService.signIn(credentials);
    if (success) {
      await loadUser();
      router.push("/account");
    }
    return success;
  };

  const signOut = async () => {
    await authService.signOut();
    setUser(null);
    router.push("/auth/sign-in");
  };

  useEffect(() => {
    loadUser();
  }, [pathname]);

  return (
    <AuthContext.Provider value={{ user, loading, error, signUp, signIn, signOut, loadUser }}>
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
