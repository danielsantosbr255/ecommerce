// src/components/cart/CartItemCard.tsx
import React, { useState, useCallback } from "react";
import { ProductType } from "@/types/ProductType";
import ProductImage from "@/components/products/ProductImage";
import CurrencyUtil from "@/utils/currency.util";

type CartItem = {
  id: string;
  product: ProductType;
  quantity: number;
};

interface CartItemCardProps {
  item: CartItem;
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item, onRemove, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleIncrement = useCallback(() => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(item.id, newQuantity);
  }, [item.id, onQuantityChange, quantity]);

  const handleDecrement = useCallback(() => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(item.id, newQuantity);
    }
  }, [item.id, onQuantityChange, quantity]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newQuantity = parseInt(event.target.value, 10);
      if (!isNaN(newQuantity) && newQuantity > 0) {
        setQuantity(newQuantity);
        onQuantityChange(item.id, newQuantity);
      }
    },
    [item.id, onQuantityChange]
  );

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded shadow">
      <div className="relative w-24 h-24 flex-shrink-0">
        <ProductImage product={item.product} fill alt={item.product.title} />
      </div>

      <div className="flex-1 text-center sm:text-left">
        <h2 className="font-semibold text-lg">{item.product.title}</h2>
        <p className="text-gray-600">{CurrencyUtil.formatCurrency(item.product.price)}</p>
        <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
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
            className="w-16 text-center border border-gray-300 rounded text-sm"
          />
          <button
            onClick={handleIncrement}
            className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <span className="font-bold text-amber-500 text-lg">
          {CurrencyUtil.formatCurrency(item.product.price * quantity)}
        </span>
        <button
          onClick={() => onRemove(item.id)}
          className="ml-2 px-2 py-1 text-sm text-red-600 hover:underline"
        >
          Remover
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;
