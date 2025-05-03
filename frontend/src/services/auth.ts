import api, { setAccessToken, clearAuthTokens } from "@/lib/api/axios";

class AuthService {
  public async signUp(credentials: { name: string; email: string; password: string }) {
    try {
      const response = await api.post("/auth/signup", credentials);
      setAccessToken(response.data.accessToken);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  public async signIn(credentials: { email: string; password: string }) {
    try {
      const response = await api.post("/auth/signin", credentials);
      setAccessToken(response.data.accessToken);
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
      clearAuthTokens();
    }
  }

  public async getCurrentUser() {
    try {
      const response = await api.get("/account");
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async refreshToken() {
    try {
      const response = await api.post("/auth/refresh");
      setAccessToken(response.data.accessToken);
      return response.data.accessToken;
    } catch (error) {
      console.error(error);
      clearAuthTokens();
      return null;
    }
  }
}

export const authService = new AuthService();
