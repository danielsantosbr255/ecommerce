import BrandsCarousel from "./BrandsCarousel";
import { brandService } from "@/services/brands";

export default async function Brands() {
  const brands = await brandService.getAll();
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  if (!brands) return null;

  return <BrandsCarousel brands={brands} />;
}
