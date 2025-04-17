import type { Metadata } from "next";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";
import Gate from "@/components/layout/Gate";
import { ApiProvider } from "@/contexts/ApiContext";
import { Roboto } from "next/font/google";

export const metadata: Metadata = {
  title: "Fireforge Labs",
  description: "Criado por Daniel Santos",
};

const poppins = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>
        <AuthProvider>
          <ApiProvider>{children}</ApiProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
