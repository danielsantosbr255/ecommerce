import { HttpClient } from "./HttpClient";

export class FetchClient implements HttpClient {
  constructor(private baseUrl: string = "") {}

  private async request<T>(url: string, options: RequestInit): Promise<T> {
    const fullUrl = `${this.baseUrl}${url}`;
    const method = options.method?.toUpperCase() || "GET";

    const isFormData = options.body instanceof FormData;
    const shouldHaveBody = ["POST", "PUT", "PATCH"].includes(method);

    const headers = new Headers(options.headers || {});

    // Authentication
    const token = sessionStorage.getItem("accessToken");
    if (token) headers.set("Authorization", `Bearer ${token}`);

    if (shouldHaveBody && options.body && !isFormData) {
      headers.set("Content-Type", "application/json");
    }

    const response = await fetch(fullUrl, { ...options, method, headers });

    if (response.status === 204) return null as unknown as T;

    const contentType = response.headers.get("Content-Type");
    const contentLength = response.headers.get("Content-Length");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error: ${response.status} - ${errorText}`);
    }

    if (!contentType?.includes("application/json") || contentLength === "0") {
      return null as unknown as T;
    }

    return response.json() as Promise<T>;
  }

  get<T>(url: string, config: RequestInit = {}) {
    return this.request<T>(url, { ...config, method: "GET" });
  }

  post<T, B = unknown>(url: string, body: B, config: RequestInit = {}) {
    const isFormData = body instanceof FormData;
    return this.request<T>(url, {
      ...config,
      method: "POST",
      body: isFormData ? body : JSON.stringify(body),
    });
  }

  put<T, B = unknown>(url: string, body: B, config: RequestInit = {}) {
    const isFormData = body instanceof FormData;
    return this.request<T>(url, {
      ...config,
      method: "PUT",
      body: isFormData ? body : JSON.stringify(body),
    });
  }

  delete<T>(url: string, config: RequestInit = {}) {
    return this.request<T>(url, { ...config, method: "DELETE" });
  }
}
