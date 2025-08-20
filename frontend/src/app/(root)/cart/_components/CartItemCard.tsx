"use client";

import Link from "next/link";
import { Product } from "@/types";
import React, { useState } from "react";
import CurrencyUtil from "@/lib/utils/currency.util";
import ProductImage from "@/components/products/ProductImage";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaTrashAlt } from "react-icons/fa";

type CartItem = {
  id: string;
  product: Product;
  quantity: number;
};

interface CartItemCardProps {
  item: CartItem;
  onQuantityChange: (itemId: string, newQuantity: number) => void;
  onRemove: (itemId: string) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item, onQuantityChange, onRemove }) => {
  const [quantityInput, setQuantityInput] = useState(item.quantity.toString());

  const handleIncrement = () => {
    const newQuantity = parseInt(quantityInput, 10) + 1;
    setQuantityInput(newQuantity.toString());
    onQuantityChange(item.id, newQuantity);
  };

  const handleDecrement = () => {
    const currentQuantity = parseInt(quantityInput, 10);
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      setQuantityInput(newQuantity.toString());
      onQuantityChange(item.id, newQuantity);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantityInput(event.target.value);
  };

  const handleInputBlur = () => {
    const newQuantity = parseInt(quantityInput, 10);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      onQuantityChange(item.id, newQuantity);
    } else {
      setQuantityInput(item.quantity.toString());
      onQuantityChange(item.id, item.quantity); // Informa o pai para reverter, se necessário
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleInputBlur();
    }
  };

  const onRemoveItem = () => {
    onRemove(item.id);
  };

  const currentQuantity = parseInt(quantityInput, 10);

  return (
    <main className="bg-white w-full grid md:grid-cols-[auto_4fr_2fr] gap-4 px-4 py-2 items-center border-b last:border-b-0 border-lines">
      {/* Seções de imagem e descrição */}
      <section className="flex h-full items-center gap-4">
        <Link href={`/products/${item.product.slug}`} className="relative w-24 h-24 flex-shrink-0">
          <ProductImage product={item.product} />
        </Link>
      </section>

      <section className="w-full flex flex-col justify-center h-full gap-2">
        <Link href={`/products/${item.product.slug}`} className="flex-1 text-center sm:text-left">
          <h2 className="font-semibold text-tx-primary text-lg hover:underline">{item.product.title}</h2>
          <p className="text-tx-secondary">{CurrencyUtil.formatCurrency(item.product.price)}</p>
        </Link>
      </section>

      {/* Seção de quantidade e remoção */}
      <section className="flex h-full gap-2 text-tx-primary items-end justify-center w-full">
        <div className="flex flex-col gap-4 w-full h-full items-center justify-center">
          <div className="flex items-center gap-1">
            <button
              onClick={handleDecrement}
              className={`cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-primary`}
              disabled={currentQuantity <= 1}
            >
              <ChevronLeft size={15} absoluteStrokeWidth />
            </button>

            <input
              id="quantity-input"
              type="number"
              value={quantityInput}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={handleKeyPress}
              className="text-center font-bold w-10 text-tx-primary outline-none ring-0"
            />

            <button
              onClick={handleIncrement}
              className={`cursor-pointer ${currentQuantity >= 99 ? "text-tx-muted" : "text-primary"}`}
              disabled={currentQuantity >= 99}
            >
              <ChevronRight size={15} absoluteStrokeWidth />
            </button>
          </div>

          <button
            onClick={onRemoveItem}
            className="flex justify-items-center gap-1 font-semibold text-sm text-tx-error hover:underline cursor-pointer"
          >
            <FaTrashAlt size={15} /> REMOVER
          </button>
        </div>

        {/* Seção de preço total do item */}
        <div className="flex flex-col items-end justify-center h-full w-full">
          <p className="truncate">Preço à vista:</p>
          <span className="font-bold text-primary text-lg">
            {CurrencyUtil.formatCurrency(item.product.price * currentQuantity)}
          </span>
        </div>
      </section>
    </main>
  );
};

export default CartItemCard;
