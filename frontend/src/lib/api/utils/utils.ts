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

/**
 * Verifica se uma URL é absoluta (começa com "http://" ou "https://").
 * @param url A URL a ser verificada.
 * @returns True se a URL for absoluta, false caso contrário.
 */
export function isAbsoluteUrl(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}

/**
 * Verifica se uma string é um JSON válido.
 * @param str A string a ser verificada.
 * @returns True se a string for um JSON válido, false caso contrário.
 */
export function isJsonString(str: string): boolean {
  try {
    JSON.parse(str);
  } catch {
    return false;
  }
  return true;
}

/**
 * Prepara o corpo da requisição e ajusta os cabeçalhos Content-Type
 * com base no tipo de dado a ser enviado.
 * @param method O método HTTP da requisição (ex: 'POST', 'PUT').
 * @param data Os dados a serem enviados no corpo da requisição.
 * @param existingHeaders Os cabeçalhos HTTP existentes da requisição.
 * @returns Um objeto contendo o 'body' formatado e os 'headers' atualizados.
 */
export function prepareRequestBodyAndHeaders(
  method: string,
  data: unknown | undefined,
  existingHeaders: HeadersInit = {}
): { body: RequestInit["body"]; headers: HeadersInit } {
  const headers = new Headers(existingHeaders); // Usa Headers API para manipulação mais fácil
  let body: RequestInit["body"] = undefined;

  const shouldHaveBody = ["POST", "PUT", "PATCH"].includes(method);

  if (shouldHaveBody && data !== undefined) {
    if (data instanceof FormData) {
      body = data;
      headers.delete("Content-Type");
    } else if (data instanceof URLSearchParams) {
      body = data.toString();
      headers.set("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
    } else if (typeof data === "string" || data instanceof Blob || data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
      body = data;
      if (!headers.has("Content-Type")) {
        if (typeof data === "string" && !isJsonString(data)) {
          headers.set("Content-Type", "text/plain");
        }
      }
    } else {
      body = JSON.stringify(data);
      if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }
    }
  } else if (data !== undefined && !shouldHaveBody) {
    console.warn(`Data passed to a ${method} request, which typically does not have a body.`);
  }

  // Converte Headers de volta para um objeto simples para compatibilidade com RequestInit
  const finalHeaders: Record<string, string> = {};
  headers.forEach((value, key) => {
    finalHeaders[key] = value;
  });

  return { body, headers: finalHeaders };
}
