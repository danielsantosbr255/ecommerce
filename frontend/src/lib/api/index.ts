import { Session } from "@/types";
import { HttpError } from "./utils/errors";
import { authManager } from "./utils/authManager";
import { HttpService } from "./HttpService";

const isServer = typeof window === "undefined";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const api = new HttpService({
  baseURL: API_URL,
  withCredentials: true,
});

const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const response = await api.post<{ session: Session }>(`${BASE_URL}/api/auth/refresh`);
    if (response.status !== 200 || !response.data?.session) return null;
    return response.data.session.accessToken;
  } catch {
    return null;
  }
};

api.interceptors.request.use(async (config) => {
  const headers = new Headers(config.headers);

  if (isServer && (config._auth || config.method?.toUpperCase() !== "GET")) {
    const { cookies, headers: serverHeaders } = await import("next/headers");
    const cookieStore = await cookies();
    const headerStore = await serverHeaders();

    const token = cookieStore.get("accessToken")?.value;
    if (token) authManager.set(token);

    headers.set("Cookie", cookieStore.toString());
    headers.set("x-forwarded-for", headerStore.get("x-forwarded-for") || "127.0.0.1");
    headers.set("user-agent", headerStore.get("user-agent") || "Next.js Server");
  }

  const token = authManager.get();
  if (token && !headers.has("Authorization") && !config._noToken) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return { ...config, headers };
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!(error instanceof Error) || !("response" in error) || !error.response) throw error;
    if (!(error instanceof HttpError)) return Promise.reject(error);

    const originalConfig = error.config;
    if (error.response.status !== 401 || originalConfig._retry || originalConfig.url?.includes("/auth")) throw error;

    originalConfig._retry = true;

    const newToken = await refreshAccessToken();
    if (!newToken) {
      authManager.clear();
      throw error;
    }

    authManager.set(newToken);
    originalConfig.headers = new Headers(originalConfig.headers);
    originalConfig.headers.set("Authorization", `Bearer ${newToken}`);

    return api.request(originalConfig.method || "GET", originalConfig.url || "", originalConfig.data, originalConfig);
  }
);
