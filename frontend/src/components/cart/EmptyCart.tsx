// src/components/cart/EmptyCart.tsx
import React from "react";
import Link from "next/link";

const EmptyCart: React.FC = () => (
  <div className="text-gray-600 text-center">
    Seu carrinho está vazio.
    <br />
    <Link href="/" className="text-amber-500 hover:underline">
      Voltar à loja
    </Link>
  </div>
);

export default EmptyCart;
