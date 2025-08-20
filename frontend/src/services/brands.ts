import { api } from "@/lib/api";
import { Brand, Pagination } from "@/types";
import { QueryParams } from "./products";

interface BrandResponse {
  data: Brand[];
  meta: Pagination;
}

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

  public async getMany(query: QueryParams = { page: 1, limit: 10 }) {
    const { search, page, limit } = query;
    const params: Record<string, string> = {};

    if (search) params["search"] = search;
    if (page) params["page"] = page.toString();
    if (limit) params["limit"] = limit.toString();

    const brandTag = `brands-${JSON.stringify(params)}`;

    try {
      const response = await api.get<BrandResponse>("/brands", {
        cache: "force-cache",
        next: { revalidate: 3600, tags: ["brands", brandTag] },
        params: params,
        _noToken: true,
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
        next: { revalidate: 3600 * 24, tags: ["brands", brandTag] },
        _noToken: true,
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
