import api from "@/lib/axios";
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
      const response = await api.post("/products", productData);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getAll(): Promise<ProductResponse | null> {
    try {
      const response = await api.get("/products");
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getBySlug(slug: string): Promise<Product | null> {
    try {
      const response = await api.get(`/products/${slug}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getByQuery({ query, page, pageSize }: QueryParams): Promise<ProductResponse | null> {
    try {
      const response = await api.get(`/products?q=${query}&page=${page}&pageSize=${pageSize}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getRelated(productId: string): Promise<Product[] | null> {
    try {
      const response = await api.get(`/products/${productId}/related`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async update(id: string, productData: Partial<Product>) {
    try {
      const response = await api.put(`/products/${id}`, productData);
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
