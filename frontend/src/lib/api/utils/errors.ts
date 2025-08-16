import { RequestConfig, ApiResponse } from "../types";

export class HttpError<T = unknown> extends Error {
  public readonly config: RequestConfig;
  public readonly request?: RequestInit;
  public readonly response?: ApiResponse<T>;

  constructor(message: string, config: RequestConfig, request?: RequestInit, response?: ApiResponse<T>) {
    super(message);
    this.name = "HttpError";
    this.config = config;
    this.request = request;
    this.response = response;
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

export class HttpResponseError<T = unknown> extends HttpError<T> {
  constructor(message: string, config: RequestConfig, request?: RequestInit, response?: ApiResponse<T>) {
    super(message, config, request, response);
    this.name = "HttpResponseError";
    Object.setPrototypeOf(this, HttpResponseError.prototype);
  }
}

export class NetworkError extends HttpError<unknown> {
  constructor(message: string, config: RequestConfig, request?: RequestInit) {
    super(message, config, request);
    this.name = "NetworkError";
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}
