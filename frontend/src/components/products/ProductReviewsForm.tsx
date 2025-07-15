"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useAuth } from "@/providers/AuthContext";
import { reviewService } from "@/services/reviews";

import Button from "../ui/Button";
import ErrorMessage from "../ui/ErrorMessage";
import { Review } from "@/types";

export default function ProductReviewsForm({ productId }: { productId: string }) {
  const { user } = useAuth();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<Omit<Review, "id" | "user">>({
    defaultValues: { rating: 5, comment: "" },
  });

  if (!user) return null;

  const onSubmit = async (data: Omit<Review, "id" | "user">) => {
    const success = await reviewService.create({ ...data, productId, userId: user.id });

    if (success) {
      toast.success("Avaliação enviada com sucesso!");
      router.refresh();
      reset();
      return;
    }
    toast.error("Erro ao enviar avaliação. Tente novamente mais tarde.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 rounded-lg bg-white p-4 shadow-xs text-tx-primary">
      <h3 className="text-xl font-bold mb-4">Deixe sua avaliação</h3>

      <select
        {...register("rating", { required: true, min: 1, max: 5, valueAsNumber: true })}
        defaultValue={5}
        className="w-full rounded-lg border border-lines p-2 mb-2 focus:outline-primary"
      >
        {[5, 4, 3, 2, 1].map((n) => (
          <option key={n} value={n}>
            {n} Estrela{n > 1 && "s"}
          </option>
        ))}
      </select>

      <textarea
        {...register("comment", {
          required: "Comentário é obrigatorio",
          minLength: { value: 10, message: "O comentário precisa ter pelo menos 10 caracteres" },
        })}
        placeholder="Comentário"
        className="h-24 w-full rounded-lg border border-lines p-2 focus:outline-primary"
      />

      <ErrorMessage message={errors.comment?.message} className="mb-2" />

      <Button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-primary px-6 py-2 text-tx-on-primary hover:bg-primary disabled:opacity-60"
      >
        {isSubmitting ? "Enviando..." : "Enviar Avaliação"}
      </Button>
    </form>
  );
}
