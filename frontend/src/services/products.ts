import { api } from "@/lib/api";
import { Pagination, Product } from "@/types";

export interface ProductResponse {
  data: Product[];
  meta: Pagination;
}

export interface QueryParams {
  search?: string;
  page?: number;
  limit?: number;
  brandId?: string;
  categoryId?: string;
  orderBy?: string;
  order?: "asc" | "desc";
}

class ProductService {
  private baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;

  public async create(productData: FormData) {
    const response = await api.post<Product>(`/products`, productData);
    await fetch(`${this.baseUrl}/revalidate?tag=products`);
    return response.data;
  }

  public async getMany(query: QueryParams = { page: 1, limit: 20 }, auth = false) {
    const { search, page, limit, brandId, categoryId } = query;
    const params: Record<string, string> = {};

    if (search) params["search"] = search;
    if (page) params["page"] = page.toString();
    if (limit) params["limit"] = limit.toString();
    if (brandId) params["brandId"] = brandId;
    if (categoryId) params["categoryId"] = categoryId;
    if (query.orderBy) params["orderBy"] = query.orderBy;
    if (query.order) params["order"] = query.order;

    const productTag = `products-${JSON.stringify(params)}`;

    try {
      const response = await api.get(`/products`, {
        cache: "force-cache",
        next: { revalidate: 3600, tags: ["products", productTag] },
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

  public async getOne(slug: string) {
    try {
      const productTag = `product-${slug}`;

      const response = await api.get<Product>(`/products/${slug}`, {
        cache: "force-cache",
        next: { revalidate: 3600, tags: ["products", productTag] },
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
      const productTag = `related-products-${productId}`;

      const response = await api.get<ProductResponse>(`/products/${productId}/related`, {
        cache: "force-cache",
        next: { revalidate: 1800, tags: ["products", productTag] },
        _noToken: true,
      });
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
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export const productService = new ProductService();
