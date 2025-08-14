import { api } from "@/lib/api";
import { Permission } from "@/types";

class PermissionService {
  public async create(permissionData: Omit<Permission, "id">) {
    try {
      const response = await api.post("/permissions", permissionData);
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/revalidate?tag=permissions`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getAll() {
    try {
      const response = await api.get<Permission[]>("/permissions", {
        cache: "force-cache",
        next: { revalidate: 1800, tags: ["permissions"] },
        _auth: true,
      });
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
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/revalidate?tag=permissions`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async delete(slug: string) {
    try {
      const response = await api.delete(`/permissions/${slug}`);
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/revalidate?tag=permissions`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export const permissionService = new PermissionService();
