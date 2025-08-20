import { Pagination, User } from "@/types";
import { api } from "@/lib/api";

interface UserResponse {
  data: User[];
  meta: Pagination;
}

interface UserQueryParams {
  page?: number;
  limit?: number;
}

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

  public async getMany(query: UserQueryParams = { page: 1, limit: 20 }) {
    const { page, limit } = query;
    const params: Record<string, string> = {};

    if (page) params["page"] = page.toString();
    if (limit) params["limit"] = limit.toString();

    const tag = `users-${JSON.stringify(params)}`;

    try {
      const response = await api.get<UserResponse>("/users", {
        cache: "force-cache",
        next: { revalidate: 3600, tags: ["users", tag] },
        params,
        _auth: true,
      });
      return response.data;
    } catch {
      return null;
    }
  }

  public async getOne(id: string) {
    try {
      const response = await api.get<User>(`/users/${id}`, { _auth: true });
      return response.data;
    } catch {
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
