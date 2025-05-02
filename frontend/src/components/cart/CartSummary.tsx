// src/components/cart/CartSummary.tsx
import React from "react";
import CurrencyUtil from "@/utils/currency.util";

interface CartSummaryProps {
  subtotal: number;
  discount: number;
  discountPercent: number;
  total: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ subtotal, discount, discountPercent, total }) => {
  return (
    <div className="text-right space-y-2">
      <p>
        Subtotal: <span className="text-tx-secondary">{CurrencyUtil.formatCurrency(subtotal)}</span>
      </p>
      {discount > 0 && (
        <p>
          Desconto ({discountPercent}%):{" "}
          <span className="text-sale">- {CurrencyUtil.formatCurrency(discount)}</span>
        </p>
      )}
      <p className="text-xl font-semibold">
        Total: <span className="text-primary">{CurrencyUtil.formatCurrency(total)}</span>
      </p>
    </div>
  );
};

export default CartSummary;
