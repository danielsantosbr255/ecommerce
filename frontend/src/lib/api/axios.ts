import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from "axios";
import { redirect } from "next/navigation";

let memoryToken: string | null = null;

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// Interceptor para adicionar o token às requisições
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (memoryToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${memoryToken}`;
  }
  return config;
});

// Interceptor para lidar com respostas e refresh token
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    // Se erro 401 e não é requisição de refresh
    if ((status === 401 || status === 403) && originalRequest && originalRequest.url !== "/auth/refresh") {
      try {
        // Tenta renovar o token
        const newToken = await refreshToken();
        if (newToken) {
          memoryToken = newToken;
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Se falhar no refresh, limpa os tokens e redireciona
        memoryToken = null;
        if (typeof window !== "undefined") {
          window.location.href = "/auth/sign-in";
        } else {
          redirect("/auth/sign-in");
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

async function refreshToken(): Promise<string | null> {
  try {
    const response = await api.post("/auth/refresh");
    return response.data.accessToken;
  } catch {
    return null;
  }
}

export function setAccessToken(token: string): void {
  memoryToken = token;
}

export function getAccessToken(): string | null {
  return memoryToken;
}

export function clearAuthTokens(): void {
  memoryToken = null;
}

export default api;
