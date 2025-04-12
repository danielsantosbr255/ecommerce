"use client";

import Carousel from "@/components/carousel/Carousel";
import Product from "@/components/products/Product";
import { ProductType } from "@/types/ProductType";
import ProductsUtil from "@/utils/products.util";
import { Crown, Grid2x2Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import CarouselBanner from "@/components/carousel/CarouselBanner";

interface BannerImage {
  url: string;
  alt?: string;
}

export default function Home() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    setLoading(true);

    try {
      const fetchedProducts = await ProductsUtil.fetchProducts();
      setProducts(fetchedProducts);
    } catch (err) {
      console.error("Erro ao carregar produtos:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const bannerImages: BannerImage[] = [
    { url: "/images/banner1.jpg", alt: "Banner Promocional 1" },
    { url: "/images/banner2.jpg", alt: "Banner Promocional 2" },
    { url: "/images/banner3.jpg", alt: "Banner Promocional 3" },
    // Adicione mais imagens conforme necessário
  ];

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading)
    return (
      <div className="flex flex-col h-screen justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-500 flex justify-center items-center"></div>
      </div>
    );

  if (products.length === 0)
    return (
      <div className="w-full flex justify-center items-center">
        <h1 className="font-bold text-gray-600 text-2xl">Nenhum Produto Encontrado!</h1>
      </div>
    );

  return (
    <main className="flex flex-col gap-6 items-center">
      {/* BANNER */}
      <section className="w-full h-auto shadow">
        <CarouselBanner images={bannerImages} containerId="banner-carousel" className="w-full" />
      </section>

      {/* DESTAQUES */}
      <section className="w-full h-auto px-4 lg:max-w-10/12">
        <h2 className="flex items-center gap-2 border-b border-gray-200 text-2xl text-gray-800 font-bold my-2 py-2">
          <Crown size={20} className="text-amber-500" />
          Destaques
        </h2>
        <Carousel products={products} containerId="destaques-carousel" />
      </section>

      <section className="flex flex-col gap-4 lg:max-w-10/12 mx-auto px-4 mb-10">
        <h2 className="flex gap-2 items-center border-b border-gray-200 text-2xl text-gray-800 font-bold my-2 py-2">
          <Grid2x2Plus size={20} />
          Produtos
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7 xl:px-0">
          {products.map((product: ProductType) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
