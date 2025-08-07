import { Product } from "@/types";
import { FaUser } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import SessionLabel from "../ui/SessionLabel";
import { reviewService } from "@/services/reviews";

export default async function ProductReviews({ product }: { product: Product }) {
  const reviews = await reviewService.getByProductId(product.id);

  if (!reviews || !reviews.length) {
    return <div className="bg-bg-secondary font-semibold p-4 rounded-lg shadow-xs text-center">Nenhuma avaliação ainda.</div>;
  }

  return (
    <section className="flex flex-col gap-4">
      <SessionLabel label="Avaliações" icon={<MdRateReview className="text-primary" />} />

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-bg-secondary flex shadow-xs gap-4 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="bg-primary secondary flex items-center shadow-xs justify-center w-15 h-15 rounded-full">
                <FaUser size={30} className="text-tx-on-primary" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 font-semibold">
                <div>{review.user?.name}</div>
                <div className="text-primary">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>
              </div>
              <p className="text-tx-primary line-clamp-3">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
