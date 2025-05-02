import api from "@/lib/api/axios";

class AdminService {
  public async getUsers() {
    try {
      const response = await api.get("/users");
      return response.data;
    } catch (error) {
      return null;
    }
  }

  public async getUser(id: string) {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      return null;
    }
  }

  public async getOrdersByUser(id: string) {
    try {
      const response = await api.get(`/users/${id}/orders`);
      return response.data;
    } catch (error) {
      return null;
    }
  }

  public async getOrder(id: string) {
    try {
      const response = await api.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      return null;
    }
  }

  public async getOrders() {
    try {
      const response = await api.get("/orders");
      return response.data;
    } catch (error) {
      return null;
    }
  }

  public async getProducts() {
    try {
      const response = await api.get("/products");
      return response.data;
    } catch (error) {
      return null;
    }
  }

  public async getCategories() {
    try {
      const response = await api.get("/categories");
      return response.data;
    } catch (error) {
      return null;
    }
  }

  public async getBrands() {
    try {
      const response = await api.get("/brands");
      return response.data;
    } catch (error) {
      return null;
    }
  }

  public async getSizes() {
    try {
      const response = await api.get("/sizes");
      return response.data;
    } catch (error) {
      return null;
    }
  }

  public async getReviews() {
    try {
      const response = await api.get("/reviews");
      return response.data;
    } catch (error) {
      return null;
    }
  }

  public async getSettings() {
    try {
      const response = await api.get("/settings");
      return response.data;
    } catch (error) {
      return null;
    }
  }
}

export const adminService = new AdminService();
