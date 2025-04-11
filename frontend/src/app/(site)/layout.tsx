import Navbar from "@/components/navbars/Navbar";
import Footer from "@/components/footer/Footer";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="pt-18 flex-1">{children}</main>
            <Footer />
        </div>
    );
}
