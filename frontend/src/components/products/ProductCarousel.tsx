import { Product } from "@/types";
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
  products: Product[];
  label: string;
  icon: React.ReactNode;
}

const ProductCarousel: React.FC<Props> = ({ products, label, icon }) => {
  const isLoading = !products || products.length === 0;
  const placeholder = Array(11).fill({}) as Product[];
  const randomInt = Math.floor(Math.random() * 1000);

  const items = isLoading ? placeholder : products;
  const renderItem = (product: Product, index: number) =>
    isLoading ? <ProductCardSkeleton /> : <ProductCard product={product} />;

  return (
    <div className="flex flex-col w-full">
      <h2 className="flex gap-2 items-center border-b border-lines text-2xl text-tx-primary font-bold my-2 py-2">
        {icon} {label}
      </h2>

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
              basis-[90%]        // mobile
              sm:basis-1/2   // tablet
              md:basis-1/3
              lg:basis-1/4
              xl:basis-[16.6%]   // notebook                
              2xl:basis-[19.6%]  // desktop 
            "
            >
              {renderItem(item, index)}
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
