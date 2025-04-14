// src/pages/cart/index.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { useApi } from "@/contexts/ApiContext";
import { CartItem } from "@/types/CartType";
import CartItemCard from "@/components/cart/CartItemCard";
import CouponInput from "@/components/cart/CouponInput";
import CartSummary from "@/components/cart/CartSummary";
import CartActions from "@/components/cart/CartActions";
import EmptyCart from "@/components/cart/EmptyCart";
import LoadingState from "@/components/LoadingState";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [coupon, setCoupon] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const { fetchCart, removeItemFromCart, clearCart, updateItemQuantity } = useApi();

  useEffect(() => {
    const loadCart = async () => {
      setIsLoading(true);
      const fetchedCart = await fetchCart();
      if (fetchedCart) {
        setCart(fetchedCart);
      }
      setIsLoading(false);
    };

    loadCart();
  }, [fetchCart]);

  const handleRemoveItem = useCallback(
    async (itemId: string) => {
      const success = await removeItemFromCart(itemId);
      if (success) {
        setCart((prev) => prev.filter((item) => item.id !== itemId));
      }
    },
    [removeItemFromCart]
  );

  const handleClearCart = useCallback(async () => {
    const success = await clearCart();
    if (success) {
      setCart([]);
    }
  }, [clearCart]);

  const handleQuantityChange = useCallback(
    async (itemId: string, newQuantity: number) => {
      const updatedItem = await updateItemQuantity(itemId, newQuantity);
      if (updatedItem) {
        setCart((prevCart) =>
          prevCart.map((item) => (item.id === itemId ? { ...item, quantity: updatedItem.quantity } : item))
        );
      }
    },
    [updateItemQuantity]
  );

  const applyCoupon = useCallback(() => {
    if (coupon === "FIRE10") {
      setDiscountPercent(10);
      toast.success("Cupom FIRE10 aplicado!");
    } else if (coupon) {
      setDiscountPercent(0);
      toast.error("Cupom inválido.");
    }
  }, [coupon]);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = (subtotal * discountPercent) / 100;
  const total = subtotal - discount;

  const handleCheckout = () => {
    // Lógica para finalizar a compra
    alert("Implementar lógica de checkout!");
  };

  if (isLoading) return <LoadingState />;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      <h1 className="text-3xl font-bold">Seu Carrinho</h1>

      {cart.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <CartItemCard
              key={item.id}
              item={item}
              onRemove={handleRemoveItem}
              onQuantityChange={handleQuantityChange}
            />
          ))}

          <CouponInput coupon={coupon} setCoupon={setCoupon} onApply={applyCoupon} />

          <CartSummary
            subtotal={subtotal}
            discount={discount}
            discountPercent={discountPercent}
            total={total}
          />

          <CartActions onClear={handleClearCart} onCheckout={handleCheckout} />
        </div>
      )}
    </div>
  );
}
