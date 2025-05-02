import ProductsUtil from "@/utils/products.util";
import { User2 } from "lucide-react";
import React from "react";

export default async function ProductReviews({ productSlug }: { productSlug: string }) {
  const reviews = await ProductsUtil.fetchReviews(productSlug);

  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Avaliações</h2>
        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="bg-gray-100 flex shadow-xs gap-4 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="bg-bg-secondary flex items-center shadow-xs justify-center w-15 h-15 rounded-full">
                    <User2 size={30} className="text-primary" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 font-semibold">
                    <div>"Usuário Anônimo"</div>
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
