import { RequestConfig, ApiResponse } from "../types";

export class HttpError<T = unknown> extends Error {
  public config: RequestConfig;
  public request?: RequestInit;
  public response?: ApiResponse<T>;
  public isHttpError: boolean;

  constructor(message: string, config: RequestConfig, request?: RequestInit, response?: ApiResponse<T>) {
    super(message);
    this.name = "HttpError";
    this.config = config;
    this.request = request;
    this.response = response;
    this.isHttpError = true;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }
  }
}

export class NonOkStatusError<T = unknown> extends HttpError<T> {
  constructor(message: string, config: RequestConfig, request?: RequestInit, response?: ApiResponse<T>) {
    super(message, config, request, response);
    this.name = "NonOkStatusError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NonOkStatusError);
    }
  }
}

export class NetworkError extends HttpError<unknown> {
  constructor(message: string, config: RequestConfig, request?: RequestInit) {
    super(message, config, request, undefined);
    this.name = "NetworkError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NetworkError);
    }
  }
}
