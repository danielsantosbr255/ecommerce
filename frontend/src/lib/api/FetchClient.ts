// lib/api/FetchClient.ts

import { HttpClient } from "./HttpClient";

export class FetchClient implements HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string = "") {
    this.baseUrl = baseUrl;
  }

  private async request<T>(url: string, options: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`HTTP error: ${response.status} - ${errorBody}`);
    }

    return response.json() as Promise<T>;
  }

  get<T>(url: string, config: RequestInit = {}) {
    return this.request<T>(url, { ...config, method: "GET" });
  }

  post<T, B = unknown>(url: string, body: B, config: RequestInit = {}) {
    return this.request<T>(url, {
      ...config,
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  put<T, B = unknown>(url: string, body: B, config: RequestInit = {}) {
    return this.request<T>(url, {
      ...config,
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  delete<T>(url: string, config: RequestInit = {}) {
    return this.request<T>(url, { ...config, method: "DELETE" });
  }
}
