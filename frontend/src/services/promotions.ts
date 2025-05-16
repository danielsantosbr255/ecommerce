import api from "@/lib/axios";
import { Promotion } from "@/types";

class PromotionService {
  public async create(promotionData: Omit<Promotion, "id">) {
    try {
      const response = await api.post("/promotions", promotionData);
      return response.data;
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error);
      return null;
    }
  }

  public async getPromotions() {
    try {
      const response = await api.get("/promotions");
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getPromotion(slug: string) {
    try {
      const response = await api.get(`/promotions/${slug}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async update(id: string, promotionData: Partial<Promotion>) {
    try {
      const response = await api.put(`/promotions/${id}`, promotionData);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async delete(id: string) {
    try {
      const response = await api.delete(`/promotions/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export const promotionService = new PromotionService();
