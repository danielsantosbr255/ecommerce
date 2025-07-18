export interface RequestConfig extends RequestInit {
  baseURL?: string;
  url?: string;
  data?: unknown;
  headers?: HeadersInit;
  params?: Record<string, string | number | boolean>;
  withCredentials?: boolean;
  _retry?: boolean;
}

export interface ApiResponse<T = unknown> {
  data: T | null;
  status: number;
  statusText: string;
  headers: Headers;
  config: RequestConfig;
  request?: RequestInit;
  rawResponse: Response;
}

export type RequestInterceptorFulfilled = (config: RequestConfig) => Promise<RequestConfig> | RequestConfig;

export type RequestInterceptorRejected = (error: unknown) => Promise<RequestConfig> | RequestConfig;

export type ResponseInterceptorFulfilled<T = unknown> = (response: ApiResponse<T>) => Promise<ApiResponse<T>> | ApiResponse<T>;

export type ResponseInterceptorRejected = (error: unknown) => Promise<unknown> | unknown | ApiResponse;

export interface RequestInterceptor {
  onFulfilled: RequestInterceptorFulfilled;
  onRejected?: RequestInterceptorRejected;
}

export interface ResponseInterceptor<T = unknown> {
  onFulfilled: ResponseInterceptorFulfilled<T>;
  onRejected?: ResponseInterceptorRejected;
}

export type HeaderValue = string | string[] | number | boolean | null;

export interface RawHeaders {
  [key: string]: HeaderValue;
}
