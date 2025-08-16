// page.tsx (ou qualquer componente de página dinâmico)
"use client"; // Necessário para usar 'use cache' no modo de cliente
import { use } from "react";

const cacheData = async () => {
  const res = await fetch("http://localhost:3001/api/products", { cache: "force-cache" });
  const data = await res.json();
  return data;
};

export default function Page() {
  const data = use(cacheData()); // Carrega os dados do cache (ou busca se não estiver no cache)

  return (
    <div>
      <h1>Rota Dinâmica</h1>
      <p>Dados: {JSON.stringify(data)}</p>
    </div>
  );
}
