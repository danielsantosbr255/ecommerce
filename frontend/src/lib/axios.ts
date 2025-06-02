import { Session } from "@/types";
import axios from "axios";

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

// Create an instance of axios with default settings
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// Add a request interceptor
api.interceptors.request.use(
  async function (config) {
    // console.log("🫴 [AXIOS REQUEST] - Requisição do servidor: ", `(${config.url})`);

    if (isServer) {
      const { cookies, headers } = await import("next/headers");
      const cookieStore = await cookies();

      authManager.set(cookieStore.get("accessToken")?.value || "");

      config.headers = config.headers || {};
      config.headers.Cookie = cookieStore.toString();
      config.headers["user-agent"] = (await headers()).get("user-agent") || "Next.js Server";
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

// Add a response interceptor
api.interceptors.response.use(
  async function (response) {
    // console.log("🗣️ [AXIOS RESPONSE] - Resposta do servidor: ", response.config.url);
    return response;
  },

  async function (error) {
    const originalRequest = error.config;
    const status = error.response?.status;

    // console.error("❌ [AXIOS RESPONSE] - Erro ao fazer requisição: ", error.response);
    // console.error("🔗 [AXIOS ERROR STATUS] - URL: ", originalRequest.url, "/Status: ", status);

    const isNotRefreshEndpoint = originalRequest?.url && !originalRequest.url.includes("/refresh");

    if (status === 401 && originalRequest && isNotRefreshEndpoint) {
      try {
        // console.log("🔃 Tentando atualizar os tokens...");

        const response = await api.post("/auth/refresh");
        const { session } = response.data as { session: Session };

        if (session) {
          // console.log("🔃 Tokens atualizados com sucesso!");
          authManager.set(session.accessToken);
          originalRequest.headers.Authorization = `Bearer ${session.accessToken}`;
          if (!isServer) sessionStorage.setItem("accessToken", session.accessToken);
        }

        return api(originalRequest);
      } catch (error) {
        // console.error("❌ Falha no refresh token:", error);
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
