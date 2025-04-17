import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="pt-22 lg:pt-20 flex-1">{children}</main>
      <Footer />
    </div>
  );
}
