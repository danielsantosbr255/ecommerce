import { api } from "@/lib/api";
import { Brand } from "@/types";

class BrandService {
  public async create(brandData: Omit<Brand, "id">) {
    try {
      const response = await api.post("/brands", brandData);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getAll() {
    try {
      const response = await api.get<Brand[]>("/brands", {
        cache: "force-cache",
        next: { revalidate: 60 },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getOne(slug: string) {
    try {
      const response = await api.get<Brand>(`/brands/${slug}`, {
        cache: "force-cache",
        next: { revalidate: 60 },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async update(slug: string, brandData: Partial<Brand>) {
    try {
      const response = await api.put(`/brands/${slug}`, brandData);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async delete(slug: string) {
    try {
      const response = await api.delete(`/brands/${slug}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export const brandService = new BrandService();
