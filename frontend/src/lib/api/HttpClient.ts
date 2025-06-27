// lib/api/HttpClient.ts

export interface HttpClient {
  /**
   * Makes a GET request to the specified URL.
   * @param url The endpoint URL.
   * @param config Optional configuration for the request.
   * @returns A promise that resolves to the response data.
   */
  get<T>(url: string, config?: RequestInit): Promise<T>;
  post<T, B = unknown>(url: string, body: B, config?: RequestInit): Promise<T>;
  put<T, B = unknown>(url: string, body: B, config?: RequestInit): Promise<T>;
  delete<T>(url: string, config?: RequestInit): Promise<T>;
}
