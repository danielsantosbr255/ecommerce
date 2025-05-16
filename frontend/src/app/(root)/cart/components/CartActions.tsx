// src/components/cart/CartActions.tsx
import Button from "@/components/ui/Button";
import React from "react";

interface CartActionsProps {
  onClear: () => void;
  onCheckout: () => void;
}

const CartActions: React.FC<CartActionsProps> = ({ onClear, onCheckout }) => {
  return (
    <div className="bg-bg-secondary flex flex-col w-full p-6 rounded-lg items-center shadow-xs gap-3 !text-lg font-semibold">
      <Button onClick={onClear} className="!bg-gray-200 w-full hover:!bg-gray-300 !text-tx-primary">
        Limpar Carrinho
      </Button>

      <Button onClick={onCheckout} className="w-full">
        Finalizar Compra
      </Button>
    </div>
  );
};

export default CartActions;
