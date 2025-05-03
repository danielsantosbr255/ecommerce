import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="bg-bg-primary grid grid-cols-1 grid-rows-[auto_1fr] min-h-screen p-0">
      <Header />
      <div className="flex flex-col">
        <div className="flex flex-1 rounded-2xl ">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
