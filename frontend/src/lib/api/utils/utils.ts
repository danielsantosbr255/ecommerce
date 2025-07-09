// lib/api/utils.ts

export function isJsonResponse(response: Response): boolean {
  const contentType = response.headers.get("Content-Type");
  return contentType?.includes("application/json") ?? false;
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isFormData(body: unknown): body is FormData {
  return typeof FormData !== "undefined" && body instanceof FormData;
}
