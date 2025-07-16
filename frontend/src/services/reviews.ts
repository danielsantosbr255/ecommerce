import { api } from "@/lib/api";
import { Review } from "@/types";

class ReviewService {
  public async create(reviewData: Omit<Review, "id" | "user">) {
    try {
      const response = await api.post("/reviews", reviewData);
      return response.data;
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error);
      return null;
    }
  }

  public async getAll() {
    try {
      const response = await api.get<Review[]>("/reviews", {
        cache: "force-cache",
        next: { revalidate: 60 },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getOne(id: string) {
    try {
      const response = await api.get(`/reviews/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getByProductId(id: string) {
    try {
      const response = await api.get<Review[]>(`/reviews/product/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async update(id: string, reviewData: Partial<Review>) {
    try {
      const response = await api.put(`/reviews/${id}`, reviewData);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async delete(id: string) {
    try {
      const response = await api.delete(`/reviews/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export const reviewService = new ReviewService();
