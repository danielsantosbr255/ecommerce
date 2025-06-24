// lib/api/ApiService.ts

import { HttpClient } from "./HttpClient";

export class ApiService {
  constructor(private client: HttpClient) {}

  get<T>(url: string, config?: RequestInit) {
    return this.client.get<T>(url, config);
  }

  post<T, B>(url: string, data: B, config?: RequestInit) {
    return this.client.post<T>(url, data, config);
  }

  put<T, B>(url: string, data: B, config?: RequestInit) {
    return this.client.put<T>(url, data, config);
  }

  delete<T>(url: string, config?: RequestInit) {
    return this.client.delete<T>(url, config);
  }
}
