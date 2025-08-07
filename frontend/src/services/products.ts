import { api } from "@/lib/api";
import { Pagination, Product } from "@/types";

export interface ProductResponse {
  products: Product[];
  pagination: Pagination;
}

export interface QueryParams {
  query: string;
  page: number;
  pageSize: number;
}

export interface SearchParams {
  q?: string;
  page?: number;
  pageSize?: number;
  categoryId?: string;
  brandId?: string;
  minPrice?: number;
  maxPrice?: number;
}

class ProductService {
  private baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`;

  public async create(productData: FormData) {
    const response = await api.post<Product>(`${this.baseUrl}`, productData);
    return response.data;
  }

  public async getAll(search?: SearchParams) {
    const { q, page, pageSize, brandId, categoryId, minPrice, maxPrice } = search || { page: 1, pageSize: 20 };
    const params: Record<string, string | number> = {};

    if (q) params["q"] = q;
    if (page) params["page"] = page;
    if (pageSize) params["pageSize"] = pageSize;
    if (minPrice) params["minPrice"] = minPrice;
    if (maxPrice) params["maxPrice"] = maxPrice;
    if (brandId) params["brandId"] = brandId;
    if (categoryId) params["categoryId"] = categoryId;

    try {
      const response = await api.get<ProductResponse>("/products", {
        cache: "force-cache",
        next: { revalidate: 3600 },
        params,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getBySlug(slug: string) {
    try {
      const response = await api.get<Product>(`/products/${slug}`, {
        cache: "force-cache",
        next: { revalidate: 3600 },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getByQuery({ query, page, pageSize }: QueryParams) {
    try {
      const response = await api.get<ProductResponse>(`/products?q=${query}&page=${page}&pageSize=${pageSize}`, {
        cache: "force-cache",
        next: { revalidate: 3600 },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getRelated(productId: string) {
    try {
      const response = await api.get<ProductResponse>(`/products/${productId}/related`, {
        cache: "force-cache",
        next: { revalidate: 3600 },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async update(id: string, productData: FormData) {
    try {
      const response = await api.put<Product>(`${this.baseUrl}/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async delete(id: string) {
    try {
      const response = await api.delete(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export const productService = new ProductService();
