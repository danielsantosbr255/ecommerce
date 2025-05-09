import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

let serverCookieHeader: string | null = null;

export function setServerCookies(cookies: string | null) {
  serverCookieHeader = cookies;
}

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  if (typeof window === "undefined" && serverCookieHeader) {
    config.headers = config.headers || {};
    config.headers.Cookie = serverCookieHeader;
  }
  return config;
});

export default api;
