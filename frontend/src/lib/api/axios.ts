import axios, { AxiosInstance } from "axios";

const isServer = typeof window === "undefined";

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
//   if (isServer) {
//     const { cookies } = await import("next/headers");
//     config.headers = config.headers || {};
//     config.headers.Cookie = (await cookies()).toString();
//   }
//   return config;
// });

export default api;
