import { api } from "@/lib/api";
import { Order } from "@/types";

class OrderService {
  public async create() {
    try {
      const response = await api.post("/orders/checkout");
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getAll() {
    try {
      const response = await api.get<Order[]>("/orders");
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getOrder(id: string) {
    try {
      const response = await api.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async update(id: string, orderData: Partial<Order>) {
    try {
      const response = await api.put(`/orders/${id}`, orderData);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async delete(id: string) {
    try {
      const response = await api.delete(`/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export const orderService = new OrderService();
