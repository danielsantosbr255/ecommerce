import { HttpResponseError, NetworkError } from "./utils/errors";
import { prepareRequestBodyAndHeaders, isAbsoluteUrl, isJsonResponse } from "./utils/utils";
import { RequestConfig, ApiResponse, RequestInterceptor, ResponseInterceptor } from "./types";

export class HttpService {
  private baseURL: string;
  private withCredentials: boolean;
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];

  constructor(options: { baseURL?: string; withCredentials?: boolean } = {}) {
    this.baseURL = options.baseURL || "";
    this.withCredentials = options.withCredentials || false;
  }

  public interceptors = {
    request: {
      use: (onFulfilled: RequestInterceptor["onFulfilled"], onRejected?: RequestInterceptor["onRejected"]): void => {
        this.requestInterceptors.push({ onFulfilled, onRejected });
      },
    },
    response: {
      use: <T = unknown>(
        onFulfilled: ResponseInterceptor<T>["onFulfilled"],
        onRejected?: ResponseInterceptor["onRejected"]
      ): void => {
        this.responseInterceptors.push({ onFulfilled: onFulfilled as ResponseInterceptor["onFulfilled"], onRejected });
      },
    },
  };

  private buildFullUrl(url: string, params?: RequestConfig["params"]): string {
    const fullUrl = isAbsoluteUrl(url) ? url : `${this.baseURL}${url.startsWith("/") ? "" : "/"}${url}`;

    if (!params) return fullUrl;

    const query = new URLSearchParams(params as Record<string, string>).toString();
    return query ? `${fullUrl}${fullUrl.includes("?") ? "&" : "?"}${query}` : fullUrl;
  }

  private async dispatchRequest<T = unknown>(
    method: string,
    url: string,
    data: unknown,
    config: RequestConfig
  ): Promise<ApiResponse<T>> {
    const { body, headers } = prepareRequestBodyAndHeaders(method, data, config.headers);

    const fetchOptions: RequestInit = { method, ...config, body, headers };

    if (this.withCredentials) {
      fetchOptions.credentials = "include";
    }

    const fullUrl = this.buildFullUrl(url, config.params);

    try {
      const rawResponse = await fetch(fullUrl, fetchOptions);

      let data: T | null = null;
      if (isJsonResponse(rawResponse)) {
        data = await rawResponse.json().catch(() => null);
      } else if (rawResponse.body) {
        data = (await rawResponse.text()) as T;
      }

      const apiResponse: ApiResponse<T> = {
        data,
        status: rawResponse.status,
        statusText: rawResponse.statusText,
        headers: rawResponse.headers,
        config,
        request: fetchOptions,
        rawResponse,
      };

      if (!rawResponse.ok) {
        let message = `Request failed with status ${rawResponse.status}`;
        if (data && typeof data === "object" && "message" in data && typeof data.message === "string") {
          message = data.message;
        } else if (data && typeof data === "object" && "error" in data && typeof data.error === "string") {
          message = data.error;
        }
        throw new HttpResponseError(message, config, fetchOptions, apiResponse);
      }

      return apiResponse;
    } catch (err) {
      if (err instanceof HttpResponseError) throw err;
      throw new NetworkError(err instanceof Error ? err.message : "Unknown network error", config, fetchOptions);
    }
  }

  async request<T = unknown>(method: string, url: string, data?: unknown, config: RequestConfig = {}): Promise<ApiResponse<T>> {
    const processedConfig: RequestConfig = { method, url, data, ...config };

    let chain = Promise.resolve(processedConfig);

    for (const { onFulfilled, onRejected } of this.requestInterceptors) {
      chain = chain.then(onFulfilled, onRejected);
    }

    const responsePromise = chain.then((updatedConfig) =>
      this.dispatchRequest<T>(method, url, data ?? updatedConfig.data, updatedConfig)
    );

    let finalChain = responsePromise;
    for (const { onFulfilled, onRejected } of this.responseInterceptors) {
      finalChain = finalChain.then(onFulfilled, onRejected) as Promise<ApiResponse<T>>;
    }

    return finalChain;
  }

  public get<T = unknown>(url: string, config?: RequestConfig) {
    return this.request<T>("GET", url, undefined, config);
  }

  public post<T = unknown>(url: string, data?: unknown, config?: RequestConfig) {
    return this.request<T>("POST", url, data, config);
  }

  public put<T = unknown>(url: string, data?: unknown, config?: RequestConfig) {
    return this.request<T>("PUT", url, data, config);
  }

  public delete<T = unknown>(url: string, config?: RequestConfig) {
    return this.request<T>("DELETE", url, undefined, config);
  }

  public patch<T = unknown>(url: string, data?: unknown, config?: RequestConfig) {
    return this.request<T>("PATCH", url, data, config);
  }
}
