import { api } from "@/lib/api";
import { Promotion } from "@/types";

class PromotionService {
  public async create(promotionData: Omit<Promotion, "id">) {
    try {
      const response = await api.post("/promotions", promotionData);
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/revalidate?tag=promotions`);
      return response.data;
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error);
      return null;
    }
  }

  public async getAll() {
    try {
      const response = await api.get<Promotion[]>("/promotions", {
        cache: "force-cache",
        next: { revalidate: 3600 * 24, tags: ["promotions"] },
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
      const promotionTag = `promotion-${slug}`;
      const response = await api.get<Promotion>(`/promotions/${slug}`, {
        cache: "force-cache",
        next: { revalidate: 3600 * 24, tags: ["promotions", promotionTag] },
        _noToken: true,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async update(id: string, promotionData: Partial<Promotion>) {
    try {
      const response = await api.put(`/promotions/${id}`, promotionData);
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/revalidate?tag=promotions`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async delete(id: string) {
    try {
      const response = await api.delete(`/promotions/${id}`);
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/revalidate?tag=promotions`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export const promotionService = new PromotionService();
