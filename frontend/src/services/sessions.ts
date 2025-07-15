import { api } from "@/lib/api";
import { Session } from "@/types";

class SessionService {
  public async getAll() {
    try {
      const response = await api.get<Session[]>("/sessions", {
        cache: "force-cache",
        next: { revalidate: 60 },
      });
      return response.data;
    } catch {
      return null;
    }
  }

  public async getOne(id: string) {
    const res = await api.get<Session>(`/sessions/${id}`);
    return res.data;
  }

  public async update(id: string, data: Partial<Session>) {
    const res = await api.put<Session>(`/sessions/${id}`, data);
    return res.data;
  }

  public async delete(id: string) {
    await api.delete(`/sessions/${id}`);
    return true;
  }
}

export const sessionService = new SessionService();
