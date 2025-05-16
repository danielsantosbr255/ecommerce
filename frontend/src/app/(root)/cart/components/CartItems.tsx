"use client";

import Link from "next/link";
import { useState } from "react";
import EmptyCart from "./EmptyCart";
import CartActions from "./CartActions";
import CouponInput from "./CouponInput";
import CartSummary from "./CartSummary";
import CartItemCard from "./CartItemCard";
import { useAuth } from "@/contexts/AuthContext";
import LoadingState from "@/components/ui/LoadingState";

export default function CartItems() {
  const [coupon, setCoupon] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  const { user, userLoading, cartLoading, cartItems } = useAuth();

  const deleteCartItem = (id: string) => {
    console.log(id);
  };

  const handleClearCart = async () => {
    console.log("clear cart");
  };

  const handleCheckout = async () => {
    console.log("checkout");
  };

  const applyCoupon = () => {
    if (coupon === "FIRE10") {
      setDiscountPercent(10);
    } else if (coupon) {
      setDiscountPercent(0);
    }
  };

  if (userLoading || cartLoading) return <LoadingState />;

  if (!user) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <h1 className="flex text-2xl text-tx-secondary font-semibold gap-2">
          <Link href="/auth/sign-in" className="text-warning underline">
            Faça login
          </Link>
          para ver seu carrinho
        </h1>
      </div>
    );
  }

  if (!cartItems?.length) return <EmptyCart />;

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = (subtotal * discountPercent) / 100;
  const total = subtotal - discount;

  return (
    <main className="grid w-full h-full grid-cols-[70%_auto] gap-6">
      <section className="bg-bg-secondary p-4 shadow-xs rounded-lg space-y-3 flex flex-col w-full h-full">
        {cartItems.map((item) => (
          <CartItemCard key={item.id} item={item} onRemove={deleteCartItem} />
        ))}
      </section>

      <section className="flex flex-col gap-4">
        <CartSummary
          subtotal={subtotal}
          discount={discount}
          discountPercent={discountPercent}
          total={total}
        />

        <CouponInput coupon={coupon} setCoupon={setCoupon} onApply={applyCoupon} />
        <CartActions onClear={handleClearCart} onCheckout={handleCheckout} />
      </section>
    </main>
  );
}
