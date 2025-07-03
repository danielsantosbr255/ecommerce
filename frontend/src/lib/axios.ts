import axios from "axios";
import { Session } from "@/types";

let accessToken: string | null = null;
const isServer = typeof window === "undefined";

const authManager = {
  get() {
    return accessToken;
  },
  set(token: string) {
    accessToken = token;
  },
  clear() {
    accessToken = null;
  },
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  async function (config) {
    console.clear();

    if (isServer) {
      const { cookies, headers } = await import("next/headers");
      const cookieStore = await cookies();
      const serverHeaders = await headers();

      if (cookieStore.get("accessToken")?.value) {
        authManager.set(cookieStore.get("accessToken")?.value || "");
      }

      config.headers = config.headers || {};
      config.headers.Cookie = cookieStore.toString();

      config.headers["x-forwarded-for"] = serverHeaders.get("x-forwarded-for") || "127.0.0.1";
      config.headers["user-agent"] = serverHeaders.get("user-agent") || "Next.js Server";
    } else {
      authManager.set(sessionStorage.getItem("accessToken") || "");
    }

    const accessToken = authManager.get();
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },

  async function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  async function (response) {
    return response;
  },

  async function (error) {
    const originalRequest = error.config;
    const status = error.response?.status;

    const isNotRefreshEndpoint = originalRequest?.url && !originalRequest.url.includes("/refresh");

    if (status === 401 && originalRequest && isNotRefreshEndpoint && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await api.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/refresh`);
        const { session } = response.data as { session: Session };

        if (session) {
          authManager.set(session.accessToken);
          originalRequest.headers.Authorization = `Bearer ${session.accessToken}`;
          if (!isServer) sessionStorage.setItem("accessToken", session.accessToken);
        }

        return api(originalRequest);
      } catch (error) {
        if (!isServer) sessionStorage.removeItem("accessToken");
        authManager.clear();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
