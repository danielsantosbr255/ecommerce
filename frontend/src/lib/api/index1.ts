import { ApiService } from "./ApiService";
import { FetchClient } from "./FetchClient1";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.example.com";
const isServer = typeof window === "undefined";

export const api = new ApiService(
  new FetchClient({
    baseUrl: BASE_URL,
    timeout: 8000,
    maxRetries: 2,
    debug: true,

    getAuthToken: async () => {
      return sessionStorage.getItem("token") || "";
    },

    interceptors: {
      request: [
        async (url, config) => {
          if (isServer) {
            const { cookies, headers } = await import("next/headers");
            const cookieStore = await cookies();

            config.headers = (config.headers || {}) as Record<string, string>;
            config.headers.Cookie = cookieStore.toString();

            config.headers["x-forwarded-for"] = (await headers()).get("x-forwarded-for") || "127.0.0.1";
            config.headers["user-agent"] = (await headers()).get("user-agent") || "Next.js Server";
          }

          return [url, config];
        },
      ],

      response: [
        async (response) => {
          if (response.status === 401 || response.status === 200) {
            const newAuthHeader = response.headers.get("Authorization");
            if (newAuthHeader && newAuthHeader.startsWith("Bearer ")) {
              const newToken = newAuthHeader.split(" ")[1];
              sessionStorage.setItem("accessToken", newToken);
              console.log("Access token atualizado via cabeçalho da resposta.");
            }
          }

          return response;
        },
      ],
    },
  })
);
