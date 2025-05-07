"use client";

import React from "react";
import Link from "next/link";
import { User } from "@/types";
import { authService } from "@/services/auth";
import { FiHeart, FiLock, FiLogOut, FiMapPin, FiShoppingBag, FiUser } from "react-icons/fi";

export default function Sidebar({ user }: { user: User }) {
  const signOut = async () => {
    await authService.signOut();
  };

  return (
    <aside className="bg-gray-200 p-6 md:border-r md:border-gray-300">
      <div className="flex items-center mb-6">
        <FiUser className="text-xl text-tx-secondary mr-2" />
        <h2 className="text-lg font-semibold text-tx-secondary">Olá, {user?.name}</h2>
      </div>
      <nav className="space-y-3">
        <Link href="/minha-conta" className="flex items-center text-tx-secondary hover:text-tx-link">
          <FiUser className="text-lg mr-2" />
          Minha Conta
        </Link>
        <Link href="/meus-pedidos" className="flex items-center text-tx-secondary hover:text-tx-link">
          <FiShoppingBag className="text-lg mr-2" />
          Meus Pedidos
        </Link>
        <Link href="/meus-enderecos" className="flex items-center text-tx-secondary hover:text-tx-link">
          <FiMapPin className="text-lg mr-2" />
          Meus Endereços
        </Link>
        <Link href="/favoritos" className="flex items-center text-tx-secondary hover:text-tx-link">
          <FiHeart className="text-lg mr-2" />
          Meus Favoritos
        </Link>
        <Link href="/alterar-senha" className="flex items-center text-tx-secondary hover:text-tx-link">
          <FiLock className="text-lg mr-2" />
          Alterar Senha
        </Link>
        <button onClick={signOut} className="flex items-center text-tx-secondary hover:text-red-500">
          <FiLogOut className="text-lg mr-2" />
          Sair
        </button>
      </nav>
    </aside>
  );
}
