// pages/index.tsx
import React from "react";
import StickyOnScroll from "@/components/layout/StickyOnScroll";

export default function Home() {
  return (
    <div className="space-y-10">
      <div className="h-[600px] bg-gray-100 p-4">
        <p>Conteúdo antes do sticky</p>
      </div>

      <StickyOnScroll offset={0}>
        <div className="bg-blue-500 text-white p-4 rounded">Este conteúdo ficará fixo no topo ao rolar</div>
      </StickyOnScroll>

      <div className="h-[1200px] bg-gray-200 p-4">
        <p>Conteúdo depois do sticky</p>
      </div>
    </div>
  );
}
