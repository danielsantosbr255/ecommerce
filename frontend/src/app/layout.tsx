import "./globals.css";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Roboto } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/contexts/AuthContext";
import { setServerCookies } from "@/lib/api/axios";

export const metadata: Metadata = {
  title: "Fireforge Labs",
  description: "Criado por Daniel Santos",
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();  
  setServerCookies(cookieStore.toString());

  return (
    <html lang="pt-BR">
      <body className={roboto.className}>
        <AuthProvider>{children}</AuthProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
