"use client";

import Link from "next/link";
import EmptyCart from "./EmptyCart";
import CartActions from "./CartActions";
import CouponInput from "./CouponInput";
import CartSummary from "./CartSummary";
import CartItemCard from "./CartItemCard";
import { useAuth } from "@/contexts/AuthContext";
import LoadingState from "@/components/ui/LoadingState";
import { cartService } from "@/services/carts";
import { toast } from "react-toastify";

export default function CartItems() {
  const { user, cartItems, cartLoading, loadCart } = useAuth();

  if (cartLoading) return <LoadingState />;

  if (!user) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <h1 className="flex text-2xl text-tx-secondary font-semibold gap-2">
          <Link href="/auth/sign-in" className="text-primary underline">
            Faça login
          </Link>
          para ver seu carrinho
        </h1>
      </div>
    );
  }

  if (!cartItems?.length) return <EmptyCart />;

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = (subtotal * 0) / 100;
  const total = subtotal - discount;

  const onUpdateQuantity = async (id: string, quantity: number) => {
    await cartService.update(id, quantity);
    await loadCart();
  };

  const onRemoveItem = async (id: string) => {
    await cartService.delete(id);
    await loadCart();
  };

  const handleClearCart = async () => {
    try {
      await cartService.clearCart();
      await loadCart();
      toast.success("Carrinho limpo com sucesso");
    } catch {
      toast.error("Não foi possível limpar o carrinho");
    }
  };

  const handleCheckout = async () => {
    console.log("checkout");
  };

  return (
    <main className="grid w-full h-full grid-cols-[70%_auto] gap-6">
      <section className="bg-bg-secondary p-4 shadow-xs rounded-lg space-y-3 flex flex-col w-full h-full">
        {cartItems.map((item) => (
          <CartItemCard
            key={item.id}
            item={item}
            onQuantityChange={onUpdateQuantity}
            onRemove={onRemoveItem}
          />
        ))}
      </section>

      <section className="flex flex-col gap-4">
        <CartSummary subtotal={subtotal} discount={discount} discountPercent={0} total={total} />
        <CouponInput />
        <CartActions handleClearCart={handleClearCart} handleCheckout={handleCheckout} />
      </section>
    </main>
  );
}
