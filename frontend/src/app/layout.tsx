import type { Metadata } from "next";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";
import Gate from "@/components/layout/Gate";
import { ApiProvider } from "@/contexts/ApiContext";

export const metadata: Metadata = {
  title: "Fireforge Labs",
  description: "Criado por Daniel Santos",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          <ApiProvider>
            <Gate>{children}</Gate>
          </ApiProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
