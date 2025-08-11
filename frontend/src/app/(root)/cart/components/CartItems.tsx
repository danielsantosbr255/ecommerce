"use client";

import Link from "next/link";
import { toast } from "react-toastify";
import CartActions from "./CartActions";
import CouponInput from "./CouponInput";
import CartSummary from "./CartSummary";
import CartItemCard from "./CartItemCard";
import { useRouter } from "next/navigation";
import { cartService } from "@/services/carts";
import { orderService } from "@/services/orders";
import { useAuth } from "@/providers/AuthContext";
import LoadingState from "@/components/ui/LoadingState";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function CartItems() {
  const { user } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: cartItems, isLoading } = useQuery({ queryKey: ["cart"], queryFn: cartService.getOwnCart });

  const updateQuantity = useMutation({
    mutationFn: async (data: { id: string; quantity: number }) => {
      return await cartService.update(data.id, data.quantity);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => {
      toast.error("Não foi possível atualizar o carrinho");
    },
  });

  const removeItem = useMutation({
    mutationFn: async (id: string) => {
      return await cartService.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => {
      toast.error("Não foi possível remover o item do carrinho");
    },
  });

  const clearCart = useMutation({
    mutationFn: async () => {
      return await cartService.clearCart();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Carrinho limpo com sucesso");
    },
    onError: () => {
      toast.error("Não foi possível limpar o carrinho");
    },
  });

  const createOrder = useMutation({
    mutationFn: async () => {
      return await orderService.create();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Compra finalizada com sucesso");
      router.push("/account/orders");
    },
    onError: (error) => {
      console.error("Erro ao finalizar a compra:", error);
      toast.error("Não foi possível finalizar a compra");
    },
  });

  if (createOrder.isPending) return <LoadingState label="Finalizando compra" />;
  if (isLoading) return <LoadingState label="Carregando carrinho" />;

  if (!user) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <h1 className="flex text-2xl text-tx-primary font-semibold gap-2">
          <Link href="/sign-in" className="text-primary underline">
            Faça login
          </Link>
          para ver seu carrinho
        </h1>
      </div>
    );
  }

  if (!cartItems?.length) {
    return (
      <div className="flex flex-col w-full mt-10 justify-center items-center">
        <h1 className="text-2xl font-semibold mb-4">Seu carrinho está vazio</h1>
        <p className="text-center mb-4">Adicione produtos ao carrinho para continuar a comprar.</p>

        <Link href="/" className="text-primary hover:underline text-lg font-semibold">
          Voltar à loja
        </Link>
      </div>
    );
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = (subtotal * 0) / 100;
  const total = subtotal - discount;

  const onQuantityChange = (id: string, quantity: number) => updateQuantity.mutate({ id, quantity });
  const onRemove = (id: string) => removeItem.mutate(id);
  const onClearCart = () => clearCart.mutate();
  const onCheckout = () => createOrder.mutate();

  return (
    <main className="grid w-full h-full md:grid-cols-[70%_auto] gap-6">
      <section className="bg-bg-secondary p-4 shadow-xs rounded-lg space-y-3 flex flex-col w-full h-full">
        {cartItems.map((item) => (
          <CartItemCard key={item.id} item={item} onQuantityChange={onQuantityChange} onRemove={onRemove} />
        ))}
      </section>

      <section className="flex flex-col gap-4">
        <CartSummary subtotal={subtotal} discount={discount} discountPercent={0} total={total} />
        <CouponInput />
        <CartActions handleClearCart={onClearCart} handleCheckout={onCheckout} isPeding={createOrder.isPending} />
      </section>
    </main>
  );
}
