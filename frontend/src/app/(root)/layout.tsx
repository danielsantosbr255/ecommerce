import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function ShopLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <main className="bg-bg-primary grid grid-rows-1 grid-cols-1 w-full h-full min-h-screen">
        <Header />
        <section className="flex flex-col pt-30 md:pt-36">
          <div className="flex flex-1">{children}</div>
        </section>
        <Footer />
      </main>
    </>
  );
}
