import "./globals.css";
import type { Metadata } from "next";
import { AuthProvider } from "@/contexts/AuthContext";
import { Roboto } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { refreshToken, setServerCookies } from "@/lib/api/axios";
import { cookies } from "next/headers";

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
  await refreshToken();

  return (
    <html lang="pt-BR">
      <body className={roboto.className}>
        <AuthProvider>{children}</AuthProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
