import { Session } from "@/types";
import { HttpError } from "./utils/errors";
import { authManager } from "./utils/authManager";
import { HttpService } from "./adapters/FetchClient";

const isServer = typeof window === "undefined";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
const AUTH_REFRESH_URL = `${BASE_URL}/api/auth/refresh`;

export const api = new HttpService({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

const refreshToken = async () => {
  const response = await api.post<{ session: Session }>(AUTH_REFRESH_URL);

  if (response.status !== 200) throw new Error("Failed to refresh token");

  const data = response.data;
  if (!data || !data.session) return null;
  
  const session = data.session as Session;
  if (session) return session.accessToken;
  return null;
};

api.interceptors.request.use(
  async (config) => {
    if (isServer) {
      const { cookies, headers } = await import("next/headers");
      const cookieStore = await cookies();
      const serverHeaders = await headers();

      if (cookieStore.get("accessToken")?.value) {
        authManager.set(cookieStore.get("accessToken")?.value || "");
      }

      config.headers = {
        ...config.headers,
        Cookie: cookieStore.toString(),
        "x-forwarded-for": serverHeaders.get("x-forwarded-for") || "127.0.0.1",
        "user-agent": serverHeaders.get("user-agent") || "Next.js Server",
      };
    }

    const accessToken = authManager.get();
    if (accessToken) {
      config.headers = { ...config.headers, Authorization: `Bearer ${accessToken}` };
    }

    return config;
  },

  (error) => {
    console.error("Erro no interceptor de requisição:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (!(error instanceof HttpError)) return Promise.reject(error);
    
    const originalRequest = error.config;
    const status = error.response?.status;

    const isUnauthorized = status === 401;
    const isNotRefreshEndpoint = originalRequest.url && !originalRequest.url.includes("/refresh");

    if (isUnauthorized && originalRequest && isNotRefreshEndpoint && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const accessToken = await refreshToken();

        if (!accessToken) {
          authManager.clear();
          if (!isServer) sessionStorage.removeItem("accessToken");
          return Promise.reject(error);
        }

        authManager.set(accessToken);
        originalRequest.headers = { ...originalRequest.headers, Authorization: `Bearer ${accessToken}` };
        if (!isServer) sessionStorage.setItem("accessToken", accessToken);

        const baseURL = originalRequest.baseURL || BASE_URL;
        const relativeUrl = originalRequest.url ? originalRequest.url.replace(baseURL, "") : "";
        const originalBody = originalRequest.data;

        if (!originalRequest.method) {
          return Promise.reject(new Error("Original request method is undefined."));
        }

        return api.request(originalRequest.method, relativeUrl, originalBody, originalRequest);
      } catch (error: unknown) {
        console.error("Falha ao atualizar o token:", error);
        authManager.clear();

        if (!isServer) sessionStorage.removeItem("accessToken");
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
