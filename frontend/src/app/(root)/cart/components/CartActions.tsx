"use client";

import React from "react";
import Button from "@/components/ui/Button";

interface CartActionsProps {
  handleClearCart: () => void;
  handleCheckout: () => void;
}

const CartActions = ({ handleClearCart, handleCheckout }: CartActionsProps) => {
  return (
    <div className="bg-bg-secondary hidden md:flex flex-col w-full p-6 rounded-lg items-center shadow-xs gap-3 !text-lg font-semibold">
      <Button onClick={handleClearCart} className="!bg-gray-200 w-full hover:!bg-gray-300 !text-tx-primary">
        Limpar Carrinho
      </Button>

      <Button onClick={handleCheckout} className="w-full">
        Finalizar Compra
      </Button>
    </div>
  );
};

export default CartActions;
