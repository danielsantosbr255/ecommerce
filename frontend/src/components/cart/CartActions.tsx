// src/components/cart/CartActions.tsx
import React from "react";

interface CartActionsProps {
  onClear: () => void;
  onCheckout: () => void;
}

const CartActions: React.FC<CartActionsProps> = ({ onClear, onCheckout }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-end gap-4">
      <button onClick={onClear} className="px-6 py-2 rounded bg-gray-200 hover:bg-gray-300 text-tx-primary">
        Limpar Carrinho
      </button>
      <button onClick={onCheckout} className="px-6 py-2 rounded bg-primary hover:bg-primary text-tx-on-primary">
        Finalizar Compra
      </button>
    </div>
  );
};

export default CartActions;
