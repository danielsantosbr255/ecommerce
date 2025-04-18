"use client";
import React, { useState } from "react";
import CartItemCard from "./CartItemCard";
import { toast } from "react-toastify";
import CartUtils from "@/utils/cart.util";
import { CartItem } from "@/types/CartType";
import CouponInput from "./CouponInput";
import CartSummary from "./CartSummary";
import CartActions from "./CartActions";

export default function CartItems({ accessToken }: { accessToken: string | null }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = (subtotal * discountPercent) / 100;
  const total = subtotal - discount;

  const handleRemoveItem = async (itemId: string) => {
    const success = await CartUtils.deleteCartItem(accessToken, itemId);
    if (success) {
      setCart((prev) => prev.filter((item) => item.id !== itemId));
    }
  };

  const handleClearCart = async () => {
    const success = await CartUtils.clearCart(accessToken);
    if (success) setCart([]);
  };

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    const updatedItem = await CartUtils.updateCartItem(accessToken, itemId, newQuantity);
    if (updatedItem) {
      setCart((prevCart) =>
        prevCart.map((item) => (item.id === itemId ? { ...item, quantity: updatedItem.quantity } : item))
      );
    }
  };

  const applyCoupon = () => {
    if (coupon === "FIRE10") {
      setDiscountPercent(10);
      toast.success("Cupom FIRE10 aplicado!");
    } else if (coupon) {
      setDiscountPercent(0);
      toast.error("Cupom inválido.");
    }
  };

  const handleCheckout = () => {
    alert("Implementar lógica de checkout!");
  };

  return (
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

      <CartSummary subtotal={subtotal} discount={discount} discountPercent={discountPercent} total={total} />

      <CartActions onClear={handleClearCart} onCheckout={handleCheckout} />
    </div>
  );
}
