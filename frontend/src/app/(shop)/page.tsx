import CarouselBanner from "@/components/carousel/CarouselBanner";

import ProductList from "@/components/layout/ProductList";

interface BannerImage {
  url: string;
  alt?: string;
}

export default async function Home() {
  const bannerImages: BannerImage[] = [
    { url: "/images/banner1.jpg", alt: "Banner Promocional 1" },
    { url: "/images/banner2.jpg", alt: "Banner Promocional 2" },
    { url: "/images/banner3.jpg", alt: "Banner Promocional 3" },
    { url: "/images/banner4.jpg", alt: "Banner Promocional 4" },
    { url: "/images/banner5.jpg", alt: "Banner Promocional 5" },
  ];

  return (
    <main className="flex flex-col w-full h-full gap-6 items-center shrink-0">
      {/* BANNER */}
      <section className="flex flex-col gap-2 w-full h-full shadow-lg rounded-b-lg overflow-hidden lg:max-w-10/12">
        <CarouselBanner images={bannerImages} containerId="banner-carousel" />
      </section>

      <ProductList />
    </main>
  );
}
