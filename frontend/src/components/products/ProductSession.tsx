import { ProductType } from "@/types/ProductType";
import React from "react";
import Carousel from "../carousel/Carousel";
import { ProductsCarousel } from "../carousel/ProductCarousel";
import MyCustomCarousel from "../carousel/MyCarousel";
import CustomCarousel from "../carousel/CarouselCustom";

type ProductSessionProps = {
  products: ProductType[];
  label: string;
  icon: React.ReactNode;
};

export default function ProductSession({ products, label, icon }: ProductSessionProps) {
  return (
    <div className="flex flex-col w-full">
      <h2 className="flex gap-2 items-center border-b border-gray-200 text-2xl text-gray-800 font-bold my-2 py-2">
        {icon} {label}
      </h2>
      {/* <ProductsCarousel products={products} /> */}
      {/* <MyCustomCarousel slides={products} /> */}
      <CustomCarousel products={products} slidesToShow={5.1} />
      {/* <Carousel products={products} containerId={`product-${label.toLowerCase().replace(" ", "-")}`} /> */}
    </div>
  );
}
