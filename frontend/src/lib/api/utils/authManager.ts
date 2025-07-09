const isServer = typeof window === "undefined";

class AuthManager {
  private accessToken: string | null = null;

  public get(): string | null {
    if (!isServer && typeof sessionStorage !== "undefined") {
      return sessionStorage.getItem("accessToken");
    }

    return this.accessToken;
  }

  public set(token: string): void {
    if (!isServer && typeof sessionStorage !== "undefined") {
      sessionStorage.setItem("accessToken", token);
    }
    this.accessToken = token;
  }

  public clear(): void {
    if (!isServer && typeof sessionStorage !== "undefined") {
      sessionStorage.removeItem("accessToken");
    }
    this.accessToken = null;
  }
}

export const authManager = new AuthManager();
