// src/components/cart/CartItemCard.tsx
import { Product } from "@/types";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import React, { useState } from "react";
import CurrencyUtil from "@/utils/currency.util";
import ProductImage from "@/components/products/ProductImage";
import Link from "next/link";

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
    <main className="bg-white w-full grid grid-cols-[auto_4fr_2fr] gap-4 px-4 py-2 items-center border-b border-lines">
      <section className="flex h-full items-center gap-4">
        <Link href={`/product/${item.product.slug}`} className="relative w-24 h-24 flex-shrink-0">
          <ProductImage product={item.product} />
        </Link>
      </section>

      <section className="w-full flex flex-col justify-center h-full gap-2">
        <Link href={`/product/${item.product.slug}`} className="flex-1 text-center sm:text-left">
          <h2 className="font-semibold text-lg">{item.product.title}</h2>
          <p className="text-tx-secondary">{CurrencyUtil.formatCurrency(item.product.price)}</p>
        </Link>
      </section>

      <section className="flex h-full gap-2 text-tx-secondary items-end justify-center w-full">
        <div className="flex flex-col gap-4 w-full h-full items-center justify-center">
          <div className="flex items-center gap-1">
            <button
              onClick={handleDecrement}
              className={`cursor-pointer  ${quantity <= 1 ? "text-tx-muted" : "text-primary"}`}
              disabled={quantity <= 1}
            >
              <ChevronLeft size={15} absoluteStrokeWidth />
            </button>

            <input
              type="number"
              value={quantity}
              onChange={handleInputChange}
              className="text-center text-lg font-bold w-10 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            />

            <button
              onClick={handleIncrement}
              className={`cursor-pointer  ${quantity >= 99 ? "text-tx-muted" : "text-primary"}`}
              disabled={quantity >= 99}
            >
              <ChevronRight size={15} absoluteStrokeWidth />
            </button>
          </div>

          <button
            onClick={() => onRemove(item.id)}
            className="flex items-center justify-center gap-1 font-semibold text-sm text-tx-error hover:underline cursor-pointer"
          >
            <Trash2 size={15} /> REMOVER
          </button>
        </div>

        <div className="flex flex-col items-end justify-center h-full w-full">
          <p className="truncate">Preço à vista:</p>
          <span className="font-bold text-primary text-lg">
            {CurrencyUtil.formatCurrency(item.product.price * quantity)}
          </span>
        </div>
      </section>
    </main>
  );
};

export default CartItemCard;
