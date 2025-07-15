import { api } from "@/lib/api";
import { Role } from "@/types";

class RoleService {
  public async create(roleData: Omit<Role, "id">) {
    try {
      const response = await api.post("/roles", roleData);
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

  public async getOne(slug: string) {
    try {
      const response = await api.get<Role>(`/roles/${slug}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async update(slug: string, roleData: Partial<Role>) {
    try {
      const response = await api.put<Role>(`/roles/${slug}`, roleData);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async delete(slug: string) {
    try {
      const response = await api.delete(`/roles/${slug}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export const roleService = new RoleService();
