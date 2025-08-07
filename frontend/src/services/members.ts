import { api } from "@/lib/api";
import { UserRole } from "@/types";

class UserRoleService {
  public async create(memberData: Omit<UserRole, "user" | "role">) {
    try {
      const response = await api.post<UserRole>("/members", memberData);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getAll() {
    try {
      const response = await api.get<UserRole[]>("/members", {
        cache: "force-cache",
        next: { revalidate: 3600 },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getOne(userId: string, roleId: number) {
    try {
      const response = await api.get<UserRole>(`/members/${userId}/${roleId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async update(userId: string, roleId: number, memberData: Partial<UserRole>) {
    try {
      const response = await api.put<UserRole>(`/members/${userId}/${roleId}`, memberData);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async delete(userId: string, roleId: number) {
    try {
      const response = await api.delete(`/members/${userId}/${roleId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export const memberService = new UserRoleService();
