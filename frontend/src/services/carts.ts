import api from "@/lib/axios";
import { Cart, CartItem } from "@/types";

class CartService {
  public async create(productId: string, quantity: number = 1): Promise<CartItem | null> {
    try {
      const response = await api.post("/carts", { productId, quantity });
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getAll(): Promise<Cart[] | null> {
    try {
      const response = await api.get("/carts");
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getOwnCart(): Promise<CartItem[] | null> {
    try {
      const response = await api.get("/cart");
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getOne(id: string): Promise<Cart | null> {
    try {
      const response = await api.get(`/carts/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async update(id: string, cartData: Partial<CartItem>) {
    try {
      const response = await api.put(`/carts/${id}`, cartData);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async delete(id: string) {
    try {
      const response = await api.delete(`/carts/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async clearCart() {
    try {
      const response = await api.delete("/cart");
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export const cartService = new CartService();
