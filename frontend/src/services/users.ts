import { User } from "@/types";
import { api } from "@/lib/api";

class UserService {
  public async create(userData: Omit<User, "id">) {
    try {
      const response = await api.post<User>("/users", userData);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getOwn() {
    try {
      const response = await api.get<User>("/users/me");
      return response.data;
    } catch {
      return null;
    }
  }

  public async getAll() {
    try {
      const response = await api.get<User[]>("/users", {
        cache: "force-cache",
        next: { revalidate: 30 },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getOne(id: string) {
    try {
      const response = await api.get<User>(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async update(id: string, userData: Partial<User>) {
    try {
      const response = await api.put<User>(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async delete(id: string) {
    try {
      const response = await api.delete<User>(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export const userService = new UserService();
