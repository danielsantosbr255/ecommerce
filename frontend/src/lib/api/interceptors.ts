export type RequestInterceptor = (url: string, init: RequestInit) => Promise<[string, RequestInit]> | [string, RequestInit];
export type ResponseInterceptor = (response: Response) => Promise<Response> | Response;

export interface Interceptors {
  request?: RequestInterceptor[];
  response?: ResponseInterceptor[];
}
