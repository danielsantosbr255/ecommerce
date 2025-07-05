import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ToastContainer, Flip } from "react-toastify";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "Fireforge Labs",
  description: "Criado por Daniel Santos",
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={roboto.className + " bg-bg-primary !text-tx-primary"}>
        <AuthProvider>{children}</AuthProvider>
        <ToastContainer autoClose={1300} position="top-center" transition={Flip} />
      </body>
    </html>
  );
}
