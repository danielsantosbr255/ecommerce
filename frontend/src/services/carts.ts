import api from "@/lib/axios";
import { Cart, CartItem } from "@/types";

class CartService {
  public async create(productId: string, quantity: number = 1): Promise<CartItem | null> {
    try {
      const response = await api.post("/carts", { productId, quantity });
      return response.data;
    } catch {
      return null;
    }
  }

  public async getAll(): Promise<Cart[] | null> {
    try {
      const response = await api.get("/carts");
      return response.data;
    } catch {
      return null;
    }
  }

  public async getOwnCart(): Promise<CartItem[] | null> {
    try {
      const response = await api.get("/cart");
      return response.data;
    } catch {
      return null;
    }
  }

  public async getOne(id: string): Promise<Cart | null> {
    try {
      const response = await api.get(`/carts/${id}`);
      return response.data;
    } catch {
      return null;
    }
  }

  public async update(id: string, quantity: number) {
    try {
      const response = await api.put(`/carts/${id}`, { quantity });
      return response.data;
    } catch {
      return null;
    }
  }

  public async delete(id: string) {
    try {
      const response = await api.delete(`/carts/${id}`);
      return response.data;
    } catch {
      return null;
    }
  }

  public async clearCart() {
    const response = await api.delete("/carts");
    return response.data;
  }
}

export const cartService = new CartService();
