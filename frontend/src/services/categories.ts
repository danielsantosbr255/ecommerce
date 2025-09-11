import { api } from "@/lib/api";
import { Category } from "@/types";

class CategoryService {
  public async create(categoryData: Omit<Category, "id">) {
    try {
      const response = await api.post<Category>("/categories", categoryData);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getAll() {
    try {
      const response = await api.get<Category[]>("/categories", {
        cache: "force-cache",
        next: { revalidate: 3600 * 24, tags: ["categories"] },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getOne(slug: string) {
    try {
      const categoryTag = `category-${slug}`;
      const response = await api.get<Category>(`/categories/${slug}`, {
        cache: "force-cache",
        next: { revalidate: 3600 * 24, tags: ["categories", categoryTag] },
        _noToken: true,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async update(slug: string, categoryData: Partial<Category>) {
    try {
      const response = await api.put<Category>(
        `/categories/${slug}`,
        categoryData
      );
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
