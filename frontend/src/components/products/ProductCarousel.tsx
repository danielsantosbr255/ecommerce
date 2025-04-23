import { ProductType } from "@/types/ProductType";
import ProductCard from "../products/ProdutctCard";
import ProductCardSkeleton from "../products/ProductCardSkeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel/carousel";
import Autoplay from "embla-carousel-autoplay";

interface Props {
  products: ProductType[];
  slidesToShow?: number;
}

const ProductCarousel: React.FC<Props> = ({ products, slidesToShow = 3 }) => {
  const isLoading = !products || products.length === 0;
  const placeholder = Array(11).fill({}) as ProductType[];
  const randomInt = Math.floor(Math.random() * 1000);

  const items = isLoading ? placeholder : products;
  const renderItem = (product: ProductType, index: number) =>
    isLoading ? <ProductCardSkeleton /> : <ProductCard product={product} />;

  return (
    <Carousel
      className="w-full"
      opts={{ align: "start", loop: true }}
      plugins={[Autoplay({ delay: 3000 + randomInt })]}
    >
      <CarouselContent className="ml-0">
        {items.map((item, index) => (
          <CarouselItem
            key={index}
            className="
              p-0
              basis-full        // mobile
              sm:basis-1/2   // tablet
              md:basis-1/3
              lg:basis-1/4
              xl:basis-1/5   // notebook                
              2xl:basis-1/6  // desktop 
            "
          >
            {renderItem(item, index)}
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ProductCarousel;
