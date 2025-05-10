import api from "@/lib/api/axios";
import { Product } from "@/types";

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

  public async getAll(): Promise<Product[] | null> {
    try {
      const response = await api.get("/products");
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getProduct(slug: string): Promise<Product | null> {
    try {
      const response = await api.get(`/products/${slug}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getProductsByCategory(productId: string): Promise<Product[] | null> {
    try {
      const response = await api.get(`/products/${productId}/related`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getProductByQuery(query: string): Promise<Product[] | null> {
    try {
      const response = await api.get(`/products/search/${query}`);
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
