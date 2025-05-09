"use client";
import { useState } from "react";
import Button from "../ui/Button";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext";
import { reviewService } from "@/services/reviews";

export default function ProductReviewsForm({ productSlug }: { productSlug: string }) {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  if (!user) return null;

  async function handleReviewSubmit() {
    if (!user) return null;
    const success = await reviewService.create({ userId: user.id, productSlug, rating, comment });

    if (success) {
      return toast.success("Avaliação enviada com sucesso!");
    }
    toast.error("Erro ao enviar avaliação. Tente novamente mais tarde.");
  }

  return (
    <div className="mt-6 bg-white p-4 rounded-lg shadow-xs space-y-4">
      <h3 className="text-xl font-bold">Deixe sua avaliação</h3>

      <select
        value={rating}
        onChange={(e) => setRating(+e.target.value)}
        className="border border-lines rounded-lg px-4 py-2 w-full"
      >
        {[5, 4, 3, 2, 1].map((n) => (
          <option key={n} value={n}>
            {n} Estrela{n > 1 && "s"}
          </option>
        ))}
      </select>

      <textarea
        placeholder="Comentário"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="border border-lines rounded-lg px-4 py-2 w-full h-24 focus:outline-primary-active"
      />
      <Button
        onClick={handleReviewSubmit}
        className="bg-primary text-tx-on-primary px-6 py-2 rounded-lg hover:bg-primary"
      >
        Enviar Avaliação
      </Button>
    </div>
  );
}
