"use client";
import userUtil from "@/utils/user.util";
import { useRouter } from "next/navigation";
import { UserType } from "@/types/UserType";
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import useErrorHandler from "@/utils/error.util";
import ProductsUtil from "@/utils/products.util";
import { ProductType } from "@/types/ProductType";

interface AuthContextType {
  user: UserType | null;
  loading: boolean;
  error: unknown;
  accessToken: string | null;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchProducts: () => void;
  products: ProductType[];
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductType[]>([]);

  const router = useRouter();
  const { handleError } = useErrorHandler();

  // useEffect(() => {
  //   if (error) handleError(error);
  // }, [error, handleError]);

  const fetchUser = useCallback(async (token: string | null) => {
    setError(null);
    if (!token) return;
    try {
      const user = await userUtil.fetchUser(token);
      setUser(user);
      setAccessToken(token);
    } catch (error) {
      return setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const signUp = async (name: string, email: string, password: string) => {
    setError(null);
    try {
      const { accessToken } = await userUtil.signUp(name, email, password);
      setAccessToken(accessToken);
      router.push("/account");
    } catch (error) {
      return setError(error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setError(null);
    try {
      const { accessToken } = await userUtil.signin(email, password);
      setAccessToken(accessToken);
      router.push("/account");
    } catch (error) {
      return setError(error);
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = useCallback(async () => {
    setError(null);
    try {
      const accessToken = await userUtil.refreshToken();
      setAccessToken(accessToken);
      fetchUser(accessToken);
    } catch (error) {
      setError(error);
      setUser(null);
      setAccessToken(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = async () => {
    setError(null);
    try {
      await userUtil.logout();
    } catch (error) {
      setError(error);
    } finally {
      setUser(null);
      setLoading(false);
      setAccessToken(null);
      router.push("/auth/signin");
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const products = await ProductsUtil.fetchProducts();
      setProducts(products);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshToken();
    const interval = setInterval(refreshToken, 14 * 60 * 1000); // 14 minutos
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, error, accessToken, products, signUp, signIn, logout, fetchProducts }}
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
