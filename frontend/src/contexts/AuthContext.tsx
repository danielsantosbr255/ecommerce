"use client";
import userUtil from "@/utils/user.util";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { UserType } from "@/types/UserType";

interface AuthContextType {
  user: UserType | null;
  loading: boolean;
  error: string | null;
  accessToken: string | null;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();

  const fetchUser = useCallback(async (token: string) => {
    const user = await userUtil.fetchUser(token);
    setUser(user);
    setAccessToken(token);
    setLoading(false);
  }, []);

  const signUp = async (name: string, email: string, password: string) => {
    setError(null);
    const { accessToken } = await userUtil.signUp(name, email, password);
    if (!accessToken) return setError("Falha ao cadastrar-se");

    fetchUser(accessToken);
    router.push("/account");
  };

  const login = async (email: string, password: string) => {
    setError(null);
    const { accessToken } = await userUtil.signin(email, password);
    if (!accessToken) return setError("Falha ao efetuar o login");

    await fetchUser(accessToken);
    router.push("/account");
  };

  const refreshToken = useCallback(async () => {
    const accessToken = await userUtil.refreshToken();
    console.log(accessToken)

    if (accessToken) return await fetchUser(accessToken);

    setUser(null);
    setLoading(false);
    setAccessToken(null);
    setError("Falha ao atualizar o token");
  }, [fetchUser]);

  const logout = async () => {
    await userUtil.logout();
    setUser(null);
    setAccessToken(null);
    router.push("/auth/signin");
  };

  useEffect(() => {
    refreshToken();
    const interval = setInterval(refreshToken, 14 * 60 * 1000); // 14 minutos
    return () => clearInterval(interval);
  }, [refreshToken]);

  return (
    <AuthContext.Provider value={{ user, loading, error, accessToken, signUp, login, logout }}>
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
