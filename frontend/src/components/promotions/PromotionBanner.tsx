import { Suspense } from "react";
import PromotionCarousel from "./PromotionCarousel";
import PromotionSkeleton from "./PromotionSkeleton";
import { promotionService } from "@/services/promotions";

const FetchPromotionBanner = async () => {
  const promotions = await promotionService.getPromotions();
  if (!promotions) return null;
  return <PromotionCarousel promotions={promotions} />;
};

export function PromotionBanner() {
  return (
    <Suspense fallback={<PromotionSkeleton />}>
      <FetchPromotionBanner />
    </Suspense>
  );
}
