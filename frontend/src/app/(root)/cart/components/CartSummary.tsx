// src/components/cart/CartSummary.tsx
import React from "react";
import CurrencyUtil from "@/utils/currency.util";
import StickyOnScroll from "@/components/layout/StickyOnScroll";
import { FaFileAlt } from "react-icons/fa";

interface CartSummaryProps {
  subtotal: number;
  discount: number;
  discountPercent: number;
  total: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ subtotal, discount, discountPercent, total }) => {
  return (
    <StickyOnScroll offset={100}>
      <section className="bg-bg-secondary hidden md:flex flex-col w-full gap-4 shadow-xs py-5 px-6 rounded-lg">
        <h1 className="flex text-lg items-center gap-2 !font-bold text-primary mb-4">
          <FaFileAlt className="text-primary" /> RESUMO
        </h1>

        <div className="flex w-full justify-between text-tx-primary border-b border-lines p-2">
          Valor dos produtos: <span className="font-bold">{CurrencyUtil.formatCurrency(subtotal)}</span>
        </div>

        <div className="flex w-full justify-between text-tx-primary border-b border-lines p-2">
          Frete: <span className="font-bold">{CurrencyUtil.formatCurrency(0)}</span>
        </div>

        {discount > 0 && (
          <div className="flex w-full justify-between text-tx-primary border-b border-lines p-2">
            Desconto ({discountPercent}%): <span className="text-sale">- {CurrencyUtil.formatCurrency(discount)}</span>
          </div>
        )}

        <div className="bg-gray-100 flex w-full rounded justify-between text-tx-primary px-3 py-4 font-semibold">
          Total: <span className="text-primary">{CurrencyUtil.formatCurrency(total)}</span>
        </div>
      </section>
    </StickyOnScroll>
  );
};

export default CartSummary;
