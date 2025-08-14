import { api } from "@/lib/api";
import { Session } from "@/types";

class SessionService {
  public async getAll() {
    try {
      const response = await api.get<Session[]>("/sessions", { _auth: true });
      return response.data;
    } catch {
      return null;
    }
  }

  public async getOne(id: string) {
    const res = await api.get<Session>(`/sessions/${id}`, { _auth: true });
    return res.data;
  }

  public async getByUserId(userId: string) {
    const res = await api.get<Session[]>(`/sessions/user/${userId}`, { _auth: true });
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
