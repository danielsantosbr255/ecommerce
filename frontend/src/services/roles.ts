import { api } from "@/lib/api";
import { Role } from "@/types";
import { RoleUpdateFormValues } from "@/lib/schemas/role.schema";

class RoleService {
  public async create(roleData: Pick<Role, "name" | "description">) {
    const response = await api.post<Role>("/roles", roleData);
    return response.data;
  }

  public async getAll() {
    try {
      const response = await api.get<Role[]>("/roles", { _auth: true });
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getOne(id: number) {
    try {
      const response = await api.get<Role>(`/roles/${id}`, { _auth: true });
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async update(id: number, roleData: RoleUpdateFormValues) {
    const response = await api.put<Role>(`/roles/${id}`, roleData);
    return response.data;
  }

  public async delete(id: number) {
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
