"use client";
import { CartItem, User } from "@/types";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth";
import { userService } from "@/services/users";
import { cartService } from "@/services/carts";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  userLoading: boolean;
  cartLoading: boolean;
  error: unknown;
  cartItems: CartItem[] | null;
  signUp: (credentials: { name: string; email: string; password: string }) => Promise<boolean>;
  signIn: (credentials: { email: string; password: string }) => Promise<boolean>;
  signOut: () => Promise<void>;
  loadUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [userLoading, setUserLoading] = useState<boolean>(true);
  const [cartLoading, setCartLoading] = useState<boolean>(true);
  const [cartItems, setCartItems] = useState<CartItem[] | null>(null);
  const router = useRouter();

  const loadUser = useCallback(async () => {
    setLoading(true);
    setUserLoading(true);

    const userData = await userService.getOwn();

    if (userData) setUser(userData);
    else setUser(null);

    setLoading(false);
    setUserLoading(false);
  }, []);

  const getCartItems = useCallback(async () => {
    setCartLoading(true);
    const cart = await cartService.getOwnCart();
    if (cart) setCartItems(cart);
    else setCartItems(null);
    setCartLoading(false);
  }, []);

  const signUp = async (credentials: { name: string; email: string; password: string }) => {
    setLoading(true);
    const success = await authService.signUp(credentials);
    if (success) {
      await loadUser();
      toast.success("Conta criada com sucesso!");
      router.push("/account");
    } else {
      setError("Erro ao criar conta.");
      toast.error("Erro ao criar conta.");
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
      setError("Credenciais inválidas.");
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

  const initialize = useCallback(async () => {
    await loadUser();
    await getCartItems();
  }, [loadUser, getCartItems]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <AuthContext.Provider
      value={{ user, userLoading, loading, cartLoading, error, cartItems, signUp, signIn, signOut, loadUser }}
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
