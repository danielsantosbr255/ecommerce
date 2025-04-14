"use client";
import { createContext, useContext, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { CartItem } from "@/types/CartType";
import { toast } from "react-toastify";

interface ApiContextType {
  fetchCart: () => Promise<CartItem[] | null>;
  removeItemFromCart: (itemId: string) => Promise<boolean>;
  clearCart: () => Promise<boolean>;
  updateItemQuantity: (itemId: string, quantity: number) => Promise<CartItem | null>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
  const { accessToken } = useAuth();
  const CART_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/cart`;

  const fetchCart = useCallback(async (): Promise<CartItem[] | null> => {
    try {
      const res = await fetch(CART_API_URL, {
        cache: "no-store",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        const errorMessage = errorData?.message || "Erro ao carregar carrinho";
        toast.error(errorMessage);
        return null;
      }

      const data = await res.json();
      return data as CartItem[];
    } catch (error) {
      console.error("Erro ao carregar carrinho:", error);
      toast.error("Não foi possível carregar o carrinho.");
      return null;
    }
  }, [accessToken, CART_API_URL]);

  const removeItemFromCart = useCallback(
    async (itemId: string): Promise<boolean> => {
      try {
        const res = await fetch(`${CART_API_URL}/${itemId}`, {
          method: "DELETE",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          const errorMessage = errorData?.message || "Erro ao remover item";
          toast.error(errorMessage);
          return false;
        }

        toast.success("Item removido do carrinho.");
        return true;
      } catch (error) {
        console.error("Erro ao remover item:", error);
        toast.error("Não foi possível remover o item.");
        return false;
      }
    },
    [accessToken, CART_API_URL]
  );

  const clearCart = useCallback(async (): Promise<boolean> => {
    try {
      const res = await fetch(`${CART_API_URL}/clear`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        const errorMessage = errorData?.message || "Erro ao limpar carrinho";
        toast.error(errorMessage);
        return false;
      }

      toast.success("Carrinho limpo com sucesso!");
      return true;
    } catch (error) {
      console.error("Erro ao limpar carrinho:", error);
      toast.error("Não foi possível limpar o carrinho.");
      return false;
    }
  }, [accessToken, CART_API_URL]);

  const updateItemQuantity = useCallback(
    async (itemId: string, quantity: number): Promise<CartItem | null> => {
      try {
        const res = await fetch(`${CART_API_URL}/${itemId}`, {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ quantity }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          const errorMessage = errorData?.message || "Erro ao atualizar quantidade";
          toast.error(errorMessage);
          return null;
        }

        const data = await res.json();
        toast.success("Quantidade atualizada.");
        return data as CartItem;
      } catch (error) {
        console.error("Erro ao atualizar quantidade:", error);
        toast.error("Não foi possível atualizar a quantidade.");
        return null;
      }
    },
    [accessToken, CART_API_URL]
  );

  return (
    <ApiContext.Provider value={{ fetchCart, removeItemFromCart, clearCart, updateItemQuantity }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};
