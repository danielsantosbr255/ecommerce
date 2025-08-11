"use client";

import { toast } from "react-toastify";
import { authService } from "@/services/auth";
import { userService } from "@/services/users";
import { cartService } from "@/services/carts";
import { redirect, useRouter } from "next/navigation";
import { CartItem, SignInFormData, SignUpFormData, User } from "@/types";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface AuthContextType {
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
  addToCart: (productId: string, quantity: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [userLoading, setUserLoading] = useState<boolean>(true);
  const [cartLoading, setCartLoading] = useState<boolean>(true);
  const [cartItems, setCartItems] = useState<CartItem[] | null>(null);
  const route = useRouter();
  const queryClient = useQueryClient();

  const loadUser = useCallback(async () => {
    setUserLoading(true);
    const user = await userService.getOwn();
    setUser(user);
    setUserLoading(false);
  }, []);

  const signUp = useCallback(
    async ({ name, email, password }: SignUpFormData) => {
      try {
        setLoading(true);
        const result = await authService.signUp({ name, email, password });

        if (result && result.session) {
          sessionStorage.setItem("accessToken", result.session.accessToken);
          await loadUser();
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
    [route, loadUser]
  );

  const signIn = useCallback(
    async ({ email, password }: SignInFormData) => {
      try {
        setLoading(true);
        const result = await authService.signIn({ email, password });

        if (result && result.session) {
          sessionStorage.setItem("accessToken", result.session.accessToken);
          await loadUser();
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
    [route, loadUser]
  );

  const signOut = useCallback(async () => {
    setLoading(true);
    try {
      await authService.signOut();
      queryClient.invalidateQueries();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setCartItems(null);
      sessionStorage.removeItem("accessToken");
      toast.success("Deslogado com sucesso!");
      setLoading(false);
      redirect("/sign-in");
    }
  }, [queryClient]);

  const loadCart = useCallback(async () => {
    setCartLoading(true);
    const cartItems = await cartService.getOwnCart();
    setCartItems(cartItems);
    setCartLoading(false);
  }, []);

  const addToCart = useCallback(
    async (productId: string, quantity: number) => {
      if (!user) {
        toast.error("Você precisa estar logado para adicionar produtos ao carrinho.");
        return;
      }

      setLoading(true);
      const newCartItem = await cartService.create(productId, quantity);

      if (newCartItem) {
        await loadCart();
        toast.success("Produto adicionado ao carrinho");
      } else {
        toast.error("Erro ao adicionar produto ao carrinho");
      }
      setLoading(false);
    },
    [loadCart, user]
  );

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
        cartItems,
        signUp,
        signIn,
        signOut,
        loadCart,
        addToCart,
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
