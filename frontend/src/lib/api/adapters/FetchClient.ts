import {
  RequestConfig,
  ApiResponse,
  RequestInterceptorFulfilled,
  RequestInterceptorRejected,
  ResponseInterceptorFulfilled,
  ResponseInterceptorRejected,
  RequestInterceptor,
  ResponseInterceptor,
} from "../types";
import { NonOkStatusError, NetworkError } from "../utils/errors";
import { prepareRequestBodyAndHeaders } from "../utils/utils";
import { HttpClient } from "./HttpClient";

interface DispatchRequest {
  method: string;
  url: string;
  data: unknown | undefined;
  reqConfig: RequestConfig;
}

export class HttpService implements HttpClient {
  private baseURL: string;
  private withCredentials: boolean;
  private requestInterceptors: RequestInterceptor[];
  private responseInterceptors: ResponseInterceptor[];

  constructor(options: { baseURL?: string; withCredentials?: boolean }) {
    this.baseURL = options.baseURL || "";
    this.withCredentials = options.withCredentials || false;
    this.requestInterceptors = [];
    this.responseInterceptors = [];
  }

  interceptors = {
    request: {
      use: (onFulfilled: RequestInterceptorFulfilled, onRejected?: RequestInterceptorRejected): void => {
        this.requestInterceptors.push({ onFulfilled, onRejected });
      },
    },
    response: {
      use: <T = unknown>(onFulfilled: ResponseInterceptorFulfilled<T>, onRejected?: ResponseInterceptorRejected): void => {
        this.responseInterceptors.push({ onFulfilled: onFulfilled as ResponseInterceptorFulfilled, onRejected });
      },
    },
  };

  private buildFullUrl(url: string, params?: RequestConfig["params"]): string {
    let fullUrl: string;

    const isAbsoluteUrl = url.startsWith("http://") || url.startsWith("https://");
    fullUrl = isAbsoluteUrl ? url : `${this.baseURL}${url}`;

    if (params) {
      const queryString = new URLSearchParams(params as Record<string, string>).toString();
      if (queryString) {
        fullUrl += `?${queryString}`;
      }
    }
    return fullUrl;
  }

  private async dispatchRequest<T = unknown>({ method, url, data, reqConfig }: DispatchRequest): Promise<ApiResponse<T>> {
    const { body, headers } = prepareRequestBodyAndHeaders(method, data, reqConfig.headers);

    const fetchOptions: RequestInit = { method, ...reqConfig, headers: headers, body: body };

    if (this.withCredentials) {
      fetchOptions.credentials = "include";
    }

    const fullUrl = this.buildFullUrl(url, reqConfig.params);

    try {
      const rawResponse = await fetch(fullUrl, fetchOptions);
      const responseData: T | null = await rawResponse.json().catch(() => null);

      const apiResponse: ApiResponse<T> = {
        data: responseData,
        status: rawResponse.status,
        statusText: rawResponse.statusText,
        headers: rawResponse.headers,
        config: reqConfig,
        request: fetchOptions,
        rawResponse: rawResponse,
      };

      if (!rawResponse.ok) {
        let errorMessage = `Requisição falhou com status ${rawResponse.status}`;

        if (responseData && typeof responseData === "object" && responseData !== null) {
          const dataAsRecord = responseData as Record<string, unknown>;

          if (typeof dataAsRecord.message === "string" && dataAsRecord.message.length > 0) {
            errorMessage = dataAsRecord.message;
          } else if (typeof dataAsRecord.error === "string" && dataAsRecord.error.length > 0) {
            errorMessage = dataAsRecord.error;
          }
        }

        throw new NonOkStatusError(errorMessage, reqConfig, fetchOptions, apiResponse);
      }

      return apiResponse;
    } catch (err: unknown) {
      if (err instanceof NonOkStatusError) {
        throw err;
      }

      throw new NetworkError((err as Error).message || "Network error", reqConfig, fetchOptions);
    }
  }

  async request<T = unknown>(method: string, url: string, data?: unknown, config: RequestConfig = {}): Promise<ApiResponse<T>> {
    const processedConfig: RequestConfig = { method, url, data, ...config };

    let promise = Promise.resolve(processedConfig);

    for (const interceptor of this.requestInterceptors) {
      promise = promise.then(interceptor.onFulfilled, interceptor.onRejected);
    }

    const responsePromise = promise.then((reqConfig) => this.dispatchRequest<T>({ method, url, data, reqConfig }));

    let finalPromise: Promise<ApiResponse<T>> = responsePromise;

    for (const interceptor of this.responseInterceptors) {
      finalPromise = finalPromise.then(interceptor.onFulfilled, interceptor.onRejected) as Promise<ApiResponse<T>>;
    }

    return finalPromise;
  }

  get<T>(url: string, config?: RequestConfig) {
    return this.request<T>("GET", url, undefined, config);
  }
  post<T>(url: string, data?: unknown, config?: RequestConfig) {
    return this.request<T>("POST", url, data, config);
  }
  put<T>(url: string, data?: unknown, config?: RequestConfig) {
    return this.request<T>("PUT", url, data, config);
  }
  delete<T>(url: string, config?: RequestConfig) {
    return this.request<T>("DELETE", url, undefined, config);
  }
  patch<T>(url: string, data?: unknown, config?: RequestConfig) {
    return this.request<T>("PATCH", url, data, config);
  }
}
