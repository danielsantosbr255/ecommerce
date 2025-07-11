// import api from "@/lib/axios";
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

class ProductService {
  public async create(productData: Omit<Product, "id">) {
    try {
      const response = await api.post<Product>("/products", productData);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getAll() {
    try {
      const response = await api.get<ProductResponse>("/products", {
        cache: "force-cache",
        next: { revalidate: 60 },
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
        next: { revalidate: 60 },
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
        next: { revalidate: 60 },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getRelated(productId: string) {
    try {
      const response = await api.get<ProductResponse>(`/products/${productId}/related`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async update(id: string, productData: Partial<Product>) {
    try {
      const response = await api.put<Product>(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async delete(id: string) {
    try {
      const response = await api.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export const productService = new ProductService();
