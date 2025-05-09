import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function ShopLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="bg-bg-primary grid grid-cols-1 grid-rows-[auto_1fr] min-h-screen p-0">
      <Header />
      <section className="flex flex-col">
        <div className="flex flex-1">{children}</div>
        <Footer />
      </section>
    </main>
  );
}
