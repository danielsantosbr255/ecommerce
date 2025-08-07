// lib/api/utils.ts

/**
 * Verifica se a resposta HTTP possui o Content-Type "application/json".
 * @param response O objeto Response da requisição.
 * @returns True se o Content-Type for JSON, false caso contrário.
 */
export function isJsonResponse(response: Response): boolean {
  const contentType = response.headers.get("Content-Type");
  return contentType?.includes("application/json") ?? false;
}

/**
 * Cria uma Promise que resolve após um determinado número de milissegundos.
 * Útil para simular atrasos ou para fins de depuração.
 * @param ms O tempo em milissegundos para esperar.
 * @returns Uma Promise que resolve após o tempo especificado.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Verifica se um dado é uma instância de FormData.
 * @param data O dado a ser verificado.
 * @returns True se o dado for FormData, false caso contrário.
 */
export function isFormData(data: unknown): data is FormData {
  return typeof FormData !== "undefined" && data instanceof FormData;
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
    return true;
  } catch {
    return false;
  }
}

/**
 * Prepara o corpo da requisição e ajusta os cabeçalhos Content-Type
 * com base no tipo de dado a ser enviado.
 *
 * @param method O método HTTP da requisição (ex: 'POST', 'PUT').
 * @param data Os dados a serem enviados no corpo da requisição. Pode ser undefined.
 * @param existingHeaders Os cabeçalhos HTTP existentes da requisição.
 * @returns Um objeto contendo o 'body' formatado e os 'headers' atualizados.
 */
export function prepareRequestBodyAndHeaders(
  method: string,
  data: unknown | undefined,
  existingHeaders: HeadersInit = {}
): { body: RequestInit["body"]; headers: HeadersInit } {
  const headers = new Headers(existingHeaders);
  let body: RequestInit["body"] = undefined;

  // Métodos HTTP que tipicamente têm um corpo de requisição.
  const methodsWithBody = ["POST", "PUT", "PATCH"];
  const shouldHaveBody = methodsWithBody.includes(method.toUpperCase());

  // Se o método não permite corpo e dados foram fornecidos, um aviso é emitido.
  if (!shouldHaveBody && data !== undefined) {
    console.warn(`Dados passados para uma requisição ${method}, que tipicamente não possui um corpo.`);
    // Retorna sem corpo e com os cabeçalhos existentes, pois o corpo não será enviado.
    return { body: undefined, headers: Object.fromEntries(headers.entries()) };
  }

  if (shouldHaveBody && data !== undefined) {
    if (isFormData(data)) {
      body = data;
      headers.delete("Content-Type");
    } else if (data instanceof URLSearchParams) {
      body = data.toString();
      headers.set("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
    } else if (typeof data === "string" || data instanceof Blob || data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
      // Para tipos de dados brutos como string, Blob, ArrayBuffer, etc.
      body = data;
      // Apenas define Content-Type se ainda não estiver definido e o dado for uma string
      // que não seja um JSON válido (assumindo que JSON seria tratado no próximo bloco).
      if (!headers.has("Content-Type") && typeof data === "string" && !isJsonString(data)) {
        headers.set("Content-Type", "text/plain");
      }
    } else {
      // Para qualquer outro tipo de dado (geralmente objetos JavaScript),
      // stringifica para JSON.
      body = JSON.stringify(data);
      // Se Content-Type não foi definido, assume que é JSON.
      if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }
    }
  }

  // Converte o objeto Headers de volta para um objeto simples
  // para compatibilidade com o tipo HeadersInit de RequestInit.
  // Usar Object.fromEntries(headers.entries()) é uma forma concisa de fazer isso.
  const finalHeaders: Record<string, string> = Object.fromEntries(headers.entries());

  return { body, headers: finalHeaders };
}
