import { HttpClient } from "./HttpClient";
import { Interceptors } from "./interceptors";
import { isFormData, isJsonResponse, sleep } from "./utils";

interface FetchClientOptions {
  baseUrl?: string;
  timeout?: number; // ms
  maxRetries?: number;
  getAuthToken?: () => string | Promise<string>;
  interceptors?: Interceptors;
  debug?: boolean;
}

export class FetchClient implements HttpClient {
  private baseUrl: string;
  private timeout: number;
  private maxRetries: number;
  private getAuthToken?: () => string | Promise<string>;
  private interceptors: Interceptors;
  private debug: boolean;

  constructor({
    baseUrl = "",
    timeout = 10000,
    maxRetries = 2,
    getAuthToken,
    interceptors = {},
    debug = false,
  }: FetchClientOptions = {}) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
    this.maxRetries = maxRetries;
    this.getAuthToken = getAuthToken;
    this.interceptors = interceptors;
    this.debug = debug;
  }

  private async request<T>(url: string, options: RequestInit, retries = 0): Promise<T> {
    const fullUrl = `${this.baseUrl}${url}`;
    const method = options.method?.toUpperCase() || "GET";
    const shouldHaveBody = ["POST", "PUT", "PATCH"].includes(method);
    const headers = new Headers(options.headers || {});

    // Autenticação
    if (this.getAuthToken) {
      const token = await this.getAuthToken();
      if (token) headers.set("Authorization", `Bearer ${token}`);
    }

    const bodyIsForm = isFormData(options.body);

    // Content-Type
    if (shouldHaveBody && options.body && !bodyIsForm) {
      headers.set("Content-Type", "application/json");
    }

    // Interceptors de request
    let finalUrl = fullUrl;
    let finalOptions: RequestInit = { ...options, method, headers };

    for (const interceptor of this.interceptors.request || []) {
      const result = await interceptor(finalUrl, finalOptions);
      [finalUrl, finalOptions] = result;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(finalUrl, {
        ...finalOptions,
        signal: controller.signal,
        credentials: "include",
      });

      // Interceptors de response
      let finalResponse = response;
      for (const interceptor of this.interceptors.response || []) {
        finalResponse = await interceptor(finalResponse);
      }

      clearTimeout(timeoutId);

      if (this.debug) {
        console.log(`[DEBUG][${method}] ${finalUrl}`, {
          request: finalOptions,
          status: finalResponse.status,
        });
      }

      if (!finalResponse.ok) {
        const errorText = await finalResponse.text();
        throw new Error(`HTTP ${finalResponse.status}: ${errorText}`);
      }

      // No Content
      if (finalResponse.status === 204 || !isJsonResponse(finalResponse)) {
        return null as unknown as T;
      }

      return finalResponse.json() as Promise<T>;
    } catch (error) {
      clearTimeout(timeoutId);

      if (retries < this.maxRetries) {
        await sleep(500 * (retries + 1)); // Backoff simples
        return this.request<T>(url, options, retries + 1);
      }

      throw error;
    }
  }

  get<T>(url: string, config: RequestInit = {}) {
    return this.request<T>(url, { ...config, method: "GET" });
  }

  post<T, B = unknown>(url: string, body: B, config: RequestInit = {}) {
    const finalBody = isFormData(body) ? body : JSON.stringify(body);
    return this.request<T>(url, { ...config, method: "POST", body: finalBody });
  }

  put<T, B = unknown>(url: string, body: B, config: RequestInit = {}) {
    const finalBody = isFormData(body) ? body : JSON.stringify(body);
    return this.request<T>(url, { ...config, method: "PUT", body: finalBody });
  }

  delete<T>(url: string, config: RequestInit = {}) {
    return this.request<T>(url, { ...config, method: "DELETE" });
  }
}
