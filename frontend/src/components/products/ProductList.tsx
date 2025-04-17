"use client";

// import Carousel from "@/components/carousel/Carousel";
import ProductCard from "@/components/products/ProdutctCard";
import { ProductType } from "@/types/ProductType";
import { Grid2x2Plus } from "lucide-react";
import Carousel from "../carousel/Carousel";
import Image from "next/image";

interface ProductListProps {
  products: ProductType[];
  label: string;
}

type ProductTProps = {
  product: ProductType;
  label?: string;
};

const ProductT = ({ product, label }: ProductTProps) => {
  return (
    <div className="-bg-red-500 rounded-lg w-full aspect-[3/5] p-2 overflow-hidden border border-gray-200">
      <section className="-bg-blue-500 w-full h-full rounded-lg flex flex-col gap-1 overflow-hidden">
        {/* NOVIDADES */}
        <div className="-bg-amber-500 flex items-center justify-center rounded-lg h-[10%] overflow-hidden">
          <span className="text-white font-semibold text-xs sm:text-sm">Novo</span>
        </div>

        {/* IMAGEM DO PRODUTO */}
        <div className="-bg-amber-500 flex items-center justify-center rounded-lg h-[50%] overflow-hidden">
          <div className="relative w-full h-full">
            <Image src={product.images[0].url} alt="Placeholder" fill className="object-contain" />
          </div>
        </div>

        {/* DESCRIÇÃO DO PRODUTO */}
        <div className="-bg-amber-200 rounded-lg h-[30%] text-gray-800 text-lg sm:text-sm lg:text-sm overflow-hidden">
          <div className="flex flex-col gap-0 h-full overflow-hidden justify-around">
            <p className="font-bold line-clamp-2 text-xl">{product.title}</p>
            <p className="text-highlight-n font-bold line-clamp-1">R$ 99,99</p>
            <p className="line-clamp-1">À vista ou até 10x de R$ 9,99</p>
            <p className="text-white font-semibold line-clamp-1">Avaliações: 4.5/5</p>
          </div>
        </div>

        {/* BOTÃO */}
        <div className="bg-highlight-n rounded-lg h-[10%] flex items-center justify-center overflow-hidden">
          <button className="w-full text-white font-semibold text-xs sm:text-sm">
            Adicionar ao Carrinho
          </button>
        </div>
      </section>
    </div>
  );
};

export default function ProductList({ products, label }: ProductListProps) {
  if (products.length === 0)
    return (
      <div className="w-full flex justify-center items-center mt-10">
        <h1 className="font-bold text-gray-600 text-2xl">Nenhum Produto Encontrado!</h1>
      </div>
    );

  return (
    <div className="-bg-green-500 p-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductT key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

// <section className="flex flex-col gap-4 px-4 h-80">
//   <h2 className="flex gap-2 items-center border-b border-gray-200 text-2xl text-gray-800 font-bold my-2 py-2">
//     <Grid2x2Plus size={20} />
//     {label}
//   </h2>
//   <Carousel products={products} containerId="product-carousel" />
// </section>
