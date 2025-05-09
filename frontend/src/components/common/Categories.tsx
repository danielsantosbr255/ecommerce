import { categoryService } from "@/services/categories";
import CategoriesCarousel from "./CategoriesCarousel";

export default async function Categories() {
  const categories = await categoryService.getAll();
  // await new Promise((resolve) => setTimeout(resolve, 8000));

  if (!categories) return null;

  return <CategoriesCarousel categories={categories} />;
}
