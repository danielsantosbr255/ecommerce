import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Entrar/Cadastrar - Fireforge Labs",
  description: "Área de autenticação do Fireforge Labs, aqui você pode entrar na sua conta ou criar uma nova.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col h-screen w-full items-center">
      <main className="flex flex-1 w-full items-center justify-center">{children}</main>
    </div>
  );
}
