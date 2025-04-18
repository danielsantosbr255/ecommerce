import { CartItem } from "@/types/CartType";
import { toast } from "react-toastify";
const CART_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/cart`;

class CartUtils {
  static createCartItem = async (accessToken: string | null, product: FormData) => {
    try {
      const res = await fetch(`${CART_API_URL}`, {
        method: "POST",
        body: product,
        credentials: "include",
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) throw new Error("Falha ao criar produto");
      return await res.json();
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      toast.error("Falha ao criar produto");
      return null;
    }
  };

  static fetchCartItems = async (accessToken: string | null) => {
    try {
      const res = await fetch(CART_API_URL, {
        cache: "no-store",
        credentials: "include",
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!res.ok) {
        const errorData = await res.json();
        const errorMessage = errorData?.message || "Erro ao carregar carrinho";
        toast.error(errorMessage);
        return null;
      }

      return (await res.json()) as CartItem[];
    } catch (error) {
      console.error("Erro ao carregar carrinho:", error);
      toast.error("Não foi possível carregar o carrinho.");
      return null;
    }
  };

  static updateCartItem = async (accessToken: string | null, id: string, quantity: number) => {
    try {
      const res = await fetch(`${CART_API_URL}/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify({ quantity }),
      });
      if (!res.ok) throw new Error("Falha ao atualizar produto");
      return await res.json();
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      toast.error("Falha ao atualizar produto");
      return null;
    }
  };

  static deleteCartItem = async (accessToken: string | null, id: string) => {
    try {
      const res = await fetch(`${CART_API_URL}/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) throw new Error("Falha ao deletar produto");
      return await res.json();
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      toast.error("Falha ao deletar produto");
      return null;
    }
  };

  static clearCart = async (accessToken: string | null) => {
    try {
      const res = await fetch(`${CART_API_URL}`, {
        method: "DELETE",
        credentials: "include",
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) throw new Error("Falha ao limpar carrinho");
      return await res.json();
    } catch (error) {
      console.error("Erro ao limpar carrinho:", error);
      toast.error("Falha ao limpar carrinho");
      return null;
    }
  };
}

export default CartUtils;
