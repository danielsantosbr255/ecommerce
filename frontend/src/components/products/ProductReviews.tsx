import { Review } from "@/types";
import { Pencil, User2 } from "lucide-react";

interface Props {
  fetchReviews: () => Promise<Review[] | null>;
}

export default async function ProductReviews({ fetchReviews }: Props) {
  const reviews = await fetchReviews();

  if (!reviews) return <div className="text-tx-secondary text-center">Nenhuma avaliação ainda.</div>;

  return (
    <div>
      <div>
        <h2 className="text-2xl font-semibold mb-4 border-b border-lines py-2 flex items-center gap-2">
          <Pencil /> Avaliações
        </h2>
        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="bg-bg-secondary flex shadow-xs gap-4 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="bg-primary secondary flex items-center shadow-xs justify-center w-15 h-15 rounded-full">
                    <User2 size={30} className="text-tx-on-primary" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 font-semibold">
                    <div>Usuário Anônimo</div>
                    <div className="text-primary">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </div>
                  </div>
                  <p className="text-tx-secondary line-clamp-3">{review.comment}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-tx-secondary text-center">Nenhuma avaliação ainda.</div>
          )}
        </div>
      </div>
    </div>
  );
}
