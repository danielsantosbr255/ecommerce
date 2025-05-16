// src/components/cart/CartSummary.tsx
import React from "react";
import { File } from "lucide-react";
import CurrencyUtil from "@/utils/currency.util";
import StickyOnScroll from "@/components/layout/StickyOnScroll";

interface CartSummaryProps {
  subtotal: number;
  discount: number;
  discountPercent: number;
  total: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ subtotal, discount, discountPercent, total }) => {
  return (
    <StickyOnScroll offset={100}>
      <section className="bg-bg-secondary w-full flex flex-col gap-4 shadow-xs py-5 px-6 rounded-lg">
        <h1 className="flex text-lg items-center gap-2 !font-bold text-primary mb-4">
          <File className="text-primary" absoluteStrokeWidth /> RESUMO
        </h1>

        <div className="flex w-full justify-between text-tx-secondary border-b border-lines p-2">
          Valor dos produtos: <span className="font-bold">{CurrencyUtil.formatCurrency(subtotal)}</span>
        </div>

        <div className="flex w-full justify-between text-tx-secondary border-b border-lines p-2">
          Frete: <span className="font-bold">{CurrencyUtil.formatCurrency(0)}</span>
        </div>

        {discount > 0 && (
          <div className="flex w-full justify-between text-tx-secondary border-b border-lines p-2">
            Desconto ({discountPercent}%):{" "}
            <span className="text-sale">- {CurrencyUtil.formatCurrency(discount)}</span>
          </div>
        )}

        <div className="bg-gray-100 flex w-full rounded justify-between text-tx-secondary px-2 py-4">
          Total: <span className="text-primary">{CurrencyUtil.formatCurrency(total)}</span>
        </div>
      </section>
    </StickyOnScroll>
  );
};

export default CartSummary;
