import { Suspense } from "react";
import PromotionCarousel from "./PromotionCarousel";
import { promotionService } from "@/services/promotions";

const FetchPromotionBanner = async () => {
  const promotions = await promotionService.getAll();
  return <PromotionCarousel promotions={promotions} />;
};

export function PromotionBanner() {
  return (
    <Suspense fallback={<PromotionCarousel promotions={null} />}>
      <FetchPromotionBanner />
    </Suspense>
  );
}
