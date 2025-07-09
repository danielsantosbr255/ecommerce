import { redirect } from "next/navigation";
import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

let accessToken: string | null = null;
const isServer = typeof window === "undefined";

const authManager = {
  set(token: string) {
    accessToken = token;
  },

  clear() {
    accessToken = null;
  },

  get() {
    return accessToken;
  },

  handleUnauthorized() {
    this.clear();
    if (isServer) redirect("/auth/sign-in");
    else window.location.href = "/auth/sign-in";
  },

  async refresh(): Promise<string | null> {
    console.log("🚀 [REFRESH] - Obtendo novo token de acesso...");
    try {
      const response = await api.post("/auth/refresh");
      console.log("🚀 [REFRESH] - Resposta do servidor: ", response.data);
      const token = response.data?.accessToken;

      if (response.status === 200 && token) {
        this.set(token);
        return token;
      }
    } catch (error) {
      console.error("⛔ [REFRESH] - Erro ao obter novo token de acesso: ", error);
    }
    return null;
  },
};

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  if (isServer) {
    const { cookies, headers } = await import("next/headers");

    config.headers = config.headers || {};
    config.headers.Cookie = (await cookies()).toString();
    config.headers["user-agent"] = (await headers()).get("user-agent") || "Next.js Server";
  }

  const token = authManager.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    const isAuthError = [401, 403].includes(status || 0);
    const isNotRefreshEndpoint = originalRequest?.url !== "/auth/refresh";
    console.log("🚀 [Axios] - URL: ", originalRequest?.url);

    if (isAuthError && originalRequest && isNotRefreshEndpoint) {
      try {
        const newToken = await authManager.refresh();
        console.log("🙂 Novo token obtido: ", newToken);

        if (newToken) {
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest); // Retry original request com novo token
        }
      } catch {}

      authManager.handleUnauthorized();
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

// --- Exportações públicas ---
export const setAccessToken = authManager.set.bind(authManager);
export const clearAuthTokens = authManager.clear.bind(authManager);
export const refreshToken = authManager.refresh.bind(authManager);

export default api;
