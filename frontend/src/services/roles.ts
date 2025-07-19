import { api } from "@/lib/api";
import { Role } from "@/types";

class RoleService {
  public async create(roleData: Omit<Role, "id" | "users" | "permissions">) {
    try {
      const response = await api.post<Role>("/roles", roleData);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getAll() {
    try {
      const response = await api.get<Role[]>("/roles", {
        cache: "force-cache",
        next: { revalidate: 60 },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getOne(id: string) {
    try {
      const response = await api.get<Role>(`/roles/${id}`, {
        cache: "force-cache",
        next: { revalidate: 60 },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async update(id: string, roleData: Partial<Role>) {
    try {
      const response = await api.put<Role>(`/roles/${id}`, roleData);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async delete(id: string) {
    try {
      const response = await api.delete(`/roles/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export const roleService = new RoleService();
