import { User } from "@/types";
import { api } from "@/lib/api";

class UserService {
  public async create(userData: Omit<User, "id">) {
    try {
      const response = await api.post<User>("/users", userData);
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/revalidate?tag=users`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getOwn() {
    try {
      const response = await api.get<User>("/users/me", { _auth: true });
      return response.data;
    } catch {
      return null;
    }
  }

  public async getAll() {
    try {
      const response = await api.get<User[]>("/users", { _auth: true });
      return response.data;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error fetching users:", error);
      }
      return null;
    }
  }

  public async getOne(id: string) {
    try {
      const response = await api.get<User>(`/users/${id}`, { _auth: true });
      return response.data;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error(`Error fetching user with ID ${id}:`, error);
      }
      return null;
    }
  }

  public async update(id: string, userData: Partial<User>) {
    try {
      const response = await api.put<User>(`/users/${id}`, userData);
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/revalidate?tag=users`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async delete(id: string) {
    try {
      const response = await api.delete<User>(`/users/${id}`);
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/revalidate?tag=users`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export const userService = new UserService();
