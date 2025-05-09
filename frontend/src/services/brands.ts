import api from "@/lib/api/axios";
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

  public async getAll(): Promise<Brand[] | null> {
    try {
      const response = await api.get("/brands");
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getOne(slug: string) {
    try {
      const response = await api.get(`/brands/${slug}`);
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
