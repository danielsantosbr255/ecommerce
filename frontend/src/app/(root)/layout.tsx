import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/navbar/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fireforge Labs - Loja de Informática",
  description: "Aqui você encontra os melhores preços de hardware e software para seu computador.",
};

export default function ShopLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="bg-bg-primary grid grid-rows-1 grid-cols-1 w-full h-full min-h-screen">
      <Header />
      <section className="flex flex-col pt-30 md:pt-36">
        <div className="flex flex-1">{children}</div>
      </section>
      <Footer />
    </main>
  );
}
