const isServer = typeof window === "undefined";

class AuthManager {
  private accessToken: string | null = null;

  get(): string | null {
    if (!isServer) {
      return sessionStorage.getItem("accessToken");
    }
    return this.accessToken;
  }

  set(token: string): void {
    if (!isServer) {
      sessionStorage.setItem("accessToken", token);
    }
    this.accessToken = token;
  }

  clear(): void {
    if (!isServer) {
      sessionStorage.removeItem("accessToken");
    }
    this.accessToken = null;
  }
}

export const authManager = new AuthManager();
