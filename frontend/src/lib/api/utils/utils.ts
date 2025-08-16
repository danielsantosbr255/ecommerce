export function isJsonResponse(response: Response): boolean {
  const contentType = response.headers.get("Content-Type");
  return contentType?.includes("application/json") ?? false;
}

export function isFormData(data: unknown): data is FormData {
  return typeof FormData !== "undefined" && data instanceof FormData;
}

export function isAbsoluteUrl(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}

/**
 * Prepares the request body and updates headers based on data type.
 * Simplified logic: Handles common cases concisely, avoids unnecessary warnings.
 * Uses Headers object for better manipulation.
 */
export function prepareRequestBodyAndHeaders(
  method: string,
  data: unknown | undefined,
  existingHeaders: HeadersInit = {}
): { body: RequestInit["body"]; headers: Headers } {
  const headers = new Headers(existingHeaders);
  let body: RequestInit["body"] = undefined;

  const methodsWithBody = ["POST", "PUT", "PATCH"];
  if (!methodsWithBody.includes(method.toUpperCase()) || data === undefined) {
    return { body: undefined, headers };
  }

  if (isFormData(data)) {
    body = data;
    headers.delete("Content-Type"); // Let browser set boundary
  } else if (data instanceof URLSearchParams) {
    body = data;
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
    }
  } else if (typeof data === "string" || data instanceof Blob || data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
    if (ArrayBuffer.isView(data) && data.buffer instanceof ArrayBuffer) {
      body = data as ArrayBufferView<ArrayBuffer>;
    } else {
      body = data as string | Blob | ArrayBuffer;
    }
    if (!headers.has("Content-Type") && typeof data === "string") {
      headers.set("Content-Type", "text/plain;charset=UTF-8");
    }
  } else {
    body = JSON.stringify(data);
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json;charset=UTF-8");
    }
  }

  const finalHeaders = Object.fromEntries(headers.entries());

  console.log("🚀 Final Headers", finalHeaders);

  return { body, headers };
}
