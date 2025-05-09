import api from "@/lib/api/axios";
import { Category } from "@/types";

class CategoryService {
  public async create(categoryData: Omit<Category, "id">) {
    try {
      const response = await api.post("/categories", categoryData);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getAll(): Promise<Category[] | null> {
    try {
      const response = await api.get("/categories");
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getOne(slug: string) {
    try {
      const response = await api.get(`/categories/${slug}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async update(slug: string, categoryData: Partial<Category>) {
    try {
      const response = await api.put(`/categories/${slug}`, categoryData);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async delete(slug: string) {
    try {
      const response = await api.delete(`/categories/${slug}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export const categoryService = new CategoryService();
