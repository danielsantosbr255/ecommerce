import { RawHeaders, HeaderValue } from "../types";

export class CustomHeaders extends Headers {
  constructor(headers?: RawHeaders | Headers | string) {
    if (typeof headers === "string") {
      super();

      console.warn(
        "Initializing CustomHeaders with a string is not fully supported for parsing complex structures. Use RawHeaders or Headers."
      );

      const parts = headers.split(":");
      if (parts.length >= 2) {
        this.set(parts[0].trim(), parts.slice(1).join(":").trim());
      }
    } else if (headers instanceof Headers) {
      super(headers);
    } else if (headers) {
      super();

      for (const key in headers) {
        if (Object.prototype.hasOwnProperty.call(headers, key)) {
          const value = headers[key];
          if (value !== null && value !== undefined) {
            this.set(key, Array.isArray(value) ? value.join(", ") : String(value));
          }
        }
      }
    } else {
      super();
    }
  }

  /**
   * Define um cabeçalho.
   * @param headerName O nome do cabeçalho.
   * @param value O valor do cabeçalho. `null` ou `undefined` para remover.
   * @param rewrite Se true, substitui o valor existente. Se false, adiciona. Padrão: true.
   * @returns A própria instância de CustomHeaders para encadeamento.
   */
  set(headerName: string, value: HeaderValue | undefined | null, rewrite: boolean = true): CustomHeaders {
    if (value === null || value === undefined) {
      this.delete(headerName);
      return this;
    }

    const stringValue = Array.isArray(value) ? value.join(", ") : String(value);

    if (rewrite) {
      super.set(headerName, stringValue);
    } else {
      super.append(headerName, stringValue);
    }
    return this;
  }

  /**
   * Obtém o valor de um cabeçalho.
   * @param headerName O nome do cabeçalho.
   * @returns O valor do cabeçalho como string, ou null se não encontrado.
   */
  get(headerName: string): string | null {
    return super.get(headerName);
  }

  /**
   * Verifica se um cabeçalho existe.
   * @param headerName O nome do cabeçalho.
   * @returns True se o cabeçalho existir, false caso contrário.
   */
  has(headerName: string): boolean {
    return super.has(headerName);
  }

  /**
   * Deleta um cabeçalho.
   * @param headerName O nome do cabeçalho a ser deletado.
   * @returns True se o cabeçalho foi deletado, false se não existia.
   */
  delete(headerName: string): boolean {
    const hadHeader = this.has(headerName);
    super.delete(headerName);
    return hadHeader;
  }

  /**
   * Converte os cabeçalhos para um objeto JavaScript simples (RawHeaders).
   * @returns Um objeto contendo os cabeçalhos.
   */
  toJSON(): RawHeaders {
    const obj: RawHeaders = {};
    this.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }

  /**
   * Cria uma nova instância de CustomHeaders a partir de diversos tipos de entrada.
   * @param thing Objeto RawHeaders, Headers nativo, CustomHeaders, ou string de cabeçalhos.
   * @returns Uma nova instância de CustomHeaders.
   */
  static from(thing?: RawHeaders | Headers | CustomHeaders | string): CustomHeaders {
    if (thing instanceof CustomHeaders) {
      return thing;
    }
    if (thing instanceof Headers || typeof thing === "string" || (typeof thing === "object" && thing !== null)) {
      return new CustomHeaders(thing as RawHeaders | Headers | string);
    }
    return new CustomHeaders();
  }

  public setContentType(value: HeaderValue, rewrite?: boolean): CustomHeaders {
    return this.set("Content-Type", value, rewrite);
  }
  public getContentType(): string | null {
    return this.get("Content-Type");
  }
  public hasContentType(): boolean {
    return this.has("Content-Type");
  }

  public setAuthorization(value: HeaderValue, rewrite?: boolean): CustomHeaders {
    return this.set("Authorization", value, rewrite);
  }
  public getAuthorization(): string | null {
    return this.get("Authorization");
  }
  public hasAuthorization(): boolean {
    return this.has("Authorization");
  }
}
