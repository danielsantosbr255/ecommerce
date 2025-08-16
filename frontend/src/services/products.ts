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
  private baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;

  public async create(productData: FormData) {
    const response = await api.post<Product>(`/products`, productData);
    await fetch(`${this.baseUrl}/revalidate?tag=products`);
    await fetch(`${this.baseUrl}/revalidate?tag=promotions`);
    await fetch(`${this.baseUrl}/revalidate?tag=categories`);
    await fetch(`${this.baseUrl}/revalidate?tag=brands`);
    return response.data;
  }

  public async getAll(search: SearchParams = { page: 1, pageSize: 20 }, auth = false) {
    const { q, page, pageSize, brandId, categoryId, minPrice, maxPrice } = search;
    const params: Record<string, string> = {};

    if (q) params["q"] = q;
    if (page) params["page"] = page.toString();
    if (pageSize) params["pageSize"] = pageSize.toString();
    if (minPrice) params["minPrice"] = minPrice.toString();
    if (maxPrice) params["maxPrice"] = maxPrice.toString();
    if (brandId) params["brandId"] = brandId;
    if (categoryId) params["categoryId"] = categoryId;

    try {
      const response = await api.get(`/products`, {
        cache: "force-cache",
        next: { revalidate: 3600 * 2, tags: ["products"] },
        params: params,
        _auth: auth,
        _noToken: true,
      });
      return response.data as ProductResponse;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getBySlug(slug: string) {
    try {
      const productTag = `product-${slug}`;

      const response = await api.get<Product>(`/products/${slug}`, {
        cache: "force-cache",
        next: { revalidate: 3600 * 2, tags: ["products", productTag] },
        _noToken: true,
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
        next: { revalidate: 3600, tags: ["products"] },
        _noToken: true,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getCount() {
    try {
      const response = await api.get<number>("/products/count");
      console.log("Response data:", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async update(id: string, productData: FormData) {
    try {
      const response = await api.put<Product>(`/products/${id}`, productData);
      await fetch(`${this.baseUrl}/revalidate?tag=products`);
      await fetch(`${this.baseUrl}/revalidate?tag=promotions`);
      await fetch(`${this.baseUrl}/revalidate?tag=categories`);
      await fetch(`${this.baseUrl}/revalidate?tag=brands`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async delete(id: string) {
    try {
      const response = await api.delete(`/products/${id}`);
      await fetch(`${this.baseUrl}/revalidate?tag=products`);
      await fetch(`${this.baseUrl}/revalidate?tag=promotions`);
      await fetch(`${this.baseUrl}/revalidate?tag=categories`);
      await fetch(`${this.baseUrl}/revalidate?tag=brands`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export const productService = new ProductService();
