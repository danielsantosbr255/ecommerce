"use client";

import { toast } from "react-toastify";
import { authService } from "@/services/auth";
import { userService } from "@/services/users";
import { cartService } from "@/services/carts";
import { redirect, useRouter } from "next/navigation";
import { CartItem, SignInFormData, SignUpFormData, User } from "@/types";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

interface AuthContextType {
  error: unknown;
  user: User | null;
  loading: boolean;
  userLoading: boolean;
  cartLoading: boolean;
  cartItems: CartItem[] | null;
  signUp: (data: SignUpFormData) => Promise<void>;
  signIn: (data: SignInFormData) => Promise<void>;
  signOut: () => Promise<void>;
  loadUser: () => Promise<void>;
  loadCart: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [userLoading, setUserLoading] = useState<boolean>(true);
  const [cartLoading, setCartLoading] = useState<boolean>(true);
  const [cartItems, setCartItems] = useState<CartItem[] | null>(null);
  const route = useRouter();

  const loadUser = useCallback(async () => {
    setUserLoading(true);
    const user = await userService.getOwn();
    setUser(user);
    setUserLoading(false);
  }, []);

  const signUp = useCallback(
    async ({ name, email, password }: SignUpFormData) => {
      setLoading(true);
      const { session } = await authService.signUp({ name, email, password });

      if (!session) {
        setLoading(false);
        toast.error("Erro ao criar conta. Tente novamente.");
        return;
      }

      sessionStorage.setItem("accessToken", session.accessToken);
      await loadUser();
      route.push("/account");
      toast.success("Conta criada com sucesso!");
      setLoading(false);
    },
    [route, loadUser]
  );

  const signIn = useCallback(
    async ({ email, password }: SignInFormData) => {
      setLoading(true);
      const { session } = await authService.signIn({ email, password });

      if (!session) {
        setLoading(false);
        toast.error("Credenciais inválidas.");
        return;
      }

      sessionStorage.setItem("accessToken", session.accessToken);

      await loadUser();
      route.push("/account");
      toast.success("Logado com sucesso!");

      setLoading(false);
    },
    [route, loadUser]
  );

  const signOut = useCallback(async () => {
    setLoading(true);
    try {
      await authService.signOut();
    } catch (error) {
      setError(error);
    } finally {
      setUser(null);
      setCartItems(null);
      sessionStorage.removeItem("accessToken");
      toast.success("Deslogado com sucesso!");
      setLoading(false);
      redirect("/");
    }
  }, []);

  const loadCart = useCallback(async () => {
    setCartLoading(true);
    const cartItems = await cartService.getOwnCart();
    setCartItems(cartItems);
    setCartLoading(false);
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    if (user) loadCart();
    if (!user && !userLoading) setCartLoading(false);
  }, [user, loadCart, userLoading]);

  return (
    <AuthContext.Provider
      value={{
        user,
        userLoading,
        loading,
        cartLoading,
        error,
        cartItems,
        signUp,
        signIn,
        signOut,
        loadCart,
        loadUser,
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
