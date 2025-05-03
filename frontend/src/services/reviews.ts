import api from "@/lib/api/axios";
import { Review } from "@/types";

class ReviewService {
  public async create(reviewData: Omit<Review, "id">) {
    try {
      const response = await api.post("/reviews", reviewData);
      return response.data;
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error);
      return null;
    }
  }

  public async getReviews() {
    try {
      const response = await api.get("/reviews");
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getReview(id: string) {
    try {
      const response = await api.get(`/reviews/${id}`);
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
