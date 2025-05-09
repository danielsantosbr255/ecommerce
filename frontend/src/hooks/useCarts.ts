// src/hooks/api/useCarts.ts
"use client";
import { useState } from "react";
import { Cart, CartItem } from "@/types";
import { cartService } from "@/services/carts";
import { toast } from "react-toastify";

export const useCarts = () => {
  const [myCart, setMyCart] = useState<CartItem[] | null>(null);
  const [cart, setCart] = useState<Cart | null>(null);
  const [carts, setCarts] = useState<Cart[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCarts = async () => {
    setLoading(true);

    const data = await cartService.getAll();
    if (data) {
      setError(null);
      setCarts(data);
    } else {
      setError("Falha ao carregar carrinhos");
    }
    setLoading(false);
  };

  const fetchOwnCart = async () => {
    setLoading(true);
    const data = await cartService.getOwnCart();
    if (data) {
      setError(null);
      setMyCart(data);
    } else {
      setError("Falha ao carregar carrinho");
    }
    setLoading(false);
  };

  const fetchCart = async (id: string) => {
    setLoading(true);
    const data = await cartService.getOne(id);
    if (data) {
      setError(null);
      setCart(data);
    } else {
      setError("Falha ao carregar carrinho");
    }
    setLoading(false);
  };

  const createCartItem = async (productId: string, quantity: number) => {
    setLoading(true);

    const newCartItem = await cartService.create(productId, quantity);
    if (newCartItem) {
      setError(null);
      fetchOwnCart();
      toast.success("Produto adicionado ao carrinho");
      return newCartItem;
    } else {
      setError("Falha ao criar carrinho");
    }
    setLoading(false);
  };

  const deleteCartItem = async (id: string) => {
    setLoading(true);
    const deletedCart = await cartService.delete(id);

    if (deletedCart) {
      setCarts((prev) => prev.filter((cart) => cart.id !== id));
      setError(null);
    } else {
      setError("Falha ao deletar carrinho");
    }
    setLoading(false);
  };

  return {
    cart,
    carts,
    myCart,
    loading,
    error,
    fetchCart,
    fetchCarts,
    fetchOwnCart,
    createCartItem,
    deleteCartItem,
  };
};
