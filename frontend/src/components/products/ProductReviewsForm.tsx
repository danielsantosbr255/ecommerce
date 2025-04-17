"use client";
import { useAuth } from "@/contexts/AuthContext";
import ReviewsUtil from "@/utils/reviews.util";
import { useState } from "react";

export default function ProductReviewsForm({ productSlug }: { productSlug: string }) {
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const { accessToken } = useAuth();

  async function handleReviewSubmit() {
    try {
      const review = await ReviewsUtil.createReview({
        accessToken,
        productSlug,
        rating: newReview.rating,
        comment: newReview.comment,
      });
      alert("Avaliação enviada com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error);
      alert("Erro ao enviar avaliação. Tente novamente mais tarde.");
    }
  }

  return (
    <div className="mt-6 bg-white p-4 rounded-lg shadow space-y-4">
      <h3 className="text-xl font-bold">Deixe sua avaliação</h3>

      <select
        value={newReview.rating}
        onChange={(e) => setNewReview({ ...newReview, rating: +e.target.value })}
        className="border rounded-lg px-4 py-2 w-full"
      >
        {[5, 4, 3, 2, 1].map((n) => (
          <option key={n} value={n}>
            {n} Estrela{n > 1 && "s"}
          </option>
        ))}
      </select>

      <textarea
        placeholder="Comentário"
        value={newReview.comment}
        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
        className="border rounded-lg px-4 py-2 w-full h-24"
      />
      <button
        onClick={handleReviewSubmit}
        className="bg-highlight-n text-white px-6 py-2 rounded-lg hover:bg-highlight-n"
      >
        Enviar Avaliação
      </button>
    </div>
  );
}
