import { api } from "@/lib/api";
import { Permission } from "@/types";

class PermissionService {
  public async create(permissionData: Omit<Permission, "id">) {
    try {
      const response = await api.post("/permissions", permissionData);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getAll() {
    try {
      const response = await api.get<Permission[]>("/permissions", { _auth: true });
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getOne(slug: string) {
    try {
      const response = await api.get<Permission>(`/permissions/${slug}`, { _auth: true });
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async update(slug: string, permissionData: Partial<Permission>) {
    try {
      const response = await api.put<Permission>(`/permissions/${slug}`, permissionData);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async delete(slug: string) {
    try {
      const response = await api.delete(`/permissions/${slug}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export const permissionService = new PermissionService();
