import api from "@/lib/api/axios";

class AuthService {
  public async signUp(credentials: { name: string; email: string; password: string }) {
    try {
      await api.post("/auth/signup", credentials);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  public async signIn(credentials: { email: string; password: string }) {
    try {
      await api.post("/auth/signin", credentials);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  public async signOut() {
    try {
      await api.post("/auth/logout");
    } finally {
      return true;
    }
  }
}

export const authService = new AuthService();
