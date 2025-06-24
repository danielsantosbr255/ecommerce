// src/components/cart/EmptyCart.tsx
import React from "react";
import Link from "next/link";

const EmptyCart: React.FC = () => (
  <div className="flex flex-col w-full mt-10 justify-center items-center text-tx-primary">
    <h1 className="text-2xl font-semibold mb-4">Seu carrinho está vazio</h1>
    <p className="text-center mb-4">Adicione produtos ao carrinho para continuar a comprar.</p>

    <Link href="/" className="text-primary hover:underline text-lg font-semibold">
      Voltar à loja
    </Link>
  </div>
);

export default EmptyCart;
