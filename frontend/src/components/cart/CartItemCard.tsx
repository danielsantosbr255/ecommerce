// src/components/cart/CartItemCard.tsx
import React, { useState } from "react";
import { Product } from "@/types";
import ProductImage from "@/components/products/ProductImage";
import CurrencyUtil from "@/utils/currency.util";

type CartItem = {
  id: string;
  product: Product;
  quantity: number;
};

interface CartItemCardProps {
  item: CartItem;
  onRemove: (id: string) => void;
  onQuantityChange?: (id: string, quantity: number) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item, onRemove }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="bg-white flex flex-col sm:flex-row items-center border border-lines gap-4 p-4 rounded-lg shadow-xs">
      <div className="relative w-24 h-24 flex-shrink-0">
        <ProductImage product={item.product} />
      </div>

      <div className="flex-1 text-center sm:text-left">
        <h2 className="font-semibold text-lg">{item.product.title}</h2>
        <p className="text-tx-secondary">{CurrencyUtil.formatCurrency(item.product.price)}</p>
        <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleDecrement}
              className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
            >
              -
            </button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleInputChange}
              className="w-auto text-center border border-lines rounded text-sm"
            />
            <button
              onClick={handleIncrement}
              className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <span className="font-bold text-primary text-lg">
          {CurrencyUtil.formatCurrency(item.product.price * quantity)}
        </span>
        <button
          onClick={() => onRemove(item.id)}
          className="ml-2 px-2 py-1 text-sm text-tx-error hover:underline"
        >
          Remover
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;
