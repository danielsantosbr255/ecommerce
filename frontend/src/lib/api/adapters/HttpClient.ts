// lib/api/HttpClient.ts

import { ApiResponse } from "../types";

export interface HttpClient {
  /**
   * Makes a GET request to the specified URL.
   * @param url The endpoint URL.
   * @param config Optional configuration for the request.
   * @returns A promise that resolves to the response data.
   */

  // request<T>(url: string, options: RequestInit): Promise<T>;
  get<T>(url: string, config?: RequestInit): Promise<ApiResponse<T>>;
  post<T, B = unknown>(url: string, body: B, config?: RequestInit): Promise<ApiResponse<T>>;
  put<T, B = unknown>(url: string, body: B, config?: RequestInit): Promise<ApiResponse<T>>;
  delete<T>(url: string, config?: RequestInit): Promise<ApiResponse<T>>;
}
