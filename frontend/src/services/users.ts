// import api from "@/lib/axios";
import { api } from "@/lib/api";
import { User } from "@/types";
import { cache } from "react";

const fetchOwnUser = cache(async () => {
  try {
    const response = await api.get<User>("/users/me");
    return response.data;
  } catch {
    return null;
  }
});

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
    return fetchOwnUser();
  }

  public async getAll() {
    try {
      const response = await api.get<User[]>("/users");
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
