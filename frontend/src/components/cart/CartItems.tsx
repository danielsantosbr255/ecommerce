"use client";

import { CartItem } from "@/types";
import EmptyCart from "./EmptyCart";
import CouponInput from "./CouponInput";
import CartSummary from "./CartSummary";
import CartItemCard from "./CartItemCard";
import LoadingState from "../LoadingState";
import { useEffect, useState } from "react";
import { cartService } from "@/services/carts";

export default function CartItems() {
  const [coupon, setCoupon] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[] | null>([]);

  const getCartItems = async () => {
    setLoading(true);
    const cart = await cartService.getOwnCart();
    setCartItems(cart);
    setLoading(false);
  };

  const deleteCartItem = (id: string) => {
    console.log(id);
  };

  useEffect(() => {
    getCartItems();
  }, []);

  if (loading) return <LoadingState />;
  if (!cartItems?.length) return <EmptyCart />;

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = (subtotal * discountPercent) / 100;
  const total = subtotal - discount;

  const applyCoupon = () => {
    if (coupon === "FIRE10") {
      setDiscountPercent(10);
    } else if (coupon) {
      setDiscountPercent(0);
    }
  };

  return (
    <main className="grid w-full h-full grid-cols-[2fr_1fr] gap-4">
      <section className="rounded-lg space-y-6 flex flex-col w-full h-full">
        {cartItems.map((item) => (
          <CartItemCard
            key={item.id}
            item={item}
            onRemove={deleteCartItem}
            // onQuantityChange={createCartItem}
          />
        ))}
        {/* <CartActions onClear={handleClearCart} onCheckout={handleCheckout} /> */}
      </section>

      <section className="flex flex-col flex-1 bg-bg-secondary border border-lines shadow-xs items-center gap-2 py-10 rounded-lg">
        <h1 className="text-3xl font-bold text-primary mb-4">Sumario</h1>

        <div className="flex flex-col gap-4 items-center">
          <CouponInput coupon={coupon} setCoupon={setCoupon} onApply={applyCoupon} />

          <CartSummary
            subtotal={subtotal}
            discount={discount}
            discountPercent={discountPercent}
            total={total}
          />
        </div>
      </section>
    </main>
  );
}
