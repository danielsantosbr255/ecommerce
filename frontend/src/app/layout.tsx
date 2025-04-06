import type { Metadata } from "next";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";
import Gate from "@/components/gate/Gate";

export const metadata: Metadata = {
    title: "Fireforge Labs",
    description: "Criado por Daniel Santos",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="pt-BR">
            <body>
                <AuthProvider>
                    <Gate>{children}</Gate>
                </AuthProvider>
            </body>
        </html>
    );
}
