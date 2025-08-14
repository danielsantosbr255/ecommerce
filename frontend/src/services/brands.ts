import { api } from "@/lib/api";
import { Brand } from "@/types";

class BrandService {
  private baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;

  public async create(brandData: Omit<Brand, "id">) {
    try {
      const response = await api.post<Brand>("/brands", brandData);
      await fetch(`${this.baseUrl}/revalidate?tag=brands`);
      await fetch(`${this.baseUrl}/revalidate?tag=products`);
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
        next: { revalidate: 3600, tags: ["brands"] },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getOne(slug: string) {
    try {
      const brandTag = `brand-${slug}`;
      const response = await api.get<Brand>(`/brands/${slug}`, {
        cache: "force-cache",
        next: { revalidate: 3600, tags: ["brands", brandTag] },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async update(slug: string, brandData: Partial<Brand>) {
    try {
      const response = await api.put<Brand>(`/brands/${slug}`, brandData);
      await fetch(`${this.baseUrl}/revalidate?tag=brands`);
      await fetch(`${this.baseUrl}/revalidate?tag=products`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async delete(slug: string) {
    try {
      const response = await api.delete(`/brands/${slug}`);
      await fetch(`${this.baseUrl}/revalidate?tag=brands`);
      await fetch(`${this.baseUrl}/revalidate?tag=products`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export const brandService = new BrandService();
