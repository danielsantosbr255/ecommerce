const isServer = typeof window === "undefined";

class AuthManager {
  private _csrf: string | null = null;

  get(): string | null {
    if (!isServer) return sessionStorage.getItem("_csrf");
    return this._csrf;
  }

  set(token: string): void {
    if (!isServer) sessionStorage.setItem("_csrf", token);
    this._csrf = token;
  }

  clear(): void {
    if (!isServer) sessionStorage.removeItem("_csrf");
    this._csrf = null;
  }
}

export const authManager = new AuthManager();
